import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nmlihgbkahzipxachnki.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LANGUAGE_KEY = "gsearch-lang";
const supportedLangs = ["zh-Hans", "zh-Hant", "en"];

const translations = {
  "zh-Hans": {
    brandAdmin: "GSearch Admin",
    logout: "退出",
    heroTag: "管理中心",
    heroTitle: "生成与追踪 CDKey",
    heroDesc: "面向管理员的兑换码管理面板，快速生成、查看最近使用情况。",
    heroBadge: "仅管理员可见",
    createTag: "批量生成",
    createTitle: "生成 CDKey",
    createDesc: "设定套餐、天数与数量，一键生成并复制保存。",
    planPlaceholder: "套餐名，如 pro",
    daysPlaceholder: "天数，如 30",
    countPlaceholder: "数量，如 5",
    createSubmit: "生成",
    createHint: "生成的兑换码仅管理员可见，用户只能拿到你发给他的码。",
    listTag: "记录",
    listTitle: "最近生成 / 使用的 CDKey",
    listDesc: "自动按照「未使用」与「已使用」分区，切换查看更清晰。",
    tabUnused: "未使用",
    tabUnusedDesc: "等待发放",
    tabUsed: "已使用",
    tabUsedDesc: "兑换记录",
    segmentBadgeUnused: "未使用",
    segmentBadgeUsed: "已使用",
    segmentTitleUnused: "等待分发的兑换码",
    segmentTitleUsed: "已经被兑换的记录",
    segmentDescUnused: "支持分页查看，默认每页 50 条，可随时切换已使用/未使用列表。",
    segmentDescUsed: "集中查看已使用的兑换码、使用邮箱及时间，方便追踪。",
    segmentTagUnused: "最新",
    segmentTagUsed: "追踪",
    pillUnused: "未使用：{count}",
    pillUsed: "已使用：{count}",
    prevPage: "上一页",
    nextPage: "下一页",
    pageInfo: "第 {page} / {total} 页（共 {count} 条）",
    thCode: "Code",
    thPlan: "Plan",
    thDays: "Days",
    thStatus: "Status",
    thUsedBy: "Used By",
    thUsedAt: "Used At",
    emptyUnused: "暂无未使用的兑换码",
    emptyUsed: "暂无已使用的兑换码",
    createFailed: "生成失败：{error}",
    ensureAdminFail: "非管理员，已返回首页。",
    statusActive: "订阅中",
    statusExpired: "已过期",
    analyticsTag: "数据报表",
    analyticsTitle: "用户 & CDKey 概览",
    analyticsDesc: "快速查看注册、订阅与兑换趋势。",
    kpiUsers: "总注册用户",
    kpiUsersSub: "最近 30 天",
    kpiActive: "订阅中",
    kpiActiveSub: "当前有效订阅",
    kpiCdkeyTotal: "CDKey 总数",
    kpiCdkeyUsed: "已使用 / 未使用",
    chartUsers: "最近 7 天新注册",
    chartRedeem: "最近 7 天兑换",
    userPanelTag: "用户详情",
    userPanelTitle: "用户概览与代填兑换",
    userPanelDesc: "快速搜索用户、查看订阅并代为兑换 CDKey。",
    userDetailTitle: "详情",
    redeemForUser: "代该用户兑换",
    assignTitle: "分配给用户",
    assignDesc: "输入用户邮箱或选择用户，确认后将选中 CDKey 分配给对方。",
    assignSubmit: "确认分配",
    assignSelected: "已选择 {count} 个 CDKey",
    assignUserPicker: "选择用户",
    assignUserHint: "输入邮箱或点击下方用户填充",
    assignUserEmpty: "暂无可用用户",
    deleteConfirmTitle: "确认删除选中 CDKey？",
    deleteConfirmDesc: "你将删除 {count} 个未使用的 CDKey，此操作不可恢复。",
    deleteConfirm: "确认删除",
    cancel: "取消",
  },
  "zh-Hant": {
    brandAdmin: "GSearch Admin",
    logout: "退出",
    heroTag: "管理中心",
    heroTitle: "生成與追蹤 CDKey",
    heroDesc: "面向管理員的兌換碼管理面板，快速生成、查看最近使用情況。",
    heroBadge: "僅管理員可見",
    createTag: "批量生成",
    createTitle: "生成 CDKey",
    createDesc: "設定套餐、天數與數量，一鍵生成並複製保存。",
    planPlaceholder: "套餐名，如 pro",
    daysPlaceholder: "天數，如 30",
    countPlaceholder: "數量，如 5",
    createSubmit: "生成",
    createHint: "生成的兌換碼僅管理員可見，使用者只能拿到你發給他的碼。",
    listTag: "紀錄",
    listTitle: "最近生成 / 使用的 CDKey",
    listDesc: "自動按照「未使用」與「已使用」分區，切換查看更清晰。",
    tabUnused: "未使用",
    tabUnusedDesc: "等待發放",
    tabUsed: "已使用",
    tabUsedDesc: "兌換紀錄",
    segmentBadgeUnused: "未使用",
    segmentBadgeUsed: "已使用",
    segmentTitleUnused: "等待分發的兌換碼",
    segmentTitleUsed: "已經被兌換的紀錄",
    segmentDescUnused: "支援分頁查看，預設每頁 50 條，可隨時切換已使用/未使用列表。",
    segmentDescUsed: "集中查看已使用的兌換碼、使用郵箱及時間，方便追蹤。",
    segmentTagUnused: "最新",
    segmentTagUsed: "追蹤",
    pillUnused: "未使用：{count}",
    pillUsed: "已使用：{count}",
    prevPage: "上一頁",
    nextPage: "下一頁",
    pageInfo: "第 {page} / {total} 頁（共 {count} 條）",
    thCode: "Code",
    thPlan: "Plan",
    thDays: "Days",
    thStatus: "Status",
    thUsedBy: "Used By",
    thUsedAt: "Used At",
    emptyUnused: "暫無未使用的兌換碼",
    emptyUsed: "暫無已使用的兌換碼",
    createFailed: "生成失敗：{error}",
    ensureAdminFail: "非管理員，已返回首頁。",
    statusActive: "訂閱中",
    statusExpired: "已過期",
    analyticsTag: "數據報表",
    analyticsTitle: "使用者 & CDKey 概覽",
    analyticsDesc: "快速查看註冊、訂閱與兌換趨勢。",
    kpiUsers: "總註冊用戶",
    kpiUsersSub: "最近 30 天",
    kpiActive: "訂閱中",
    kpiActiveSub: "當前有效訂閱",
    kpiCdkeyTotal: "CDKey 總數",
    kpiCdkeyUsed: "已用 / 未用",
    chartUsers: "最近 7 天新註冊",
    chartRedeem: "最近 7 天兌換",
    userPanelTag: "用戶詳情",
    userPanelTitle: "用戶概覽與代填兌換",
    userPanelDesc: "快速搜尋用戶、查看訂閱並代為兌換 CDKey。",
    userDetailTitle: "詳情",
    redeemForUser: "代該用戶兌換",
    assignTitle: "分配給用戶",
    assignDesc: "輸入用戶郵箱或選擇用戶，確認後將選中 CDKey 分配給對方。",
    assignSubmit: "確認分配",
    assignSelected: "已選擇 {count} 個 CDKey",
    assignUserPicker: "選擇用戶",
    assignUserHint: "輸入郵箱或點擊下方用戶填充",
    assignUserEmpty: "暫無可用用戶",
    deleteConfirmTitle: "確認刪除選中 CDKey？",
    deleteConfirmDesc: "你將刪除 {count} 個未使用的 CDKey，此操作不可恢復。",
    deleteConfirm: "確認刪除",
    cancel: "取消",
  },
  en: {
    brandAdmin: "GSearch Admin",
    logout: "Sign out",
    heroTag: "Admin",
    heroTitle: "Create and track CDKeys",
    heroDesc: "Generate keys in batches, review usage, and audit history in one place.",
    heroBadge: "Admins only",
    createTag: "Batch create",
    createTitle: "Generate CDKeys",
    createDesc: "Set plan, days, and quantity, then copy the generated keys instantly.",
    planPlaceholder: "Plan, e.g. pro",
    daysPlaceholder: "Days, e.g. 30",
    countPlaceholder: "Quantity, e.g. 5",
    createSubmit: "Generate",
    createHint: "Generated CDKeys stay visible to admins only—users only see what you share.",
    listTag: "Records",
    listTitle: "Latest generated / redeemed keys",
    listDesc: "Switch between unused and used partitions with clear pagination.",
    tabUnused: "Unused",
    tabUnusedDesc: "Ready to issue",
    tabUsed: "Used",
    tabUsedDesc: "Redemption log",
    segmentBadgeUnused: "Unused",
    segmentBadgeUsed: "Used",
    segmentTitleUnused: "CDKeys ready to share",
    segmentTitleUsed: "Already redeemed entries",
    segmentDescUnused: "Paginated view (50 per page) with quick status toggles.",
    segmentDescUsed: "See used codes with user email and timestamps for traceability.",
    segmentTagUnused: "New",
    segmentTagUsed: "Audit",
    pillUnused: "Unused: {count}",
    pillUsed: "Used: {count}",
    prevPage: "Prev",
    nextPage: "Next",
    pageInfo: "Page {page} / {total} (total {count})",
    thCode: "Code",
    thPlan: "Plan",
    thDays: "Days",
    thStatus: "Status",
    thUsedBy: "Used By",
    thUsedAt: "Used At",
    emptyUnused: "No unused CDKeys",
    emptyUsed: "No used CDKeys",
    createFailed: "Failed to generate: {error}",
    ensureAdminFail: "Not an admin. Redirected to home.",
    statusActive: "Active",
    statusExpired: "Expired",
    analyticsTag: "Analytics",
    analyticsTitle: "Users & CDKeys snapshot",
    analyticsDesc: "Track registrations, subscriptions, and redemption trends.",
    kpiUsers: "Total users",
    kpiUsersSub: "Last 30 days",
    kpiActive: "Active subscriptions",
    kpiActiveSub: "Currently valid",
    kpiCdkeyTotal: "CDKeys total",
    kpiCdkeyUsed: "Used / unused",
    chartUsers: "New users (7d)",
    chartRedeem: "Redeems (7d)",
    userPanelTag: "Users",
    userPanelTitle: "User overview & proxy redeem",
    userPanelDesc: "Search users, inspect subscriptions, and redeem on their behalf.",
    userDetailTitle: "Detail",
    redeemForUser: "Redeem for user",
    assignTitle: "Assign to user",
    assignDesc: "Enter user email to assign selected CDKeys.",
    assignSubmit: "Assign",
    assignSelected: "Selected {count} CDKeys",
    assignUserPicker: "Pick a user",
    assignUserHint: "Type or tap a user below to fill email",
    assignUserEmpty: "No users available",
    deleteConfirmTitle: "Delete selected CDKeys?",
    deleteConfirmDesc: "You are deleting {count} unused CDKeys. This cannot be undone.",
    deleteConfirm: "Delete",
    cancel: "Cancel",
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
  if (persist) localStorage.setItem(LANGUAGE_KEY, currentLang);
  applyStaticTranslations();
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    node.setAttribute("placeholder", t(key));
  });

  const langIcon = document.querySelector("#lang-toggle .lang-icon");
  if (langIcon) {
    langIcon.textContent = currentLang === "en" ? "EN" : currentLang === "zh-Hant" ? "繁" : "中";
  }

  const logoutBtn = document.getElementById("admin-logout-btn");
  if (logoutBtn) logoutBtn.textContent = t("logout");

  updatePills();
  updateAssignSelectedCopy();
  updateDeleteConfirmCopy();
}

function updatePills() {
  const unusedWrapper = document.querySelector('[data-i18n-scope="unused"]');
  const usedWrapper = document.querySelector('[data-i18n-scope="used"]');
  if (unusedWrapper && unusedCountSpan) {
    unusedWrapper.innerHTML = t("pillUnused", { count: `<strong id="unused-count">${unusedCountSpan.textContent}</strong>` });
    unusedCountSpan = document.getElementById("unused-count");
  }
  if (usedWrapper && usedCountSpan) {
    usedWrapper.innerHTML = t("pillUsed", { count: `<strong id="used-count">${usedCountSpan.textContent}</strong>` });
    usedCountSpan = document.getElementById("used-count");
  }
}

function updateAssignSelectedCopy() {
  if (!assignSelectedCount) return;
  const count = selectedCodes.size;
  assignSelectedCount.textContent = t("assignSelected", { count });
  assignSelectedCount.setAttribute("data-count", String(count));
}

function updateDeleteConfirmCopy() {
  if (!deleteConfirmDesc) return;
  const count = selectedCodes.size;
  deleteConfirmDesc.textContent = t("deleteConfirmDesc", { count });
}

function buildDailySeries(rows, key) {
  const today = new Date();
  const labels = [];
  const values = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    labels.push(label);
    const dayStart = new Date(d);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(d);
    dayEnd.setHours(23, 59, 59, 999);
    const count = rows.filter((row) => {
      const value = row[key];
      if (!value) return false;
      const time = new Date(value).getTime();
      return time >= dayStart.getTime() && time <= dayEnd.getTime();
    }).length;
    values.push(count);
  }
  return { labels, values };
}

function getChartColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    axis: styles.getPropertyValue("--chart-axis-color").trim() || "var(--text-sub)",
    grid: styles.getPropertyValue("--chart-grid-color").trim() || "rgba(255,255,255,0.1)",
  };
}

function renderLineChart(ctx, dataset) {
  if (!ctx || typeof Chart === "undefined") return null;
  const source = dataset || { labels: [], values: [], color: "#5ac8fa" };
  const chartColors = getChartColors();

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: source.labels,
      datasets: [
        {
          data: source.values,
          borderColor: source.color,
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: chartColors.axis, maxRotation: 0 }, grid: { display: false, color: chartColors.grid } },
        y: { ticks: { color: chartColors.axis, stepSize: 1 }, grid: { color: chartColors.grid } },
      },
      animation: {
        duration: 420,
        easing: "easeInOutQuad",
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function applyChartTheme() {
  if (!analyticsChart) return;
  const colors = getChartColors();
  const { scales } = analyticsChart.options;
  if (scales?.x?.ticks) scales.x.ticks.color = colors.axis;
  if (scales?.y?.ticks) scales.y.ticks.color = colors.axis;
  if (scales?.x?.grid) scales.x.grid.color = colors.grid;
  if (scales?.y?.grid) scales.y.grid.color = colors.grid;
}

const adminEmailSpan = document.getElementById("admin-email");
const logoutBtn = document.getElementById("admin-logout-btn");
const createForm = document.getElementById("create-cdkey-form");
const codesOutput = document.getElementById("created-codes");
const cdkeyTableBody = document.querySelector("#cdkey-table tbody");
let unusedCountSpan = document.getElementById("unused-count");
let usedCountSpan = document.getElementById("used-count");
const segmentTabs = document.querySelectorAll(".segment-tab");
const statusBadge = document.getElementById("status-badge");
const listTitle = document.getElementById("list-title");
const listDesc = document.getElementById("list-desc");
const listTag = document.getElementById("list-tag");
const pageInfo = document.getElementById("page-info");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn?.querySelector(".theme-icon");
const langToggleBtn = document.getElementById("lang-toggle");
const kpiUsers = document.getElementById("kpi-users");
const kpiActive = document.getElementById("kpi-active");
const kpiCdkeyTotal = document.getElementById("kpi-cdkey-total");
const kpiCdkeySplit = document.getElementById("kpi-cdkey-split");
const analyticsCanvas = document.getElementById("chart-analytics");
const analyticsStage = document.querySelector(".chart-stage");
const chartToggleButtons = document.querySelectorAll("[data-chart-type]");
const userTableBody = document.querySelector("#user-table tbody");
const userSearchInput = document.getElementById("user-search");
const userPrevBtn = document.getElementById("user-prev");
const userNextBtn = document.getElementById("user-next");
const userPageInfo = document.getElementById("user-page-info");
const userDetailBody = document.getElementById("user-detail-body");
const adminRedeemForm = document.getElementById("admin-redeem-form");
const adminRedeemInput = document.getElementById("admin-redeem-code");
const adminRedeemStatus = document.getElementById("admin-redeem-status");
const bulkDeleteBtn = document.getElementById("bulk-delete");
const bulkAssignBtn = document.getElementById("bulk-assign");
const selectAllCheckbox = document.getElementById("select-all");
const assignModal = document.getElementById("assign-modal");
const assignForm = document.getElementById("assign-form");
const assignEmailInput = document.getElementById("assign-email");
const assignStatus = document.getElementById("assign-status");
const assignSelectedCount = document.getElementById("assign-selected-count");
const assignUserList = document.getElementById("assign-user-list");
const closeAssignBtn = document.getElementById("close-assign");
const deleteConfirmModal = document.getElementById("delete-confirm-modal");
const deleteConfirmDesc = document.getElementById("delete-confirm-desc");
const closeDeleteConfirmBtn = document.getElementById("close-delete-confirm");
const cancelDeleteBtn = document.getElementById("cancel-delete");
const confirmDeleteBtn = document.getElementById("confirm-delete");

const THEME_KEY = "gsearch-theme";

const PAGE_SIZE = 50;
let currentStatus = "unused";
const pageState = { unused: 1, used: 1 };
const totalPages = { unused: 1, used: 1 };
const totalCounts = { unused: 0, used: 0 };
const USER_PAGE_SIZE = 10;
let userPage = 1;
let totalUserPages = 1;
let userSearchTerm = "";
let selectedUser = null;
let selectedCodes = new Set();
let analyticsChart = null;
let analyticsState = {
  activeTab: "signup",
  datasets: {
    signup: { labels: [], values: [], color: "#5ac8fa" },
    redeem: { labels: [], values: [], color: "#7d89ff" },
  },
};
let assignableUsers = [];
let assignTargetUserId = null;
let lastFocusedDeleteTrigger = null;

/**
 * 更新切换按钮的选中态，保持 Apple 风格的胶囊高亮。
 */
function updateChartToggle(type) {
  chartToggleButtons.forEach((btn) => {
    const isActive = btn.dataset.chartType === type;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

/**
 * 在切换数据时做一个轻微的淡入/下滑动画，偏 Apple 味道。
 */
function animateChartStage() {
  if (!analyticsStage) return;
  analyticsStage.classList.add("is-switching");
  setTimeout(() => analyticsStage.classList.remove("is-switching"), 200);
}

/**
 * 切换 chart.js 数据集而不重新创建 canvas，避免高度异常。
 */
function updateAnalyticsChart(type) {
  if (!analyticsChart || !analyticsState.datasets[type]) return;

  analyticsState.activeTab = type;
  updateChartToggle(type);
  const dataset = analyticsState.datasets[type];
  analyticsChart.data.labels = dataset.labels;
  analyticsChart.data.datasets[0].data = dataset.values;
  analyticsChart.data.datasets[0].borderColor = dataset.color;
  animateChartStage();
  applyChartTheme();
  analyticsChart.update();
}

/**
 * 初始化分析图表，集中处理所有绑定与销毁逻辑。
 */
function initAnalyticsCharts() {
  if (!analyticsCanvas) return;
  const ctx = analyticsCanvas.getContext("2d");
  if (analyticsChart) analyticsChart.destroy();
  analyticsChart = renderLineChart(ctx, analyticsState.datasets[analyticsState.activeTab]);
  updateAnalyticsChart(analyticsState.activeTab);

  chartToggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextType = btn.dataset.chartType;
      if (nextType && nextType !== analyticsState.activeTab) {
        updateAnalyticsChart(nextType);
      }
    });
  });
}

function getStatusCopy(status) {
  return {
    label: status === "unused" ? t("segmentBadgeUnused") : t("segmentBadgeUsed"),
    title: status === "unused" ? t("segmentTitleUnused") : t("segmentTitleUsed"),
    desc: status === "unused" ? t("segmentDescUnused") : t("segmentDescUsed"),
    tag: status === "unused" ? t("segmentTagUnused") : t("segmentTagUsed"),
    empty: status === "unused" ? t("emptyUnused") : t("emptyUsed"),
  };
}

function renderThemeIcon(theme) {
  if (!themeIcon) return;
  if (!themeIcon.dataset.rendered) {
    themeIcon.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" class="theme-svg">
        <g class="sun">
          <circle cx="12" cy="12" r="5.4" fill="url(#admin-grad)" />
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
        </g>
        <g class="moon">
          <path d="M18.5 14.2A7 7 0 0 1 9.8 5.5a7.5 7.5 0 1 0 8.7 8.7Z" fill="url(#admin-grad)" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" />
        </g>
      </svg>`;
    themeIcon.dataset.rendered = "true";
  }
  themeIcon.classList.toggle("is-light", theme === "light");
  themeIcon.classList.toggle("is-dark", theme === "dark");
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  renderThemeIcon(theme);
  applyChartTheme();
  analyticsChart?.update();
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

initThemeToggle();
langToggleBtn?.addEventListener("click", cycleLanguage);
setLanguage(detectLanguage());

// 生成随机兑换码
function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const array = new Uint32Array(20);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join("");
}

// 验证当前用户是否管理员
async function ensureAdmin() {
  // 1. 拿当前登录用户
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.warn("ensureAdmin: no user", userError);
    window.location.href = "./index.html";
    return null;
  }

  const user = userData.user;

  // 2. 查 profiles 表，看 is_admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)     // 按 id 查，配合刚才 SQL 里的 auth.uid() = id
    .maybeSingle();        // ⭐ 关键：用 maybeSingle，0 行时不会抛错

  if (profileError) {
    console.warn("ensureAdmin: failed to load profile", profileError);
    window.location.href = "./index.html";
    return null;
  }

  // 查不到 / 不是管理员，直接踢回普通页面
  if (!profile || !profile.is_admin) {
    console.warn("ensureAdmin: user is not admin", profile);
    window.location.href = "./index.html";
    return null;
  }

  // 显示邮箱
  adminEmailSpan.textContent = user.email ?? "";
  return user;
}

// 生成 CDKey
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentUser = await ensureAdmin();
  if (!currentUser) return;

  const plan = document.getElementById("plan-input").value.trim() || "pro";
  const days = parseInt(document.getElementById("days-input").value, 10) || 30;
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
      status: "unused", // 初始状态
    });
  }

  const { data, error } = await supabase
    .from("cd_keys")
    .insert(codes)
    .select("code, plan, days, status, used_by, used_at");

  if (error) {
    console.error(error);
    codesOutput.textContent = t("createFailed", { error: error.message });
    return;
  }

  codesOutput.textContent =
    "已生成兑换码（请复制保存）：\n" +
    data.map((r) => r.code).join("\n");

  pageState.unused = 1;
  await refreshCounts();
  await loadCdkeys(currentStatus, pageState[currentStatus]);
});

function updateSegmentCopy(status) {
  const copy = getStatusCopy(status);
  statusBadge.textContent = copy.label;
  statusBadge.classList.toggle("success", status === "unused");
  listTitle.textContent = copy.title;
  listDesc.textContent = copy.desc;
  listTag.textContent = copy.tag;
}

function updatePageControls() {
  const page = pageState[currentStatus];
  const totalPage = Math.max(1, totalPages[currentStatus]);
  pageInfo.textContent = t("pageInfo", {
    page,
    total: totalPage,
    count: totalCounts[currentStatus],
  });

  prevPageBtn.disabled = page <= 1;
  nextPageBtn.disabled = page >= totalPage || totalPage === 0;
}

async function refreshCounts() {
  const [
    { data: unusedCount, error: unusedError },
    { data: usedCount, error: usedError },
  ] = await Promise.all([
    supabase.rpc("count_cd_keys_by_status", { p_status: "unused" }),
    supabase.rpc("count_cd_keys_by_status", { p_status: "used" }),
  ]);

  if (!unusedError && typeof unusedCount === "number") {
    const count = unusedCount;
    if (unusedCountSpan) unusedCountSpan.textContent = count;
    totalCounts.unused = count;
    totalPages.unused = Math.max(1, Math.ceil(count / PAGE_SIZE));
  } else if (unusedError) {
    console.error("refreshCounts unused error", unusedError);
  }

  if (!usedError && typeof usedCount === "number") {
    const count = usedCount;
    if (usedCountSpan) usedCountSpan.textContent = count;
    totalCounts.used = count;
    totalPages.used = Math.max(1, Math.ceil(count / PAGE_SIZE));
  } else if (usedError) {
    console.error("refreshCounts used error", usedError);
  }

  updatePageControls();
  updatePills();
}

// 汇总基础指标与 7 日趋势
async function loadAdminAnalytics() {
  const today = new Date();
  const since7d = new Date(today);
  since7d.setDate(today.getDate() - 6);

  const requests = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("created_at").gte("created_at", since7d.toISOString()),
    supabase
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .gt("expire_at", new Date().toISOString()),
    supabase.rpc("count_cd_keys_by_status", { p_status: "used" }),
    supabase.rpc("count_cd_keys_by_status", { p_status: "unused" }),
    supabase
      .from("cd_keys")
      .select("used_at")
      .not("used_at", "is", null)
      .gte("used_at", since7d.toISOString()),
  ]).catch((err) => {
    console.error("loadAdminAnalytics", err);
    return [];
  });

  const [profilesResp = {}, recentResp = {}, activeResp = {}, usedResp = {}, unusedResp = {}, redeemResp = {}] = requests;
  const { count: userCount } = profilesResp;
  const { data: recentProfiles } = recentResp;
  const { count: activeCount } = activeResp;
  const { data: usedCount } = usedResp;
  const { data: unusedCount } = unusedResp;
  const { data: recentRedeems } = redeemResp;

  if (kpiUsers) kpiUsers.textContent = typeof userCount === "number" ? userCount : "—";
  if (kpiActive) kpiActive.textContent = typeof activeCount === "number" ? activeCount : "—";

  const used = typeof usedCount === "number" ? usedCount : 0;
  const unused = typeof unusedCount === "number" ? unusedCount : 0;
  if (kpiCdkeyTotal) kpiCdkeyTotal.textContent = used + unused;
  if (kpiCdkeySplit) kpiCdkeySplit.textContent = `${t("kpiCdkeyUsed")}: ${used} / ${unused}`;

  const { labels: userLabels, values: userValues } = buildDailySeries(recentProfiles || [], "created_at");
  const { labels: redeemLabels, values: redeemValues } = buildDailySeries(recentRedeems || [], "used_at");

  analyticsState.datasets = {
    signup: { labels: userLabels, values: userValues, color: "#5ac8fa" },
    redeem: { labels: redeemLabels, values: redeemValues, color: "#7d89ff" },
  };

  // 初始化或更新单个 Chart 实例，避免重复创建导致的高度递增。
  if (!analyticsChart) {
    initAnalyticsCharts();
  } else {
    updateAnalyticsChart(analyticsState.activeTab);
  }
}

async function loadCdkeys(status, page = 1) {
  const offset = (page - 1) * PAGE_SIZE;

  pageState[status] = page;
  selectedCodes.clear();
  updateBulkButtons();

  const { data, error, count } = await supabase
    .from("cd_keys")
    .select("code, plan, days, status, used_by, used_at", { count: "exact" })
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (error) {
    console.error("loadCdkeys error", error);
    return;
  }

  totalCounts[status] = count ?? 0;
  totalPages[status] = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));

  if (page > totalPages[status]) {
    pageState[status] = totalPages[status];
    return loadCdkeys(status, pageState[status]);
  }

  cdkeyTableBody.innerHTML = "";

  if (!data.length) {
    const emptyRow = document.createElement("tr");
    emptyRow.classList.add("empty-row");
    emptyRow.innerHTML = `<td colspan="7">${getStatusCopy(status).empty}</td>`;
    cdkeyTableBody.appendChild(emptyRow);
  } else {
    data.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" class="row-select" data-code="${row.code}" /></td>
        <td>${row.code}</td>
        <td>${row.plan}</td>
        <td>${row.days}</td>
        <td>${row.status}</td>
        <td>${row.used_by ?? ""}</td>
        <td>${row.used_at ? new Date(row.used_at).toLocaleString() : ""}</td>
      `;
      tr.querySelector(".row-select")?.addEventListener("change", (e) => {
        const code = e.target.dataset.code;
        if (!code) return;
        if (e.target.checked) {
          selectedCodes.add(code);
        } else {
          selectedCodes.delete(code);
        }
        updateBulkButtons();
      });
      cdkeyTableBody.appendChild(tr);
    });
  }

  if (status === "unused" && unusedCountSpan) {
    unusedCountSpan.textContent = count ?? 0;
  }

  if (status === "used" && usedCountSpan) {
    usedCountSpan.textContent = count ?? 0;
  }

  updatePageControls();
  updatePills();
  updateBulkButtons();
}

function formatSubscription(sub) {
  if (!sub) return { label: "—", expire: "—" };
  const expire = new Date(sub.expire_at);
  const active = expire.getTime() > Date.now();
  return {
    label: active ? t("statusActive") || "Active" : t("statusExpired") || "Expired",
    expire: expire.toLocaleString(),
    plan: sub.plan,
  };
}

async function loadUsers(page = 1) {
  userPage = page;
  let query = supabase
    .from("profiles")
    .select("id, email, is_admin, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * USER_PAGE_SIZE, page * USER_PAGE_SIZE - 1);

  if (userSearchTerm) {
    query = query.ilike("email", `%${userSearchTerm}%`);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error("loadUsers", error);
    return;
  }

  totalUserPages = Math.max(1, Math.ceil((count || 0) / USER_PAGE_SIZE));
  if (userPageInfo) userPageInfo.textContent = t("pageInfo", { page: userPage, total: totalUserPages, count: count || 0 });
  if (userPrevBtn) userPrevBtn.disabled = userPage <= 1;
  if (userNextBtn) userNextBtn.disabled = userPage >= totalUserPages;

  const ids = data.map((u) => u.id);
  let subMap = new Map();
  if (ids.length) {
    const { data: subs } = await supabase
      .from("subscriptions")
      .select("user_id, plan, expire_at")
      .in("user_id", ids)
      .order("expire_at", { ascending: false });
    subMap = new Map(subs?.map((s) => [s.user_id, s]));
  }

  if (userTableBody) userTableBody.innerHTML = "";
  assignableUsers = data.map((user) => {
    const sub = subMap.get(user.id);
    const subMeta = formatSubscription(sub);
    const enriched = { ...user, subscription: subMeta };
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.email}</td>
      <td>${subMeta.label}</td>
      <td>${subMeta.expire}</td>
      <td>${user.is_admin ? "Yes" : "No"}</td>
    `;
    tr.addEventListener("click", () => selectUser(enriched));
    userTableBody?.appendChild(tr);
    return enriched;
  });

  renderAssignUserList(assignEmailInput?.value?.trim() || "");
}

async function loadAssignableUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, is_admin, created_at, subscriptions(plan, expire_at)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("loadAssignableUsers", error);
    return;
  }

  assignableUsers = (data || []).map((user) => {
    const sub = user.subscriptions?.[0];
    return { ...user, subscription: formatSubscription(sub) };
  });

  renderAssignUserList(assignEmailInput?.value?.trim() || "");
}

async function loadUserDetail(user) {
  if (!userDetailBody) return;
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("plan, expire_at")
    .eq("user_id", user.id)
    .order("expire_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: redeems } = await supabase
    .from("cd_keys")
    .select("code, used_at, days")
    .eq("used_by", user.id)
    .order("used_at", { ascending: false })
    .limit(5);

  const subMeta = formatSubscription(sub);
  const redeemList =
    redeems?.map(
      (r) => `<li><strong>${r.code}</strong> · ${r.days || "—"} 天 · ${r.used_at ? new Date(r.used_at).toLocaleString() : ""}</li>`
    ) || [];

  userDetailBody.innerHTML = `
    <div class="info-list">
      <div><strong>Email：</strong>${user.email}</div>
      <div><strong>User ID：</strong>${user.id}</div>
      <div><strong>订阅：</strong>${subMeta.plan || "—"} · ${subMeta.label}</div>
      <div><strong>到期：</strong>${subMeta.expire}</div>
      <div><strong>管理员：</strong>${user.is_admin ? "Yes" : "No"}</div>
    </div>
    <div>
      <p class="sub-text">最近兑换</p>
      <ul class="bullets">${redeemList.join("") || "<li>暂无记录</li>"}</ul>
    </div>
  `;
}

async function selectUser(user) {
  selectedUser = user;
  await loadUserDetail(user);
}

function renderAssignUserList(filter = "") {
  if (!assignUserList) return;
  const keyword = filter.toLowerCase();
  assignUserList.innerHTML = "";

  const list = (assignableUsers || [])
    .filter((u) => !keyword || u.email?.toLowerCase().includes(keyword))
    .slice(0, 10);

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "assign-user-empty";
    empty.textContent = t("assignUserEmpty");
    assignUserList.appendChild(empty);
    return;
  }

  list.forEach((user) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "assign-user-item";
    item.innerHTML = `
      <div class="email">${user.email}</div>
      <div class="sub">${user.subscription?.label || "—"}</div>
    `;
    item.addEventListener("click", () => {
      if (assignEmailInput) assignEmailInput.value = user.email;
      assignTargetUserId = user.id;
      if (assignStatus) assignStatus.textContent = `${user.email}`;
    });
    assignUserList.appendChild(item);
  });
}

function switchStatus(status) {
  currentStatus = status;

  segmentTabs.forEach((tab) => {
    const isActive = tab.dataset.status === status;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  updateSegmentCopy(status);
  updatePageControls();
  updateBulkActionVisibility();
  loadCdkeys(status, pageState[status]);
}

function updateBulkButtons() {
  const hasSelection = selectedCodes.size > 0;
  if (bulkDeleteBtn) bulkDeleteBtn.disabled = !hasSelection;
  if (bulkAssignBtn) bulkAssignBtn.disabled = !hasSelection || currentStatus !== "unused";
  if (selectAllCheckbox) selectAllCheckbox.checked = hasSelection && selectedCodes.size >= (cdkeyTableBody?.querySelectorAll(".row-select")?.length || 0);
  updateAssignSelectedCopy();
  updateDeleteConfirmCopy();
}

function updateBulkActionVisibility() {
  if (bulkAssignBtn) {
    bulkAssignBtn.style.display = currentStatus === "unused" ? "" : "none";
  }
}

segmentTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetStatus = tab.dataset.status;
    if (targetStatus && targetStatus !== currentStatus) {
      switchStatus(targetStatus);
    }
  });
});

prevPageBtn.addEventListener("click", () => {
  if (pageState[currentStatus] > 1) {
    pageState[currentStatus] -= 1;
    loadCdkeys(currentStatus, pageState[currentStatus]);
  }
});

nextPageBtn.addEventListener("click", () => {
  if (pageState[currentStatus] < totalPages[currentStatus]) {
    pageState[currentStatus] += 1;
    loadCdkeys(currentStatus, pageState[currentStatus]);
  }
});

userPrevBtn?.addEventListener("click", () => {
  if (userPage > 1) loadUsers(userPage - 1);
});

userNextBtn?.addEventListener("click", () => {
  if (userPage < totalUserPages) loadUsers(userPage + 1);
});

userSearchInput?.addEventListener(
  "input",
  debounce((e) => {
    userSearchTerm = e.target.value.trim();
    loadUsers(1);
  }, 280)
);

adminRedeemForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!selectedUser) {
    adminRedeemStatus.textContent = "请先在用户列表中选择一个用户";
    return;
  }
  const code = adminRedeemInput.value.trim();
  if (!code) {
    adminRedeemStatus.textContent = "请输入要兑换的 CDKey";
    return;
  }
  adminRedeemStatus.textContent = "处理中...";
  try {
    await redeemCdkeyForUser(selectedUser.id, code);
    adminRedeemStatus.textContent = `已为 ${selectedUser.email} 成功兑换 1 个 CDKey`;
    adminRedeemInput.value = "";
    await loadUserDetail(selectedUser);
    await refreshCounts();
    await Promise.all([
      loadCdkeys("unused", pageState.unused),
      loadCdkeys("used", pageState.used),
      loadAdminAnalytics(),
    ]);
  } catch (err) {
    console.error("redeemCdkeyForUser failed", err);
    adminRedeemStatus.textContent = err.message || "兑换失败";
  }
});

bulkDeleteBtn?.addEventListener("click", () => openDeleteConfirm());
bulkAssignBtn?.addEventListener("click", () => toggleAssignModal(true));
closeAssignBtn?.addEventListener("click", () => toggleAssignModal(false));
assignEmailInput?.addEventListener("input", () => {
  assignTargetUserId = null;
  renderAssignUserList(assignEmailInput.value.trim());
});
closeDeleteConfirmBtn?.addEventListener("click", () => toggleDeleteConfirm(false));
cancelDeleteBtn?.addEventListener("click", () => toggleDeleteConfirm(false));
confirmDeleteBtn?.addEventListener("click", async () => {
  const codes = Array.from(selectedCodes);
  if (!codes.length) return;
  try {
    await deleteSelectedCodes(codes);
    if (deleteConfirmDesc) deleteConfirmDesc.textContent = `已删除 ${codes.length} 个 CDKey`;
    toggleDeleteConfirm(false);
    updateBulkButtons();
  } catch (err) {
    // deleteSelectedCodes 已处理错误提示
  }
});

assignForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const codes = currentStatus === "unused" ? Array.from(selectedCodes) : [];
  if (!codes.length) {
    if (assignStatus) assignStatus.textContent = "请先选择至少一个 CDKey";
    return;
  }
  const email = assignEmailInput?.value?.trim();
  if (!email) {
    if (assignStatus) assignStatus.textContent = "请输入或选择目标用户邮箱";
    return;
  }

  if (assignStatus) assignStatus.textContent = "处理中...";
  try {
    const result = await assignCdkeysToUser(email, codes);
    const successCount = result?.filter((row) => row.result === "ok").length || 0;
    const failed = result?.filter((row) => row.result?.startsWith("error"))?.length || 0;
    assignStatus.textContent = failed
      ? `成功为 ${email} 分配 ${successCount} 个 CDKey，有 ${failed} 个失败，请检查日志或 CDKey 状态`
      : `成功为 ${email} 分配 ${successCount} 个 CDKey`;
    toggleAssignModal(false);
    const targetId = assignTargetUserId;
    assignTargetUserId = null;
    if (assignEmailInput) assignEmailInput.value = "";
    selectedCodes.clear();
    updateBulkButtons();
    await refreshCounts();
    await Promise.all([
      loadCdkeys("unused", pageState.unused),
      loadCdkeys("used", pageState.used),
      loadAdminAnalytics(),
    ]);
    if (selectedUser && (selectedUser.id === targetId || selectedUser.email === email)) {
      await loadUserDetail(selectedUser);
    }
  } catch (err) {
    console.error("assign_cdkeys_to_user failed", err);
    if (assignStatus) assignStatus.textContent = err.message || "分配失败";
  }
});

selectAllCheckbox?.addEventListener("change", (e) => {
  const checked = e.target.checked;
  cdkeyTableBody?.querySelectorAll(".row-select")?.forEach((box) => {
    box.checked = checked;
    const code = box.dataset.code;
    if (!code) return;
    if (checked) {
      selectedCodes.add(code);
    } else {
      selectedCodes.delete(code);
    }
  });
  updateBulkButtons();
});

function debounce(fn, delay = 200) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

async function redeemCdkeyForUser(userId, code) {
  try {
    const { data, error } = await supabase.rpc("admin_redeem_code_for_user", { code, user_id: userId });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("admin_redeem_code_for_user rpc error", { error: err, code });
    throw new Error(err.message || "兑换失败");
  }
}

async function assignCdkeysToUser(email, codes) {
  try {
    const { data, error } = await supabase.rpc("assign_cdkeys_to_user", { codes, email });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("assign_cdkeys_to_user rpc error", { error: err, email, count: codes?.length || 0 });
    throw new Error(err.message || "分配失败");
  }
}

async function deleteSelectedCodes(codes = Array.from(selectedCodes)) {
  if (!codes.length) return;
  try {
    const { error } = await supabase.from("cd_keys").delete().in("code", codes);
    if (error) throw error;
    selectedCodes.clear();
    await refreshCounts();
    await loadCdkeys(currentStatus, pageState[currentStatus]);
  } catch (err) {
    console.error("deleteSelectedCodes", err);
    if (deleteConfirmDesc) deleteConfirmDesc.textContent = err.message || "删除失败";
    throw err;
  }
}

function toggleDeleteConfirm(show) {
  if (!deleteConfirmModal) return;
  if (show) {
    lastFocusedDeleteTrigger = document.activeElement;
    deleteConfirmModal.classList.add("active");
    deleteConfirmModal.setAttribute("aria-hidden", "false");
    deleteConfirmModal.setAttribute("role", "dialog");
    deleteConfirmModal.setAttribute("aria-modal", "true");
    confirmDeleteBtn?.focus();
  } else {
    bulkDeleteBtn?.focus();
    if (!bulkDeleteBtn && lastFocusedDeleteTrigger instanceof HTMLElement) {
      lastFocusedDeleteTrigger.focus();
    }
    deleteConfirmModal.classList.remove("active");
    deleteConfirmModal.setAttribute("aria-hidden", "true");
  }
}

function openDeleteConfirm() {
  if (!selectedCodes.size) return;
  updateDeleteConfirmCopy();
  toggleDeleteConfirm(true);
}

async function toggleAssignModal(show) {
  if (!assignModal) return;
  assignModal.classList.toggle("active", !!show);
  assignModal.setAttribute("aria-hidden", show ? "false" : "true");
  if (show) {
    if (assignStatus) assignStatus.textContent = "";
    assignTargetUserId = null;
    updateAssignSelectedCopy();
    await loadAssignableUsers();
    renderAssignUserList(assignEmailInput?.value?.trim() || "");
    assignEmailInput?.focus();
  }
}

// 退出登录
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "./index.html";
});

// 页面初始化：先校验管理员，再加载列表
const user = await ensureAdmin();
if (user) {
  updateSegmentCopy(currentStatus);
  updateBulkActionVisibility();
  await loadAdminAnalytics();
  await refreshCounts();
  await loadCdkeys(currentStatus, pageState[currentStatus]);
  await loadUsers(userPage);
  await loadAssignableUsers();
}
