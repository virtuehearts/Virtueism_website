const Database = require('better-sqlite3');
const path = require('path');
const { execSync } = require('child_process');

function ensureSchema() {
  try {
    execSync('node scripts/setup-db.js', { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error('Failed to initialize database schema:', error.message);
    return false;
  }
}

function getTableInfo(db) {
  return db.prepare('PRAGMA table_info(aiSettings)').all();
}

function verifyDb() {
  console.log('--- Verifying Database Schema ---');
  const dbPath = path.join(process.cwd(), 'dev.db');

  let db = new Database(dbPath);

  try {
    let tableInfo = getTableInfo(db);

    if (tableInfo.length === 0) {
      console.warn('aiSettings table is missing. Running setup-db script...');
      db.close();

      if (!ensureSchema()) {
        process.exit(1);
      }

      db = new Database(dbPath);
      tableInfo = getTableInfo(db);
    }

    const columnNames = tableInfo.map((c) => c.name);
    console.log('Columns in aiSettings:', columnNames.join(', '));

    if (!columnNames.includes('openrouterApiKey')) {
      console.warn('openrouterApiKey column is missing. Applying compatibility migration...');
      db.prepare('ALTER TABLE aiSettings ADD COLUMN openrouterApiKey TEXT').run();
    }

    const updatedColumnNames = getTableInfo(db).map((c) => c.name);

    if (updatedColumnNames.includes('openrouterApiKey')) {
      console.log('SUCCESS: openrouterApiKey column exists.');
    } else {
      console.error('FAILURE: openrouterApiKey column is still missing after migration!');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error verifying database:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

verifyDb();
