const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function seed() {
  const dbPath = path.join(process.cwd(), 'dev.db');
  const db = new Database(dbPath);

  const email = '7day@virtueism.org';
  const password = 'SevenDays1234#';
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserId = crypto.randomUUID();

  try {
    // Insert user
    db.prepare(`
      INSERT INTO user (id, name, email, password, role, status, isReikiMaster, isReikiLevel1, isReikiLevel2, isAllureReiki)
      VALUES (?, ?, ?, ?, 'USER', 'APPROVED', 0, 0, 0, 0)
      ON CONFLICT(email) DO UPDATE SET
      password = excluded.password,
      status = 'APPROVED'
    `).run(newUserId, 'William Holt', email, hashedPassword);

    // Get user ID (in case of update)
    const user = db.prepare('SELECT id FROM user WHERE email = ?').get(email);

    // Insert intake
    db.prepare(`
      INSERT INTO intake (id, userId, firstName, lastName, phone, email, age, location, gender, experience, goal, whyJoined)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(userId) DO UPDATE SET
      firstName = excluded.firstName,
      lastName = excluded.lastName,
      phone = excluded.phone,
      email = excluded.email
    `).run(
      crypto.randomUUID(),
      user.id,
      'William',
      'Holt',
      '123-456-7890',
      email,
      35,
      'New York',
      'Male',
      'Beginner',
      'Finding peace and balance',
      'Interested in Reiki transformation'
    );

    // Complete 7 days
    const now = Math.floor(Date.now() / 1000);
    for (let day = 1; day <= 7; day++) {
      db.prepare(`
        INSERT INTO progress (id, userId, day, completed, completedAt)
        VALUES (?, ?, ?, 1, ?)
        ON CONFLICT(userId, day) DO UPDATE SET
        completed = 1,
        completedAt = excluded.completedAt
      `).run(
        crypto.randomUUID(),
        user.id,
        day,
        now - (7 - day) * 86400
      );
    }

    console.log(`Successfully seeded user ${email} with completed 7-day program.`);
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    db.close();
  }
}

seed();
