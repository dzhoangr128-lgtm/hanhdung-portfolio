/* Set this to the store's verified zalo.me link when the sales account is ready. */
(() => {
  const ZALO_URL = 'https://zalo.me/';
  const icon = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H5l-4 3 1.5-6A8 8 0 1 1 20 11.5Z" transform="translate(1 -1)"/><path d="M7 10h8M7 14h5"/></svg>';
  const root = document.createElement('div');
  root.className = 'quick-chat';
  root.innerHTML = `<button class="chat-launcher" aria-expanded="false" aria-controls="daizy-chat">${icon}<span>Chat nhanh</span></button><section id="daizy-chat" class="chat-panel" role="dialog" aria-labelledby="chat-title" hidden><div class="chat-header"><div><span class="chat-eyebrow">DAIZY CARE</span><h2 id="chat-title">Mình giúp gì cho bạn?</h2><p>Hỗ trợ nhanh khi chọn đồ tập</p></div><button class="chat-close" aria-label="Đóng chat">×</button></div><div class="chat-body"><p class="chat-intro">Chào bạn! Chọn chủ đề bên dưới để xem thông tin ngay nhé.</p><div class="chat-topics" aria-label="Chủ đề hỗ trợ"><button data-topic="size">Chọn size</button><button data-topic="fabric">Chất liệu áo wrap</button><button data-topic="shipping">Giao hàng & đổi trả</button><button data-topic="order">Tra cứu đơn hàng</button></div><div class="chat-answer" role="status" aria-live="polite" aria-atomic="true"><p>Đây là hướng dẫn tự động, không phải phiên chat với nhân viên.</p></div><div class="chat-zalo"><span>TIẾP TỤC TRÊN ZALO</span><p>Kênh Zalo DAIZY sắp mở. Bạn có thể mở ứng dụng Zalo tại đây.</p><a class="chat-zalo-link" href="${ZALO_URL}" target="_blank" rel="noopener noreferrer">Mở Zalo <span aria-hidden="true">↗</span></a></div></div></section>`;
  document.body.append(root);
  const ai = document.createElement('section');
  ai.className = 'chat-ai';
  ai.innerHTML = `<h3>Trò chuyện với AI</h3><p class="chat-ai-note">AI hỗ trợ chọn sản phẩm và giải đáp mua sắm. Tin nhắn được gửi đến OpenAI để trả lời. Không gửi mật khẩu hoặc thông tin riêng tư.</p><div class="chat-history" role="log" aria-label="Cuộc trò chuyện với AI" aria-live="polite"></div><form class="chat-ai-form"><label for="chat-ai-input">Bạn muốn hỏi gì?</label><textarea id="chat-ai-input" maxlength="1200" rows="2" required placeholder="Ví dụ: Mình mới tập Pilates, nên mua gì?"></textarea><div class="chat-ai-actions"><button type="button" class="chat-ai-clear">Xóa trò chuyện</button><button type="submit" class="chat-ai-send">Gửi ↗</button></div></form><p class="chat-ai-status" role="status">Đang kiểm tra kết nối AI…</p>`;
  root.querySelector('.chat-answer').after(ai);
  const history = ai.querySelector('.chat-history'), aiForm = ai.querySelector('form'), input = ai.querySelector('textarea'), aiStatus = ai.querySelector('.chat-ai-status'), send = ai.querySelector('.chat-ai-send'), clear = ai.querySelector('.chat-ai-clear');
  let messages = [], busy = false;
  function bubble(role, content) {
    const row = document.createElement('p'); row.className = `chat-bubble ${role}`;
    const label = document.createElement('strong'); label.textContent = role === 'user' ? 'Bạn' : 'DAIZY AI';
    const text = document.createElement('span'); text.textContent = content;
    row.append(label, text); history.append(row); row.scrollIntoView({ block: 'nearest' });
  }
  async function checkAI() {
    try {
      const response = await fetch('/api/chat'); const data = await response.json();
      if (!response.ok) throw Error();
      input.disabled = send.disabled = !data.available;
      aiStatus.textContent = data.available ? 'Sẵn sàng hỗ trợ bạn. AI có thể nhầm; hãy kiểm tra thông tin trước khi mua.' : 'Chat AI sắp mở. Trong lúc chờ, bạn có thể chọn các chủ đề bên trên.';
    } catch { input.disabled = send.disabled = true; aiStatus.textContent = 'AI tạm chưa kết nối. Các chủ đề hỗ trợ nhanh vẫn dùng được.'; }
  }
  input.disabled = send.disabled = true;
  checkAI();
  clear.addEventListener('click', () => { if (busy) return; messages = []; history.replaceChildren(); aiStatus.textContent = 'Đã xóa cuộc trò chuyện.'; });
  aiForm.addEventListener('submit', async event => {
    event.preventDefault(); if (busy || !input.value.trim()) return;
    const question = input.value.trim();
    const pending = [...messages.slice(-10), { role: 'user', content: question }];
    bubble('user', question); input.value = ''; busy = true; input.disabled = send.disabled = clear.disabled = true; aiStatus.textContent = 'DAIZY AI đang trả lời…';
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: pending }), signal: AbortSignal.timeout(35000) });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== 'string') throw Error(data.error || 'Chưa nhận được câu trả lời.');
      messages = [...pending, { role: 'assistant', content: data.reply }]; bubble('assistant', data.reply); aiStatus.textContent = 'Bạn có thể hỏi tiếp.';
    } catch (error) { aiStatus.textContent = error.name === 'TimeoutError' ? 'AI phản hồi chậm. Hãy thử lại sau.' : error.message; input.value = question; }
    finally { busy = false; input.disabled = send.disabled = clear.disabled = false; if (!panel.hidden) input.focus({ preventScroll: true }); }
  });
  const launcher = root.querySelector('.chat-launcher'), panel = root.querySelector('.chat-panel'), close = root.querySelector('.chat-close'), answer = root.querySelector('.chat-answer');
  const answers = {
    size: '<h3>Chọn size vừa với bạn</h3><p>Trang phục có XS, S, M, L; phụ kiện One size. Vào trang sản phẩm → “Hướng dẫn chọn size” để xem bảng ngực, eo và mông tham khảo.</p><a href="/cua-hang">Xem sản phẩm & bảng size ↗</a>',
    fabric: '<h3>Áo wrap mỏng nhẹ</h3><p>Vải mịn và rủ mềm, tay áo hơi xuyên nhẹ để phối cùng bra. Vạt đắp chéo và dây buộc eo tạo dáng ballet thanh thoát.</p><a href="/san-pham/ballet-wrap">Xem áo wrap và 5 màu ↗</a>',
    shipping: '<h3>Giao hàng & đổi trả</h3><p>Phí giao hàng hiện tại 30.000₫, miễn phí từ 500.000₫ tiền sản phẩm. Thanh toán COD khi nhận hàng. Xem trang chính sách để biết trạng thái và điều kiện đổi trả hiện tại.</p><a href="/chinh-sach">Đọc chính sách mua sắm ↗</a>',
    order: '<h3>Tra cứu đơn của bạn</h3><p>Dùng mã đơn và khóa tra cứu được cấp khi đặt hàng. Nhập hai thông tin đó tại trang tra đơn; giữ khóa tra cứu riêng tư.</p><a href="/don-hang">Mở trang tra cứu đơn ↗</a>'
  };
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) close.focus(); else launcher.focus({ preventScroll: true });
  }
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  root.addEventListener('click', e => {
    const topic = e.target.closest('[data-topic]');
    if (topic) {
      root.querySelectorAll('[data-topic]').forEach(b => b.setAttribute('aria-pressed', String(b === topic)));
      answer.innerHTML = answers[topic.dataset.topic];
      answer.scrollIntoView({ block: 'nearest' });
    }
    const link = e.target.closest('a');
    if (link && link.origin === location.origin) {
      panel.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) setOpen(false); });
})();
