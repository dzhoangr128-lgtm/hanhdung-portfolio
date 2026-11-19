/**
 * ============================================================================
 * SCRIPT ĐIỀU KHIỂN PORTFOLIO & BẢN CV A4 — HOÀNG THỊ HẠNH DUNG
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio();
  renderCV();
  setupInteractions();
});

// 1. RENDER GIAO DIỆN WEBSITE PORTFOLIO & SHOWREEL
function renderPortfolio() {
  const {
    profile,
    liveChannels,
    highlights,
    pipelineBreakdown,
    skillGroups,
    projects,
    samples,
    education,
    experiences
  } = portfolioData;

  // Navbar Brand
  document.getElementById("nav-avatar-text").textContent = profile.avatarText;
  document.getElementById("nav-name").textContent = profile.fullName;

  // Hero Section
  document.getElementById("hero-status").textContent = profile.statusBadge;
  document.getElementById("hero-role").textContent = `${profile.role} — ${profile.subRole}`;
  document.getElementById("hero-tagline").textContent = profile.heroTagline;
  document.getElementById("hero-bio").textContent = profile.heroBio;

  // Profile Card
  const avatarWrap = document.getElementById("profile-avatar");
  if (profile.avatarImage && profile.avatarImage.trim() !== "") {
    avatarWrap.innerHTML = `<img src="${profile.avatarImage}" alt="${profile.fullName}" />`;
  } else {
    avatarWrap.textContent = profile.avatarText;
  }

  document.getElementById("card-name").textContent = profile.fullName;
  document.getElementById("card-role").textContent = profile.role;
  document.getElementById("card-location").textContent = profile.location;
  document.getElementById("card-email").textContent = profile.email;
  document.getElementById("card-phone").textContent = profile.phone;
  document.getElementById("card-linkedin").innerHTML = `<a href="https://www.tiktok.com/@daizy.purple.aura" target="_blank" rel="noopener">${profile.linkedin} ↗</a>`;

  // Highlights
  const highlightsContainer = document.getElementById("highlights-grid");
  highlightsContainer.innerHTML = highlights
    .map(
      (h) => `
      <div class="highlight-card">
        <div class="highlight-num editable">${h.number}</div>
        <div class="highlight-label editable">${h.label}</div>
        <div class="highlight-desc editable">${h.desc}</div>
      </div>
    `
    )
    .join("");

  // Live Social Channels
  const channelsContainer = document.getElementById("live-channels-grid");
  if (channelsContainer && liveChannels) {
    channelsContainer.innerHTML = liveChannels
      .map(
        (ch) => `
        <div class="channel-card">
          <div>
            <div class="channel-top">
              <img src="${ch.avatar}" alt="${ch.name}" class="channel-avatar" />
              <div>
                <span class="channel-platform-badge">${ch.platform}</span>
                <div class="channel-name editable">${ch.name}</div>
                <div class="channel-stats editable">${ch.stats}</div>
              </div>
            </div>
            <p style="font-size: 0.91rem; color: var(--text-secondary); margin: 0.85rem 0;" class="editable">${ch.desc}</p>
            <div class="channel-proof-thumb" onclick="openImageLightbox('${ch.proofImage}', 'Minh chứng kết quả thực tế: ${ch.name}')">
              <img src="${ch.proofImage}" alt="Ảnh chụp chỉ số ${ch.name}" />
              <span class="zoom-hint">🔍 Xem ảnh chụp chỉ số thật</span>
            </div>
          </div>
          <div style="display: flex; gap: 0.65rem; flex-wrap: wrap;">
            <a href="${ch.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              🌐 Mở Kênh Thực Tế ↗
            </a>
            <button type="button" class="btn btn-outline btn-sm" onclick="openImageLightbox('${ch.proofImage}', 'Minh chứng kết quả thực tế: ${ch.name}')">
              📊 Phóng To Ảnh Chỉ Số
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Projects Grid
  renderProjects("all");

  // Production Pipeline Breakdown
  const pipelineContainer = document.getElementById("pipeline-list");
  if (pipelineContainer && pipelineBreakdown) {
    pipelineContainer.innerHTML = pipelineBreakdown
      .map((item, idx) => {
        const isContain = idx === 1 ? "tall-contain" : "";
        const mediaHtml = item.secondaryImage
          ? `
            <div class="pipeline-media dual-media">
              <div class="pipeline-img-wrap ${isContain}" onclick="openImageLightbox('${item.image}', '${item.title} (1)')">
                <img src="${item.image}" alt="${item.title} 1" />
                <span class="zoom-hint">🔍 Phóng to</span>
              </div>
              <div class="pipeline-img-wrap ${isContain}" onclick="openImageLightbox('${item.secondaryImage}', '${item.title} (2)')">
                <img src="${item.secondaryImage}" alt="${item.title} 2" />
                <span class="zoom-hint">🔍 Phóng to</span>
              </div>
            </div>
          `
          : `
            <div class="pipeline-media">
              <div class="pipeline-img-wrap ${isContain}" onclick="openImageLightbox('${item.image}', '${item.title}')">
                <img src="${item.image}" alt="${item.title}" />
                <span class="zoom-hint">🔍 Click để xem ảnh độ phân giải cao</span>
              </div>
            </div>
          `;

        return `
          <div class="pipeline-card">
            ${mediaHtml}
            <div class="pipeline-info">
              <span class="pipeline-step-tag editable">${item.step}</span>
              <h3 class="editable">${item.title}</h3>
              <p class="editable">${item.desc}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Skills Grid
  const skillsContainer = document.getElementById("skills-grid");
  skillsContainer.innerHTML = skillGroups
    .map(
      (group) => `
      <div class="skill-card">
        <h3 class="editable"><span class="skill-badge-dot"></span>${group.category}</h3>
        <ul class="skill-items">
          ${group.skills.map((s) => `<li class="editable">${s}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");

  // Director's Shooting Script & Storyboard Breakdown
  const samplesContainer = document.getElementById("samples-grid");
  samplesContainer.innerHTML = samples
    .map(
      (item) => `
      <div class="sample-card">
        <div>
          <div class="sample-type editable">${item.type}</div>
          <h4 class="editable">${item.title}</h4>
          <div class="sample-box">
            <p class="editable">${item.hook}</p>
            <p class="editable">${item.body}</p>
            <p class="editable">${item.cta}</p>
          </div>
        </div>
        <div class="sample-note editable">${item.note}</div>
      </div>
    `
    )
    .join("");

  // Education & Activities on Web
  const expEduContainer = document.getElementById("web-exp-edu");
  expEduContainer.innerHTML = `
    <div class="skill-card">
      <h3><span class="skill-badge-dot"></span>Kinh nghiệm Dự án Thực chiến</h3>
      ${experiences
        .map(
          (exp) => `
          <div style="margin-bottom: 1.15rem;">
            <div style="font-weight: 700; font-size: 0.98rem;" class="editable">${exp.role}</div>
            <div style="font-size: 0.85rem; color: var(--teal); font-weight: 600; margin-bottom: 0.35rem;" class="editable">
              ${exp.company} • ${exp.period}
            </div>
            <ul class="skill-items">
              ${exp.achievements.map((a) => `<li class="editable">${a}</li>`).join("")}
            </ul>
          </div>
        `
        )
        .join("")}
    </div>
    <div class="skill-card">
      <h3><span class="skill-badge-dot"></span>Học vấn & Đào tạo Chuyên môn</h3>
      ${education
        .map(
          (edu) => `
          <div style="margin-bottom: 1.15rem;">
            <div style="font-weight: 700; font-size: 0.98rem;" class="editable">${edu.degree}</div>
            <div style="font-size: 0.85rem; color: var(--accent); font-weight: 600; margin-bottom: 0.3rem;" class="editable">
              ${edu.school} (${edu.period})
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary);" class="editable">${edu.details}</p>
          </div>
        `
        )
        .join("")}
    </div>
  `;

  // Footer
  document.getElementById("footer-email").textContent = profile.email;
  document.getElementById("footer-phone").textContent = profile.phone;
}

// 2. RENDER DANH SÁCH DỰ ÁN THEO BỘ LỌC
function renderProjects(filterCategory) {
  const projectsContainer = document.getElementById("projects-grid");
  const filtered =
    filterCategory === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === filterCategory);

  projectsContainer.innerHTML = filtered
    .map((p) => {
      let mediaHtml = "";
      if (p.videoPreview) {
        mediaHtml = `
          <div class="project-media-preview">
            <video controls preload="metadata" poster="${p.imagePreview || ""}">
              <source src="${p.videoPreview}" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
          </div>
        `;
      } else if (p.imagePreview) {
        mediaHtml = `
          <div class="project-media-preview" style="cursor: zoom-in;" onclick="openImageLightbox('${p.imagePreview}', '${p.title}')">
            <img src="${p.imagePreview}" alt="${p.title}" />
          </div>
        `;
      }

      const liveLinksHtml = p.liveLinks
        ? `
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.8rem;">
            ${p.liveLinks
              .map(
                (l) =>
                  `<a href="${l.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="padding: 0.35rem 0.85rem; font-size: 0.78rem;">${l.label} ↗</a>`
              )
              .join("")}
          </div>
        `
        : "";

      const docsHtml = p.strategyDocs
        ? `
          <div class="docs-box">
            <div class="docs-box-title">
              📂 Hồ sơ Chiến lược & Tài liệu Dự án Đính kèm (Click để mở đọc ngay):
            </div>
            <div class="docs-badge-list">
              ${p.strategyDocs
                .map(
                  (d) =>
                    `<a href="${d.url}" target="_blank" rel="noopener" class="doc-link-badge">${d.title} ↗</a>`
                )
                .join("")}
            </div>
          </div>
        `
        : "";

      return `
        <article class="project-card">
          <div>
            <div class="project-top-meta">
              <span class="project-cat-badge">${p.categoryLabel}</span>
              <span class="project-date">${p.duration}</span>
            </div>
            <h3 class="editable">${p.title}</h3>
            <div class="project-role editable">${p.role}</div>
            <p class="project-summary editable">${p.summary}</p>
            ${mediaHtml}
            ${liveLinksHtml}
            ${docsHtml}
            <ul class="project-metrics">
              ${p.metrics.map((m) => `<li class="editable">${m}</li>`).join("")}
            </ul>
          </div>
          <div>
            <div class="project-tags">
              ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
            </div>
            <button class="btn btn-outline btn-sm" onclick="openCaseStudyModal('${p.id}')">
              🎬 Xem Chi Tiết Case Study & Bộ Ảnh Keyframe / Minh Chứng →
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

// 3. MỞ MODAL XEM CHI TIẾT CASE STUDY HOẶC LIGHTBOX ẢNH
window.openCaseStudyModal = function (projectId) {
  const project = portfolioData.projects.find((p) => p.id === projectId);
  if (!project) return;

  const galleryHtml = project.galleryImages
    ? `
      <div class="cs-step">
        <h4>🖼️ Bộ Ảnh Keyframes, Storyboard & Minh Chứng Thực Tế (Click vào ảnh để phóng to)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 0.75rem; margin-top: 0.65rem;">
          ${project.galleryImages
            .map(
              (img) => `
              <div style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; cursor: zoom-in; box-shadow: var(--shadow-sm);" onclick="openImageLightbox('${img.src}', '${img.label}')">
                <img src="${img.src}" alt="${img.label}" style="width: 100%; height: 165px; object-fit: cover; object-position: top center; display: block;" />
                <div style="padding: 0.45rem 0.6rem; font-size: 0.76rem; color: var(--text-primary); font-weight: 600; line-height: 1.35;">${img.label}</div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  const docsModalHtml = project.strategyDocs
    ? `
      <div class="cs-step">
        <h4>📂 Mở Xem Trực Tiếp Bộ Tài Liệu Chiến Lược & Báo Cáo (HTML / PDF)</h4>
        <div class="docs-badge-list" style="margin-top: 0.5rem;">
          ${project.strategyDocs
            .map(
              (d) =>
                `<a href="${d.url}" target="_blank" rel="noopener" class="doc-link-badge">${d.title} ↗</a>`
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <span class="project-cat-badge">${project.categoryLabel} • ${project.duration}</span>
    <h2 style="font-family: var(--font-serif); font-size: 1.65rem; margin: 0.6rem 0 0.3rem;">${project.title}</h2>
    <p style="color: var(--teal); font-weight: 700; font-size: 0.92rem; margin-bottom: 1rem;">Vai trò: ${project.role}</p>

    ${galleryHtml}
    ${docsModalHtml}

    <div class="cs-step">
      <h4>1. Bối cảnh & Đề bài (Context / Challenge)</h4>
      <p>${project.caseStudy.context}</p>
    </div>

    <div class="cs-step">
      <h4>2. Sự thật ngầm hiểu (Customer & Audience Insight)</h4>
      <p><em>“${project.caseStudy.insight}”</em></p>
    </div>

    <div class="cs-step">
      <h4>3. Giải pháp Chiến lược & Quy trình Thực thi (Execution)</h4>
      <ul>
        ${project.caseStudy.solution.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    </div>

    <div class="cs-step">
      <h4>4. Kết quả Thực tế & Sản phẩm Bàn giao (Outcome & Impact)</h4>
      <p>${project.caseStudy.outcome}</p>
    </div>
  `;

  document.getElementById("case-study-modal").classList.add("open");
};

window.openImageLightbox = function (imgSrc, caption) {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <h3 style="margin-bottom: 0.85rem; font-size: 1.12rem;">${caption}</h3>
    <div style="background: #141417; border-radius: 12px; overflow: hidden; text-align: center;">
      <img src="${imgSrc}" alt="${caption}" style="max-width: 100%; max-height: 74vh; object-fit: contain; display: block; margin: 0 auto;" />
    </div>
  `;
  document.getElementById("case-study-modal").classList.add("open");
};

// 4. RENDER BẢN CV A4 CHUẨN IN ẤN / XUẤT PDF
function renderCV() {
  const { profile, skillGroups, projects, education, experiences, strengths } = portfolioData;
  const cvContainer = document.getElementById("cv-paper-content");

  cvContainer.innerHTML = `
    <header class="cv-header">
      <div>
        <div class="cv-name editable">${profile.fullName}</div>
        <div class="cv-role editable">${profile.role}</div>
        <div style="font-size: 8.8pt; color: #52525B; font-weight: 600; margin-top: 2px;" class="editable">${profile.subRole}</div>
      </div>
      <div class="cv-contact-grid">
        <div class="editable">📍 ${profile.location}</div>
        <div class="editable">✉️ ${profile.email}</div>
        <div class="editable">📞 ${profile.phone}</div>
        <div class="editable">🎵 TikTok: ${profile.linkedin}</div>
        <div class="editable">📘 FB: ${profile.portfolioUrl}</div>
      </div>
    </header>

    <section class="cv-section">
      <div class="cv-section-title">Tóm tắt Năng lực (Professional Summary)</div>
      <p class="cv-summary-text editable">${profile.cvSummary}</p>
    </section>

    <section class="cv-section">
      <div class="cv-section-title">Kỹ năng Chuyên môn & Công cụ (Core Marketing, 3D/TVC & AI Automation Skills)</div>
      <div class="cv-two-col">
        ${skillGroups
          .map(
            (g) => `
          <div>
            <div class="cv-skill-group-title editable">• ${g.category}</div>
            <div class="cv-skill-list editable">${g.skills.join(" | ")}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </section>

    <section class="cv-section">
      <div class="cv-section-title">Dự án Thực chiến & Tác phẩm Tiêu biểu (Featured Projects & Case Studies)</div>
      ${projects
        .map(
          (p) => `
        <div class="cv-item">
          <div class="cv-item-header">
            <span class="editable">${p.title}</span>
            <span class="editable">${p.duration}</span>
          </div>
          <div class="cv-item-sub editable">${p.role} — [${p.tags.join(", ")}]</div>
          <ul class="cv-bullets">
            <li class="editable"><strong>Triển khai:</strong> ${p.summary}</li>
            <li class="editable"><strong>Kết quả thực chứng:</strong> ${p.metrics.join("; ")}.</li>
          </ul>
        </div>
      `
        )
        .join("")}
    </section>

    <section class="cv-section">
      <div class="cv-section-title">Kinh nghiệm Thực hành & Xây kênh (Experience)</div>
      ${experiences
        .map(
          (exp) => `
        <div class="cv-item">
          <div class="cv-item-header">
            <span class="editable">${exp.role}</span>
            <span class="editable">${exp.period}</span>
          </div>
          <div class="cv-item-sub editable">${exp.company}</div>
          <ul class="cv-bullets">
            ${exp.achievements.map((a) => `<li class="editable">${a}</li>`).join("")}
          </ul>
        </div>
      `
        )
        .join("")}
    </section>

    <div class="cv-two-col">
      <section class="cv-section">
        <div class="cv-section-title">Học vấn & Đào tạo (Education)</div>
        ${education
          .map(
            (edu) => `
          <div class="cv-item">
            <div class="cv-item-header">
              <span class="editable">${edu.school}</span>
            </div>
            <div class="cv-item-sub editable">${edu.degree} (${edu.period})</div>
            <div style="font-size: 8.4pt; color: #3F3F46;" class="editable">${edu.details}</div>
          </div>
        `
          )
          .join("")}
      </section>

      <section class="cv-section">
        <div class="cv-section-title">Lợi thế Cạnh tranh (Core Strengths)</div>
        <ul class="cv-bullets">
          ${strengths.map((s) => `<li class="editable">${s}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}

// 5. THIẾT LẬP SỰ KIỆN TƯƠNG TÁC
function setupInteractions() {
  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });

  // Modal close
  const modal = document.getElementById("case-study-modal");
  document.getElementById("modal-close-btn").addEventListener("click", () => {
    modal.classList.remove("open");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  // Switch Mode: Portfolio <-> CV A4
  const btnPortfolioMode = document.getElementById("btn-mode-portfolio");
  const btnCvMode = document.getElementById("btn-mode-cv");
  const heroCvBtn = document.getElementById("hero-open-cv");
  const backToPortfolioBtn = document.getElementById("btn-back-portfolio");

  function setMode(mode) {
    if (mode === "cv") {
      document.body.classList.add("show-cv-mode");
      btnCvMode.classList.add("active");
      btnPortfolioMode.classList.remove("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.classList.remove("show-cv-mode");
      btnPortfolioMode.classList.add("active");
      btnCvMode.classList.remove("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  btnPortfolioMode.addEventListener("click", () => setMode("portfolio"));
  btnCvMode.addEventListener("click", () => setMode("cv"));
  if (heroCvBtn) heroCvBtn.addEventListener("click", () => setMode("cv"));
  if (backToPortfolioBtn) backToPortfolioBtn.addEventListener("click", () => setMode("portfolio"));

  // Print / Export A4 PDF
  const printBtns = document.querySelectorAll(".trigger-print-cv");
  printBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode("cv");
      setTimeout(() => {
        window.print();
      }, 250);
    });
  });

  // Toggle Inline Quick Edit Mode
  let isEditing = false;
  const toggleEditBtn = document.getElementById("toggle-inline-edit");
  toggleEditBtn.addEventListener("click", () => {
    isEditing = !isEditing;
    const editables = document.querySelectorAll(".editable");
    editables.forEach((el) => {
      el.setAttribute("contenteditable", isEditing ? "true" : "false");
    });
    toggleEditBtn.classList.toggle("active-edit", isEditing);
    toggleEditBtn.textContent = isEditing
      ? "✓ Đang bật chế độ Sửa trực tiếp (Nhấn để khóa)"
      : "✎ Bật sửa chữ trực tiếp trên trang";
  });
}
