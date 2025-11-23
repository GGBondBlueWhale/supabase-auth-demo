// auth.js

// 通过 CDN 以 ESM 方式引入 supabase-js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 你的 Supabase 项目的 URL 和 anon public key
const SUPABASE_URL = 'https://nmlihgbkahzipxachnki.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbGloZ2JrYWh6aXB4YWNobmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTE0NTEsImV4cCI6MjA3OTQ4NzQ1MX0.ZcyVTqiZpZF73NpbNE1obcB5VCvY3ZARXdfSJThX6PI';

// 创建 supabase 客户端
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM 元素
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const statusEl = document.getElementById('status');
const currentUserEl = document.getElementById('current-user');

// 状态提示
function setStatus(message, isError = false) {
  statusEl.style.color = isError ? '#d9534f' : '#28a745';
  statusEl.textContent = message || '';
}

// 显示当前登录用户
async function refreshCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    currentUserEl.textContent = '当前未登录';
    logoutBtn.style.display = 'none';
    return;
  }

  const user = data.user;
  currentUserEl.textContent = `已登录用户：${user.email} (id: ${user.id})`;
  logoutBtn.style.display = 'inline-block';
}

// 监听注册表单
signupForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  setStatus('');

  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (!email || !password) {
    setStatus('请输入邮箱和密码', true);
    return;
  }

  setStatus('正在注册中...');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setStatus('注册失败：' + error.message, true);
    return;
  }

  setStatus('注册成功，如果开启了邮箱确认，请去邮箱查看确认邮件。');
  signupForm.reset();
});

// 监听登录表单
loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  setStatus('');

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    setStatus('请输入邮箱和密码', true);
    return;
  }

  setStatus('正在登录中...');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    setStatus('登录失败：' + error.message, true);
    return;
  }

  setStatus('登录成功！');
  await refreshCurrentUser();
  loginForm.reset();
});

// 退出登录
logoutBtn?.addEventListener('click', async () => {
  setStatus('正在退出登录...');
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    setStatus('退出失败：' + error.message, true);
    return;
  }
  setStatus('已退出登录');
  await refreshCurrentUser();
});

// 页面加载时检查是否已有登录状态
refreshCurrentUser();

// 登录状态变化时更新显示
supabase.auth.onAuthStateChange((_event, _session) => {
  refreshCurrentUser();
});
