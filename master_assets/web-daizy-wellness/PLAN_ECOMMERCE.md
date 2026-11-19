# DAIZY — kế hoạch website thương mại điện tử

Ngày 19/10/2026. Nguồn phát triển: checkout hiện tại, Vercel + Supabase.

## 1. Rà soát hiện trạng
Menu có sáu mục dài, nhiều nhánh trùng và ô tìm kiếm chiếm ngang. Trang chủ chứa gần như mọi nội dung; danh mục và chi tiết chỉ là bộ lọc/popup. Catalog có năm sản phẩm, 25 màu; quản trị sửa tên, mô tả, giá đã có API bảo vệ. Giỏ/yêu thích chỉ lưu trình duyệt. Chưa có đơn, tồn kho và cổng thanh toán. Không dùng số review minh họa làm bằng chứng xã hội.

## 2. Góc nhìn chuyên gia kinh doanh
- Kiến trúc: Trang chủ → Cửa hàng/danh mục → Chi tiết → Giỏ → Checkout → Đơn. Cẩm nang có danh mục và bài riêng, gắn sản phẩm liên quan.
- Menu: logo, Cửa hàng, Ưu đãi, Cẩm nang; tìm kiếm ở hàng riêng. Tra đơn và giỏ là tiện ích. Mobile dùng menu thu gọn có nhãn.
- Catalog: giá VND thống nhất, ảnh theo màu, lựa chọn size bắt buộc, tư vấn size, sản phẩm liên quan, tìm kiếm không dấu, lọc/sắp xếp, trạng thái rỗng.
- Giao dịch: guest checkout, server xác nhận giá, phí ship rõ trước gửi, chỉ COD ở MVP, idempotency, snapshot đơn, mã tra cứu bí mật, không lưu PII trong localStorage.
- Vận hành: tồn kho theo sản phẩm/màu/size, trừ kho nguyên tử, hủy hoàn kho một lần, trạng thái đơn hợp lệ, quyền admin phía server.
- Giai đoạn tiếp: quản trị nội dung/ảnh, tạo sản phẩm, nhập/xuất kho, lịch sử thao tác, phân quyền nhân viên, vận chuyển, email/SMS, đổi trả, đánh giá từ người mua, analytics có consent, SEO server-render, sitemap, thanh toán online với webhook và đối soát.

## 3. Góc nhìn khách mua
Tìm đúng sản phẩm trong hai bước; xem giá và màu trước khi chọn; chọn size rõ ràng; giữ giỏ qua tải lại; biết còn bao nhiêu để miễn ship; mua không cần đăng ký; sửa giỏ ngay trước checkout; thông báo lỗi cụ thể; gửi đơn một lần; lưu mã tra cứu và tra đơn trên thiết bị khác. Hỗ trợ bàn phím, focus, nhãn input và giao diện 360px.

## 4. Tự phản biện và điều chỉnh
Không triển khai AI chat/gợi ý giả khi chỉ có năm SKU. Gợi ý theo danh mục và lịch sử xem đủ hữu ích, dễ giải thích. Không bật voucher tùy ý vì làm sai lợi nhuận. Không tiếp nhận đơn bằng localStorage. Không tự tạo tồn kho ảo: quản trị phải nhập tồn thực trước khi nhận đơn. Không giả lập thanh toán online. Không tuyên bố chính sách đổi trả chưa được chủ cửa hàng duyệt. Mã đơn cần thêm khóa bí mật để tránh lộ thông tin bằng cách đoán ID. Hạ tầng thật chưa được cấu hình phải trả lỗi rõ và giữ giỏ.

## 5. Kế hoạch thực thi và nghiệm thu
1. Xây shell mới, responsive menu, home mua sắm; giữ tài sản nhận diện và ảnh.
2. Xây URL riêng cho danh mục, chi tiết, cẩm nang, bài viết; bộ lọc, tìm kiếm, yêu thích, gợi ý size tham khảo.
3. Xây giỏ, checkout, tra cứu đơn; chuyển giỏ v1 hợp lệ; tổng tiền thống nhất.
4. API và migration Supabase: đặt đơn, tồn kho, tra cứu bí mật, admin cập nhật trạng thái/tồn; không tự chạy migration production.
5. Kiểm thử giá giả mạo, input sai, quyền truy cập, schema giao dịch, build và đường dẫn. QA giao diện desktop/mobile nếu có trình duyệt.

## 6. Điều kiện đưa vào bán hàng
Chạy supabase/commerce.sql sau schema.sql; nhập tồn kho thực trong trang quản trị. Xác nhận mức phí ship mẫu 30.000đ và miễn ship từ 500.000đ, vùng phục vụ, chính sách đổi trả, pháp lý, riêng tư, liên hệ. Cấu hình env như hệ thống quản trị đang có. Kiểm thử end-to-end bằng Supabase staging trước production, gồm hai đơn tranh tồn, retry đồng thời, hoàn kho và quyền truy cập. Tích hợp chống bot/rate limit ở hạ tầng trước lưu lượng công khai. Chỉ bật thanh toán online sau khi có tài khoản nhà cung cấp và webhook ký số. Bản này chưa tích hợp cổng thanh toán, vận chuyển hoặc gửi thông báo tự động.
