# Bật chat AI cho Daizy

1. Đăng nhập https://platform.openai.com/api-keys và tạo khóa API riêng cho Daizy. Giữ khóa riêng; không gửi vào chat, mã nguồn hay JavaScript trình duyệt.
2. Trong OpenAI Platform, cấu hình Billing để API có thể hoạt động; kiểm tra Usage/Limits và đặt ngân sách phù hợp. Gói ChatGPT không thay thế chi phí API.
3. Mở Vercel → project Daizy Wellness → Settings → Environment Variables. Thêm `OPENAI_API_KEY` với giá trị khóa vừa tạo, chọn Production, đánh dấu Sensitive nếu có.
4. Thêm `OPENAI_MODEL` = `gpt-5-mini` (không bắt buộc, đây là mặc định).
5. Vercel → Deployments → bản mới nhất → Redeploy. Mở website, bấm Chat nhanh → Trò chuyện với AI và thử hỏi về sản phẩm.

Khi chưa có khóa, chat AI hiện “sắp mở”; các câu trả lời nhanh vẫn hoạt động. Nếu có khóa nhưng hết hạn mức hoặc lỗi dịch vụ, hiển thị lỗi và cho thử lại, không giả lập câu trả lời AI.

AI đọc catalog hiện tại từ Supabase trước mỗi câu trả lời. Không có quyền sửa dữ liệu, tra đơn, đọc khách hàng hoặc đặt đơn. Hội thoại chỉ giữ trong bộ nhớ trang, xóa khi tải lại hoặc bấm Xóa trò chuyện. Tin nhắn được gửi đến OpenAI, `store: false`; điều này không có nghĩa là nhà cung cấp không có thời hạn lưu dữ liệu vận hành.

Endpoint giới hạn 12 tin mỗi yêu cầu, 1.200 ký tự mỗi tin, 8 yêu cầu/phút/IP trên mỗi phiên bản server đang chạy, và giới hạn đầu ra 1.200 token. Giới hạn trong bộ nhớ không phải quota toàn hệ thống: cần cấu hình giới hạn/kiểm soát chi phí ở nhà cung cấp và firewall Vercel trước khi có lượng truy cập lớn.

Tài liệu: https://developers.openai.com/api/docs/quickstart và https://developers.openai.com/api/docs/models/gpt-5-mini
