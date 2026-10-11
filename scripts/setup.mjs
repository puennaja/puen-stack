#!/usr/bin/env node
// puen-stack safe local Skill installer. Requires Node.js 18+.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillRoot = path.join(root, 'skills');
const targetDirs = {codex: '.agents/skills', claude: '.claude/skills'};
const help = `Usage: node scripts/setup.mjs [options]
  --agent both|codex|claude   default: both
  --scope user|project       default: user
  --project PATH             required with --scope project
  --mode link|copy           default: link (user), copy (project)
  --skill NAME               install selected skill (repeatable)
  --dry-run                  preview, do not write
  --check                    inspect, do not write
  --doctor                   check CLI versions, no login or writes
  --list                     list bundled skills
  --yes                      confirm without interactive prompt
  --help                     show help

Examples:
  node scripts/setup.mjs --dry-run
  node scripts/setup.mjs --yes
  node scripts/setup.mjs --check --doctor
  node scripts/setup.mjs --scope project --project /your/repo --agent codex --yes
`;
function fail(message) { throw Error(message); }
function options(argv) {
  const o = {agent:'both',scope:'user',project:null,mode:null,skill:[],dryRun:false,check:false,doctor:false,list:false,yes:false,help:false};
  const bool = {'--dry-run':'dryRun','--check':'check','--doctor':'doctor','--list':'list','--yes':'yes','--help':'help'};
  const args = {'--agent':'agent','--scope':'scope','--project':'project','--mode':'mode','--skill':'skill'};
  for(let i=0;i<argv.length;i++) {
    const k=argv[i];
    if(k==='-h'){o.help=true;continue;}
    if(bool[k]){o[bool[k]]=true;continue;}
    if(!args[k])fail('Unknown option: '+k);
    const v=argv[++i];
    if(!v||v.startsWith('--'))fail('Missing value for '+k);
    if(k==='--skill')o.skill.push(v);
    else o[args[k]]=v;
  }
  if(!['both','codex','claude'].includes(o.agent))fail('Unknown agent: '+o.agent);
  if(!['user','project'].includes(o.scope))fail('Unknown scope: '+o.scope);
  if(o.mode&&!['link','copy'].includes(o.mode))fail('Unknown mode: '+o.mode);
  if(o.project&&o.scope!=='project')fail('--project requires --scope project');
  if(o.scope==='project'&&!o.project&&!o.help&&!o.list)fail('Explicit --project PATH is required');
  o.mode ||= o.scope==='user'?'link':'copy';
  if(o.doctor)o.check=true;
  return o;
}
function names() {
  const all=[];
  for(const d of fs.readdirSync(skillRoot,{withFileTypes:true})) {
    if(!d.isDirectory()||!/^[a-z][a-z0-9-]*$/.test(d.name))continue;
    const file=path.join(skillRoot,d.name,'SKILL.md');
    if(!fs.existsSync(file))continue;
    if(!fs.readFileSync(file,'utf8').startsWith('---\nname: '+d.name+'\n'))fail('Invalid SKILL.md frontmatter: '+d.name);
    all.push(d.name);
  }
  if(!all.length)fail('No bundled skills');
  return all.sort();
}
function exists(p) {
  try{fs.lstatSync(p);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}
}
function sameFiles(a,b) {
  if(!fs.statSync(b).isDirectory())return false;
  const x=fs.readdirSync(a).sort(),y=fs.readdirSync(b).sort();
  if(x.length!==y.length||x.some((n,i)=>n!==y[i]))return false;
  for(const n of x) {
    const aa=path.join(a,n),bb=path.join(b,n),as=fs.lstatSync(aa),bs=fs.lstatSync(bb);
    if(as.isSymbolicLink()||bs.isSymbolicLink()||as.isDirectory()!==bs.isDirectory())return false;
    if(as.isDirectory()){if(!sameFiles(aa,bb))return false;}
    else if(!as.isFile()||!bs.isFile()||!fs.readFileSync(aa).equals(fs.readFileSync(bb)))return false;
  }
  return true;
}
function status(src,dst,mode) {
  if(!exists(dst))return 'install';
  const s=fs.lstatSync(dst);
  if(s.isSymbolicLink()) {
    try{if(fs.realpathSync(dst)===fs.realpathSync(src))return 'installed (linked)';}catch{}
  }
  if(mode==='copy'&&s.isDirectory()&&sameFiles(src,dst))return 'installed (copied)';
  return 'CONFLICT';
}
function doctor() {
  console.log('CLI diagnostics (no login):');
  for(const app of ['node','git','codex','claude','glab']){
    const r=spawnSync(app,['--version'],{encoding:'utf8',timeout:3000,shell:false});
    console.log(' '+app+': '+(r.error||r.status!==0?'unavailable':(r.stdout||r.stderr).trim().split(/\r?\n/)[0]));
  }
  console.log('Authentication, permissions and GitLab access were NOT checked.');
}
async function main() {
  const o=options(process.argv.slice(2));
  if(o.help){console.log(help);return;}
  const available=names();
  if(o.list){console.log(available.join('\n'));if(o.doctor)doctor();return;}
  const selected=o.skill.length?[...new Set(o.skill)]:available;
  for(const n of selected)if(!available.includes(n))fail('Unknown skill: '+n);
  const agents=o.agent==='both'?['codex','claude']:[o.agent];
  const base=o.scope==='user'?os.homedir():path.resolve(o.project);
  if(!fs.existsSync(base)||!fs.statSync(base).isDirectory())fail('Destination root is not a directory: '+base);
  const jobs=[];
  for(const agent of agents)for(const name of selected){
    const src=path.join(skillRoot,name),dst=path.join(base,targetDirs[agent],name);
    jobs.push({agent,name,src,dst,state:status(src,dst,o.mode)});
  }
  console.log('puen-stack: '+o.scope+' / '+o.mode+' / '+agents.join(', '));
  for(const j of jobs)console.log(' ['+j.state+'] '+j.agent+'/'+j.name+' -> '+j.dst);
  if(o.doctor)doctor();
  if(jobs.some(j=>j.state==='CONFLICT'))fail('CONFLICT: existing Skill differs. Nothing changed. Resolve manually; never overwrite.');
  if(o.dryRun||o.check){console.log(o.dryRun?'Dry-run completed. No files changed.':'Check completed. No files changed.');return;}
  const pending=jobs.filter(j=>j.state==='install');
  if(!pending.length){console.log('Already installed. No changes.');return;}
  if(!o.yes){
    if(!process.stdin.isTTY||!process.stdout.isTTY)fail('Interactive confirmation unavailable. Nothing changed; use --yes after review.');
    const ui=createInterface({input:process.stdin,output:process.stdout});
    let reply;
    try{reply=await ui.question('Install '+pending.length+' Skills? [y/N] ');}finally{ui.close();}
    if(!['y','yes'].includes(reply.trim().toLowerCase())){console.log('Cancelled. No changes.');return;}
  }
  for(const j of pending){
    fs.mkdirSync(path.dirname(j.dst),{recursive:true});
    if(exists(j.dst))fail('Destination appeared during install; stop and review: '+j.dst);
    if(o.mode==='link')fs.symlinkSync(j.src,j.dst,process.platform==='win32'?'junction':'dir');
    else fs.cpSync(j.src,j.dst,{recursive:true,force:false,errorOnExist:true});
    console.log(' Installed: '+j.agent+'/'+j.name);
  }
  console.log('Installed '+pending.length+' destinations. Reload Codex/Claude to discover skills.');
  if(o.scope==='project')console.log('Project-local Skills may show in git status. Review before committing.');
  console.log('No agent permissions, GitLab tokens, pushes, MRs, merges or deployments were changed.');
  console.log('Next: --check --doctor, then ask your agent to use setup-puen-stack.');
}
main().catch(e=>{console.error('Setup error: '+e.message);process.exitCode=1;});
