const params = new URLSearchParams(location.hash.slice(1));
let recoveryToken = params.get('type') === 'recovery' ? params.get('access_token') : null;
history.replaceState(null, '', location.pathname);
const status = document.getElementById('status');
const form = document.getElementById('reset');
if (recoveryToken) { form.hidden = false; status.textContent = 'Nhập mật khẩu mới, tối thiểu 12 ký tự.'; }
else status.textContent = 'Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu email khôi phục mới.';
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (form.elements.password.value !== form.elements.confirm.value) { status.textContent = 'Hai mật khẩu chưa trùng nhau.'; return; }
  const button = form.querySelector('button'); button.disabled = true;
  try {
    const response = await fetch('/api/recovery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_token: recoveryToken, password: form.elements.password.value }) });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || 'Không thể đặt lại mật khẩu. Hãy yêu cầu liên kết mới.');
    recoveryToken = null; form.reset(); form.hidden = true; status.textContent = 'Đã đổi mật khẩu. Bạn có thể về trang đăng nhập.';
  } catch (error) { status.textContent = error.message; }
  finally { button.disabled = false; }
});
