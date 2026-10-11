import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { wizardOptions } from './setup.mjs';

const SOURCE = fileURLToPath(new URL('./setup.mjs', import.meta.url));

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'puen-stack-setup-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const src = path.join(root, 'bundle');
  fs.mkdirSync(path.join(src, 'scripts'), { recursive: true });
  fs.copyFileSync(SOURCE, path.join(src, 'scripts/setup.mjs'));
  for (const name of ['git-commit', 'gitlab-draft-mr', 'setup-puen-stack']) {
    const folder = path.join(src, 'skills', name);
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, 'SKILL.md'), '---\nname: '+name+'\ndescription: synthetic\n---\n\n# '+name+'\n');
    fs.writeFileSync(path.join(folder, 'TESTS.md'), 'synthetic\n');
  }
  const project = path.join(root, 'project'), home = path.join(root, 'home');
  fs.mkdirSync(project); fs.mkdirSync(home);
  const run = (...args) => spawnSync(process.execPath, [path.join(src, 'scripts/setup.mjs'), ...args], {
    cwd: project, encoding: 'utf8', timeout: 8000,
    env: { ...process.env, HOME: home, USERPROFILE: home },
  });
  return { root, project, home, run };
}
function ok(r) { assert.equal(r.status, 0, r.stderr || r.stdout); }
const projectArgs = p => ['--scope', 'project', '--project', p];

test('help and list never write', t => {
  const f=fixture(t);
  const h=f.run('--help'); ok(h); assert.match(h.stdout,/--dry-run/);
  const l=f.run('--list'); ok(l); assert.match(l.stdout,/setup-puen-stack/);
  assert.equal(fs.readdirSync(f.project).length,0);
});
test('user-global links both agents; repeat install is idempotent', t => {
  const f=fixture(t);
  ok(f.run('--dry-run'));
  assert.equal(fs.readdirSync(f.home).length,0);
  const install=f.run('--yes'); ok(install); assert.match(install.stdout,/Installed 6 dest/);
  for(const agent of ['.agents/skills','.claude/skills']) {
    for(const name of ['git-commit','gitlab-draft-mr','setup-puen-stack']){
      const d=path.join(f.home,agent,name);
      assert.equal(fs.lstatSync(d).isSymbolicLink(),true);
      assert.match(fs.readFileSync(path.join(d,'SKILL.md'),'utf8'),new RegExp('name: '+name));
    }
  }
  const repeat=f.run('--yes'); ok(repeat); assert.match(repeat.stdout,/Already installed/);
});
test('project mode copies only selected agent and is repeatable',t=>{
  const f=fixture(t),a=[...projectArgs(f.project),'--agent','codex','--mode','copy','--yes'];
  ok(f.run(...a));
  const d=path.join(f.project,'.agents/skills/git-commit');
  assert.equal(fs.lstatSync(d).isDirectory(),true);
  assert.equal(fs.existsSync(path.join(f.project,'.claude')),false);
  ok(f.run(...a));
});
test('conflicting old skill blocks entire install without overwriting',t=>{
  const f=fixture(t),d=path.join(f.project,'.claude/skills/git-commit');
  fs.mkdirSync(d,{recursive:true});
  fs.writeFileSync(path.join(d,'SKILL.md'),'custom user version\n');
  const r=f.run(...projectArgs(f.project),'--yes');
  assert.notEqual(r.status,0); assert.match(r.stderr,/CONFLICT/);
  assert.equal(fs.existsSync(path.join(f.project,'.agents')),false);
  assert.equal(fs.readFileSync(path.join(d,'SKILL.md'),'utf8'),'custom user version\n');
});
test('project preview and check never modify files',t=>{
  const f=fixture(t);
  for(const mode of ['--dry-run','--check']){
    ok(f.run(...projectArgs(f.project),mode));
    assert.equal(fs.readdirSync(f.project).length,0);
  }
});
test('specific skill, agent and project symlink are supported',t=>{
  const f=fixture(t);
  ok(f.run(...projectArgs(f.project),'--mode','link','--agent','claude','--skill','git-commit','--yes'));
  assert.equal(fs.lstatSync(path.join(f.project,'.claude/skills/git-commit')).isSymbolicLink(),true);
  assert.equal(fs.existsSync(path.join(f.project,'.agents')),false);
  assert.equal(fs.existsSync(path.join(f.project,'.claude/skills/setup-puen-stack')),false);
});
test('modified copied Skill is never overwritten',t=>{
  const f=fixture(t),a=[...projectArgs(f.project),'--mode','copy','--yes'];
  ok(f.run(...a));
  const p=path.join(f.project,'.agents/skills/git-commit/SKILL.md');
  fs.writeFileSync(p,'locally modified\n');
  const r=f.run(...a);
  assert.notEqual(r.status,0);
  assert.equal(fs.readFileSync(p,'utf8'),'locally modified\n');
});
test('invalid agent, unknown skill or omitted project refuse to install',t=>{
  const f=fixture(t);
  for(const a of [['--scope','project','--yes'],['--agent','everyone'],['--skill','missing'],['--unknown']]){
    assert.notEqual(f.run(...a).status,0,a.join(' '));
  }
  assert.equal(fs.readdirSync(f.project).length,0);
});
test('non-interactive installation requires explicit --yes',t=>{
  const f=fixture(t),r=f.run(...projectArgs(f.project));
  assert.notEqual(r.status,0);
  assert.match(r.stderr,/Interactive confirmation unavailable/);
  assert.equal(fs.readdirSync(f.project).length,0);
});
test('doctor never installs, even with --yes',t=>{
  const f=fixture(t),r=f.run('--doctor','--yes');
  ok(r); assert.match(r.stdout,/CLI diagnostics/);
  assert.equal(fs.readdirSync(f.home).length,0);
});


function wizardAnswers(responses) {
  const remaining = [...responses];
  return async prompt => {
    if (!remaining.length) throw Error('Missing synthetic wizard answer for: ' + prompt);
    return remaining.shift();
  };
}

test('no-argument wizard refuses non-TTY and leaves filesystem untouched', t => {
  const f=fixture(t);
  for(const args of [[], ['--wizard']]) {
    const r=f.run(...args);
    assert.notEqual(r.status,0);
    assert.match(r.stderr,/Interactive wizard requires a terminal/);
    assert.equal(fs.readdirSync(f.project).length,0);
    assert.equal(fs.readdirSync(f.home).length,0);
  }
});

test('wizard: default Global, both agents, all skills, link', async () => {
  const names=['git-commit','gitlab-draft-mr','setup-puen-stack'];
  const result=await wizardOptions(names,wizardAnswers(['','','','']));
  assert.equal(result.scope,'user');
  assert.equal(result.project,null);
  assert.equal(result.agent,'both');
  assert.equal(result.mode,'link');
  assert.deepEqual(result.skill,names);
});

test('wizard: project, specific existing path, Codex, selected skills, copy', async t => {
  const f=fixture(t);
  const result=await wizardOptions(['git-commit','gitlab-draft-mr','setup-puen-stack'],
    wizardAnswers(['2',f.project,'2','1,3','']));
  assert.equal(result.scope,'project');
  assert.equal(result.project,f.project);
  assert.equal(result.agent,'codex');
  assert.equal(result.mode,'copy');
  assert.deepEqual(result.skill,['git-commit','setup-puen-stack']);
});

test('wizard: Global copy is an explicit alternative, duplicates deduplicated', async () => {
  const result=await wizardOptions(['git-commit','gitlab-draft-mr'],
    wizardAnswers(['1','3','2,2','2']));
  assert.equal(result.scope,'user');
  assert.equal(result.agent,'claude');
  assert.equal(result.mode,'copy');
  assert.deepEqual(result.skill,['gitlab-draft-mr']);
});

test('wizard: invalid choices, empty project and missing paths require correction', async t => {
  const f=fixture(t);
  const result=await wizardOptions(['git-commit','gitlab-draft-mr'],
    wizardAnswers(['90','2','',path.join(f.root,'does-not-exist'),f.project,
      'bad','2','none','1,90','2','8','']));
  assert.equal(result.scope,'project');
  assert.equal(result.project,f.project);
  assert.equal(result.agent,'codex');
  assert.deepEqual(result.skill,['gitlab-draft-mr']);
  assert.equal(result.mode,'copy');
});

test('wizard: cancellation rejects before any installation', async () => {
  await assert.rejects(() => wizardOptions(['git-commit'],wizardAnswers(['q'])),/cancelled/);
});

test('wizard: explicit CLI still works, and --wizard cannot be mixed with --yes', t => {
  const f=fixture(t);
  ok(f.run('--agent','claude','--scope','project','--project',f.project,'--dry-run'));
  const bad=f.run('--wizard','--yes');
  assert.notEqual(bad.status,0);
  assert.equal(fs.readdirSync(f.project).length,0);
});
