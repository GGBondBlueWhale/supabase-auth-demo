import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nmlihgbkahzipxachnki.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 当前登录用户（缓存一下，订阅查询要用）
let currentUser = null;

// DOM
const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");
const logoutBtn = document.getElementById("logout-btn");
const userEmailSpan = document.getElementById("current-user-email");
const globalStatus = document.getElementById("global-status");
const authTabs = document.querySelectorAll(".auth-tab");
const loginFormEl = document.getElementById("login-form");
const signupFormEl = document.getElementById("signup-form");

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

// 切换登录/注册标签
let activeAuthTab = null;
function setAuthTab(target = "login") {
  if (target === activeAuthTab) return;
  activeAuthTab = target;

  authTabs.forEach((btn) => {
    const isActive = btn.dataset.target === target;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  const showSignup = target === "signup";
  signupFormEl?.classList.toggle("active", showSignup);
  signupFormEl?.setAttribute("aria-hidden", showSignup ? "false" : "true");

  const showLogin = !showSignup;
  loginFormEl?.classList.toggle("active", showLogin);
  loginFormEl?.setAttribute("aria-hidden", showLogin ? "false" : "true");
}

authTabs.forEach((btn) => {
  btn.addEventListener("click", () => setAuthTab(btn.dataset.target));
});

setAuthTab("login");

// 登录表单
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
    setGlobalStatus("登录失败：" + error.message);
    return;
  }

  setGlobalStatus("登录成功。");
  await refreshSessionAndUI();
});

// 注册表单
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setGlobalStatus("正在注册...");
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setGlobalStatus("注册失败：" + error.message);
    return;
  }

  setGlobalStatus("注册成功，请使用该账号登录。");
});

// 退出登录
logoutBtn?.addEventListener("click", async () => {
  await supabase.auth.signOut();
  currentUser = null;
  setGlobalStatus("已退出登录。");
  renderLoggedOut();
});

// ✅ CDKey 兑换表单（已经改成使用 code 参数，并适配 jsonb 返回值）
redeemForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = redeemInput.value.trim();
  if (!code) {
    redeemStatus.textContent = "兑换失败：请输入 CDKey";
    redeemStatus.style.color = "#f97373";
    return;
  }

  redeemStatus.textContent = "正在兑换...";
  redeemStatus.style.color = "#e5e7eb"; // 灰色
  setGlobalStatus("");

  // 关键修改：这里把参数名改成 code，必须和 Postgres 函数参数一致
  const { data, error } = await supabase.rpc("redeem_code", {
    code: code,
  });

  if (error) {
    console.error(error);
    redeemStatus.textContent = "兑换失败：" + error.message;
    redeemStatus.style.color = "#f97373";
    return;
  }

  redeemInput.value = "";

  // 你的 redeem_code 函数现在返回的是 jsonb 对象：{ plan, expire_at }
  if (data) {
    const plan = data.plan ?? "未知";
    let expireText = "未知";
    if (data.expire_at) {
      expireText = new Date(data.expire_at).toLocaleString();
    }
    redeemStatus.textContent = `兑换成功！当前套餐：${plan}，到期时间：${expireText}`;
  } else {
    redeemStatus.textContent = "兑换成功，但没有返回订阅信息。";
  }
  redeemStatus.style.color = "#22c55e";

  await loadSubscription();
});

// UI 渲染函数
function renderLoggedOut() {
  authSection.style.display = "grid";
  dashboardSection.style.display = "none";
  logoutBtn.style.display = "none";
  userEmailSpan.textContent = "";
  profileEmail.textContent = "";
  profileId.textContent = "";
  setAuthTab("login");
  // 清空订阅显示
  subscriptionPlan.textContent = "未订阅";
  subscriptionExpire.textContent = "到期时间：—";
  subscriptionStatus.textContent = "未订阅";
  subscriptionStatus.className = "status-chip";
}

async function renderLoggedIn(user) {
  currentUser = user;

  authSection.style.display = "none";
  dashboardSection.style.display = "block";
  logoutBtn.style.display = "inline-flex";

  userEmailSpan.textContent = user.email ?? "";
  profileEmail.textContent = user.email ?? "";
  profileId.textContent = user.id ?? "";

  await loadSubscription();
}

// 加载订阅信息
async function loadSubscription() {
  // 确保有当前用户
  if (!currentUser) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      console.warn("loadSubscription: no current user", error);
      renderLoggedOut();
      return;
    }
    currentUser = data.user;
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", currentUser.id)
    .order("expire_at", { ascending: false })
    .limit(1)
    .maybeSingle(); // 允许 0 行，不返回 406

  if (error) {
    console.warn("loadSubscription error", error);
    // 出错时当作未订阅处理
    subscriptionPlan.textContent = "未订阅";
    subscriptionExpire.textContent = "到期时间：—";
    subscriptionStatus.textContent = "未订阅";
    subscriptionStatus.className = "status-chip";
    return;
  }

  if (!data) {
    // 没有订阅记录 = 未订阅
    subscriptionPlan.textContent = "未订阅";
    subscriptionExpire.textContent = "到期时间：—";
    subscriptionStatus.textContent = "未订阅";
    subscriptionStatus.className = "status-chip";
    return;
  }

  subscriptionPlan.textContent = data.plan ?? "未订阅";
  const expire = new Date(data.expire_at);
  subscriptionExpire.textContent = "到期时间：" + expire.toLocaleString();

  const now = new Date();
  if (expire.getTime() > now.getTime()) {
    subscriptionStatus.textContent = "订阅中";
    subscriptionStatus.className = "status-chip green";
  } else {
    subscriptionStatus.textContent = "已过期";
    subscriptionStatus.className = "status-chip red";
  }
}

// 初始化：检查是否已有登陆状态
async function refreshSessionAndUI() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    currentUser = null;
    renderLoggedOut();
    return;
  }
  currentUser = data.user;
  await renderLoggedIn(data.user);
}

await refreshSessionAndUI();

// 监听 auth 状态变化
supabase.auth.onAuthStateChange((_event, _session) => {
  refreshSessionAndUI();
});
