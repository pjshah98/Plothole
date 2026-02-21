import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'users.json');

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
}

function read() {
  ensureDir();
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (_) {
    return { users: [] };
  }
}

function write(data) {
  ensureDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export function findUserByUsername(username) {
  const normalized = String(username).trim().toLowerCase();
  const { users } = read();
  return users.find((u) => u.usernameLower === normalized);
}

export function findUserById(id) {
  const { users } = read();
  return users.find((u) => u.id === id);
}

export function createUser({ id, username, passwordHash }) {
  const data = read();
  const usernameLower = String(username).trim().toLowerCase();
  data.users.push({
    id,
    username: String(username).trim(),
    usernameLower,
    passwordHash,
    createdAt: new Date().toISOString(),
  });
  write(data);
  return { id, username: data.users[data.users.length - 1].username };
}
