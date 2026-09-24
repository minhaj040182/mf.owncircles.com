#!/usr/bin/env node

/**
 * Modern Fisheries - Safe Backup Utility
 * Creates snapshot archives and records Git checkpoints so previous work
 * can be instantly restored at any time if something goes wrong.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const backupsDir = path.join(rootDir, '.backups');

if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
const backupName = `backup_${timestamp}`;
const tarFile = path.join(backupsDir, `${backupName}.tar.gz`);
const latestTar = path.join(backupsDir, `latest-stable.tar.gz`);

console.log('====================================================');
console.log('📦  MODERN FISHERIES - SNAPSHOT BACKUP');
console.log('====================================================');
console.log(`⏱️  Timestamp: ${now.toISOString()}`);

// 1. Create Tarball Archive
try {
  const tarCmd = `tar --exclude="node_modules" --exclude="dist" --exclude=".backups" --exclude=".git" -czf "${tarFile}" -C "${rootDir}" .`;
  execSync(tarCmd, { stdio: 'inherit' });
  // Copy to latest-stable.tar.gz
  fs.copyFileSync(tarFile, latestTar);
  console.log(`✅ Snapshot archive created: .backups/${backupName}.tar.gz`);
  console.log(`✅ Updated latest pointer: .backups/latest-stable.tar.gz`);
} catch (err) {
  console.error('⚠️ Warning: Failed to create tarball archive:', err.message);
}

// 2. Git Checkpoint
let gitCommitted = false;
let gitCommitHash = null;
try {
  execSync('git add .', { cwd: rootDir, stdio: 'pipe' });
  const status = execSync('git status -s', { cwd: rootDir, encoding: 'utf-8' }).trim();
  if (status.length > 0) {
    const commitMsg = `checkpoint(${timestamp}): stable backup snapshot`;
    execSync(`git commit -m "${commitMsg}"`, { cwd: rootDir, stdio: 'pipe' });
    gitCommitHash = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' }).trim();
    const tagName = `backup-${timestamp}`;
    execSync(`git tag -f -a "${tagName}" -m "Snapshot backup at ${now.toISOString()}"`, { cwd: rootDir, stdio: 'pipe' });
    execSync(`git tag -f "latest-stable"`, { cwd: rootDir, stdio: 'pipe' });
    console.log(`✅ Git checkpoint created: ${gitCommitHash.slice(0, 7)} (tagged as 'latest-stable' & '${tagName}')`);
    gitCommitted = true;
  } else {
    gitCommitHash = execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf-8' }).trim();
    execSync(`git tag -f "latest-stable"`, { cwd: rootDir, stdio: 'pipe' });
    console.log(`✅ Git working tree clean at ${gitCommitHash.slice(0, 7)} (tagged as 'latest-stable')`);
  }
} catch (err) {
  console.error('⚠️ Note on Git commit:', err.message);
}

// 3. Record in backup-manifest.json
const manifestPath = path.join(backupsDir, 'backup-manifest.json');
let manifest = [];
if (fs.existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch (e) {
    manifest = [];
  }
}

manifest.unshift({
  timestamp: now.toISOString(),
  id: backupName,
  archive: `${backupName}.tar.gz`,
  gitCommit: gitCommitHash,
  sizeBytes: fs.existsSync(tarFile) ? fs.statSync(tarFile).size : null,
  note: process.argv[2] || 'Manual / automated checkpoint'
});

// Retain latest 15 snapshot files to preserve disk space
if (manifest.length > 15) {
  const toDelete = manifest.slice(15);
  toDelete.forEach((item) => {
    const p = path.join(backupsDir, item.archive);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (_) {}
    }
  });
  manifest = manifest.slice(0, 15);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log('----------------------------------------------------');
console.log('🎉  BACKUP COMPLETED SUCCESSFULLY!');
console.log('To restore anytime, simply run:');
console.log('   npm run restore');
console.log('====================================================\n');
