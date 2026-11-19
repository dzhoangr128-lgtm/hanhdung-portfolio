# 05. Outline báo cáo cuối môn Enter AI

## Trang bìa chuẩn nhận diện Kstudy

- **Logo:** `skills/kstudy-enter-ai-report-branding/assets/kstudy-logo-full.png` (căn giữa đầu trang)
- **Đơn vị đào tạo:** KSTUDY ACADEMY
- **Loại hình:** BÀI TẬP CUỐI MÔN
- **Tên đề tài:** XÂY DỰNG AI AGENT WORKFLOW TỰ ĐỘNG HÓA SẢN XUẤT KỊCH BẢN VIDEO NGẮN (TIKTOK / REELS) CHUẨN CẤU TRÚC GIỮ CHÂN NGƯỜI XEM CHO KÊNH WELLNESS & PILATES
- **Học viên thực hiện:** Hoàng Thị Hạnh Dung (Sinh năm 1999)
- **Khóa học:** Enter AI
- **Tên môn học:** Enter AI – Nền tảng AI và Automation trong công việc
- **Giảng viên / Mentor hướng dẫn:** Hội đồng chuyên môn Kstudy
- **Lớp / Khóa:** Enter AI K08-2026
- **Địa điểm & Thời gian:** Hà Nội, Tháng 09/2026

---

## Cấu trúc nội dung Báo cáo chi tiết (Tối đa 7 trang)

### Phần 1: Tóm tắt tác vụ và Mục tiêu đề tài (0.5 trang)
- **Bối cảnh:** Hoàng Thị Hạnh Dung – Cử nhân Luật chuyển ngành sang Marketing, đang theo học Huấn luyện viên Pilates chuyên nghiệp và xây dựng kênh cá nhân *Wellness - Energy - Present* để định hướng khởi nghiệp.
- **Vấn đề thực tế:** Quy trình sản xuất kịch bản video ngắn (TikTok/Reels) thủ công tốn từ 90–120 phút/kịch bản, thường xuyên bí câu Hook 3s và khó căn chuẩn thời lượng dưới 60 giây.
- **Mục tiêu chuyển đổi AI:** Xây dựng một AI Agent Workflow khép kín giúp tự động hóa khâu phân cảnh kịch bản, rút ngắn thời gian xuống dưới 15 phút, đồng thời thiết lập chốt chặn Human Review để kiểm soát 100% tính an toàn giải phẫu và chuẩn mực pháp lý quảng cáo.

### Phần 2: Thiết lập cá nhân hóa AI Tool & AI Agent (1 trang)
- **Cá nhân hóa Google Gemini (AI Tool):** Thiết lập Gem *"Trợ lý Nội dung & Cố vấn Chiến lược Marketing 10 năm kinh nghiệm"*, nạp sẵn bối cảnh Cử nhân Luật + Huấn luyện viên Pilates.
- **Cá nhân hóa Antigravity (AI Agent):** Tạo file quy tắc `GEMINI.md` / `AGENTS.md` với các chỉ thị cốt lõi: tự phản biện trước khi trả lời (Self-critique), trích dẫn nguồn số liệu, phỏng vấn từng bước khi thiếu thông tin, tuyệt đối chống bịa đặt (Anti-hallucination).
- **Minh chứng:** Ảnh chụp thiết lập thực tế trên Gemini (`gemini-setup.png`) và Antigravity (`agent-setup.png`).

### Phần 3: Phân tích Cách làm cũ vs Cơ hội tự động hóa (0.5 trang)
- Bảng so sánh các bước thủ công trước đây và các nút thắt cổ chai (bottlenecks).
- Phân tích rủi ro khi làm thủ công: mệt mỏi nhận thức, kịch bản dài dòng khó quay, thiếu tính nhất quán thương hiệu.

### Phần 4: Thiết kế AI Agent Workflow và Quản trị rủi ro (1 trang)
- **Sơ đồ luồng xử lý:** `Input ➡️ [Gemini: Lọc Hook & Angle] ➡️ [Antigravity: Sinh bảng Storyboard 4 cột] ➡️ [Human Review: Duyệt an toàn chuyển động] ➡️ Output`.
- **Bảng phân công trách nhiệm (RACI matrix):** Xác định rõ khâu nào AI làm trợ lý và khâu nào con người bắt buộc phải phê duyệt.
- **Bảng quản trị rủi ro:** Xử lý rủi ro sai động tác giải phẫu, rủi ro cam kết quá đà vi phạm luật quảng cáo, và bảo mật dữ liệu khách hàng.

### Phần 5: Sản phẩm thực tế Lần 1 & Đánh giá chất lượng (1 trang)
- Trình bày Kịch bản hoàn chỉnh Lần 1: *"3 Phút Pilates Giải Tỏa Căng Cứng Lưng Dưới Cho Dân Văn Phòng"* (thời lượng 50s, 135 từ, 4 phân cảnh rõ nét Visual và Voice-over).
- Phân tích hiệu quả: Đạt tiêu chuẩn thời lượng, có Hook gây chú ý ngay giây đầu tiên, caption chuẩn SEO.

### Phần 6: Đóng gói Skill `wellness-pilates-script-creator` (1 trang)
- Cấu trúc gói Skill: Mục tiêu, Input bắt buộc, Workflow 4 bước, Tiêu chuẩn output, Ranh giới an toàn và Bảng checklist tự kiểm.
- Giải thích cách người khác (hoặc chính mình trong tương lai) có thể nạp chủ đề mới để tái sử dụng ngay lập tức.

### Phần 7: Thực nghiệm Lần 2 với Input mới & Bài học cải tiến (1 trang)
- **Input mới:** *"Kỹ thuật thở cơ hoành (Lateral Breathing) trong Pilates xả stress sau giờ làm"*.
- **Kết quả thực nghiệm:** Skill tự động sinh kịch bản 45 giây chuẩn xác.
- **Phát hiện điểm yếu & Cải tiến Skill:** Phát hiện các bài tập tĩnh dễ gây nhàm chán thị giác ➡️ Bổ sung quy tắc đổi góc máy mỗi 4–5 giây vào Skill.

### Phần 8: Kết luận & Hướng phát triển tiếp theo (0.5 trang)
- **Tổng kết giá trị:** Rút ngắn 85% thời gian viết kịch bản, giải phóng sức sáng tạo cho Huấn luyện viên tập trung vào chuyên môn quay và giảng dạy.
- **Giới hạn & Trách nhiệm:** Khẳng định AI chỉ là trợ lý thực thi; Huấn luyện viên luôn là người chịu trách nhiệm cao nhất về sức khỏe người tập và nội dung xuất bản.
- **Kế hoạch tiếp theo:** Mở rộng Skill sang tự động hóa kịch bản chuỗi bài viết Carousel và bài tập Pilates trên thảm nâng cao.

### Phần 9: Tài liệu tham khảo & Phụ lục minh chứng (0.5 trang)
- Giáo trình Huấn luyện viên Pilates chuyên nghiệp.
- Tài liệu môn học Enter AI – Học viện Kstudy.
- Danh mục ảnh chụp màn hình, mã nguồn Skill và kịch bản video demo 3–5 phút.

---

## Chuẩn trình bày theo Nhận diện Kstudy

- **Khổ giấy & Font:** Khổ A4 dọc, font chữ Arial 11.5pt, khoảng cách dòng 1.25 line spacing.
- **Bảng màu nhận diện:**
  - Màu chủ đạo (Primary Navy): `#1D237D` (dành cho Tiêu đề bìa, Heading 1, thanh tiêu đề bảng).
  - Màu bổ trợ (Accent Blue): `#247DF9` (dành cho Heading 2, liên kết tài liệu).
  - Màu nhấn nhẹ: `#EAF0FB` (nền xen kẽ các hàng trong bảng biểu để dễ đọc).
- **Cấu trúc bảng biểu:** Đường viền đơn mỏng màu xám xanh `#C9D3E3`, căn lề trái văn bản, căn giữa tiêu đề cột.
