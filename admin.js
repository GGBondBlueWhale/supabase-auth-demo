import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://nmlihgbkahzipxachnki.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const adminEmailSpan = document.getElementById("admin-email");
const logoutBtn = document.getElementById("admin-logout-btn");
const createForm = document.getElementById("create-cdkey-form");
const codesOutput = document.getElementById("created-codes");
const cdkeyTableBody = document.querySelector("#cdkey-table tbody");
const unusedCountSpan = document.getElementById("unused-count");
const usedCountSpan = document.getElementById("used-count");
const segmentTabs = document.querySelectorAll(".segment-tab");
const statusBadge = document.getElementById("status-badge");
const listTitle = document.getElementById("list-title");
const listDesc = document.getElementById("list-desc");
const listTag = document.getElementById("list-tag");
const pageInfo = document.getElementById("page-info");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");

const PAGE_SIZE = 50;
let currentStatus = "unused";
const pageState = { unused: 1, used: 1 };
const totalPages = { unused: 1, used: 1 };
const totalCounts = { unused: 0, used: 0 };

const statusCopy = {
  unused: {
    label: "未使用",
    title: "等待分发的兑换码",
    desc: "支持分页查看，默认每页 50 条，可切换已使用/未使用列表。",
    tag: "最新",
    empty: "暂无未使用的兑换码",
  },
  used: {
    label: "已使用",
    title: "已经被兑换的记录",
    desc: "集中查看已使用的兑换码、使用邮箱及时间，方便追踪。",
    tag: "追踪",
    empty: "暂无已使用的兑换码",
  },
};

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
    codesOutput.textContent = "生成失败：" + error.message;
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
  const copy = statusCopy[status];
  statusBadge.textContent = copy.label;
  statusBadge.classList.toggle("success", status === "unused");
  listTitle.textContent = copy.title;
  listDesc.textContent = copy.desc;
  listTag.textContent = copy.tag;
}

function updatePageControls() {
  const page = pageState[currentStatus];
  const totalPage = Math.max(1, totalPages[currentStatus]);
  pageInfo.textContent = `第 ${page} / ${totalPage} 页（共 ${totalCounts[currentStatus]} 条）`;

  prevPageBtn.disabled = page <= 1;
  nextPageBtn.disabled = page >= totalPage || totalPage === 0;
}

async function refreshCounts() {
  const [unusedResult, usedResult] = await Promise.all([
    supabase.from("cd_keys").select("id", { count: "exact" }).eq("status", "unused"),
    supabase.from("cd_keys").select("id", { count: "exact" }).eq("status", "used"),
  ]);

  if (!unusedResult.error && unusedCountSpan) {
    unusedCountSpan.textContent = unusedResult.count ?? 0;
    totalCounts.unused = unusedResult.count ?? 0;
    totalPages.unused = Math.max(1, Math.ceil((totalCounts.unused || 0) / PAGE_SIZE));
  }

  if (!usedResult.error && usedCountSpan) {
    usedCountSpan.textContent = usedResult.count ?? 0;
    totalCounts.used = usedResult.count ?? 0;
    totalPages.used = Math.max(1, Math.ceil((totalCounts.used || 0) / PAGE_SIZE));
  }

  updatePageControls();
}

async function loadCdkeys(status, page = 1) {
  const offset = (page - 1) * PAGE_SIZE;

  pageState[status] = page;

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
    emptyRow.innerHTML = `<td colspan="6">${statusCopy[status].empty}</td>`;
    cdkeyTableBody.appendChild(emptyRow);
  } else {
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
  loadCdkeys(status, pageState[status]);
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

// 退出登录
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "./index.html";
});

// 页面初始化：先校验管理员，再加载列表
const user = await ensureAdmin();
if (user) {
  updateSegmentCopy(currentStatus);
  await refreshCounts();
  await loadCdkeys(currentStatus, pageState[currentStatus]);
}
