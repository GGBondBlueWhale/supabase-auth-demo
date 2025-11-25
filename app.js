import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nmlihgbkahzipxachnki.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LANGUAGE_KEY = "gsearch-lang";
const supportedLangs = ["zh-Hans", "zh-Hant", "en"];

const translations = {
  "zh-Hans": {
    brand: "GSearch Token Center",
    logout: "退出登录",
    heroTag: "安全 · 即时 · 多端同步",
    heroTitle: "管理你的 GSearch 订阅",
    heroDesc: "在一个地方完成登录、续费与账户管理，网页与 App 自动同步，随时掌握订阅状态。",
    heroHighlight1: "双重加密传输，确保登录安全",
    heroHighlight2: "快速兑换 CDKey，订阅实时生效",
    heroHighlight3: "与 GSearch App 共用账号，免重复操作",
    accountTag: "ACCOUNT",
    welcomeBack: "欢迎回来",
    authLead: "登录或注册后即可管理订阅与兑换码。",
    tabLogin: "登录",
    tabSignup: "注册",
    labelEmail: "邮箱",
    labelPassword: "密码",
    placeholderEmail: "you@example.com",
    placeholderPassword: "••••••••",
    placeholderPasswordLong: "至少 6 位密码",
    btnLogin: "登录",
    btnSignup: "注册新账号",
    signupHint: "账号可同时登录网页和 GSearch App，订阅自动同步。",
    dashTag: "订阅中心",
    dashWelcome: "欢迎回来",
    dashLead: "查看订阅状态、账号信息并快速兑换续费。",
    statusInactive: "未订阅",
    statusActive: "订阅中",
    statusExpired: "已过期",
    cardSubscription: "订阅状态",
    cardSubscriptionHint: "订阅实时同步到 GSearch App。",
    cardProfile: "账号信息",
    cardProfileHint: "使用同一账号登录 App 与网页。",
    redeemTag: "快速兑换",
    redeemTitle: "CDKey 兑换续费",
    redeemLead: "输入兑换码后立即延长订阅时长。",
    redeemPlaceholder: "输入兑换码，如 GSRCH-XXXX-XXXX",
    redeemSubmit: "兑换",
    historyTitle: "兑换记录",
    historyEmpty: "暂无兑换记录。",
    historyLoadFail: "加载失败：{error}",
    guideTitle: "使用说明",
    guide1: "每个 CDKey 只能使用一次，兑换后自动叠加到当前订阅。",
    guide2: "网页与 App 共用同一后端，续费后多端同步生效。",
    guide3: "如遇问题可以在 GSearch App 内反馈，或邮件联系开发者。",
    statusLoggingIn: "正在登录...",
    statusLoginSuccess: "登录成功。",
    statusLoginFail: "登录失败：{error}",
    statusSigningUp: "正在注册...",
    statusSignupSuccess: "注册成功，请使用该账号登录。",
    statusSignupFail: "注册失败：{error}",
    statusLoggedOut: "已退出登录。",
    redeemMissing: "兑换失败：请输入 CDKey",
    redeemWorking: "正在兑换...",
    redeemSuccess: "兑换成功！当前套餐：{plan}，到期时间：{expire}",
    redeemSuccessNoData: "兑换成功，但没有返回订阅信息。",
    redeemFail: "兑换失败：{error}",
    subscriptionExpire: "到期时间：{time}",
    historyExpire: "到期：{time}",
    historyUsed: "兑换时间：{time} · CDKey：{code}",
    historyPlan: "{plan} · {days} 天",
    pageTitle: "GSearch Token Center",
    loadingText: "正在载入…",
  },
  "zh-Hant": {
    brand: "GSearch Token Center",
    logout: "登出",
    heroTag: "安全 · 即時 · 多端同步",
    heroTitle: "管理你的 GSearch 訂閱",
    heroDesc: "在一個地方完成登入、續費與帳戶管理，網頁與 App 自動同步，隨時掌握訂閱狀態。",
    heroHighlight1: "雙重加密傳輸，確保登入安全",
    heroHighlight2: "快速兌換 CDKey，訂閱即時生效",
    heroHighlight3: "與 GSearch App 共用帳號，免重複操作",
    accountTag: "ACCOUNT",
    welcomeBack: "歡迎回來",
    authLead: "登入或註冊後即可管理訂閱與兌換碼。",
    tabLogin: "登入",
    tabSignup: "註冊",
    labelEmail: "電子郵件",
    labelPassword: "密碼",
    placeholderEmail: "you@example.com",
    placeholderPassword: "••••••••",
    placeholderPasswordLong: "至少 6 位密碼",
    btnLogin: "登入",
    btnSignup: "註冊新帳號",
    signupHint: "帳號可同時登入網頁和 GSearch App，訂閱自動同步。",
    dashTag: "訂閱中心",
    dashWelcome: "歡迎回來",
    dashLead: "查看訂閱狀態、帳號資訊並快速兌換續費。",
    statusInactive: "未訂閱",
    statusActive: "訂閱中",
    statusExpired: "已過期",
    cardSubscription: "訂閱狀態",
    cardSubscriptionHint: "訂閱即時同步到 GSearch App。",
    cardProfile: "帳號資訊",
    cardProfileHint: "使用同一帳號登入 App 與網頁。",
    redeemTag: "快速兌換",
    redeemTitle: "CDKey 兌換續費",
    redeemLead: "輸入兌換碼後立即延長訂閱時長。",
    redeemPlaceholder: "輸入兌換碼，如 GSRCH-XXXX-XXXX",
    redeemSubmit: "兌換",
    historyTitle: "兌換紀錄",
    historyEmpty: "暫無兌換紀錄。",
    historyLoadFail: "載入失敗：{error}",
    guideTitle: "使用說明",
    guide1: "每個 CDKey 只能使用一次，兌換後自動疊加到當前訂閱。",
    guide2: "網頁與 App 共用同一後端，續費後多端同步生效。",
    guide3: "如遇問題可以在 GSearch App 內反饋，或郵件聯繫開發者。",
    statusLoggingIn: "正在登入...",
    statusLoginSuccess: "登入成功。",
    statusLoginFail: "登入失敗：{error}",
    statusSigningUp: "正在註冊...",
    statusSignupSuccess: "註冊成功，請使用該帳號登入。",
    statusSignupFail: "註冊失敗：{error}",
    statusLoggedOut: "已登出。",
    redeemMissing: "兌換失敗：請輸入 CDKey",
    redeemWorking: "正在兌換...",
    redeemSuccess: "兌換成功！當前套餐：{plan}，到期時間：{expire}",
    redeemSuccessNoData: "兌換成功，但沒有返回訂閱資訊。",
    redeemFail: "兌換失敗：{error}",
    subscriptionExpire: "到期時間：{time}",
    historyExpire: "到期：{time}",
    historyUsed: "兌換時間：{time} · CDKey：{code}",
    historyPlan: "{plan} · {days} 天",
    pageTitle: "GSearch Token Center",
    loadingText: "正在載入…",
  },
  en: {
    brand: "GSearch Token Center",
    logout: "Sign out",
    heroTag: "Secure · Instant · Synced",
    heroTitle: "Manage your GSearch subscription",
    heroDesc:
      "Handle sign-in, renewals, and account settings in one place. Web and app stay perfectly in sync.",
    heroHighlight1: "Dual-layer encryption to keep sign-ins secure",
    heroHighlight2: "Redeem CDKeys instantly with live subscription updates",
    heroHighlight3: "Use one account across web and the GSearch app",
    accountTag: "ACCOUNT",
    welcomeBack: "Welcome back",
    authLead: "Sign in or sign up to manage subscriptions and redemption codes.",
    tabLogin: "Log in",
    tabSignup: "Sign up",
    labelEmail: "Email",
    labelPassword: "Password",
    placeholderEmail: "you@example.com",
    placeholderPassword: "••••••••",
    placeholderPasswordLong: "At least 6 characters",
    btnLogin: "Log in",
    btnSignup: "Create account",
    signupHint: "Use the same account on web and the GSearch app with automatic sync.",
    dashTag: "Subscriptions",
    dashWelcome: "Welcome back",
    dashLead: "Review status, account info, and redeem extensions fast.",
    statusInactive: "Not subscribed",
    statusActive: "Active",
    statusExpired: "Expired",
    cardSubscription: "Subscription",
    cardSubscriptionHint: "Changes sync instantly to the GSearch app.",
    cardProfile: "Account",
    cardProfileHint: "Use the same account for app and web.",
    redeemTag: "Quick redeem",
    redeemTitle: "Redeem a CDKey",
    redeemLead: "Enter a CDKey to extend your subscription immediately.",
    redeemPlaceholder: "Enter CDKey, e.g. GSRCH-XXXX-XXXX",
    redeemSubmit: "Redeem",
    historyTitle: "Redemption history",
    historyEmpty: "No redemptions yet.",
    historyLoadFail: "Failed to load: {error}",
    guideTitle: "How it works",
    guide1: "Each CDKey is single-use and stacks onto your current term.",
    guide2: "Web and app share the same backend, so renewals sync everywhere.",
    guide3: "Need help? Send feedback in the app or email the developer.",
    statusLoggingIn: "Signing in...",
    statusLoginSuccess: "Signed in successfully.",
    statusLoginFail: "Sign-in failed: {error}",
    statusSigningUp: "Creating account...",
    statusSignupSuccess: "Account created, please sign in.",
    statusSignupFail: "Sign-up failed: {error}",
    statusLoggedOut: "Signed out.",
    redeemMissing: "Redeem failed: please enter a CDKey",
    redeemWorking: "Redeeming...",
    redeemSuccess: "Redeemed! Plan: {plan}, expires at: {expire}",
    redeemSuccessNoData: "Redeemed successfully, but no subscription info returned.",
    redeemFail: "Redeem failed: {error}",
    subscriptionExpire: "Expires at: {time}",
    historyExpire: "Expires: {time}",
    historyUsed: "Redeemed: {time} · CDKey: {code}",
    historyPlan: "{plan} · {days} days",
    pageTitle: "GSearch Token Center",
    loadingText: "Loading…",
  },
};

let currentLang = "zh-Hans";

function t(key, vars = {}) {
  const dict = translations[currentLang] || translations.en;
  const fallback = translations.en;
  let template = dict[key] || fallback[key] || key;
  return template.replace(/\{(.*?)\}/g, (_, token) => vars[token] ?? "");
}

function detectLanguage() {
  const stored = localStorage.getItem(LANGUAGE_KEY);
  if (stored && supportedLangs.includes(stored)) return stored;
  const lang = navigator.language?.toLowerCase() || "en";
  if (lang.startsWith("zh-hant") || lang.startsWith("zh-tw") || lang.startsWith("zh-hk")) {
    return "zh-Hant";
  }
  if (lang.startsWith("zh")) return "zh-Hans";
  return "en";
}

function cycleLanguage() {
  const idx = supportedLangs.indexOf(currentLang);
  const next = supportedLangs[(idx + 1) % supportedLangs.length];
  setLanguage(next, true);
}

function setLanguage(lang, persist = false) {
  currentLang = supportedLangs.includes(lang) ? lang : "en";
  document.documentElement.lang = currentLang === "zh-Hant" ? "zh-Hant" : currentLang === "zh-Hans" ? "zh-CN" : "en";
  if (mainContainer && !prefersReducedMotion) {
    mainContainer.classList.add("lang-switching");
    setTimeout(() => mainContainer.classList.remove("lang-switching"), 180);
  }
  if (persist) localStorage.setItem(LANGUAGE_KEY, currentLang);
  document.title = t("pageTitle");
  applyStaticTranslations();
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    const placeholderText = t(key);
    node.setAttribute("placeholder", placeholderText);
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.textContent = t("logout");

  const langIcon = document.querySelector("#lang-toggle .lang-icon");
  if (langIcon) {
    langIcon.textContent = currentLang === "en" ? "EN" : currentLang === "zh-Hant" ? "繁" : "中";
  }
}

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
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn?.querySelector(".theme-icon");
const langToggleBtn = document.getElementById("lang-toggle");
const appLoader = document.getElementById("app-loader");
const mainContainer = document.querySelector(".main-container");
const authFormsContainer = document.querySelector(".auth-forms");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const THEME_KEY = "gsearch-theme";

const subscriptionPlan = document.getElementById("subscription-plan");
const subscriptionExpire = document.getElementById("subscription-expire");
const subscriptionStatus = document.getElementById("subscription-status");

const profileEmail = document.getElementById("profile-email");
const profileId = document.getElementById("profile-id");

const redeemForm = document.getElementById("redeem-form");
const redeemInput = document.getElementById("redeem-code-input");
const redeemStatus = document.getElementById("redeem-status");
const historyList = document.getElementById("redeem-history-list");
const historyEmpty = document.getElementById("redeem-history-empty");

langToggleBtn?.addEventListener("click", cycleLanguage);

function renderThemeIcon(theme) {
  if (!themeIcon) return;
  const isLight = theme === "light";
  themeIcon.innerHTML = isLight
    ? `<svg viewBox="0 0 24 24" aria-hidden="true" class="theme-svg">
        <circle cx="12" cy="12" r="5.4" fill="url(#grad-bolt)" />
        <g stroke="rgba(255,255,255,0.85)" stroke-width="1.4" stroke-linecap="round">
          <line x1="12" y1="2.6" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="21.4" />
          <line x1="4.1" y1="12" x2="2.6" y2="12" />
          <line x1="21.4" y1="12" x2="20" y2="12" />
          <line x1="5.5" y1="5.5" x2="3.9" y2="3.9" />
          <line x1="18.5" y1="18.5" x2="20.1" y2="20.1" />
          <line x1="5.5" y1="18.5" x2="3.9" y2="20.1" />
          <line x1="18.5" y1="5.5" x2="20.1" y2="3.9" />
        </g>
      </svg>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true" class="theme-svg">
        <path d="M18.5 14.2A7 7 0 0 1 9.8 5.5a7.5 7.5 0 1 0 8.7 8.7Z" fill="url(#grad-lock)" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" />
      </svg>`;
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  renderThemeIcon(theme);
}

function initThemeToggle() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  themeToggleBtn?.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function setGlobalStatus(msg) {
  globalStatus.textContent = msg || "";
}

function syncAuthFormHeight() {
  if (!authFormsContainer) return;
  const activeForm = activeAuthTab === "signup" ? signupFormEl : loginFormEl;
  if (activeForm) {
    authFormsContainer.style.height = `${activeForm.scrollHeight}px`;
  }
}

function clearInitializingState() {
  document.body.classList.remove("app-initializing");
  toggleLoader(false);
}

function playSectionFade(el) {
  if (!el || prefersReducedMotion) return;
  el.classList.remove("section-fade");
  void el.offsetWidth;
  el.classList.add("section-fade");
}

function toggleLoader(show) {
  if (!appLoader) return;
  appLoader.classList.toggle("active", !!show);
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
  const nextForm = showSignup ? signupFormEl : loginFormEl;
  const prevForm = document.querySelector(".auth-form.active");

  if (authFormsContainer && nextForm) {
    authFormsContainer.style.height = `${nextForm.scrollHeight}px`;
  }

  if (prevForm && !prefersReducedMotion) {
    prevForm.classList.add("animating-out");
    setTimeout(() => prevForm.classList.remove("active", "animating-out"), 200);
  } else {
    prevForm?.classList.remove("active", "animating-out");
  }

  if (showSignup) {
    signupFormEl?.classList.add("active");
    signupFormEl?.setAttribute("aria-hidden", "false");
    loginFormEl?.setAttribute("aria-hidden", "true");
  } else {
    loginFormEl?.classList.add("active");
    loginFormEl?.setAttribute("aria-hidden", "false");
    signupFormEl?.setAttribute("aria-hidden", "true");
  }
}

authTabs.forEach((btn) => {
  btn.addEventListener("click", () => setAuthTab(btn.dataset.target));
});

// 登录表单
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setGlobalStatus(t("statusLoggingIn"));
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setGlobalStatus(t("statusLoginFail", { error: error.message }));
    return;
  }

  setGlobalStatus(t("statusLoginSuccess"));
  await refreshSessionAndUI();
});

// 注册表单
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  setGlobalStatus(t("statusSigningUp"));
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setGlobalStatus(t("statusSignupFail", { error: error.message }));
    return;
  }

  setGlobalStatus(t("statusSignupSuccess"));
});

// 退出登录
logoutBtn?.addEventListener("click", async () => {
  await supabase.auth.signOut();
  currentUser = null;
  setGlobalStatus(t("statusLoggedOut"));
  renderLoggedOut();
});

// ✅ CDKey 兑换表单（已经改成使用 code 参数，并适配 jsonb 返回值）
redeemForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = redeemInput.value.trim();
  if (!code) {
    redeemStatus.textContent = t("redeemMissing");
    redeemStatus.style.color = "#f97373";
    return;
  }

  redeemStatus.textContent = t("redeemWorking");
  redeemStatus.style.color = "#e5e7eb"; // 灰色
  setGlobalStatus("");

  // 关键修改：这里把参数名改成 code，必须和 Postgres 函数参数一致
  const { data, error } = await supabase.rpc("redeem_code", {
    code: code,
  });

  if (error) {
    console.error(error);
    redeemStatus.textContent = t("redeemFail", { error: error.message });
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
    redeemStatus.textContent = t("redeemSuccess", { plan, expire: expireText });
  } else {
    redeemStatus.textContent = t("redeemSuccessNoData");
  }
  redeemStatus.style.color = "#22c55e";

  await loadSubscription();
  await loadRedeemHistory();
});

// UI 渲染函数
function renderLoggedOut() {
  authSection.style.display = "grid";
  dashboardSection.style.display = "none";
  logoutBtn.style.display = "none";
  userEmailSpan.textContent = "";
  profileEmail.textContent = "";
  profileId.textContent = "";
  historyList.innerHTML = "";
  historyEmpty.style.display = "block";
  setAuthTab("login");
  // 清空订阅显示
  subscriptionPlan.textContent = t("statusInactive");
  subscriptionExpire.textContent = t("subscriptionExpire", { time: "—" });
  subscriptionStatus.textContent = t("statusInactive");
  subscriptionStatus.className = "status-chip";
  playSectionFade(authSection);
  syncAuthFormHeight();
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
  await loadRedeemHistory();
  playSectionFade(dashboardSection);
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
    subscriptionPlan.textContent = t("statusInactive");
    subscriptionExpire.textContent = t("subscriptionExpire", { time: "—" });
    subscriptionStatus.textContent = t("statusInactive");
    subscriptionStatus.className = "status-chip";
    return;
  }

  if (!data) {
    // 没有订阅记录 = 未订阅
    subscriptionPlan.textContent = t("statusInactive");
    subscriptionExpire.textContent = t("subscriptionExpire", { time: "—" });
    subscriptionStatus.textContent = t("statusInactive");
    subscriptionStatus.className = "status-chip";
    return;
  }

  subscriptionPlan.textContent = data.plan ?? t("statusInactive");
  const expire = new Date(data.expire_at);
  subscriptionExpire.textContent = t("subscriptionExpire", { time: expire.toLocaleString() });

  const now = new Date();
  if (expire.getTime() > now.getTime()) {
    subscriptionStatus.textContent = t("statusActive");
    subscriptionStatus.className = "status-chip green";
  } else {
    subscriptionStatus.textContent = t("statusExpired");
    subscriptionStatus.className = "status-chip red";
  }
}

async function loadRedeemHistory() {
  if (!historyList || !historyEmpty) return;

  // 确保有当前用户
  if (!currentUser) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      console.warn("loadRedeemHistory: no current user", error);
      renderLoggedOut();
      return;
    }
    currentUser = data.user;
  }

  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    return d.toLocaleString();
  };

  historyList.innerHTML = "";

  const { data, error } = await supabase
    .from("cd_keys")
    .select("code, plan, days, used_at, expire_at")
    .eq("used_by", currentUser.id)
    .order("used_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("loadRedeemHistory error", error);
    historyEmpty.style.display = "none";
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = t("historyLoadFail", { error: error.message || "" });
    historyList.appendChild(li);
    return;
  }

  if (!data || data.length === 0) {
    historyEmpty.style.display = "block";
    return;
  }

  historyEmpty.style.display = "none";

  data.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const main = document.createElement("div");
    main.className = "history-main";

    const planSpan = document.createElement("span");
    planSpan.className = "history-plan";
    planSpan.textContent = t("historyPlan", { plan: item.plan ?? "—", days: item.days || "—" });

    const expireSpan = document.createElement("span");
    expireSpan.className = "history-expire";
    expireSpan.textContent = t("historyExpire", { time: formatDate(item.expire_at) });

    main.appendChild(planSpan);
    main.appendChild(expireSpan);

    const sub = document.createElement("div");
    sub.className = "history-sub";
    const codePreview = item.code ? `${item.code.slice(0, 7)}…` : "—";
    sub.textContent = t("historyUsed", { time: formatDate(item.used_at), code: codePreview });

    li.appendChild(main);
    li.appendChild(sub);
    historyList.appendChild(li);
  });
}

function initParallax() {
  const bg = document.querySelector(".bg-gradient");
  const stickyBar = document.querySelector(".top-bar");
  if (!bg && !stickyBar) return;
  let rafId = null;
  let cursorX = 0;
  let cursorY = 0;

  const applyTransform = () => {
    rafId = null;
    if (bg) {
      bg.style.transform = `translate3d(${cursorX * 0.6}px, ${cursorY * 0.6}px, 0)`;
    }
  };

  const onMove = (evt) => {
    const { innerWidth, innerHeight } = window;
    const xRatio = (evt.clientX - innerWidth / 2) / innerWidth;
    const yRatio = (evt.clientY - innerHeight / 2) / innerHeight;
    cursorX = xRatio * 8;
    cursorY = yRatio * 8;
    if (!prefersReducedMotion && !rafId) {
      rafId = requestAnimationFrame(applyTransform);
    }
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("scroll", () => {
    if (!stickyBar || prefersReducedMotion) return;
    const floating = window.scrollY > 12;
    stickyBar.classList.toggle("is-floating", floating);
  });
}

// 初始化：检查是否已有登陆状态
async function refreshSessionAndUI() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    currentUser = null;
    renderLoggedOut();
    clearInitializingState();
    return;
  }
  currentUser = data.user;
  await renderLoggedIn(data.user);
  clearInitializingState();
}

window.addEventListener("DOMContentLoaded", async () => {
  toggleLoader(true);
  setLanguage(detectLanguage());
  setAuthTab("login");
  syncAuthFormHeight();
  initThemeToggle();
  initParallax();
  await refreshSessionAndUI();
});

// 监听 auth 状态变化
supabase.auth.onAuthStateChange((_event, _session) => {
  refreshSessionAndUI();
});
