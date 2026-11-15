#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import { execSync } from 'node:child_process';

const skipTools = process.argv.includes('--skip-tools');
const isWindows = os.platform() === 'win32';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

console.log(`🚀 Initializing AI Project Blueprint on ${os.platform()} (${os.arch()})...`);

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

if (!skipTools) {
  console.log('\n📦 Installing local AI workflow tools (use --skip-tools to bypass)...');

  try {
    console.log('⏳ [1/3] Installing latest BMAD-METHOD skills locally...');
    execSync(`${npxCmd} -y skills add bmad-code-org/BMAD-METHOD --skill "*" -y`, {
      stdio: 'inherit'
    });
    console.log('✅ BMAD-METHOD skills installed.');
  } catch (err) {
    console.warn('⚠️  BMAD-METHOD auto-install skipped/failed. Run manually: npx skills add bmad-code-org/BMAD-METHOD --skill "*"');
  }

  try {
    console.log('\n⏳ [2/3] Installing Anti-Slop skills & setting default mode ("during")...');
    execSync(`${npxCmd} -y skills add miqdadbadjuber/anti-slop --skill "*" -y`, {
      stdio: 'inherit'
    });
    execSync(`${npxCmd} -y antislop-ai --mode during`, {
      stdio: 'inherit'
    });
    console.log('✅ Anti-Slop skills installed and configured to "during" mode.');
  } catch (err) {
    console.warn('⚠️  Anti-Slop auto-install skipped/failed. Run manually: npx skills add miqdadbadjuber/anti-slop --skill "*" && npx antislop-ai --mode during');
  }

  try {
    console.log('\n⏳ [3/3] Initializing Claude Task Master locally...');
    execSync(`${npxCmd} -y task-master-ai init -y`, {
      stdio: 'inherit'
    });
    console.log('✅ Claude Task Master initialized.');
  } catch (err) {
    console.warn('⚠️  Task Master auto-init skipped/failed. Run manually: npx -y task-master-ai init');
  }
} else {
  console.log('\n⏭️  Skipped external tools installation (--skip-tools).');
}

console.log(`
✨ Blueprint ready! Multi-Agent entrypoints active:
   • ChatGPT / OpenAI Codex   -> AGENTS.md
   • Gemini CLI / Antigravity -> GEMINI.md (@AGENTS.md)
   • Claude Code              -> CLAUDE.md
   • Cursor                   -> .cursor/rules/core-governance.mdc & antislop.mdc
   • GitHub Copilot          -> .github/copilot-instructions.md
   • Anti-Slop Filter         -> .agents/skills/antislop* (mode: "during")

Next Steps:
   1. Add your API key(s) in .env (if needed for Task Master).
   2. Open .ai/01-architecture.md (or run BMAD /architect) to define your stack & boundaries.
   3. Optional for UI projects: create DESIGN.md to pair visual direction with the Anti-Slop filter.
`);
