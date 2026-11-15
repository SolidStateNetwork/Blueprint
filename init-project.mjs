#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execSync } from 'node:child_process';

const skipTools = process.argv.includes('--skip-tools');
const isUpdate = process.argv.includes('--update');
const isWindows = os.platform() === 'win32';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';
const projectName = path.basename(process.cwd());

console.log(`🚀 ${isUpdate ? 'Updating' : 'Initializing'} AI Project Blueprint (${projectName}) on ${os.platform()} (${os.arch()})...`);

const archFile = path.join(process.cwd(), '.ai', '01-architecture.md');
if (!isUpdate && projectName !== 'agentic-project-template' && fs.existsSync(archFile)) {
  const archContent = fs.readFileSync(archFile, 'utf8');
  if (archContent.includes('`[PROJECT_NAME]`')) {
    fs.writeFileSync(archFile, archContent.replace('`[PROJECT_NAME]`', `\`${projectName}\``), 'utf8');
    console.log(`✅ Set project name to "${projectName}" in .ai/01-architecture.md`);
  }
}

const envExample = `# Local environment secrets (never commit .env)
# Configure the provider(s) you use with Task Master / Agents:
OPENAI_API_KEY=
GOOGLE_API_KEY=
ANTHROPIC_API_KEY=
PERPLEXITY_API_KEY=
`;

if (!fs.existsSync('.env.example')) {
  fs.writeFileSync('.env.example', envExample, 'utf8');
  console.log('✅ Created .env.example');
}

if (!fs.existsSync('.env')) {
  fs.writeFileSync('.env', envExample, 'utf8');
  console.log('✅ Created local .env file');
} else {
  console.log('ℹ️  .env already exists (skipped)');
}

const gitHooksDir = path.join(process.cwd(), '.git', 'hooks');
if (fs.existsSync(gitHooksDir)) {
  const preCommitPath = path.join(gitHooksDir, 'pre-commit');
  const hookScript = '#!/bin/sh\nnode verify-governance.mjs\n';
  fs.writeFileSync(preCommitPath, hookScript, { encoding: 'utf8', mode: 0o755 });
  try {
    fs.chmodSync(preCommitPath, 0o755);
  } catch {
    // chmod is a no-op on Windows NTFS
  }
  console.log('✅ Activated Git pre-commit hook (.git/hooks/pre-commit -> node verify-governance.mjs)');
}

if (!skipTools) {
  console.log('\n📦 Installing/updating local AI workflow tools (use --skip-tools to bypass, --update to refresh)...');

  try {
    console.log('⏳ [1/5] Installing latest BMAD-METHOD skills locally...');
    execSync(`${npxCmd} -y skills add bmad-code-org/BMAD-METHOD --skill "*" --copy -y`, {
      stdio: 'inherit'
    });
    console.log('✅ BMAD-METHOD skills installed.');
  } catch (err) {
    console.warn('⚠️  BMAD-METHOD auto-install skipped/failed. Run manually: npx skills add bmad-code-org/BMAD-METHOD --skill "*" --copy -y');
  }

  try {
    console.log('\n⏳ [2/5] Installing Anti-Slop skills & setting default mode ("during")...');
    execSync(`${npxCmd} -y skills add miqdadbadjuber/anti-slop --skill "*" --copy -y`, {
      stdio: 'inherit'
    });
    if (isUpdate) {
      execSync(`${npxCmd} -y antislop-ai --update`, { stdio: 'inherit' });
    }
    execSync(`${npxCmd} -y antislop-ai --mode during`, {
      stdio: 'inherit'
    });
    console.log('✅ Anti-Slop skills installed and configured to "during" mode.');
  } catch (err) {
    console.warn('⚠️  Anti-Slop auto-install skipped/failed. Run manually: npx skills add miqdadbadjuber/anti-slop --skill "*" --copy -y && npx antislop-ai --mode during');
  }

  try {
    console.log('\n⏳ [3/5] Installing universal Superpowers engineering skills (debugging, TDD, verification)...');
    execSync(
      `${npxCmd} -y skills add obra/superpowers --skill systematic-debugging --skill verification-before-completion --skill test-driven-development --copy -y`,
      { stdio: 'inherit' }
    );
    console.log('✅ Superpowers engineering skills installed.');
  } catch (err) {
    console.warn('⚠️  Superpowers auto-install skipped/failed. Run manually: npx skills add obra/superpowers --skill systematic-debugging --skill verification-before-completion --skill test-driven-development --copy -y');
  }

  try {
    console.log('\n⏳ [4/5] Installing Beautify-GitHub-README skill (auto-triggered on README.md edits)...');
    execSync(
      `${npxCmd} -y skills add oil-oil/beautify-github-readme --skill beautify-github-readme --copy -y`,
      { stdio: 'inherit' }
    );
    console.log('✅ Beautify-GitHub-README skill installed.');
  } catch (err) {
    console.warn('⚠️  Beautify-GitHub-README auto-install skipped/failed. Run manually: npx skills add oil-oil/beautify-github-readme --skill beautify-github-readme --copy -y');
  }

  if (!isUpdate) {
    try {
      console.log('\n⏳ [5/5] Initializing Claude Task Master locally...');
      execSync(`${npxCmd} -y task-master-ai init -y`, {
        stdio: 'inherit'
      });
      console.log('✅ Claude Task Master initialized.');
    } catch (err) {
      console.warn('⚠️  Task Master auto-init skipped/failed. Run manually: npx -y task-master-ai init');
    }
  }
} else {
  console.log('\n⏭️  Skipped external tools installation (--skip-tools).');
}

console.log(`
✨ Blueprint ready! Multi-Agent entrypoints active:
   • OpenCode                 -> opencode.json + AGENTS.md + .ai/*.md
   • Gemini CLI / Antigravity -> GEMINI.md (@AGENTS.md)
   • ChatGPT / OpenAI Codex   -> AGENTS.md
   • Claude Code              -> CLAUDE.md
   • Cursor                   -> .cursor/rules/core-governance.mdc & antislop.mdc
   • GitHub Copilot          -> .github/copilot-instructions.md
   • Anti-Slop Filter         -> .agents/skills/antislop* (mode: "during")
   • Superpowers Discipline   -> systematic-debugging, TDD & verification-before-completion
   • README Auto-Skill        -> .agents/skills/beautify-github-readme (auto-loaded on README edits)
   • MCP Servers              -> .mcp.json & opencode.json (Context7 & Task Master)

Next Steps:
   1. Add your API key(s) in .env (if needed for Task Master; Context7 works without keys).
   2. Open .ai/01-architecture.md (or run BMAD /architect) to define your stack & boundaries.
   3. Run "node verify-governance.mjs" anytime to verify repository & blackbox integrity.
`);
