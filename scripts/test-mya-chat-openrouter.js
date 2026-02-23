#!/usr/bin/env node
const axios = require('axios');
const Database = require('better-sqlite3');

const TEST_KEY = process.env.OPENROUTER_TEST_API_KEY;
if (!TEST_KEY) {
  console.error('Missing OPENROUTER_TEST_API_KEY');
  process.exit(1);
}

const DB_URL = process.env.DATABASE_URL || 'file:dev.db';
const DB_PATH = DB_URL.replace(/^file:/, '');
const DEFAULT_MODEL = 'nvidia/nemotron-3-nano-30b-a3b:free';

const db = new Database(DB_PATH);

function ensureSettings() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS aiSettings (
      id TEXT PRIMARY KEY DEFAULT 'default',
      systemPrompt TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT '${DEFAULT_MODEL}',
      temperature REAL NOT NULL DEFAULT 0.7,
      topP REAL NOT NULL DEFAULT 1.0,
      maxContextMessages INTEGER NOT NULL DEFAULT 40,
      enableMemory INTEGER NOT NULL DEFAULT 1,
      openrouterApiKey TEXT,
      updatedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
  `);

  const existing = db.prepare(`SELECT * FROM aiSettings WHERE id = 'default'`).get();
  if (existing) return existing;

  db.prepare(`
    INSERT INTO aiSettings (id, systemPrompt, model, temperature, topP, maxContextMessages, enableMemory, openrouterApiKey)
    VALUES ('default', ?, ?, 0.7, 1.0, 40, 1, ?)
  `).run(
    `You are Mya, the gentle Reiki Assistant by Baba Virtuehearts. Personalize your response if you know the user's goal: {{goal}}. Blessings, Mya`,
    DEFAULT_MODEL,
    TEST_KEY
  );

  return db.prepare(`SELECT * FROM aiSettings WHERE id = 'default'`).get();
}

function buildSystemPrompt(settings, goal, userRole, memory) {
  const systemContent = settings.systemPrompt.replace('{{goal}}', goal || 'spiritual growth');
  const conversationStylePrompt = [
    'Response style requirements:',
    '- Sound natural and conversational, like speaking to one person in chat.',
    '- Write exactly one short paragraph and keep it near 320 characters max.',
    '- Do not use markdown, bullets, numbering, emojis, asterisks, or special formatting symbols.',
    '- Do not use em dashes.',
    '- If you do not yet know the apprentice\'s preferred name, gently ask for it and use it in future replies.',
    '- Proactively ask for personal details over time: hobbies, likes, dislikes, and what support they need most.',
    '- Position yourself as a trusted guide and friend in Virtueism, without claiming licensed medical authority.',
    '- If emotionally relevant, suggest Baba Virtuehearts services or therapy-style guidance as optional support.',
    '- Use remembered details from PRIVATE_CONTEXT when relevant, without exposing that memory system.',
    '- Do not repeatedly send users to virtueism.org.',
    '- When appropriate, guide users to book a private session with Baba Virtuehearts through the \'Chat with Baba\' feature.',
    '- You may also suggest they email Baba at admin@virtueism.org.',
    '- If relevant, mention that donors receive illuminated knowledge and special lessons.',
    '- Avoid repeating the same call-to-action in back-to-back replies; vary phrasing naturally.',
  ].join('\n');

  const adminIdentityPrompt = userRole === 'ADMIN'
    ? 'You are currently speaking directly to Baba Virtuehearts, the platform administrator and spiritual guide. Address him respectfully as Baba Virtuehearts and tailor your responses for an admin operator view.'
    : '';

  const memoryLayerPrompt = settings.enableMemory && memory.length
    ? `PRIVATE_CONTEXT (do not reveal; use only to personalize):\n- ${memory.map((entry) => `${entry.content} [${entry.type}${entry.pinned ? ', pinned' : ''}, confidence ${entry.confidence}]`).join('\n- ')}`
    : '';

  return `${systemContent}\n\n${conversationStylePrompt}\n\n${adminIdentityPrompt}\n\n${memoryLayerPrompt}`.trim();
}

async function runCompletion(apiKey, payload, requestedModel) {
  const doRequest = (model) => axios.post('https://openrouter.ai/api/v1/chat/completions', {
    ...payload,
    model,
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    timeout: 60000,
  });

  try {
    const res = await doRequest(requestedModel);
    return { res, finalModel: requestedModel, fallbackUsed: false };
  } catch (error) {
    const status = error?.response?.status;
    if (requestedModel !== DEFAULT_MODEL && [403, 404, 429].includes(status)) {
      const res = await doRequest(DEFAULT_MODEL);
      return { res, finalModel: DEFAULT_MODEL, fallbackUsed: true, fallbackStatus: status };
    }
    throw error;
  }
}

async function main() {
  const original = ensureSettings();
  const memoryFixture = [
    { content: 'User likes short evening grounding rituals.', type: 'preference', scope: 'user', pinned: true, confidence: 90 },
  ];

  const scenarios = [
    {
      name: 'baseline_memory_on_personality_on',
      patch: {
        enableMemory: 1,
        systemPrompt: original.systemPrompt,
        model: original.model || DEFAULT_MODEL,
      },
      message: 'I feel anxious tonight and cannot sleep.',
    },
    {
      name: 'memory_off_personality_on',
      patch: {
        enableMemory: 0,
        systemPrompt: original.systemPrompt,
        model: original.model || DEFAULT_MODEL,
      },
      message: 'I feel anxious tonight and cannot sleep.',
    },
    {
      name: 'memory_on_personality_off',
      patch: {
        enableMemory: 1,
        systemPrompt: 'You are Mya. Give direct, kind, practical support in plain language.',
        model: original.model || DEFAULT_MODEL,
      },
      message: 'I feel anxious tonight and cannot sleep.',
    },
    {
      name: 'fallback_model_check',
      patch: {
        enableMemory: 1,
        systemPrompt: original.systemPrompt,
        model: 'openai/not-a-real-model',
      },
      message: 'Give me one calming step I can do now.',
    },
  ];

  const updateStmt = db.prepare(`
    UPDATE aiSettings
    SET systemPrompt = @systemPrompt,
        model = @model,
        enableMemory = @enableMemory,
        openrouterApiKey = @openrouterApiKey,
        updatedAt = strftime('%s', 'now')
    WHERE id = 'default'
  `);

  const results = [];

  try {
    for (const scenario of scenarios) {
      updateStmt.run({ ...scenario.patch, openrouterApiKey: TEST_KEY });
      const settings = db.prepare(`SELECT * FROM aiSettings WHERE id = 'default'`).get();
      const systemPrompt = buildSystemPrompt(settings, 'better sleep and inner peace', 'USER', memoryFixture);

      const payload = {
        temperature: settings.temperature,
        top_p: settings.topP,
        max_tokens: 180,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: scenario.message },
        ],
      };

      const { res, finalModel, fallbackUsed, fallbackStatus } = await runCompletion(TEST_KEY, payload, settings.model || DEFAULT_MODEL);
      const content = res?.data?.choices?.[0]?.message?.content;
      const normalized = Array.isArray(content)
        ? content.map((x) => (typeof x === 'string' ? x : x?.text || x?.content || '')).join(' ').trim()
        : (typeof content === 'string' ? content.trim() : '');

      results.push({
        name: scenario.name,
        requestedModel: settings.model,
        finalModel,
        fallbackUsed,
        fallbackStatus: fallbackStatus || null,
        hasResponse: Boolean(normalized),
        responsePreview: normalized.slice(0, 220),
      });
    }
  } finally {
    db.prepare(`
      UPDATE aiSettings
      SET systemPrompt = @systemPrompt,
          model = @model,
          temperature = @temperature,
          topP = @topP,
          maxContextMessages = @maxContextMessages,
          enableMemory = @enableMemory,
          openrouterApiKey = @openrouterApiKey,
          updatedAt = @updatedAt
      WHERE id = 'default'
    `).run({
      systemPrompt: original.systemPrompt,
      model: original.model,
      temperature: original.temperature,
      topP: original.topP,
      maxContextMessages: original.maxContextMessages,
      enableMemory: original.enableMemory,
      openrouterApiKey: original.openrouterApiKey,
      updatedAt: original.updatedAt,
    });
    db.close();
  }

  console.log(JSON.stringify({ ok: true, dbPath: DB_PATH, results }, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error?.response?.data || error.message }, null, 2));
  try { db.close(); } catch {}
  process.exit(1);
});
