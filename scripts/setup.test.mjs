import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

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
