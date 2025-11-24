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
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    window.location.href = "./index.html";
    return null;
  }
  const { data: profile, error: pError } = await supabase
    .from("profiles")
    .select("email, is_admin")
    .eq("id", data.user.id)
    .single();
  if (pError || !profile?.is_admin) {
    window.location.href = "./index.html";
    return null;
  }
  adminEmailSpan.textContent = profile.email;
  return data.user;
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const plan = document.getElementById("plan-input").value.trim() || "pro";
  const days =
    parseInt(document.getElementById("days-input").value, 10) || 30;
  const count =
    Math.max(
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
  const { data, error } = await supabase.from("cd_keys").insert(codes).select();
  if (error) {
    console.error(error);
    codesOutput.textContent = "\u751f\u6210\u5931\u8d25\uff1a" + error.message;
    return;
  }
  codesOutput.textContent =
    "\u5df2\u751f\u6210\u5151\u6362\u7801\uff08\u8bf7\u5907\u4efd\u6536\u85cf\uff09:\n" +
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

const user = await ensureAdmin();
if (user) {
  await loadRecentKeys();
}
