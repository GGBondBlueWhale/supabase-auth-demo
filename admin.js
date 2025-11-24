import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nmlihgbkahzipxachnki.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const adminEmailSpan = document.getElementById("admin-email");
const logoutBtn = document.getElementById("admin-logout-btn");
const createForm = document.getElementById("create-cdkey-form");
const codesOutput = document.getElementById("created-codes");
const tableBody = document.querySelector("#cdkey-table tbody");

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const array = new Uint32Array(20);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

async function ensureAdmin() {
  // 1. 先拿当前登录用户
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.warn("ensureAdmin: no user", error);
    window.location.href = "./index.html";
    return null;
  }

  const user = data.user;

  // 2. 再去 profiles 里查是否是管理员
  const { data: profile, error: pError } = await supabase
    .from("profiles")
    .select("email, is_admin")
    .eq("id", user.id)
    .maybeSingle(); // 允许 0 行，不会 406

  if (pError) {
    console.error("ensureAdmin: load profile error", pError);
    window.location.href = "./index.html";
    return null;
  }

  if (!profile) {
    console.warn("ensureAdmin: no profile row for user", user.id);
    window.location.href = "./index.html";
    return null;
  }

  if (!profile.is_admin) {
    console.warn("ensureAdmin: user is not admin", user.id, profile);
    window.location.href = "./index.html";
    return null;
  }

  // 3. 是管理员，展示邮箱
  adminEmailSpan.textContent = profile.email ?? user.email ?? "";
  return user;
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const plan = document.getElementById("plan-input").value.trim() || "pro";
  const days =
    parseInt(document.getElementById("days-input").value, 10) || 30;
  const count = Math.max(
    1,
    Math.min(
      100,
      parseInt(document.getElementById("count-input").value, 10) || 1
    )
  );

  const codes = [];
  for (let i = 0; i < count; i++) {
    codes.push({
      code: generateCode(),
      plan,
      days,
    });
  }

  const { data, error } = await supabase
    .from("cd_keys")
    .insert(codes)
    .select();

  if (error) {
    console.error(error);
    codesOutput.textContent = "生成失败：" + error.message;
    return;
  }

  codesOutput.textContent =
    "已生成兑换码（请备份保存）:\n" +
    data.map((r) => r.code).join("\n");

  await loadRecentKeys();
});

async function loadRecentKeys() {
  const { data, error } = await supabase
    .from("cd_keys")
    .select("code, plan, days, status, used_at, used_by")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
    return;
  }

  tableBody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.code}</td>
      <td>${row.plan}</td>
      <td>${row.days}</td>
      <td>${row.status}</td>
      <td>${row.used_by ?? ""}</td>
      <td>${row.used_at ? new Date(row.used_at).toLocaleString() : ""}</td>
    `;
    tableBody.appendChild(tr);
  });
}

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "./index.html";
});

// 顶层 await：先检查管理员，再加载数据
const user = await ensureAdmin();
if (user) {
  await loadRecentKeys();
}
