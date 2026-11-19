/**
 * ============================================================================
 * SCRIPT ĐIỀU KHIỂN PORTFOLIO TỔNG HỢP XIN VIỆC — HOÀNG THỊ HẠNH DUNG
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
    <h3 style="margin-bottom: 0.85rem; font-size: 1.15rem; padding-right: 2.5rem;">${caption}</h3>
    <div style="background: #12131A; border-radius: 14px; overflow: hidden; text-align: center; padding: 0.5rem;">
      <img src="${imgSrc}" alt="${caption}" style="max-width: 100%; max-height: 76vh; object-fit: contain; display: block; margin: 0 auto; border-radius: 8px;" />
    </div>
  `;
  modal.classList.add("open");
};

// 2. MỞ KHUNG TƯƠNG TÁC TRỰC TIẾP (CHƠI GAME / TRẢI NGHIỆM WEB / XEM SLIDE)
window.openInteractiveSandbox = function (url, title) {
  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem; padding-right: 2.8rem;">
      <h3 style="font-size: 1.15rem;">${title}</h3>
      <a href="${url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        ↗ Mở Toàn Màn Hình Ở Tab Mới
      </a>
    </div>
    <div style="width: 100%; height: 74vh; border-radius: 14px; overflow: hidden; border: 2px solid #18181B; background: #000;">
      <iframe src="${url}" title="${title}" style="width: 100%; height: 100%; border: none;" allow="autoplay; fullscreen"></iframe>
    </div>
  `;
  modal.classList.add("open");
};

// 3. MỞ BỘ SƯU TẬP ẢNH MINH CHỨNG (GALLERY MODAL)
window.openGalleryModal = function (type) {
  const galleries = {
    daizyWeb: {
      title: "Bộ Ảnh Minh Chứng Hệ Thống Website TMĐT Daizy Wellness (Storefront, AI Chat, Admin CMS & SePay)",
      items: [
        { src: "Banner daizy pilates.png", label: "Key Visual Banner: Daizy Wellness — Find your flow (Quiet Luxury)" },
        { src: "master_assets/web-daizy-wellness/ecommerce-preview.png", label: "Giao diện Storefront Thương mại điện tử nhiều trang & Bộ chọn 5 màu sắc" },
        { src: "master_assets/web-daizy-wellness/chat-ai-preview.png", label: "Trợ lý Tư vấn AI Chatbot tích hợp trực tiếp trên Website" },
        { src: "master_assets/web-daizy-wellness/admin-cms-qa.png", label: "Hệ thống Quản trị Admin CMS (/admin) kết nối Cơ sở dữ liệu Supabase" },
        { src: "master_assets/web-daizy-wellness/checkout-sepay-live.png", label: "Luồng Thanh toán QR SePay & Quản lý Đơn hàng tự động" },
        { src: "master_assets/web-daizy-wellness/deployment-preview.png", label: "Triển khai Production thực tế trên nền tảng Vercel (daizypilates.vercel.app)" },
        { src: "master_assets/web-daizy-wellness/portfolio-banners/daizy-pilates-era-banner.png", label: "Thiết kế Banner chiến dịch Daizy Pilates Era" },
        { src: "master_assets/web-daizy-wellness/portfolio-banners/daizy-wellness-apparel-banner.png", label: "Thiết kế Banner Bộ sưu tập Thời trang Daizy Wellness Apparel" }
      ]
    },
    purpleAura: {
      title: "Bộ Ảnh Minh Chứng Kết Quả Kênh TikTok 'Hào Quang Màu Tím' & Fanpage 'Daizy Pilates'",
      items: [
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-1-Tong-Quan-Kenh-Hao-Quang-Mau-Tim.jpg", label: "Tổng quan Kênh TikTok Hào Quang Màu Tím (@daizy.purple.aura): 14 Video, 971 Thích" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-2-Chi-So-View-Va-Bai-Dang.jpg", label: "Chỉ số View thực tế trên TikTok: Video Viral đạt 3.215 Lượt xem tự nhiên" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-3-Giao-Dien-May-Tinh.jpg", label: "Giao diện Kênh TikTok Hào Quang Màu Tím trên Máy tính" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-1-Trang-Chu-Daizy-Pilates.png", label: "Trang chủ Fanpage Facebook Daizy Pilates công khai" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-2-Bang-Dieu-Khien-10-Bai-Dang.png", label: "Bảng điều khiển quản lý 10 bài đăng chuyên sâu trên Fanpage" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-5-Thu-Vien-Noi-Dung-Chat-Luong-Cao.jpg", label: "Thư viện hình ảnh AI Studio chất lượng cao đồng bộ nhận diện" }
      ]
    },
    film3d: {
      title: "Hậu Trường 5 Bước Sản Xuất Phim Hoạt Hình 3D: 'Bữa Cơm Với Bà' (02:15)",
      items: [
        { src: "assets/nhan-vat-hanh.png", label: "Bước 1 - Character Sheet: Tạo hình gốc nhân vật 3D 'Hạnh'" },
        { src: "assets/phong-an-nha-ba.png", label: "Bước 2 - Environment Plate: Thiết kế bối cảnh trống 'Phòng ăn nhà bà'" },
        { src: "assets/ba-va-hanh.png", label: "Bước 3 - Scene Compositing: Ghép nhân vật Bà và Hạnh bên mâm cơm" },
        { src: "assets/canh-goc-khac.png", label: "Bước 4A - Wide Shot: Góc toàn cảnh ngôi nhà cửa gỗ xanh Hà Nội" },
        { src: "assets/canh-truoc-nha.png", label: "Bước 4B - Medium Shot: Góc trung cảnh xóa phông tập trung cảm xúc" },
        { src: "review_frames/details.jpg", label: "Bước 5 - Animatic Frame Sheet: Bảng kiểm soát nhịp phim từ 00:49 đến 02:15" }
      ]
    }
  };

  const data = galleries[type];
  if (!data) return;

  const modal = document.getElementById("master-modal");
  const modalBody = document.getElementById("master-modal-body");
  modalBody.innerHTML = `
    <h3 style="margin-bottom: 1rem; font-size: 1.2rem; padding-right: 2.5rem;">${data.title}</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;">
      ${data.items
        .map(
          (item) => `
          <div style="background: var(--bg-main); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; cursor: zoom-in; box-shadow: var(--shadow-sm);" onclick="openLightbox('${item.src}', '${item.label}')">
            <img src="${item.src}" alt="${item.label}" style="width: 100%; height: 180px; object-fit: cover; object-position: top center; display: block;" />
            <div style="padding: 0.6rem 0.75rem; font-size: 0.8rem; font-weight: 700; color: var(--text-main); line-height: 1.38;">${item.label}</div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
  modal.classList.add("open");
};

// 4. THIẾT LẬP SỰ KIỆN TƯƠNG TÁC CHUNG
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
