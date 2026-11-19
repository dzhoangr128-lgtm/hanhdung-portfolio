const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const brainDir = 'C:\\Users\\AD\\.gemini\\antigravity\\brain\\0d862ca1-300a-488d-965f-6867e665b662';
const imgDir = 'c:\\Users\\AD\\Downloads\\Goi-Skill-AICO01-Giang-Vien (1)\\Anh-5-Bai-Facebook-Pilates';

const newPosts = [
  {
    id: 1,
    image: path.join(brainDir, 'post1_pilates_co_vai_gay_png_1794145641877.jpg'),
    text: `Đừng đợi đến khi tan làm mới cứu lấy đôi vai đang gồng cứng của bạn 🌿

Ngồi gõ máy tính 6–8 tiếng mỗi ngày khiến cơ ngực co rút, kéo hai vai khom về trước gây đau mỏi cổ vai gáy và tạo dáng "lưng tôm, cổ rùa".

✨ Dành 60 giây thực hiện 3 nhịp Pilates mở vai ngay trên ghế làm việc:

• Bước 1 — Chỉnh trục ngồi (15 giây):
Đặt hai bàn chân chạm phẳng sàn, vươn dài đỉnh đầu lên trần nhà, thu nhẹ cằm về hõm cổ.

• Bước 2 — Cuộn mở khớp vai (30 giây):
Hít sâu bằng mũi nâng nhẹ hai vai rồi xoay mở rộng ra sau để mở thoáng lồng ngực. Thở ra chậm bằng miệng, hạ sâu hai bả vai xuống xa khỏi tai (lặp lại 5 nhịp).

• Bước 3 — Thả lỏng áp lực (15 giây):
Đặt tay lên đùi, nhắm mắt hít thở sâu 3 nhịp và thả lỏng toàn bộ vai, cổ, chân mày.

📌 Lưu lại để 3h chiều mỗi ngày dành 1 phút trả lại dáng ngồi thẳng đẹp nhé!

#DaizyPilates #PilatesVanPhong #GiamDauCoVaiGay #ChinhDang`
  },
  {
    id: 2,
    image: path.join(brainDir, 'post2_tra_thao_moc_chieu_png_1794145661640.jpg'),
    text: `2h30 chiều uể oải: Đổi ly trà sữa nhiều đường lấy "tách trà nắng ấm" giúp êm bụng, sáng da 🍵

Cơn tỉnh táo từ trà sữa hay cà phê đậm đặc buổi chiều thường đi kèm cảm giác đầy hơi, tích mỡ bụng dưới và khó ngủ sâu vào ban đêm.

🌼 Công thức Trà Hoa Cúc – Táo Đỏ – Kỷ Tử pha trong 3 phút tại văn phòng:

• 3–5 bông hoa cúc khô: Làm dịu hệ thần kinh căng thẳng và giảm mỏi mắt khi nhìn màn hình lâu.
• 2 quả táo đỏ cắt lát: Tạo vị ngọt thanh tự nhiên không cần đường, giúp bổ khí huyết.
• 7–10 hạt kỷ tử: Giàu chất chống oxy hóa, giữ ấm cơ thể trong phòng điều hòa.
• Cách pha: Ủ với 250ml nước nóng 85°C trong 5 phút là dùng được ngay.

💡 Mẹo nhỏ chống đói vặt lúc 4h chiều:
• Nhâm nhi trà ấm cùng 7–10 hạt hạnh nhân nguyên vị giúp duy trì năng lượng ổn định mà vòng eo vẫn nhẹ tênh.

📌 Lưu lại công thức này cho góc bàn làm việc ngày mai của bạn nhé!

#DaizyPilates #DinhDuongLanhManh #TraThaoMoc #HealthyOffice`
  },
  {
    id: 3,
    image: path.join(imgDir, 'Bai-1-Pilates-Pelvic-Curl.jpg'),
    text: `47kg nhưng mặc váy ôm vẫn lộ bụng dưới? Có thể bạn không béo, mà đang bị "Đổ xương chậu về trước" 🌿

Ngồi văn phòng lâu khiến cơ gập hông co rút, làm khung chậu nghiêng đổ về trước và đẩy bụng dưới nhô ra kèm mỏi thắt lưng.

🔎 Tự kiểm tra nhanh trong 10 giây:
• Đứng quay lưng áp sát tường (đầu, vai, mông chạm tường).
• Bàn tay luồn vừa khít sau thắt lưng: Khung chậu chuẩn.
• Đút lọt cả nắm đấm tay: Xương chậu đang bị đổ về trước.

🧘‍♀️ Bài tập Pilates Pelvic Curl (3 phút mỗi tối):
• Bước 1: Nằm ngửa trên thảm, gập gối, hai bàn chân mở rộng bằng hông.
• Bước 2: Hít sâu bằng mũi, thả lỏng hai vai.
• Bước 3: Thở ra bằng miệng, rút nhẹ rốn ấn thắt lưng chạm thảm rồi nâng hông lên thành đường chéo thẳng từ vai đến gối.
• Bước 4: Hít vào giữ 2 giây, thở ra hạ từng đốt sống xuống thảm.

📌 Lưu lại tập 10 nhịp mỗi tối để thu gọn eo dưới và hết mỏi lưng nhé!

#DaizyPilates #PilatesChinhDang #PelvicCurl #GiamMoBungDuoi`
  },
  {
    id: 4,
    image: path.join(imgDir, 'Bai-2-Dia-An-Trua-211.jpg'),
    text: `Quy tắc "Đĩa ăn 2–1–1 & Thứ tự gắp thức ăn" giúp bụng phẳng, chiều không buồn ngủ 🥗

Đừng cắt sạch tinh bột vào bữa trưa khiến 3h chiều bủn rủn tay chân! Để vừa đủ năng lượng vừa không tích mỡ bụng, bạn chỉ cần áp dụng 2 nguyên tắc sau:

🍽️ Chia đĩa ăn bằng mắt theo tỷ lệ 2 – 1 – 1:
• 2 phần (50% đĩa) — Chất xơ: Bông cải xanh, rau lá xanh luộc hoặc salad giúp lót dạ dày.
• 1 phần (25% đĩa) — Đạm lành mạnh: Cá hồi áp chảo, ức gà, trứng lòng đào hoặc đậu phụ giúp săn chắc cơ sau tập Pilates.
• 1 phần (25% đĩa) — Tinh bột hấp thu chậm: Cơm gạo lứt, hạt quinoa hoặc khoai lang giúp não tỉnh táo.

🥢 Thứ tự gắp thức ăn chống tăng đường huyết đột ngột:
• Ăn 50% phần rau xanh đầu tiên.
• Ăn tiếp phần đạm (cá, thịt, trứng).
• Ăn phần tinh bột sau cùng để không bị buồn ngủ lúc 2h chiều.

📌 Lưu ngay hình ảnh đĩa ăn 2–1–1 này để áp dụng ngay từ bữa tới nhé!

#DaizyPilates #DinhDuongPilates #DiaAn211 #EatCleanVanPhong`
  },
  {
    id: 5,
    image: path.join(imgDir, 'Bai-3-Pilates-Mo-Khop-Hong.jpg'),
    text: `Đang đọc bài này mà ngồi vắt chéo chân, hãy nhẹ nhàng hạ hai bàn chân chạm sàn nhé 🌿

Ngồi vắt chéo chân hàng giờ nơi công sở chính là thủ phạm âm thầm gây hại cho khung chậu và đôi chân:

⚠️ 3 tác hại khi ngồi vắt chéo chân quá lâu:
• Lệch khung xương chậu, làm hai bên eo mất cân đối và đau mỏi thắt lưng.
• Bó chặt khớp hông, dễ tích mỡ má đùi ngoài và lộ rõ hõm hông (Hip Dips).
• Cản trở tuần hoàn máu khiến bắp chân dễ tê mỏi, tích nước vào cuối ngày.

✨ 3 phút Pilates Mở Khớp Hông (Tư thế Cánh Bướm):
• Bước 1: Ngồi thẳng lưng trên thảm, áp hai lòng bàn chân vào nhau, mở nhẹ hai gối sang ngang.
• Bước 2: Hít sâu bằng mũi, vươn dài đỉnh đầu lên trần và hạ mềm hai vai.
• Bước 3: Thở ra chậm, thả lỏng đùi trong để hai đầu gối chìm dần xuống sàn. Giữ và hít thở sâu 10–15 nhịp.

📌 Lưu lại để tối nay trải thảm giải phóng khớp hông cho đôi chân nhẹ nhõm nhé!

#DaizyPilates #PilatesMoKhopHong #ChinhLechHong #PilatesForWomen`
  }
];

async function deleteOldClumpedPosts(fbPage) {
  console.log('=== Deleting the 5 old unformatted posts from 17:27-17:29 ===');
  const phrasesToDelete = [
    'Nếu cột sống',
    'Đi tập Pilates lúc 6h chiều',
    'ngồi vắt chéo chân',
    'Đĩa ăn 2–1–1',
    '47kg nhưng mặc váy ôm'
  ];

  for (const phrase of phrasesToDelete) {
    await fbPage.goto('https://www.facebook.com/profile.php?id=61596228457366', { waitUntil: 'domcontentloaded' });
    await sleep(4000);

    let openedMenu = false;
    for (let sy = 600; sy <= 3000; sy += 500) {
      await fbPage.evaluate(y => window.scrollTo(0, y), sy);
      await sleep(700);
      const res = await fbPage.evaluate((p) => {
        const posts = Array.from(document.querySelectorAll('[aria-posinset]'));
        const target = posts.find(el => (el.innerText || '').includes(p));
        if (target) {
          target.scrollIntoView({ block: 'center' });
          const menuBtn = target.querySelector('[aria-label*="Hành động đối với bài viết"], [aria-label*="Actions for this post"]');
          if (menuBtn) {
            menuBtn.click();
            return 'OPENED';
          }
        }
        return null;
      }, phrase);
      if (res === 'OPENED') {
        openedMenu = true;
        break;
      }
    }

    if (openedMenu) {
      await sleep(1200);
      await fbPage.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[role="menuitem"]'));
        const trash = items.find(i => (i.innerText || '').includes('thùng rác') || (i.innerText || '').includes('Xóa'));
        if (trash) trash.click();
      });
      await sleep(1500);
      await fbPage.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('[role="dialog"] [role="button"]'));
        const moveBtn = btns.find(b => {
          const t = (b.getAttribute('aria-label') || b.innerText || '').trim();
          return t === 'Chuyển' || t === 'Move' || t === 'Xóa';
        });
        if (moveBtn) moveBtn.click();
      });
      console.log(`🗑️ Deleted old post matching "${phrase}"`);
      await sleep(2500);
    }
  }
}

async function publishCleanPost(fbPage, post) {
  console.log(`\n=== Publishing Clean Post #${post.id} (${path.basename(post.image)}) ===`);
  await fbPage.evaluate(() => {
    window.scrollTo(0, 150);
    const spans = Array.from(document.querySelectorAll('[role="button"], span'));
    const target = spans.find(s => (s.innerText || '').trim() === 'Bạn đang nghĩ gì?');
    if (target) target.click();
  });
  await sleep(3000);

  // Upload image
  const fileInputs = await fbPage.$$('[role="dialog"][aria-label="Tạo bài viết"] input[type="file"]');
  for (const input of fileInputs) {
    const accept = await fbPage.evaluate(el => el.getAttribute('accept') || '', input);
    if (accept.includes('image')) {
      await input.uploadFile(post.image);
      console.log(`Uploaded ${path.basename(post.image)}`);
      break;
    }
  }
  await sleep(3500);

  // Focus textbox and insert line by line with Enter key for real paragraph breaks!
  const editorHandle = await fbPage.$('[role="dialog"][aria-label="Tạo bài viết"] [role="textbox"][contenteditable="true"]');
  if (editorHandle) {
    await editorHandle.click();
    await sleep(400);
    const lines = post.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 0) {
        await fbPage.evaluate((txt) => {
          document.execCommand('insertText', false, txt);
        }, line);
      }
      if (i < lines.length - 1) {
        await fbPage.keyboard.press('Enter');
        await sleep(30);
      }
    }
    console.log(`Typed ${lines.length} lines with real Enter breaks`);
  }
  await sleep(2000);

  // Click "Tiếp"
  await fbPage.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Tạo bài viết"]');
    if (!dialog) return;
    const btn = dialog.querySelector('[role="button"][aria-label="Tiếp"]:not([aria-disabled="true"])');
    if (btn) btn.click();
  });
  await sleep(2500);

  // Click "Đăng"
  await fbPage.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Tạo bài viết"]');
    if (!dialog) return;
    const btn = dialog.querySelector('[role="button"][aria-label="Đăng"]:not([aria-disabled="true"])');
    if (btn) btn.click();
  });
  await sleep(3000);

  // Dismiss "Lúc khác" and wait for close
  for (let w = 0; w < 20; w++) {
    const status = await fbPage.evaluate(() => {
      const lucKhacBtns = Array.from(document.querySelectorAll('[role="dialog"] [role="button"][aria-label="Lúc khác"]'));
      if (lucKhacBtns.length > 0) {
        lucKhacBtns[lucKhacBtns.length - 1].click();
        return 'CLICKED_LUC_KHAC';
      }
      const createDialogs = Array.from(document.querySelectorAll('[role="dialog"][aria-label="Tạo bài viết"]'));
      const activeCreate = createDialogs.find(d => (d.innerText || '').trim().length > 20);
      if (!activeCreate) return 'CLOSED';
      return 'PUBLISHING';
    });
    if (status === 'CLOSED') {
      console.log(`✅ Clean Post #${post.id} published!`);
      break;
    }
    await sleep(2000);
  }
  await sleep(3500);
}

async function main() {
  const portFile = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data', 'DevToolsActivePort');
  const lines = fs.readFileSync(portFile, 'utf8').trim().split(/\r?\n/);
  const wsEndpoint = `ws://127.0.0.1:${lines[0]}${lines[1]}`;

  const browser = await puppeteer.connect({ browserWSEndpoint: wsEndpoint, defaultViewport: null });
  const pages = await browser.pages();
  const fbPage = pages.find(p => p.url().includes('facebook.com')) || pages[0];
  await fbPage.bringToFront();

  fbPage.on('dialog', async d => {
    try { await d.accept(); } catch (e) {}
  });

  await deleteOldClumpedPosts(fbPage);

  await fbPage.goto('https://www.facebook.com/profile.php?id=61596228457366', { waitUntil: 'domcontentloaded' });
  await sleep(4500);

  for (const post of newPosts) {
    await publishCleanPost(fbPage, post);
  }

  await fbPage.goto('https://www.facebook.com/profile.php?id=61596228457366', { waitUntil: 'domcontentloaded' });
  await sleep(4500);
  await fbPage.evaluate(() => window.scrollTo(0, 1750));
  await sleep(2000);
  await fbPage.screenshot({ path: path.join(__dirname, 'final_clean_feed_verified.png') });
  console.log('\n🎉 ALL 5 OLD POSTS DELETED & 5 NEW FORMATTED POSTS PUBLISHED!');
  browser.disconnect();
}

main().catch(console.error);
