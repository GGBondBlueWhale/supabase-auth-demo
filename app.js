import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nmlihgbkahzipxachnki.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM
const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");
const logoutBtn = document.getElementById("logout-btn");
const userEmailSpan = document.getElementById("current-user-email");
const globalStatus = document.getElementById("global-status");

const subscriptionPlan = document.getElementById("subscription-plan");
const subscriptionExpire = document.getElementById("subscription-expire");
const subscriptionStatus = document.getElementById("subscription-status");

const profileEmail = document.getElementById("profile-email");
const profileId = document.getElementById("profile-id");

const redeemForm = document.getElementById("redeem-form");
const redeemInput = document.getElementById("redeem-code-input");
const redeemStatus = document.getElementById("redeem-status");

function setGlobalStatus(msg) {
  globalStatus.textContent = msg || "";
}

// 登录 / 注册表单监听
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setGlobalStatus("正在登录...");
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setGlobalStatus("\u767b\u9646\u5931\u8d25：" + error.message);
    return;
  }

  setGlobalStatus("\u767b\u9646\u6210\u529f。");
  await refreshSessionAndUI();
});

document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setGlobalStatus("\u6b63\u5728\u6ce8\u518c...");
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setGlobalStatus("\u6ce8\u518c\u5931\u8d25：" + error.message);
    return;
  }

  setGlobalStatus("\u6ce8\u518c\u6210\u529f，\u8bf7\u4f7f\u7528\u8be5\u5e10\u53f7\u767b\u9646。");
});

// 退出登录
logoutBtn?.addEventListener("click", async () => {
  await supabase.auth.signOut();
  setGlobalStatus("\u5df2\u9000\u51fa\u767b\u5f55。");
  renderLoggedOut();
});

// 兑换码表单
redeemForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = redeemInput.value.trim();
  if (!code) return;

  redeemStatus.textContent = "\u6b63\u5728\u5151\u6362...";
  setGlobalStatus("");

  const { data, error } = await supabase.rpc("redeem_code", {
    p_code: code,
  });

  if (error) {
    console.error(error);
    redeemStatus.textContent = "\u5151\u6362\u5931\u8d25：" + error.message;
    redeemStatus.style.color = "#f97373";
    return;
  }

  redeemInput.value = "";
  redeemStatus.textContent = `\u5151\u6362\u6210\u529f！\u5f53\u524d\u5957\u9910：${data[0].plan}\uFF0C\u5230\u671F\u65F6\u95F4：${new Date(
    data[0].expire_at
  ).toLocaleString()}`;
  redeemStatus.style.color = "#22c55e";

  await loadSubscription();
});

// UI 渲染函数
function renderLoggedOut() {
  authSection.style.display = "grid";
  dashboardSection.style.display = "none";
  logoutBtn.style.display = "none";
  userEmailSpan.textContent = "";
}

async function renderLoggedIn(user) {
  authSection.style.display = "none";
  dashboardSection.style.display = "block";
  logoutBtn.style.display = "inline-flex";
  userEmailSpan.textContent = user.email ?? "";
  profileEmail.textContent = user.email ?? "";
  profileId.textContent = user.id;

  await loadSubscription();
}

// 加载订阅信息
async function loadSubscription() {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    console.warn("loadSubscription error", error);
  }

  if (!data) {
    subscriptionPlan.textContent = "\u672a\u8ba2\u9605";
    subscriptionExpire.textContent = "\u5230\u671F\u65F6\u95F4：—";
    subscriptionStatus.textContent = "\u672a\u8ba2\u9605";
    subscriptionStatus.className = "pill pill-gray";
    return;
  }

  subscriptionPlan.textContent = data.plan ?? "\u672a\u8ba2\u9605";
  const expire = new Date(data.expire_at);
  subscriptionExpire.textContent = "\u5230\u671F\u65F6\u95F4：" + expire.toLocaleString();

  const now = new Date();
  if (expire.getTime() > now.getTime()) {
    subscriptionStatus.textContent = "\u8ba2\u9605\u4e2d";
    subscriptionStatus.className = "pill pill-green";
  } else {
    subscriptionStatus.textContent = "\u5df2\u8fc7\u671F";
    subscriptionStatus.className = "pill pill-red";
  }
}

// 初始化：检查是否已有登陆状态
async function refreshSessionAndUI() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    renderLoggedOut();
    return;
  }
  await renderLoggedIn(data.user);
}

await refreshSessionAndUI();

// 监听 auth 状态变化
supabase.auth.onAuthStateChange((_event, _session) => {
  refreshSessionAndUI();
});
