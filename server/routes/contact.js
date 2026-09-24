import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messagesFile = path.resolve(__dirname, '../data/messages.json');

// Simple in-memory rate limiter: max 5 requests per 5 minutes per IP
const rateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimits.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimits.set(ip, entry);
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  rateLimits.set(ip, entry);
  return true;
}

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimits.entries()) {
    if (now > entry.resetAt) {
      rateLimits.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

// Helper to safely read messages
function readMessages() {
  try {
    if (!fs.existsSync(messagesFile)) {
      fs.writeFileSync(messagesFile, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(messagesFile, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading messages file:', err);
    return [];
  }
}

// Helper to safely save messages
function saveMessages(messages) {
  try {
    const dir = path.dirname(messagesFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing messages file:', err);
    return false;
  }
}

// POST /api/contact - Handle contact form submission
router.post('/', (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many messages sent. Please wait a few minutes before trying again.',
    });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid name.',
    });
  }

  if (
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a message with at least 5 characters.',
    });
  }

  // Sanitize simple text
  const cleanName = name.trim().substring(0, 100);
  const cleanEmail = email.trim().substring(0, 150);
  const cleanSubject = (subject || 'General Inquiry').trim().substring(0, 150);
  const cleanMessage = message.trim().substring(0, 2000);

  const newMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
    receivedAt: new Date().toISOString(),
    ip: clientIp,
  };

  const messages = readMessages();
  messages.push(newMessage);
  const saved = saveMessages(messages);

  if (!saved) {
    return res.status(500).json({
      success: false,
      error: 'Failed to save your message. Please reach out directly to vanmolekaranyadav@gmail.com.',
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thank you for reaching out! Your message has been received.",
    id: newMessage.id,
  });
});

// GET /api/contact/messages - View messages (for administrative / inspection purposes)
router.get('/messages', (req, res) => {
  const messages = readMessages();
  // Return message summaries
  return res.status(200).json({
    success: true,
    count: messages.length,
    messages: messages.map(m => ({
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      receivedAt: m.receivedAt,
    })),
  });
});

export default router;
