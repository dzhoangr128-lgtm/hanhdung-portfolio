/**
 * ============================================================================
 * HỒ SƠ PORTFOLIO & CV THỰC TẬP CHUYÊN NGHIỆP — HOÀNG THỊ HẠNH DUNG
 * AI Content Marketing • Social Media Growth • 3D Animation & Commercial TVC
 * ============================================================================
 */

const portfolioData = {
  // 1. THÔNG TIN CÁ NHÂN & ĐỊNH VỊ NGHỀ NGHIỆP
  profile: {
    fullName: "Hoàng Thị Hạnh Dung",
    role: "AI Content Marketing & Creative Video Intern",
    subRole: "Content Strategy • Social Channel Growth • 3D Animation & AI Commercial TVC",
    statusBadge: "Sẵn sàng Thực tập Marketing / Content / Creative Video (Full-time / Part-time)",
    location: "Hà Nội / TP.HCM, Việt Nam",
    email: "hanhdunghoang128@gmail.com",
    phone: "0868327384",
    linkedin: "tiktok.com/@daizy.purple.aura",
    portfolioUrl: "facebook.com/DaizyPilates",
    avatarText: "HD",
    avatarImage: "assets/tvc-pilates-keyframe-1.jpg",

    heroTagline: "Kết hợp Tư duy Chiến lược Nội dung, Sản xuất Video 3D/TVC & Tự động hóa AI để tạo ra tăng trưởng thực tế.",
    heroBio: "Ứng viên Thực tập sinh Marketing & Sáng tạo Nội dung Số có sản phẩm thực chứng toàn diện: Trực tiếp xây dựng và vận hành 02 kênh Social thực tế (TikTok đạt 3.215+ lượt xem/video & 971 lượt thích; Fanpage Facebook 10+ bài chuyên sâu), thiết kế hệ thống tự động hóa AI Content OS trên Antigravity, đồng thời sản xuất trọn gói Phim ngắn Hoạt hình 3D (02:15) và TVC Quảng cáo trên Google Flow (Veo).",

    cvSummary: "Thực tập sinh AI Content Marketing & Creative Video sở hữu tư duy chiến lược nội dung bài bản (từ nghiên cứu Insight 4D, lập Content Strategy 12 chặng, Content Plan 1 tháng đến đo lường tối ưu kênh) kết hợp năng lực sản xuất đa phương tiện vượt trội (Phim hoạt hình 3D, TVC Quảng cáo trên Google Flow, Thiết kế Visual & Tự động hóa đăng bài với Antigravity). Đã chứng minh năng lực qua 02 kênh mạng xã hội hoạt động thực tế và 04 dự án truyền thông hoàn chỉnh."
  },

  // 2. KÊNH MẠNG XÃ HỘI THỰC TẾ ĐÃ XÂY DỰNG (LIVE SOCIAL CHANNELS)
  liveChannels: [
    {
      platform: "TikTok Channel",
      name: "Hào Quang Màu Tím (@daizy.purple.aura)",
      url: "https://www.tiktok.com/@daizy.purple.aura",
      avatar: "Daizy Pilates - Avatar.png",
      stats: "14 Video Công Khai • 971 Lượt Thích • Viral 3.215+ Views",
      desc: "Kênh TikTok chia sẻ phong cách sống, năng lượng chữa lành & thẩm mỹ tím pastel. Áp dụng công thức Hook thị giác 3 giây đầu và tối ưu nhịp dựng giữ chân người xem.",
      proofImage: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-2-Chi-So-View-Va-Bai-Dang.jpg"
    },
    {
      platform: "Facebook Fanpage",
      name: "Daizy Pilates — Nắn Chỉnh Tư Thế & Wellness",
      url: "https://www.facebook.com/profile.php?id=61596228457366",
      avatar: "Daizy Pilates - Nen trang nga v2.png",
      stats: "10+ Bài Viết Chuyên Sâu • Chuẩn PAS & Before/After Visual",
      desc: "Fanpage thương hiệu Pilates & Dinh dưỡng cho nữ văn phòng 25–35 tuổi. Vận hành bằng hệ thống AI Content OS kết hợp kịch bản tự động hóa đăng bài trên Antigravity.",
      proofImage: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-1-Trang-Chu-Daizy-Pilates.png"
    }
  ],

  // 3. CON SỐ ĐIỂM NHẤN ẤN TƯỢNG (KEY METRICS)
  highlights: [
    {
      number: "3.215+",
      label: "Lượt Xem & 971 Likes Thực Tế",
      desc: "Xây dựng mới 02 kênh TikTok & Facebook Fanpage với 24+ nội dung xuất bản công khai"
    },
    {
      number: "04 Dự Án",
      label: "Chiến Dịch & Phim Quảng Cáo",
      desc: "Hệ thống AI Content OS, TVC Daizy Pilates, TVC 60s Fusion Resort & Phim Hoạt Hình 3D (02:15)"
    },
    {
      number: "100%",
      label: "Làm Chủ Chuỗi Giá Trị AI",
      desc: "Từ Chiến lược 12 chặng → Viết bài/Kịch bản 7 cột → Tạo ảnh/Video 8K → Tự động hóa Antigravity"
    }
  ],

  // 4. DANH MỤC 4 DỰ ÁN THỰC CHIẾN NỔI BẬT (FEATURED CASE STUDIES)
  projects: [
    {
      id: "project-ai-content-os-channels",
      title: "Dự Án Xây Kênh Thực Chiến & Tự Động Hóa AI Content OS: “Daizy Pilates & Hào Quang Màu Tím”",
      category: "AI Content & Social Growth",
      categoryLabel: "Xây Kênh Thực Tế & Tự Động Hóa AI",
      role: "Content Strategist, Channel Builder & AI Automation Creator",
      duration: "10/2026 - 11/2026 • 02 Kênh Live & Báo Cáo 12 Trang",
      featured: true,
      imagePreview: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-2-Chi-So-View-Va-Bai-Dang.jpg",
      liveLinks: [
        { label: "🔗 Mở Kênh TikTok (@daizy.purple.aura)", url: "https://www.tiktok.com/@daizy.purple.aura" },
        { label: "🔗 Mở Fanpage Facebook (Daizy Pilates)", url: "https://www.facebook.com/profile.php?id=61596228457366" }
      ],
      strategyDocs: [
        { title: "📄 Báo Cáo Tổng Hợp Cuối Môn (Full 12 Trang)", url: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/00-BAO-CAO-TONG-HOP-CUOI-MON-HOANG-THI-HANH-DUNG.html" },
        { title: "1️⃣ Định Hướng Chiến Lược 12 Chặng", url: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/1. Bản định hướng chiến lược nội dung xây kênh/1-Ban-Dinh-Huong-Chien-Luoc-Noi-Dung-Xay-Kenh.html" },
        { title: "2️⃣ Content Plan 1 Tháng (26 Bài)", url: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/2. Content plan 1 tháng/2-Content-Plan-1-Thang.html" },
        { title: "3️⃣ Báo Cáo Kết Quả & Chỉ Số 2 Kênh (PDF)", url: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/3-Anh-Chup-Ket-Qua-Va-Chi-So-2-Kenh.pdf" },
        { title: "4️⃣ Workflow Tự Động Hóa Antigravity", url: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/4. Workflow tự động hóa sản xuất content & thực hiện trên Antigravity/4-Workflow-Tu-Dong-Hoa-San-Xuat-Content-Antigravity.html" }
      ],
      galleryImages: [
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-1-Tong-Quan-Kenh-Hao-Quang-Mau-Tim.jpg", label: "Kênh TikTok Hào Quang Màu Tím: 14 bài đăng công khai & 971 Lượt thích" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-2-Chi-So-View-Va-Bai-Dang.jpg", label: "Chỉ số TikTok thực tế: Video đạt 3.215 Views & tương tác tự nhiên" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-1-Trang-Chu-Daizy-Pilates.png", label: "Fanpage Facebook Daizy Pilates: Bộ nhận diện thương hiệu chuẩn Wellness" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-2-Bang-Dieu-Khien-10-Bai-Dang.png", label: "Bảng điều khiển quản lý 10 bài đăng chuyên sâu trên Fanpage Daizy Pilates" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-5-Thu-Vien-Noi-Dung-Chat-Luong-Cao.jpg", label: "Thư viện hình ảnh AI Studio đồng bộ trên Fanpage" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/4. Workflow tự động hóa sản xuất content & thực hiện trên Antigravity/Minh-Chung-Anh-Va-Code-Antigravity/Anh-AI-1-Pelvic-Curl.jpg", label: "Ảnh minh họa bài tập Pelvic Curl sản xuất bằng AI Workflow" },
        { src: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/4. Workflow tự động hóa sản xuất content & thực hiện trên Antigravity/Minh-Chung-Anh-Va-Code-Antigravity/Anh-AI-2-Dia-An-211.jpg", label: "Ảnh minh họa Dinh dưỡng Đĩa ăn 2:1:1 chuẩn Wellness" },
        { src: "Daizy Pilates - Nen trang nga v2.png", label: "Thiết kế Logo & Nhận diện Thương hiệu Daizy Pilates" }
      ],
      summary: "Xây dựng trọn vẹn hệ sinh thái nội dung cho 02 kênh mạng xã hội thực tế từ con số 0: Lập bản Chiến lược nội dung 12 chặng, Kế hoạch 26 bài/tháng, sản xuất nội dung hình ảnh/video và thiết lập Workflow tự động hóa viết bài – tạo ảnh – đăng bài tự động lên Facebook qua Antigravity.",
      tags: ["Content Strategy", "Social Channel Growth", "AI Content OS", "Antigravity Automation", "TikTok 3.2K Views"],
      metrics: [
        "TikTok @daizy.purple.aura: 14 video công khai, 971 Lượt thích, Video nổi bật đạt 3.215 Views",
        "Facebook Daizy Pilates: 10 bài đăng chuyên sâu chuẩn PAS kèm bộ ảnh AI Studio đồng nhất",
        "Tự động hóa quy trình sản xuất & đăng 5 bài liên tiếp bằng kịch bản Antigravity + Puppeteer"
      ],
      caseStudy: {
        context: "Việc xây dựng đồng thời nhiều kênh mạng xã hội thường gặp 2 điểm nghẽn lớn: Nội dung thiếu chiến lược xuyên suốt dẫn đến không có tương tác, và quy trình sản xuất thủ công (viết bài, làm ảnh, đăng bài) tốn quá nhiều thời gian.",
        insight: "Nữ văn phòng 25–35 tuổi trên Facebook cần những bài viết giải thích khoa học, thấu cảm kèm hình ảnh trực quan dễ lưu lại (Save); trong khi người dùng TikTok bị thu hút bởi thẩm mỹ thị giác đồng nhất và thông điệp chạm cảm xúc ngay trong 3 giây đầu.",
        solution: [
          "Xây dựng Bản Định hướng Chiến lược Nội dung 12 chặng (Content Strategy One-Page) và Lịch đăng bài 1 tháng (26 bài) kèm Ma trận chuyển hóa nội dung đa kênh (Repurpose Matrix).",
          "Thiết kế bộ nhận diện thương hiệu Daizy Pilates (Logo, bảng màu Tím Pastel & Trắng Ngà) và gói bối cảnh thương hiệu (Brand Context Pack).",
          "Thiết lập hệ thống AI Content OS 5 bước trên Antigravity: Tự động lên bản thảo Markdown chuẩn Brand Voice, tự động sinh bộ ảnh minh họa 8K và chạy kịch bản tự động đăng bài lên Fanpage.",
          "Đo lường kết quả thực tế trên cả 2 kênh và viết báo cáo chẩn đoán hiệu quả 5 dòng để tối ưu tuyến bài thắng."
        ],
        outcome: "Cả 2 kênh đều đạt chỉ số tăng trưởng tự nhiên ấn tượng ngay trong giai đoạn khởi chạy (3.215+ views & 971 likes trên TikTok, 10 bài hoàn chỉnh trên Facebook), rút ngắn 70% thời gian sản xuất nội dung nhờ tự động hóa."
      }
    },
    {
      id: "project-daizy-pilates-tvc",
      title: "Chiến Dịch TVC & Video Content Daizy Pilates: “Không Phải Béo Bụng — Mà Là Hông Chậu Đổ Trước”",
      category: "Commercial TVC",
      categoryLabel: "TVC & Video Marketing (Kstudy AICO01)",
      role: "Creative Director, Copywriter & AI Video Producer",
      duration: "10/2026 - 11/2026 • Trọn Bộ Hồ Sơ B01 → B05 & 8-Shot Storyboard",
      featured: true,
      imagePreview: "assets/tvc-pilates-keyframe-1.jpg",
      strategyDocs: [
        { title: "B01 • Content Direction", url: "docs_pilates/B01_Content_Direction_Pilates_Wellness.html" },
        { title: "B02 • Content Plan 30 Ngày", url: "docs_pilates/B02_Content_Plan_30_Ngay_Pilates.html" },
        { title: "B03 • Creative Bank (18/18đ)", url: "docs_pilates/B03_Creative_Bank_Kho_Sang_Tao_Pilates.html" },
        { title: "B04 • Bài Viết PAS & Visual Brief", url: "docs_pilates/B04_San_Xuat_Bai_Viet_Va_Visual_Brief_Pilates.html" },
        { title: "B05 • Kịch Bản Video 7 Cột & Shot List", url: "docs_pilates/B05_Kich_Ban_Video_Content_Pilates.html" }
      ],
      galleryImages: [
        { src: "assets/tvc-pilates-keyframe-1.jpg", label: "Master Character & Studio Reference 8K: Nữ HLV Pilates bên máy tập Reformer" },
        { src: "assets/nhan-vat-tvc-nguoi-that.png", label: "Master Character Sheet (Nền Studio): Khoá đồng nhất gương mặt, tóc bện & trang phục" },
        { src: "assets/pilates_before_after.jpg", label: "Visual Before / After (Tỷ lệ 4:5): Đối chứng góc nghiêng Lệch xương chậu vs Thẳng trục" },
        { src: "assets/tvc_daizy/storyboard_grid_8shots.jpg", label: "Bảng Storyboard Tổng Hợp 8 Cảnh TVC Daizy Pilates" },
        { src: "assets/tvc_daizy/shot_01_office_pain.jpg", label: "Shot 01: Nỗi đau dân văn phòng ngồi lâu đau mỏi thắt lưng & bụng dưới nhô" },
        { src: "assets/tvc_daizy/shot_02_posture_check.jpg", label: "Shot 02: Khám dáng & chỉ rõ góc lệch Hông chậu đổ trước (Anterior Pelvic Tilt)" },
        { src: "assets/tvc_daizy/shot_04_reformer_alignment.jpg", label: "Shot 04: Nắn chỉnh trục lưng và kích hoạt cơ bụng sâu trên máy Reformer" },
        { src: "assets/tvc_daizy/shot_07_posture_transformed.jpg", label: "Shot 07: Trục cơ thể cân bằng, bụng phẳng tự nhiên & thần thái rạng rỡ" }
      ],
      summary: "Phát triển chiến dịch nội dung đa định dạng từ góc tiếp cận đạt 18/18 điểm: Đập tan hiểu lầm 'ăn kiêng/gập bụng' bằng kiến thức giải phẫu 'Hông chậu đổ trước'. Bao gồm trọn bộ bài viết PAS, thiết kế Visual Before/After, kịch bản video 7 cột và bộ 8 Keyframes TVC.",
      tags: ["Pilates TVC", "Kstudy Standard", "7-Column Video Script", "Before/After Visual", "Character Sheet 8K"],
      metrics: [
        "Hoàn thiện 05 bộ tài liệu chiến lược liên hoàn từ Buổi 1 đến Buổi 5 đạt chuẩn 100% Quality Gate",
        "Thiết kế Nhân vật tham chiếu người thật 8K (Master Character) giữ đồng nhất tuyệt đối qua mọi cảnh quay",
        "Xây dựng kịch bản Video 7 cột & Shot List 8 cột tối ưu chuyển đổi 2 tầng (Comment nhận bài tập & Đo InBody 1:1)"
      ],
      caseStudy: {
        context: "Khách hàng nữ văn phòng (25–35 tuổi) thường tự ti vì tay chân gầy nhưng bụng dưới luôn phình to. Họ lao vào nhịn ăn hoặc gập bụng sai cách khiến thắt lưng càng đau mỏi mà bụng vẫn không nhỏ lại.",
        insight: "Họ không hề béo bụng vì mỡ thừa, mà do ngồi làm việc 8 tiếng/ngày khiến cơ gập hông co rút, kéo khung xương chậu đổ về phía trước (Anterior Pelvic Tilt) làm đẩy trồi thành bụng dưới ra ngoài.",
        solution: [
          "Chọn góc tiếp cận Phản biện & Giải mã khoa học: 'Bạn không béo bụng — Bạn đang bị hông chậu đổ trước'.",
          "Viết bài Social theo công thức PAS kết hợp hướng dẫn 'Bài test 30 giây đứng dựa tường' để độc giả tự kiểm chứng ngay tại nhà.",
          "Thiết kế Visual Brief 10 ô và ảnh Split-screen Before/After góc nghiêng 90° tuân thủ nguyên tắc thị giác 2 giây.",
          "Chuyển thể thành kịch bản Video 7 cột & sản xuất bộ Keyframe 8K với nhân vật HLV Pilates đồng nhất 100% để thực thi trên Google Flow."
        ],
        outcome: "Tạo ra bộ hồ sơ chiến dịch mẫu mực từ Chiến lược, Copywriting, Visual Design đến Video Production — sẵn sàng bàn giao ngay cho bất kỳ team Marketing hoặc Production House nào."
      }
    },
    {
      id: "project-fusion-resort-tvc",
      title: "TVC Quảng Cáo 60s (Google Flow / Veo): “Fusion Resort Cam Ranh — Nơi Thời Gian Dừng Lại Bên Biển Ngọc”",
      category: "Commercial TVC",
      categoryLabel: "TVC Nghỉ Dưỡng 5 Sao 60s (Google Flow)",
      role: "TVC Director, LookDev Artist & Storyboard Creator",
      duration: "11/2026 • TVC 60s (Bộ Đôi Nhân Vật An & Minh + Kiến Trúc Thật)",
      featured: true,
      imagePreview: "assets/tvc_fusion/fusion_5scenes_resort_view_strip.jpg",
      galleryImages: [
        { src: "assets/tvc_fusion/fusion_5scenes_resort_view_strip.jpg", label: "Master Strip 5 Cảnh: Ghép đồng nhất nhân vật vào kiến trúc thật tại Fusion Resort Cam Ranh" },
        { src: "assets/tvc_fusion/resort_couple_character_sheet.jpg", label: "Couple Master Sheet: Bộ Đôi Nhân Vật An & Minh (Master Ingredients cố định)" },
        { src: "Fusion-Official-Frames/Flow-1.png", label: "Official Frame 01 (00-12s): Thức giấc tại Beachfront Pool Villa giường treo màn lụa hướng biển" },
        { src: "Fusion-Official-Frames/Flow-2.png", label: "Official Frame 02 (12-24s): Thưởng thức bữa sáng tại Sunken Pool Lounge & Hồ bơi vô cực" },
        { src: "Fusion-Official-Frames/Flow-3.png", label: "Official Frame 03 (24-36s): Thư giãn tại Nhà vòm tre bát giác & Hồ hoa súng Maia Spa" },
        { src: "Fusion-Official-Frames/Flow-4.png", label: "Official Frame 04 (36-48s): Bàn tiệc gỗ ánh đèn lồng bên bờ biển Bãi Dài" },
        { src: "Fusion-Official-Frames/Flow-5.png", label: "Official Frame 05 (48-60s): Ngắm hoàng hôn buông xuống từ ghế tắm nắng đèn lồng Bãi Dài" },
        { src: "assets/tvc_fusion/fusion_storyboard_grid_8shots.jpg", label: "Bảng Storyboard 8 Shots × 7.5s = 60s chuẩn Google Flow Scenebuilder" }
      ],
      summary: "Sản xuất bộ Keyframes & Kịch bản đạo diễn TVC 60 giây trên Google Flow (Veo) cho khu nghỉ dưỡng 5 sao Fusion Resort Cam Ranh. Giữ đồng nhất 100% bộ đôi nhân vật 'An & Minh' trong đúng không gian kiến trúc thực tế của Resort qua 3 hồi ánh sáng.",
      tags: ["Luxury Hospitality TVC", "Google Flow (Veo)", "Architecture Consistency", "Couple Character Sheet", "60s Commercial"],
      metrics: [
        "Đồng nhất 100% cả Kiến trúc thật của Resort (5 bối cảnh đặc trưng) lẫn 2 Nhân vật An & Minh",
        "Đạo diễn Bảng màu 3 Hồi (Bình minh trong trẻo → Nắng trưa biển ngọc → Hoàng hôn & Chạng vạng đèn lồng)",
        "Làm nổi bật 2 USP độc quyền của Fusion: 'Breakfast Anywhere, Anytime' & 'All-Spa Inclusive'"
      ],
      caseStudy: {
        context: "Quảng cáo Bất động sản Nghỉ dưỡng & Resort 5 sao đòi hỏi độ chính xác tuyệt đối về kiến trúc thực tế của khu nghỉ dưỡng (không được bịa sai kiến trúc) đồng thời phải truyền tải được cảm xúc sang trọng, thư thái của cặp đôi.",
        insight: "Du khách cao cấp không chỉ mua một căn phòng, họ mua những khoảnh khắc kết nối cảm xúc không bị giới hạn bởi thời gian — nơi bữa sáng có thể bắt đầu bất cứ lúc nào và mọi liệu trình Spa đã được bao gồm trọn gói.",
        solution: [
          "Sử dụng trực tiếp 05 khung hình kiến trúc thực tế nổi tiếng nhất của Fusion Resort Cam Ranh (Giường treo màn lụa, Sunken Pool Lounge, Vòm tre Maia Spa, Bàn tiệc biển và Bãi Dài chạng vạng) làm Environment Plates.",
          "Thiết kế Bộ đôi Nhân vật An & Minh theo phong cách Quiet Luxury (chất liệu Linen kem yến mạch & xanh da trời nhạt) làm Master Ingredients.",
          "Đưa nhân vật vào đúng 05 không gian thật với hướng ánh sáng, bóng đổ và phối cảnh ống kính khớp hoàn hảo để chạy chuyển động trên Google Flow."
        ],
        outcome: "Hoàn thiện bộ khung sản xuất TVC nghỉ dưỡng 60 giây chất lượng điện ảnh, chứng minh khả năng ứng dụng AI phục vụ các thương hiệu Luxury Hospitality khắt khe nhất."
      }
    },
    {
      id: "project-3d-film",
      title: "Phim Ngắn Hoạt Hình 3D (02:15): “Về Nhà Ăn Cơm Cùng Bà”",
      category: "3D Animation Film",
      categoryLabel: "Phim Hoạt Hình 3D / Emotional Storytelling",
      role: "Director, 3D Character/Set Designer & Video Editor",
      duration: "10/2026 • Phim Hoàn Chỉnh 02 Phút 15 Giây",
      featured: true,
      videoPreview: "master_assets/Phim-3D-Bua-Com-Voi-Ba-web.mp4",
      imagePreview: "assets/ba-va-hanh.png",
      galleryImages: [
        { src: "assets/nhan-vat-hanh.png", label: "Bước 1 - Character Sheet: Tạo hình gốc nhân vật 3D 'Hạnh'" },
        { src: "assets/phong-an-nha-ba.png", label: "Bước 2 - Environment Plate: Thiết kế bối cảnh trống 'Phòng ăn nhà bà' đậm chất Việt" },
        { src: "assets/ba-va-hanh.png", label: "Bước 3 - Scene Compositing: Ghép nhân vật Bà và Hạnh bên mâm cơm gia đình" },
        { src: "assets/canh-goc-khac.png", label: "Bước 4A - Wide Establishing Shot: Góc toàn cảnh con phố & ngôi nhà cửa gỗ xanh" },
        { src: "assets/canh-truoc-nha.png", label: "Bước 4B - Medium Shot: Góc trung cảnh xóa phông tập trung vào cảm xúc nhân vật" },
        { src: "review_frames/details.jpg", label: "Bước 5 - Animatic Frame Sheet: Bảng kiểm soát nhịp phim & màu sắc từ 00:49 đến 02:15" }
      ],
      summary: "Bộ phim hoạt hình 3D hoàn chỉnh dài 02 phút 15 giây kể câu chuyện về cô gái trẻ ngủ thiếp đi bên bàn làm việc đêm khuya và trở về trong giấc mơ ấm áp bên mâm cơm của bà. Tự thực hiện 100% từ kịch bản, tạo hình nhân vật, bối cảnh 3D đến dựng hậu kỳ.",
      tags: ["3D Animation Film", "Emotional Storytelling", "Character Consistency", "Vietnamese Set Design", "Post-Production"],
      metrics: [
        "Sản xuất hoàn chỉnh 01 bộ phim hoạt hình 3D dài 02:15 có đầy đủ âm thanh, chuyển động và cảm xúc",
        "Giữ đồng nhất tuyệt đối tạo hình 2 nhân vật (Hạnh & Bà) và bối cảnh nhà Việt qua hơn 25 cảnh quay",
        "Xây dựng công cụ Python tự động trích xuất Frame Sheet để kiểm tra chất lượng hình ảnh từng giây"
      ],
      caseStudy: {
        context: "Phim hoạt hình 3D kể chuyện cảm xúc gia đình (Emotional Brand Film) luôn có sức lan tỏa cực lớn trong các chiến dịch truyền thông, nhưng rào cản lớn nhất khi sản xuất độc lập là giữ được sự đồng nhất nhân vật và chất liệu văn hóa Việt Nam.",
        insight: "Khoảnh khắc người trẻ kiệt sức ngủ gục bên chiếc laptop vào đêm muộn chính là lúc ký ức về ngôi nhà xưa, nụ cười hiền hậu và mâm cơm nóng hổi của bà trở thành điểm tựa tinh thần ấm áp nhất.",
        solution: [
          "Tách biệt quy trình thiết kế: Làm chủ Character Sheet nhân vật trên nền studio và Background Plate không gian nhà bà (tường xanh bạc hà, lịch блоk đỏ, bàn cơm gỗ) trước khi ghép cảnh.",
          "Thiết kế kịch bản ánh sáng (Color Script) 3 hồi rõ rệt: Đêm khuya xanh lạnh cô đơn → Giấc mơ nắng vàng ấm áp → Bình minh trắng hồng tràn đầy hy vọng.",
          "Dựng hậu kỳ kết hợp điều tiết nhịp phim (Pacing), chuyển cảnh Match-cut và âm thanh cảm xúc."
        ],
        outcome: "Hoàn thành tác phẩm phim ngắn hoạt hình 3D hoàn chỉnh đóng vai trò Showreel trung tâm của Portfolio, khẳng định tư duy đạo diễn hình ảnh và kỹ năng làm phim độc lập."
      }
    }
  ],

  // 5. BÓC TÁCH QUY TRÌNH SẢN XUẤT ĐA NĂNG (PRODUCTION PIPELINE BREAKDOWN)
  pipelineBreakdown: [
    {
      step: "Bước 01 • Chiến Lược & Kịch Bản (Strategy & 7-Column Script)",
      title: "Nghiên cứu Insight 4D, Lập Content Plan & Viết Kịch Bản Phân Cảnh 7 Cột",
      image: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/Facebook-2-Bang-Dieu-Khien-10-Bai-Dang.png",
      desc: "Mọi sản phẩm (bài viết, ảnh hay video 3D/TVC) đều bắt đầu từ nghiên cứu nỗi đau khách hàng thật, xác định Góc tiếp cận (Angle), lập Content Plan 1 tháng và viết kịch bản 7 cột đồng bộ giữa Lời thoại – Hình ảnh – Text – Âm thanh."
    },
    {
      step: "Bước 02 • Thiết Kế Nhân Vật Chuẩn (3D & Photorealistic Character Sheet)",
      title: "Khóa Định Danh Nhân Vật (Master Character Ingredients) Cho Cả 3D & Người Thật",
      image: "assets/nhan-vat-tvc-nguoi-that.png",
      secondaryImage: "assets/nhan-vat-hanh.png",
      desc: "Làm chủ kỹ thuật tạo Master Character Sheet cho cả 2 trường phái: Nhân vật người thật 8K (TVC Daizy Pilates & Fusion Resort) và Nhân vật Hoạt hình 3D (Phim ngắn Về Nhà Ăn Cơm Cùng Bà), giữ đồng nhất 100% gương mặt và trang phục."
    },
    {
      step: "Bước 03 • Thiết Kế Bối Cảnh & Ghép Cảnh (Environment & Scene Compositing)",
      title: "Kiểm Soát Không Gian Văn Hóa Việt, Phòng Tập Luxury & Kiến Trúc Resort Thật",
      image: "assets/ba-va-hanh.png",
      secondaryImage: "assets/tvc-pilates-keyframe-1.jpg",
      desc: "Kết hợp nhuần nhuyễn giữa Background Plate tự thiết kế (Phòng ăn nhà bà thuần Việt) và không gian thương mại cao cấp (Studio Pilates Reformer ngập nắng, Biệt thự biển Fusion Resort Cam Ranh) với ánh sáng và bóng đổ chân thực."
    },
    {
      step: "Bước 04 • Đạo Diễn Góc Máy & Storyboard 8 Cảnh (Cinematography & Storyboarding)",
      title: "Xây Dựng Bảng Phân Cảnh Toàn – Trung – Cận Chuẩn Google Flow (Veo)",
      image: "assets/tvc_fusion/fusion_5scenes_resort_view_strip.jpg",
      desc: "Thiết kế chuỗi Keyframes liên hoàn theo 3 hồi cảm xúc và ngôn ngữ ống kính điện ảnh (Wide Establishing, Medium Tracking, Close-up 85mm DOF) giúp quá trình tạo chuyển động video AI trên Google Flow mượt mà, không biến dạng vật lý."
    },
    {
      step: "Bước 05 • Tự Động Hóa & Tăng Trưởng Kênh Thực Tế (AI Content OS & Channel Growth)",
      title: "Vận Hành Kênh TikTok (3.215+ Views) & Tự Động Hóa Đăng Bài Với Antigravity",
      image: "bài tập cuối môn AI Content - Hoàng thị Hạnh Dung (antigravity)/3. Ảnh chụp kết quả kênh/TikTok-1-Tong-Quan-Kenh-Hao-Quang-Mau-Tim.jpg",
      desc: "Không chỉ dừng ở sản xuất file mẫu, toàn bộ sản phẩm được xuất bản lên 2 kênh TikTok và Facebook Fanpage thực tế, tích hợp kịch bản tự động hóa trên Antigravity và đo lường chỉ số View, Like, Save để liên tục tối ưu."
    }
  ],

  // 6. BỘ KỸ NĂNG CHUYÊN MÔN TOÀN DIỆN (4 TRỤ CỘT NĂNG LỰC)
  skillGroups: [
    {
      category: "1. Chiến lược Nội dung & Xây kênh (Content & Social Growth)",
      skills: [
        "Xây dựng Chiến lược Nội dung 12 chặng (Content Strategy One-Page)",
        "Nghiên cứu Insight khách hàng (4D), lập Content Pillar & Content Plan 30 ngày",
        "Vận hành thực chiến Fanpage Facebook & Kênh TikTok (Tối ưu Hook, Retention, SEO)",
        "Đo lường chỉ số theo phễu (TOF/MOF/BOF) & viết chẩn đoán tối ưu nội dung"
      ]
    },
    {
      category: "2. Sản xuất Video Hoạt hình 3D & TVC Quảng cáo (Video Production)",
      skills: [
        "Viết kịch bản Video 7 cột & Storyboard/Shot List 8 cột chuẩn Production House",
        "Thiết kế & khóa đồng nhất nhân vật (3D Stylized & Photorealistic 8K Character Sheet)",
        "Sản xuất video trên Google Flow (Veo), kiểm soát chuyển động máy & vật lý mượt mà",
        "Dựng hậu kỳ, chỉnh màu theo Color Script & thiết kế âm thanh (CapCut / Premiere)"
      ]
    },
    {
      category: "3. Copywriting & Thiết kế Hình ảnh (Copy & Visual Design)",
      skills: [
        "Viết bài Social đa công thức (PAS, Storytelling, Myth-busting) & Khử mùi AI (AI Smell)",
        "Chuyển hóa 1 nội dung gốc ra đa định dạng (Repurpose: Post → Carousel → Video Script)",
        "Lập Visual Brief 10 ô, thiết kế ảnh Before/After & Carousel theo nguyên tắc 2 giây",
        "Thiết kế bộ nhận diện thương hiệu cơ bản (Logo, Avatar, Moodboard, Color Palette)"
      ]
    },
    {
      category: "4. Hệ thống AI Content OS & Tự động hóa (AI & Automation)",
      skills: [
        "Thiết kế quy trình AI Content OS 5 bước kèm Cổng kiểm chất lượng (Quality Gate)",
        "Viết Prompt kỹ thuật cao theo khung CRAFT-F cho Văn bản, Hình ảnh 8K & Video",
        "Ứng dụng Antigravity & kịch bản tự động hóa (Puppeteer/JS) đăng bài hàng loạt",
        "Sử dụng Python (PyAV/Pillow) trích xuất Frame Review Sheet kiểm định chất lượng video"
      ]
    }
  ],

  // 7. MẪU KỊCH BẢN & COPYWRITING ĐỌC NHANH TRONG 30 GIÂY
  samples: [
    {
      type: "Kịch bản Video Ngắn / TVC (Góc tiếp cận đạt 18/18 điểm)",
      title: "Daizy Pilates: “Không phải béo bụng — Mà là Hông chậu đổ trước!”",
      hook: "🎥 Hook (0–5s) [Góc nghiêng 90°]: “Tay chân thì gầy, ăn kiêng đủ kiểu mà bụng dưới vẫn chìa ra một cục, thắt lưng võng sâu hoắm? Khoan hãy gập bụng, khả năng cao bạn KHÔNG HỀ BÉO BỤNG!”",
      body: "💡 Giải mã & Biến hình (5–28s): Ngồi 8 tiếng làm cơ gập hông co rút, kéo khung xương chậu đổ trước. Thị phạm xoay nhẹ khung chậu về đúng trục cân bằng ➔ Bụng tự khắc phẳng lì + Hướng dẫn bài test 30s luồn tay sau lưng & động tác cuộn xương chậu trên máy Reformer.",
      cta: "👉 CTA 2 Tầng (28–40s): Comment “DÁNG” nhận video 3 phút tự tập tại nhà hoặc đặt lịch đo InBody & quét góc lệch cột sống 1:1 miễn phí tuần khai trương.",
      note: "Đạt 100% Quality Gate 5 điểm • Giải quyết triệt để lỗi vật lý máy tập khi tạo video trên Google Flow"
    },
    {
      type: "Kịch bản Đạo diễn TVC 60s (Google Flow / Veo)",
      title: "Fusion Resort Cam Ranh: “Nơi Thời Gian Dừng Lại Bên Biển Ngọc”",
      hook: "🎥 Hồi 1 – Bình Minh (00–20s): Cú máy Dolly-in xuyên qua rèm lụa trắng mở ra giường treo hướng biển tại Beachfront Pool Villa. An & Minh thưởng thức khay điểm tâm tại Sunken Pool Lounge ('Breakfast Anywhere, Anytime').",
      body: "🌿 Hồi 2 – Giữa Ngày (20–45s): Chuyển cảnh mượt sang Nhà vòm tre bát giác bên hồ hoa súng tại Maia Spa ('All-Spa Inclusive'), nơi cặp đôi tận hưởng sự tĩnh lặng tuyệt đối giữa thiên nhiên.",
      cta: "🌅 Hồi 3 – Hoàng Hôn & Chạng Vạng (45–60s): Dạo bước bên bàn tiệc ánh đèn lồng sát bờ biển Bãi Dài trong ánh hoàng hôn vàng cam ngược sáng. Hiện Logo: 'Fusion Resort Cam Ranh — Hòa Quyện Cùng Thiên Nhiên'.",
      note: "Đồng nhất 100% Bộ đôi Nhân vật An & Minh trong đúng 5 bối cảnh kiến trúc thật của Resort"
    },
    {
      type: "Phim Ngắn Hoạt Hình 3D (02 Phút 15 Giây)",
      title: "Emotional 3D Short Film: “Về Nhà Ăn Cơm Cùng Bà”",
      hook: "🎥 Hồi 1 – Đêm Khuya Phố Thị [00:00 - 01:06]: Trong căn phòng tối xanh lạnh, cô gái trẻ ngồi mệt mỏi trước màn hình laptop rồi gục đầu ngủ thiếp đi dưới ánh đèn bàn vàng hắt hiu.",
      body: "🏡 Hồi 2 – Giấc Mơ Về Nhà Bà [01:07 - 01:50]: Cắt sang sắc nắng vàng ấm áp trước ngôi nhà cửa gỗ xanh Hà Nội. Trong phòng ăn tường xanh bạc hà, bà ngồi đợi bên mâm cơm nóng hổi, mỉm cười hiền từ nắm chặt đôi tay cháu gái.",
      cta: "☀️ Hồi 3 – Bình Minh Thức Giấc [01:51 - 02:15]: Match-cut tỉnh dậy khi trời vừa sáng, cô mở tung cửa sổ đón nắng mai và đàn chim bay qua bầu trời với nguồn năng lượng mới.",
      note: "Tự thực hiện trọn gói: Kịch bản → Character Sheet → Set Design → Animation → Hậu kỳ"
    }
  ],

  // 8. HỌC VẤN & CHƯƠNG TRÌNH ĐÀO TẠO
  education: [
    {
      school: "Học viện Kstudy — Chương trình Thực chiến AI Content Marketing (AICO01)",
      degree: "Hoàn thành Xuất sắc Dự án Cuối môn: Hệ thống AI Content OS, Xây kênh Đa nền tảng & Video Marketing",
      period: "10/2026 - 11/2026",
      details: "Thực hành trọn vẹn 8 buổi từ Chiến lược nội dung 12 chặng, Content Plan 30 ngày, Creative Bank, Copywriting & Visual Brief, Kịch bản Video 7 cột, Kế hoạch kênh, Đo lường KPI đến Tự động hóa sản xuất trên Antigravity."
    },
    {
      school: "Đào tạo Chuyên sâu Sản xuất Phim Hoạt hình 3D & AI Commercial Filmmaking",
      degree: "Chuyên ngành Thiết kế Đa phương tiện, Hoạt hình 3D & Sản xuất TVC Quảng cáo (Google Flow / Veo)",
      period: "2023 - Hiện tại",
      details: "Nghiên cứu và thực hành chuyên sâu: Storyboarding, Character & Environment LookDev, Ngôn ngữ ống kính điện ảnh (Cinematography), Dựng phim & Ứng dụng AI thế hệ mới trong sản xuất quảng cáo."
    }
  ],

  // 9. KINH NGHIỆM DỰ ÁN THỰC TẾ (EXPERIENCE)
  experiences: [
    {
      role: "Nhà Sáng Tạo Nội Dung AI & Xây Kênh Social (AI Content & Channel Builder)",
      company: "Dự án Thực tế: Fanpage Daizy Pilates & Kênh TikTok Hào Quang Màu Tím",
      period: "10/2026 - 11/2026",
      achievements: [
        "Xây dựng từ con số 0 và vận hành 02 kênh mạng xã hội công khai: Kênh TikTok (@daizy.purple.aura) đạt 3.215+ lượt xem/video, 971 lượt thích với 14 video; Fanpage Daizy Pilates với 10 bài viết chuyên sâu.",
        "Lập Chiến lược nội dung 12 chặng, Kế hoạch 26 bài/tháng, viết bài chuẩn PAS đã khử mùi AI và thiết kế bộ nhận diện thương hiệu đồng bộ.",
        "Thiết kế Workflow tự động hóa 5 bước trên Antigravity (kết hợp kịch bản Puppeteer/JS) giúp tự động tạo ảnh minh họa 8K và đăng bài hàng loạt lên Fanpage."
      ]
    },
    {
      role: "Đạo Diễn Hình Ảnh & Nhà Sản Xuất Video 3D / TVC (3D & AI TVC Creator)",
      company: "Dự án Phim ngắn 3D “Về Nhà Ăn Cơm Cùng Bà”, TVC Fusion Resort Cam Ranh & TVC Daizy Pilates",
      period: "09/2026 - 11/2026",
      achievements: [
        "Sản xuất trọn gói bộ phim hoạt hình 3D dài 02 phút 15 giây ('Về Nhà Ăn Cơm Cùng Bà') với hơn 25 phân cảnh giữ đồng nhất tuyệt đối nhân vật và bối cảnh thuần Việt.",
        "Thiết kế Master Character Sheets (8K) và Storyboard 8 cảnh cho TVC nghỉ dưỡng 60s 'Fusion Resort Cam Ranh' và TVC 'Daizy Pilates', tối ưu hóa quy trình tạo chuyển động trên Google Flow (Veo).",
        "Xây dựng công cụ Python tự động trích xuất bảng kiểm tra khung hình (Frame Review Sheet) để kiểm soát chất lượng ánh sáng, bố cục và chuyển động từng giây."
      ]
    }
  ],

  // 10. ĐIỂM MẠNH CỐT LÕI (TRÊN CV A4)
  strengths: [
    "Sự kết hợp hiếm có giữa 'Tư duy Chiến lược Marketing' và 'Năng lực Sản xuất Hình ảnh/Video 3D & TVC chất lượng cao'.",
    "Đã có sản phẩm thật và con số thật: 02 kênh Social đang hoạt động (3.215+ views, 971 likes), 01 phim ngắn 3D hoàn chỉnh (02:15) và 02 bộ TVC Storyboard thương mại.",
    "Làm chủ công nghệ AI & Tự động hóa mới nhất (Antigravity, Google Flow/Veo, Prompt CRAFT-F, Python QC) giúp tăng gấp 3 lần tốc độ sản xuất cho doanh nghiệp."
  ]
};
