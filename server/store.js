// Stockage très simple des commandes, dans un fichier JSON local.
// C'est suffisant pour démarrer / tester, mais pour une vraie mise en
// production remplace ceci par une base de données (Postgres, SQLite,
// MongoDB…) — surtout pour ne pas perdre les commandes au redéploiement.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = join(__dirname, "orders.json");

function readAll() {
  if (!existsSync(DB_FILE)) return {};
  try {
    return JSON.parse(readFileSync(DB_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeAll(data) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function saveOrder(order) {
  const all = readAll();
  all[order.id] = order;
  writeAll(all);
  return order;
}

export function getOrder(id) {
  const all = readAll();
  return all[id] ?? null;
}

export function updateOrderStatus(id, status, extra = {}) {
  const all = readAll();
  if (!all[id]) return null;
  all[id] = { ...all[id], status, ...extra, updatedAt: Date.now() };
  writeAll(all);
  return all[id];
}
