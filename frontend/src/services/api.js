// ─── XYLO Demo — Mock API ────────────────────────────────────────────────────
// Replaces the real axios instance with a mock that returns local data.
// All GET requests return realistic hardcoded data.
// All write requests (POST/PUT/PATCH/DELETE) simulate success without
// persisting anything across sessions — this is intentional demo behavior.

import * as mock from "./mockData";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = () => delay(120 + Math.random() * 180);

// In-memory copies so in-session mutations feel real
let _products = [...mock.products];
let _sales    = [...mock.sales];
let _users    = [...mock.users];
let _rates    = [{ ...mock.exchangeRate }];

// ─── Route matcher ───────────────────────────────────────────────────────────
function match(url, pattern) {
  const re = new RegExp("^" + pattern.replace(":id", "(\\d+)") + "/?$");
  const m  = url.match(re);
  return m ? m[1] : null;
}

// ─── GET ─────────────────────────────────────────────────────────────────────
async function get(rawUrl) {
  await jitter();
  const [path, qs] = rawUrl.split("?");
  const params     = new URLSearchParams(qs || "");
  const status     = params.get("status");

  // Products
  if (path === "/products/" || path === "/products") {
    const list = status ? _products.filter((p) => p.status === status) : _products;
    return { data: list };
  }
  const productId = match(path, "/products/:id");
  if (productId) {
    return { data: _products.find((p) => p.id === Number(productId)) || null };
  }
  if (match(path, "/products/:id/history")) return { data: [] };

  // Sales
  if (path === "/sales/" || path === "/sales") return { data: _sales };
  const saleId = match(path, "/sales/:id");
  if (saleId) {
    return { data: _sales.find((s) => s.id === Number(saleId)) || null };
  }
  if (match(path, "/sales/:id/history")) return { data: [] };

  // Users
  if (path === "/users/" || path === "/users") return { data: _users };
  const userId = match(path, "/users/:id");
  if (userId) {
    return { data: _users.find((u) => u.id === Number(userId)) || null };
  }

  // Exchange rates
  if (path === "/exchange-rates/active") {
    return { data: _rates.find((r) => r.is_active) || _rates[0] };
  }
  if (path === "/exchange-rates/" || path === "/exchange-rates") {
    return { data: _rates };
  }

  // Dashboard
  if (path.startsWith("/dashboard/summary")) return { data: mock.dashboardSummary };
  if (path === "/dashboard/top-models")      return { data: mock.topModels };
  if (path === "/dashboard/payment-methods") return { data: mock.paymentMethods };
  if (path === "/dashboard/monthly-stats")   return { data: mock.monthlyStats };
  if (path === "/dashboard/recent-sales")    return { data: mock.recentSales };

  // Scan — find product by IMEI or ID
  const scanId = match(path, "/scan/:id");
  if (scanId) {
    return { data: _products.find((p) => p.imei === scanId || p.id === Number(scanId)) || null };
  }

  return { data: null };
}

// ─── POST ─────────────────────────────────────────────────────────────────────
async function post(url, data = {}) {
  await jitter();

  if (url === "/auth/login") {
    return {
      data: {
        access_token: "demo_token_xylobox",
        user_id: 1,
        user_name: "Demo Admin",
        user_role: "admin",
      },
    };
  }

  if (url === "/products/" || url === "/products") {
    // Return an existing product id so the redirect works
    return { data: { ...data, id: _products[0].id, status: "in_stock" } };
  }

  if (url === "/sales/" || url === "/sales") {
    return { data: { ...data, id: _sales[0].id, status: "completed" } };
  }

  if (url === "/exchange-rates/" || url === "/exchange-rates") {
    const r = { ...data, id: Date.now(), is_active: false };
    _rates.push(r);
    return { data: r };
  }

  if (url === "/users/" || url === "/users") {
    const u = { ...data, id: Date.now() };
    _users.push(u);
    return { data: u };
  }

  return { data: { id: Date.now(), ...data } };
}

// ─── PUT / PATCH ──────────────────────────────────────────────────────────────
async function put(url, data = {}) {
  await jitter();

  const productId = match(url, "/products/:id");
  if (productId) {
    const idx = _products.findIndex((p) => p.id === Number(productId));
    if (idx !== -1) _products[idx] = { ..._products[idx], ...data };
    return { data: _products[idx] || data };
  }

  const saleId = match(url, "/sales/:id");
  if (saleId) {
    const idx = _sales.findIndex((s) => s.id === Number(saleId));
    if (idx !== -1) _sales[idx] = { ..._sales[idx], ...data };
    return { data: _sales[idx] || data };
  }

  const rateId = match(url, "/exchange-rates/:id");
  if (rateId) {
    const idx = _rates.findIndex((r) => r.id === Number(rateId));
    if (idx !== -1) _rates[idx] = { ..._rates[idx], ...data };
    return { data: _rates[idx] || data };
  }

  return { data: { ...data, updated: true } };
}

const patch = put;

// ─── DELETE ───────────────────────────────────────────────────────────────────
async function del(url) {
  await jitter();
  const productId = match(url, "/products/:id");
  if (productId) _products = _products.filter((p) => p.id !== Number(productId));
  const saleId = match(url, "/sales/:id");
  if (saleId) _sales = _sales.filter((s) => s.id !== Number(saleId));
  return { data: { deleted: true } };
}

// ─── Mock api object — mirrors axios interface ────────────────────────────────
const api = {
  defaults: { headers: { common: {} } },
  interceptors: {
    request:  { use: () => {} },
    response: { use: () => {} },
  },
  get,
  post,
  put,
  patch,
  delete: del,
};

export default api;
