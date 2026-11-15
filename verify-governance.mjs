#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const REQUIRED_FILES = [
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md',
  '.github/copilot-instructions.md',
  '.cursor/rules/core-governance.mdc',
  '.cursor/rules/antislop.mdc',
  '.ai/01-architecture.md',
  '.ai/02-blackbox-rules.md',
  '.ai/03-roadmap.md',
  '.ai/04-decisions.md',
  '.ai/05-patterns.md'
];

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.venv',
  '__pycache__',
  '_bmad-output',
  '.taskmaster',
  'anti-slop',
  '.agents',
  '.claude',
  '.cursor',
  '.gemini'
]);

const CODE_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx',
  '.py', '.go', '.rs', '.java', '.cs', '.cpp', '.c', '.h',
  '.rb', '.php', '.swift', '.kt'
]);

const SECRET_PATTERNS = [
  { name: 'Private Key Block', regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { name: 'OpenAI API Key', regex: /\bsk-(?:proj-)?[A-Za-z0-9]{32,}\b/ },
  { name: 'GitHub PAT', regex: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
  { name: 'Google API Key', regex: /\bAIza[0-9A-Za-z\-_]{35}\b/ },
  { name: 'Anthropic API Key', regex: /\bsk-ant-[A-Za-z0-9\-_]{32,}\b/ }
];

const FORBIDDEN_STUB_REGEX = /\/\/\s*TODO:\s*implement later|#\s*TODO:\s*implement later/i;
const MERGE_CONFLICT_REGEX = /^(?:<<<<<<<|=======|>>>>>>>)\s/m;
const MAX_RECOMMENDED_LINES = 300;

let errors = 0;
let warnings = 0;

console.log('🔍 Running AI Governance & Integrity Checks...\n');

for (const relPath of REQUIRED_FILES) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing mandatory governance file: ${relPath}`);
    errors++;
  } else if (relPath.startsWith('.ai/')) {
    const lines = fs.readFileSync(fullPath, 'utf8').split(/\r?\n/).length;
    if (lines > 200) {
      console.warn(`⚠️  Memory bank file "${relPath}" has ${lines} lines (>200). Consider moving old entries to .ai/archive/ for token hygiene.`);
      warnings++;
    }
  }
}

try {
  const trackedFiles = execSync('git ls-files', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
    .split(/\r?\n/)
    .filter(Boolean);

  for (const file of trackedFiles) {
    const base = path.basename(file);
    if ((base === '.env' || base.startsWith('.env.')) && base !== '.env.example') {
      console.error(`❌ Secret leak risk: Environment file "${file}" is tracked by Git!`);
      errors++;
    }
  }
} catch {
  // Git might not be initialized in all environments; skip git-specific check gracefully
}

function walkDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(process.cwd(), fullPath).split(path.sep).join('/');

    if (entry.isDirectory()) {
      walkDirectory(fullPath);
      continue;
    }

    if (relPath === 'verify-governance.mjs' || relPath === '.env' || relPath === '.env.example') {
      continue;
    }

    let content;
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch {
      continue;
    }

    for (const pattern of SECRET_PATTERNS) {
      if (pattern.regex.test(content)) {
        console.error(`❌ Potential hardcoded secret (${pattern.name}) in: ${relPath}`);
        errors++;
      }
    }

    if (MERGE_CONFLICT_REGEX.test(content)) {
      console.error(`❌ Unresolved Git merge conflict marker in: ${relPath}`);
      errors++;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (CODE_EXTENSIONS.has(ext)) {
      if (FORBIDDEN_STUB_REGEX.test(content)) {
        console.error(`❌ Forbidden production stub ("TODO: implement later") in: ${relPath}`);
        errors++;
      }

      const lineCount = content.split(/\r?\n/).length;
      if (lineCount > MAX_RECOMMENDED_LINES) {
        console.warn(`⚠️  File exceeds ${MAX_RECOMMENDED_LINES} lines (${lineCount} lines): ${relPath} (see .ai/05-patterns.md)`);
        warnings++;
      }
    }
  }
}

walkDirectory(process.cwd());

if (errors > 0) {
  console.error(`\n💥 Governance check failed with ${errors} error(s) and ${warnings} warning(s).`);
  process.exit(1);
}

console.log(`✅ All governance checks passed (${warnings} warning(s)).`);
