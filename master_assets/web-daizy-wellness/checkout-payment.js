/* SePay sandbox UI. Secrets stay in memory and never enter URLs or localStorage. */
(() => {
  let enabled = false;
  const content = document.getElementById('content');
  function addChoice() {
    const form = document.getElementById('checkout-form');
    if (!enabled || !form || form.querySelector('[name=payment_choice]')) return;
    const choice = document.createElement('fieldset'); choice.className = 'full payment-choice';
    choice.innerHTML = '<legend>Phương thức thanh toán</legend><label class="check"><input type="radio" name="payment_choice" value="cod" checked> Thanh toán khi nhận hàng (COD)</label><label class="check"><input type="radio" name="payment_choice" value="sepay-test"> SePay — thử nghiệm cho bài tập</label><p class="muted">SePay đang ở chế độ mô phỏng, không chuyển tiền thật. Đơn vẫn chưa được thanh toán thực tế.</p>';
    const notice = form.querySelector('.notice'); if (notice) notice.replaceWith(choice); else form.prepend(choice);
    const button = form.querySelector('button.primary');
    const original = button.textContent;
    choice.addEventListener('change', () => { button.textContent = choice.querySelector('[value="sepay-test"]').checked ? original.replace('Đặt hàng COD', 'Đặt đơn & thử SePay') : original; });
  }
  new MutationObserver(addChoice).observe(content, { childList: true, subtree: true });
  fetch('/api/sepay-test').then(r => r.ok ? r.json() : null).then(data => { enabled = data?.available === true; addChoice(); }).catch(() => {});
  window.DaizyPayments = {
    show(order, token, autoStart = false, target = content.querySelector('.article')) {
      if (!enabled || order.status !== 'pending' || !target) return;
      target.querySelector('.sepay-payment')?.remove();
      const panel = document.createElement('section'); panel.className = 'sepay-payment notice';
      panel.innerHTML = '<h2>SePay · Thanh toán thử nghiệm</h2><p>Không quét mã hoặc chuyển tiền thật. Kết quả mô phỏng không xác nhận thanh toán thật cho đơn hàng.</p><p class="sepay-status" role="status" aria-live="polite"></p><div class="sepay-details" hidden><dl><dt>Ngân hàng giả lập</dt><dd data-field="bank"></dd><dt>Tài khoản giả lập</dt><dd data-field="account"></dd><dt>Số tiền mô phỏng</dt><dd data-field="amount"></dd><dt>Nội dung chuyển khoản mô phỏng</dt><dd data-field="code"></dd></dl><p>Trong SePay → Test mode → Mô phỏng giao dịch, chọn tài khoản trên, Tiền vào và nhập đúng số tiền, nội dung. Trang này sẽ tự kiểm tra kết quả trong 5 phút.</p></div><button type="button" class="button primary">Tạo / kiểm tra thanh toán thử</button>';
      target.append(panel);
      const status = panel.querySelector('.sepay-status'), button = panel.querySelector('button'), details = panel.querySelector('.sepay-details');
      let busy = false, paid = false, timer, attempts = 0;
      async function check(automatic = false) {
        if (busy || paid || !panel.isConnected) return;
        clearTimeout(timer); busy = true; button.disabled = true;
        if (!automatic) status.textContent = 'Đang kiểm tra SePay…';
        try {
          const response = await fetch('/api/sepay-test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: order.id, token }), signal: AbortSignal.timeout(20000) });
          let data; try { data = await response.json(); } catch { throw Error('Dịch vụ thử nghiệm tạm gián đoạn. Bạn có thể kiểm tra lại.'); }
          if (!response.ok) throw Error(data.error || 'Chưa nhận được phản hồi.');
          const values = { bank: data.bank, account: data.account, amount: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.amount), code: data.code };
          for (const [name, value] of Object.entries(values)) panel.querySelector(`[data-field="${name}"]`).textContent = value;
          details.hidden = false; paid = data.status === 'paid_test';
          status.textContent = paid ? 'Đã nhận thanh toán THỬ từ SePay. Không có tiền thật được ghi nhận.' : 'Đang chờ giao dịch mô phỏng từ SePay…';
          button.textContent = paid ? 'Đã hoàn tất thử nghiệm' : 'Kiểm tra lại kết quả';
          if (!paid && ++attempts < 60) timer = setTimeout(() => check(true), 5000);
          else if (!paid) status.textContent = 'Đã tạm dừng tự kiểm tra. Bấm kiểm tra lại khi bạn mô phỏng xong.';
        } catch (error) { status.textContent = error.name === 'TimeoutError' ? 'Kết nối chậm. Hãy bấm kiểm tra lại.' : error.message; }
        finally { busy = false; button.disabled = paid; }
      }
      button.addEventListener('click', () => { attempts = 0; check(); });
      if (autoStart) check();
    }
  };
})();
