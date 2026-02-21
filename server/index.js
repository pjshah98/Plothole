import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername, findUserById, createUser } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'plothole-dev-secret-change-in-production';

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use(express.json());

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const trimmed = String(username ?? '').trim();
    if (trimmed.length < 2) {
      return res.status(400).json({ error: 'Username must be at least 2 characters.' });
    }
    if (!password || String(password).length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters.' });
    }
    if (findUserByUsername(trimmed)) {
      return res.status(409).json({ error: 'Username already taken.' });
    }
    const passwordHash = await bcrypt.hash(String(password), 10);
    const id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const user = createUser({ id, username: trimmed, passwordHash });
    const token = generateToken(user);
    return res.status(201).json({ user: { id: user.id, username: user.username }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const trimmed = String(username ?? '').trim();
    if (!trimmed || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const user = findUserByUsername(trimmed);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const match = await bcrypt.compare(String(password), user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const token = generateToken({ id: user.id, username: user.username });
    return res.json({ user: { id: user.id, username: user.username }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) return res.status(401).json({ error: 'User not found' });
  return res.json({ user: { id: user.id, username: user.username } });
});

app.listen(PORT, () => {
  console.log(`Plothole API running at http://localhost:${PORT}`);
});
