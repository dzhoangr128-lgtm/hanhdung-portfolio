/**
 * ============================================================================
 * SCRIPT ĐIỀU KHIỂN PORTFOLIO TỔNG HỢP — HOÀNG THỊ HẠNH DUNG
 * Đảm bảo 100% đường dẫn ASCII sạch, xem trực tiếp Video, Web, Game, Tài liệu & Ảnh
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  setupPortfolioInteractions();
});

// 1. MỞ LIGHTBOX XEM ẢNH ĐỘ PHÂN GIẢI CAO
window.openLightbox = function (imgSrc, caption) {
  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem; padding-right: 2.8rem;">
      <h3 style="font-size: 1.12rem;">${caption}</h3>
      <a href="${imgSrc}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
        ↗ Mở ảnh gốc ở tab mới
      </a>
    </div>
    <div style="background: #12131A; border-radius: 14px; overflow: hidden; text-align: center; padding: 0.5rem;">
      <img src="${imgSrc}" alt="${caption}" style="max-width: 100%; max-height: 75vh; object-fit: contain; display: block; margin: 0 auto; border-radius: 8px;" />
    </div>
  `;
  modal.classList.add("open");
};

// 2. MỞ RẠP CHIẾU VIDEO TRỰC TIẾP TRONG MODAL
window.openVideoModal = function (videoSrc, title) {
  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem; padding-right: 2.8rem;">
      <h3 style="font-size: 1.15rem;">🎬 ${title}</h3>
      <a href="${videoSrc}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
        ↗ Mở video ở tab mới
      </a>
    </div>
    <div style="background: #000; border-radius: 14px; overflow: hidden; border: 2px solid #18181B;">
      <video controls autoplay preload="auto" style="width: 100%; max-height: 74vh; display: block; margin: 0 auto;">
        <source src="${videoSrc}" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ phát video.
      </video>
    </div>
  `;
  modal.classList.add("open");
};

// 3. MỞ KHUNG TƯƠNG TÁC TRỰC TIẾP (CHƠI GAME / TRẢI NGHIỆM WEB / XEM BÁO CÁO HTML / SLIDE)
window.openInteractiveSandbox = function (url, title, externalUrl) {
  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  const targetLink = externalUrl || url;
  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem; padding-right: 2.8rem;">
      <h3 style="font-size: 1.12rem;">${title}</h3>
      <a href="${targetLink}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        ↗ Mở toàn màn hình ở tab mới
      </a>
    </div>
    <div style="width: 100%; height: 75vh; border-radius: 14px; overflow: hidden; border: 2px solid #18181B; background: #FFFFFF;">
      <iframe src="${url}" title="${title}" style="width: 100%; height: 100%; border: none;" allow="autoplay; fullscreen"></iframe>
    </div>
  `;
  modal.classList.add("open");
};

// 4. MỞ TRÌNH ĐỌC TÀI LIỆU / CODE TRỰC TIẾP TRÊN WEB (KHÔNG CẦN CÀI WORD)
window.openDocReaderModal = async function (mdOrCodeUrl, title, downloadUrl) {
  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  modalBody.innerHTML = `<p style="padding: 2rem; text-align: center;">Đang tải tài liệu <strong>${title}</strong>...</p>`;
  modal.classList.add("open");

  try {
    const res = await fetch(mdOrCodeUrl);
    const text = await res.text();
    const safeText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const downloadBtn = downloadUrl
      ? `<a href="${downloadUrl}" class="btn btn-primary btn-sm">📥 Tải file gốc (.docx / .js)</a>`
      : `<a href="${mdOrCodeUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">↗ Mở file gốc</a>`;

    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem; padding-right: 2.8rem;">
        <h3 style="font-size: 1.12rem;">📄 ${title}</h3>
        <div style="display: flex; gap: 0.5rem;">
          ${downloadBtn}
        </div>
      </div>
      <div style="background: #FBF9F5; border: 1px solid var(--border); border-radius: 12px; padding: 1.35rem; max-height: 73vh; overflow-y: auto; font-family: var(--font-sans); font-size: 0.88rem; line-height: 1.65; white-space: pre-wrap; color: #18181B;">${safeText}</div>
    `;
  } catch (err) {
    modalBody.innerHTML = `
      <div style="padding: 1.5rem; text-align: center;">
        <p style="margin-bottom: 1rem;">Bạn có thể tải hoặc mở trực tiếp tài liệu này bằng nút bên dưới:</p>
        <a href="${downloadUrl || mdOrCodeUrl}" target="_blank" rel="noopener" class="btn btn-primary">📥 Mở / Tải tài liệu ngay</a>
      </div>
    `;
  }
};

// 5. MỞ BỘ SƯU TẬP ẢNH MINH CHỨNG (GALLERY MODAL CHO TỪNG DỰ ÁN)
window.openGalleryModal = function (type) {
  const galleries = {
    vf6Tvc: {
      title: "Bóc tách 06 khung hình kỹ xảo 3D/VFX & ánh sáng — TVC Quảng cáo đèn xe VinFast VF6",
      items: [
        { src: "master_assets/vf6_frame_1.jpg", label: "Frame 01 (00:03): Mở màn dải đèn LED cánh chim nhận diện VinFast VF6 trong đêm" },
        { src: "master_assets/vf6_frame_2.jpg", label: "Frame 02 (00:15): Cận cảnh cụm đèn pha LED Matrix & đường nét khí động học" },
        { src: "master_assets/vf6_frame_3.jpg", label: "Frame 03 (00:30): Hiệu ứng tia sáng cắt xuyên màn đêm & phản chiếu bề mặt thân xe" },
        { src: "master_assets/vf6_frame_4.jpg", label: "Frame 04 (00:48): Góc máy chuyển động tốc độ cao (Dynamic Camera Tracking)" },
        { src: "master_assets/vf6_frame_5.jpg", label: "Frame 05 (01:05): Cao trào kỹ xảo ánh sáng 3D (K3D Lighting Breakdown)" },
        { src: "master_assets/vf6_frame_6.jpg", label: "Frame 06 (01:22): Khung hình kết khẳng định dấu ấn ánh sáng thương hiệu VinFast VF6" }
      ]
    },
    film3d: {
      title: "Hậu trường 5 bước sản xuất phim hoạt hình 3D: 'Bữa cơm với bà' (02:15)",
      items: [
        { src: "assets/nhan-vat-hanh.png", label: "Bước 1 - Character Sheet: Tạo hình gốc nhân vật 3D 'Hạnh'" },
        { src: "assets/phong-an-nha-ba.png", label: "Bước 2 - Environment Plate: Thiết kế bối cảnh trống 'Phòng ăn nhà bà'" },
        { src: "assets/ba-va-hanh.png", label: "Bước 3 - Scene Compositing: Ghép nhân vật Bà và Hạnh bên mâm cơm" },
        { src: "assets/canh-goc-khac.png", label: "Bước 4A - Wide Shot: Góc toàn cảnh ngôi nhà cửa gỗ xanh Hà Nội" },
        { src: "assets/canh-truoc-nha.png", label: "Bước 4B - Medium Shot: Góc trung cảnh xóa phông tập trung cảm xúc" },
        { src: "review_frames/details.jpg", label: "Bước 5 - Animatic Frame Sheet: Bảng kiểm soát nhịp phim từ 00:49 đến 02:15" }
      ]
    },
    daizyWeb: {
      title: "Bộ 08 ảnh minh chứng hệ thống Website TMĐT Daizy Wellness (Storefront, AI Chat, Admin CMS & SePay)",
      items: [
        { src: "master_assets/banner-daizy-pilates.png", label: "Key Visual Banner: Daizy Wellness — Find your flow (Quiet Luxury)" },
        { src: "master_assets/web-daizy-wellness/ecommerce-preview.png", label: "Giao diện Storefront thương mại điện tử nhiều trang & bộ chọn 5 màu sắc" },
        { src: "master_assets/web-daizy-wellness/chat-ai-preview.png", label: "Trợ lý tư vấn AI Chatbot tích hợp trực tiếp trên website" },
        { src: "master_assets/web-daizy-wellness/admin-cms-qa.png", label: "Hệ thống quản trị Admin CMS (/admin) kết nối cơ sở dữ liệu Supabase" },
        { src: "master_assets/web-daizy-wellness/checkout-sepay-live.png", label: "Luồng thanh toán QR SePay & quản lý đơn hàng tự động" },
        { src: "master_assets/web-daizy-wellness/sepay-test-success.png", label: "Minh chứng kiểm thử giao dịch thanh toán SePay thành công" },
        { src: "master_assets/web-daizy-wellness/deployment-preview.png", label: "Triển khai Production thực tế trên nền tảng Vercel (daizypilates.vercel.app)" },
        { src: "master_assets/web-daizy-wellness/stock-save-confirmed.png", label: "Minh chứng cập nhật tồn kho thời gian thực từ trang quản trị" }
      ]
    },
    purpleAura: {
      title: "Bộ 10 ảnh minh chứng kết quả kênh TikTok 'Hào quang màu tím' (3.215+ lượt xem) & fanpage 'Daizy Pilates'",
      items: [
        { src: "master_assets/ai-content-channels/TikTok-1-Tong-Quan-Kenh-Hao-Quang-Mau-Tim.jpg", label: "Tổng quan kênh TikTok Hào quang màu tím (@daizy.purple.aura): 14 video, 971 thích" },
        { src: "master_assets/ai-content-channels/TikTok-2-Chi-So-View-Va-Bai-Dang.jpg", label: "Chỉ số lượt xem thực tế trên TikTok: Video nổi bật đạt 3.215 lượt xem tự nhiên" },
        { src: "master_assets/ai-content-channels/TikTok-3-Giao-Dien-May-Tinh.jpg", label: "Giao diện kênh TikTok Hào quang màu tím trên máy tính" },
        { src: "master_assets/ai-content-channels/Facebook-1-Trang-Chu-Daizy-Pilates.png", label: "Trang chủ fanpage Facebook Daizy Pilates công khai" },
        { src: "master_assets/ai-content-channels/Facebook-2-Bang-Dieu-Khien-10-Bai-Dang.png", label: "Bảng điều khiển quản lý 10 bài đăng chuyên sâu trên fanpage" },
        { src: "master_assets/ai-content-channels/Facebook-3-Chi-Tiet-Bai-Viet-So-1.png", label: "Chi tiết bài đăng số 1 trên fanpage Daizy Pilates" },
        { src: "master_assets/ai-content-channels/Facebook-4-Chi-Tiet-Bai-Viet-So-2.png", label: "Chi tiết bài đăng số 2 trên fanpage Daizy Pilates" },
        { src: "master_assets/ai-content-channels/Facebook-5-Thu-Vien-Noi-Dung-Chat-Luong-Cao.jpg", label: "Thư viện hình ảnh AI Studio chất lượng cao đồng bộ nhận diện" },
        { src: "master_assets/ai-content-channels/Anh-AI-1-Pelvic-Curl.jpg", label: "Sản phẩm ảnh AI Studio 1: Hướng dẫn động tác Pelvic Curl" },
        { src: "master_assets/ai-content-channels/Anh-AI-2-Dia-An-211.jpg", label: "Sản phẩm ảnh AI Studio 2: Dinh dưỡng đĩa ăn cân bằng 2:1:1" }
      ]
    },
    bannersAll: {
      title: "Bộ sưu tập 06 ấn phẩm Banner, Logo & Key Visual thương hiệu Daizy Wellness / Pilates",
      items: [
        { src: "master_assets/banner-daizy-pilates.png", label: "1. Banner chủ đạo: Daizy Wellness & Pilates — Find your flow" },
        { src: "master_assets/web-daizy-wellness/portfolio-banners/daizy-pilates-era-banner.png", label: "2. Banner chiến dịch: Daizy Pilates Era" },
        { src: "master_assets/web-daizy-wellness/portfolio-banners/daizy-wellness-apparel-banner.png", label: "3. Banner bộ sưu tập thời trang: Daizy Wellness Apparel" },
        { src: "master_assets/web-daizy-wellness/portfolio-banners/daizy-wellness-pilates-banner.png", label: "4. Banner không gian phòng tập: Daizy Wellness Pilates Studio" },
        { src: "master_assets/daizy-pilates-logo-cream.png", label: "5. Thiết kế Logo nhận diện Daizy Pilates nền trắng ngà" },
        { src: "master_assets/daizy-pilates-avatar.png", label: "6. Thiết kế Avatar chính thức hệ thống kênh Daizy Pilates" }
      ]
    }
  };

  const data = galleries[type];
  if (!data) return;

  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  modalBody.innerHTML = `
    <h3 style="margin-bottom: 1rem; font-size: 1.15rem; padding-right: 2.5rem;">🖼️ ${data.title} <small style="font-weight: 500; color: var(--text-muted);">(Bấm vào từng ảnh để phóng to)</small></h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
      ${data.items
        .map(
          (item) => `
          <div style="background: var(--bg-main); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; cursor: zoom-in; box-shadow: var(--shadow-sm);" onclick="openLightbox('${item.src}', '${item.label}')">
            <img src="${item.src}" alt="${item.label}" style="width: 100%; height: 175px; object-fit: cover; object-position: top center; display: block;" />
            <div style="padding: 0.6rem 0.75rem; font-size: 0.8rem; font-weight: 700; color: var(--text-main); line-height: 1.38;">${item.label}</div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
  modal.classList.add("open");
};

// 6. THIẾT LẬP SỰ KIỆN TƯƠNG TÁC CHUNG
function setupPortfolioInteractions() {
  const modal = document.getElementById("master-modal");
  const closeBtn = document.getElementById("master-modal-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      document.getElementById("master-modal-body").innerHTML = "";
    });
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
        document.getElementById("master-modal-body").innerHTML = "";
      }
    });
  }

  // Chuyển đổi chế độ Web Portfolio <-> Bản CV A4
  const btnPortfolio = document.getElementById("btn-mode-portfolio");
  const btnCv = document.getElementById("btn-mode-cv");
  const heroOpenCv = document.getElementById("hero-open-cv");
  const backPortfolio = document.getElementById("btn-back-portfolio");

  function switchView(mode) {
    if (mode === "cv") {
      document.body.classList.add("show-cv-mode");
      btnCv.classList.add("active");
      btnPortfolio.classList.remove("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.classList.remove("show-cv-mode");
      btnPortfolio.classList.add("active");
      btnCv.classList.remove("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (btnPortfolio) btnPortfolio.addEventListener("click", () => switchView("portfolio"));
  if (btnCv) btnCv.addEventListener("click", () => switchView("cv"));
  if (heroOpenCv) heroOpenCv.addEventListener("click", () => switchView("cv"));
  if (backPortfolio) backPortfolio.addEventListener("click", () => switchView("portfolio"));

  // Nút In / Xuất CV PDF A4
  const printBtns = document.querySelectorAll(".trigger-print-cv");
  printBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchView("cv");
      setTimeout(() => {
        window.print();
      }, 250);
    });
  });

  // Nút Bật sửa chữ trực tiếp
  let editing = false;
  const editBtn = document.getElementById("toggle-inline-edit");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      editing = !editing;
      document.querySelectorAll(".editable").forEach((el) => {
        el.setAttribute("contenteditable", editing ? "true" : "false");
      });
      editBtn.classList.toggle("active-edit", editing);
      editBtn.textContent = editing
        ? "✓ Đang bật sửa chữ trực tiếp (Nhấn để khóa)"
        : "✎ Bật sửa chữ trực tiếp trên trang";
    });
  }
}
