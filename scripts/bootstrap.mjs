#!/usr/bin/env node
// My Engineer interactive bootstrap. Safe by default; no credential storage.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const home=os.homedir();
const cmd=(app,args=[],interactive=false)=>{
  const r=spawnSync(app,args,{stdio:interactive?'inherit':'pipe',encoding:'utf8',timeout:interactive?180000:10000});
  return {ok:!r.error&&r.status===0,output:(r.stdout||r.stderr||r.error?.message||'').trim().split('\n').slice(0,3).join('\n')};
};
const profiles={
  fast:{model:'gpt-6-luna',model_reasoning_effort:'low'},
  build:{model:'gpt-6.1-sol',model_reasoning_effort:'medium'},
  review:{model:'gpt-6.1-sol',model_reasoning_effort:'high',sandbox_mode:'read-only'},
  deep:{model:'gpt-6-astra',model_reasoning_effort:'high'}
};
const help=`Usage: npm run setup [-- --dry-run|--check]
Interactive setup (TTY required). --dry-run previews a Codex+GitHub+Plane pilot preset WITHOUT writes.
--check reports CLI/config presence without writes. Choose providers interactively for real setup.
`;
const args=process.argv.slice(2);
if(args.includes('--help')){console.log(help);process.exit(0)}
if(args.some(x=>!['--check','--dry-run'].includes(x))){console.error(help);process.exit(1)}
function inspect(){
  console.log('Environment:');
  for(const tool of ['node','git','codex','gh','glab','claude']){
    const r=cmd(tool,['--version']);console.log(`  ${tool}: ${r.ok?r.output:'not available'}`);
  }
  console.log('Codex config: '+(fs.existsSync(path.join(home,'.codex','config.toml'))?'present':'not found'));
}
if(args.includes('--check')){inspect();process.exit(0)}
const dryRun=args.includes('--dry-run');
if(!dryRun&&(!process.stdin.isTTY||!process.stdout.isTTY)){
  console.error('Interactive terminal required; try npm run setup -- --dry-run');process.exit(1)
}
const rl=dryRun?null:createInterface({input:process.stdin,output:process.stdout});
async function select(question,options,defaultIndex=0){
  console.log('\n'+question);
  options.forEach((x,i)=>console.log(` ${i+1}. ${x}`));
  if(dryRun)return options[defaultIndex];
  while(true){
    const ans=(await rl.question(`Select [${defaultIndex+1}, q=cancel]: `)).trim();
    if(ans.toLowerCase()==='q')throw Error('Cancelled');
    const n=ans?Number(ans):defaultIndex+1;
    if(Number.isInteger(n)&&n>=1&&n<=options.length)return options[n-1];
  }
}
async function confirm(msg){
  if(dryRun){console.log('[dry-run] '+msg);return false}
  const v=(await rl.question(msg+' [y/N]: ')).trim().toLowerCase();return v==='y'||v==='yes';
}
function safeFile(file,contents){
  if(fs.existsSync(file)){console.log('SKIP existing: '+file);return}
  if(dryRun){console.log('[dry-run] would create: '+file);return}
  fs.mkdirSync(path.dirname(file),{recursive:true});
  fs.writeFileSync(file,contents,{flag:'wx',mode:0o600});
  console.log('Created: '+file);
}
async function maybe(app,args,why){
  if(!await confirm(why+' — run '+app+' '+args.join(' ')+'?'))return;
  const r=cmd(app,args,true);console.log(r.ok?'Command completed':'Command failed; inspect output and follow guide');
}
try{
  console.log('My Engineer Bootstrap — explicit choices, safe reruns');
  inspect();
  const agent=await select('Agent',['Codex','Claude Code','Both']);
  const tracker=await select('Work tracker',['Plane Cloud','Jira','GitHub Issues','None / later']);
  const host=await select('Git hosting',['GitHub','GitLab','None / later']);
  const scope=await select('Skill installation',['Global','Project / later']);
  const configAgent=agent==='Codex'||agent==='Both';
  const installAgent=agent==='Both'?'both':agent==='Codex'?'codex':'claude';
  console.log('\nPLAN: '+JSON.stringify({agent,tracker,host,scope},null,2));
  console.log('No automatic credentials, role changes, pushes, PR/MRs or approvals.');
  if(!dryRun&&!await confirm('Proceed with selected setup?')){console.log('No changes.');process.exit(0)}
  if(configAgent){
    if(!cmd('codex',['--version']).ok){
      console.log('Codex CLI missing. Install manually with supported npm/node setup, then rerun.');
    }else{
      const codexHome=path.join(home,'.codex');
      for(const [name,values] of Object.entries(profiles)){
        const body=Object.entries(values).map(([k,v])=>`${k} = "${v}"`).join('\n')+'\n';
        safeFile(path.join(codexHome,name+'.config.toml'),body);
      }
      const main=path.join(codexHome,'config.toml');
      if(fs.existsSync(main)&&/^(?:profile\s*=|\[profiles\.)/m.test(fs.readFileSync(main,'utf8'))){
        console.log('ACTION NEEDED: legacy profile selector/table exists in '+main+'; preserve other settings and migrate manually.');
      }
    }
  }
  if(scope==='Global'){
    if(await confirm('Install missing global Skills using existing safe installer?')){
      const r=cmd('node',[path.join(root,'scripts','setup.mjs'),'--agent',installAgent,'--scope','user','--mode','link','--yes'],true);
      if(!r.ok)console.log('Skill installer did not complete; check conflicts; no automatic overwrite.');
    }
  }else console.log('Project-scoped Skills: run node scripts/setup.mjs inside puen-stack after choosing project path.');
  if(host==='GitHub'){
    console.log('GitHub auth status: '+(cmd('gh',['auth','status']).ok?'authenticated':'unverified'));
    if(cmd('gh',['--version']).ok)await maybe('gh',['auth','login'],'Interactive GitHub authentication (only if needed)');
    else console.log('Install GitHub CLI (gh) separately using official instructions.');
  }else if(host==='GitLab'){
    console.log('GitLab auth status: '+(cmd('glab',['auth','status']).ok?'authenticated':'unverified'));
    if(cmd('glab',['--version']).ok)await maybe('glab',['auth','login'],'Interactive GitLab authentication (only if needed)');
    else console.log('Install GitLab CLI (glab) separately using official instructions.');
  }
  if(tracker==='Plane Cloud'&&configAgent){
    const out=cmd('codex',['mcp','list']);
    if(out.ok&&/\bplane\b/.test(out.output))console.log('Plane MCP exists; check connection and OAuth from Codex.');
    else await maybe('codex',['mcp','add','plane','--url','https://mcp.plane.so/http/mcp'],'Register official Plane MCP (does not grant project roles)');
    console.log('Next: codex mcp login plane (interactive OAuth) then test read before authorized write.');
  }else if(tracker!=='None / later')console.log('Selected tracker: '+tracker+' — follow provider-specific authentication guide; no unsupported MCP auto-config.');
  if(agent==='Claude Code'||agent==='Both')console.log('Claude Code provider MCP: follow setup guide; verify actual CLI and OAuth before use.');
  console.log('\nSETUP COMPLETE (configuration only; integration unverified).');
  console.log('Next: open product repo; use pilot-recorder, then setup-puen-stack. Log events under docs/pilot/.');
}catch(err){console.error('Setup stopped: '+err.message);process.exitCode=1}
finally{await rl?.close()}
