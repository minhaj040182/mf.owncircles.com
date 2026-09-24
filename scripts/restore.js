#!/usr/bin/env node

/**
 * Modern Fisheries - Safe Restore Utility
 * Restores project files from Git checkpoints or archive snapshots if anything
 * breaks, fails compilation, or needs to be rolled back.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const backupsDir = path.join(rootDir, '.backups');

const args = process.argv.slice(2);
const command = args[0] || 'latest';

console.log('====================================================');
console.log('🔄  MODERN FISHERIES - RESTORE UTILITY');
console.log('====================================================');

// Handler: List Available Backups
if (command === 'list' || command === '--list' || command === '-l') {
  const manifestPath = path.join(backupsDir, 'backup-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.log('No backups found in .backups/');
    process.exit(0);
  }
  const list = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  console.log(`Found ${list.length} available backup snapshots:\n`);
  list.forEach((item, index) => {
    const sizeMb = item.sizeBytes ? (item.sizeBytes / 1024 / 1024).toFixed(2) + ' MB' : 'N/A';
    console.log(` [${index + 1}] ID: ${item.id}`);
    console.log(`     Date:    ${item.timestamp}`);
    console.log(`     Commit:  ${item.gitCommit ? item.gitCommit.slice(0, 7) : 'N/A'}`);
    console.log(`     Size:    ${sizeMb}`);
    console.log(`     Note:    ${item.note}`);
    console.log('');
  });
  console.log('To restore a specific backup, run:');
  console.log('   node scripts/restore.js <ID>');
  console.log('   e.g. node scripts/restore.js backup_20260923_120000');
  process.exit(0);
}

// Handler: Restore via Git
if (command === 'git' || command === '--git') {
  console.log('Restoring working directory from Git tag: latest-stable ...');
  try {
    execSync('git reset --hard latest-stable', { cwd: rootDir, stdio: 'inherit' });
    execSync('git clean -fd', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Successfully restored all files from Git checkpoint!');
    rebuildAndValidate();
  } catch (err) {
    console.error('❌ Git restore failed:', err.message);
    process.exit(1);
  }
  process.exit(0);
}

// Handler: Restore from Tarball Snapshot (default or specific ID)
let targetTar = null;
if (command === 'latest' || !command) {
  targetTar = path.join(backupsDir, 'latest-stable.tar.gz');
} else {
  // Check if user passed full filename or ID
  const directPath = path.join(backupsDir, command.endsWith('.tar.gz') ? command : `${command}.tar.gz`);
  if (fs.existsSync(directPath)) {
    targetTar = directPath;
  } else {
    console.error(`❌ Backup not found: ${command}`);
    console.log('Run `npm run restore:list` to view available backup snapshots.');
    process.exit(1);
  }
}

if (!fs.existsSync(targetTar)) {
  // Fallback to git if tar does not exist yet
  console.log(`Archive ${targetTar} not found. Attempting Git fallback...`);
  try {
    execSync('git reset --hard HEAD && git clean -fd', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Restored from Git HEAD!');
    rebuildAndValidate();
    process.exit(0);
  } catch (e) {
    console.error('❌ No backup archive or git commit available to restore from.');
    process.exit(1);
  }
}

console.log(`📦 Extracting archive snapshot: ${path.basename(targetTar)} ...`);
try {
  execSync(`tar -xzf "${targetTar}" -C "${rootDir}"`, { stdio: 'inherit' });
  console.log('✅ Archive files extracted cleanly over workspace!');
} catch (err) {
  console.error('❌ Error extracting backup archive:', err.message);
  process.exit(1);
}

// Automatically rebuild and test
rebuildAndValidate();

function rebuildAndValidate() {
  console.log('\n----------------------------------------------------');
  console.log('🔨 Re-compiling and validating restored build...');
  try {
    execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
    console.log('----------------------------------------------------');
    console.log('🎉 RESTORE COMPLETE: Project is 100% restored and compiling cleanly!');
    console.log('====================================================\n');
  } catch (err) {
    console.error('⚠️ Build validation had an issue:', err.message);
  }
}
