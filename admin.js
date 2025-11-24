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

// ===== 管理员邮箱白名单，只要在这个列表里就能进后台 =====
const ADMIN_EMAILS = ["zwz2876013167@gmail.com"];

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const array = new Uint32Array(20);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

// 只检查：是否登录 + 邮箱是否在管理员白名单里
async function ensureAdmin() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.warn("ensureAdmin: no user", error);
    window.location.href = "./index.html";
    return null;
  }

  const user = data.user;
  const email = (user.email || "").toLowerCase();
  const isAdmin = ADMIN_EMAILS.includes(email);

  if (!isAdmin) {
    console.warn("ensureAdmin: user is not in admin email list", email);
    window.location.href = "./index.html";
    return null;
  }

  adminEmailSpan.textContent = user.email ?? "";
  return user;
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ 再次确认当前是管理员
  const currentUser = await ensureAdmin();
  if (!currentUser) return;

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
      // 当前 RLS 只检查管理员权限，不需要 created_by 字段
      status: "unused", // 初始状态，和表里的逻辑保持一致
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
    "已生成兑换码（请复制保存）：\n" +
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

// 顶层 await：先验证管理员，再加载列表
const user = await ensureAdmin();
if (user) {
  await loadRecentKeys();
}
