# Bàn giao nâng cấp DAIZY · 19/10/2026

## Đã triển khai trong mã nguồn
Trang chủ bán hàng, menu desktop/mobile gọn; trang danh mục có tìm kiếm không dấu, lọc màu/giá và sắp xếp; trang sản phẩm có màu/ảnh, size, tồn kho, bảng size tham khảo, gợi ý sản phẩm; yêu thích và xem gần đây; danh mục cẩm nang và ba bài viết; trang giỏ hàng, checkout COD không cần tài khoản và tra đơn bằng mã + khóa bí mật.

API orders/inventory, PostgreSQL migration, đặt đơn và trừ kho nguyên tử, chống trùng bằng idempotency key, khóa catalog khi chốt giá, kiểm tra giá/tồn phía server, snapshot dòng đơn, quản trị 100 đơn gần nhất, chuyển trạng thái hợp lệ, hoàn kho khi hủy trước giao. Tồn kho có kiểm tra giá trị cũ khi cập nhật. Email/SMS và thanh toán online chưa kết nối.

## Chạy và kiểm tra
`npm install` → `npm test` → `npm run build` → `npm run dev`.
Truy cập http://localhost:8080. Mã nguồn cửa hàng mới: index.html, storefront.css, storefront.js. pricing.js dùng chung giữa trình duyệt và server. app.js/styles.css thuộc giao diện cũ được giữ để tương thích bộ kiểm thử; không phải cửa hàng mới. Không sửa file HTML gộp lịch sử.

`node tests/commerce-ui-fixture.mjs` mở môi trường QA tại http://localhost:8082, cơ sở dữ liệu PGlite trong bộ nhớ và tồn 10 mỗi biến thể. Dữ liệu tự mất khi dừng; không tạo đơn production. Đây là kiểm tra hành vi SQL thực, không thay thế kiểm tra đồng thời nhiều kết nối Supabase staging.

## Kích hoạt backend thật
1. Giữ nguyên bốn biến môi trường Supabase/ADMIN_EMAILS hiện có; local tạo .env từ .env.example. Không đưa key vào Git hay mã trình duyệt.
2. Đảm bảo catalog main đã có trong shop_catalog (lưu catalog một lần qua /admin nếu chưa có).
3. Chạy supabase/commerce.sql trong SQL Editor của đúng project Supabase. Migration tạo 70 biến thể (60 trang phục + 10 phụ kiện), tồn mặc định bằng 0, không ghi đè tồn có sẵn.
4. /admin → đăng nhập → “Tải đơn và tồn kho” → nhập số lượng thực theo màu/size. Phụ kiện dùng One size; giỏ cũ được chuẩn hóa.
5. Thử đặt đơn COD trên staging, tra cứu bằng khóa, xác nhận → giao → hoàn tất, và hủy đơn chờ/xác nhận để kiểm tra hoàn kho. Hủy sau khi giao cần quy trình đổi trả riêng, hiện chưa hỗ trợ.
6. Trước production: chốt phí ship/phạm vi giao, chính sách đổi trả, thông tin pháp nhân/liên hệ, bảng size sản phẩm thật và riêng tư; cấu hình chống bot/rate limit; kiểm thử tranh tồn và retry trên Supabase staging; triển khai Vercel và kiểm tra các deep link.

## Trạng thái kiểm chứng
Unit/API, SQL migration chạy trên PostgreSQL nhúng, các nhánh đặt đơn thiếu kho không trừ một phần, retry không trừ hai lần, hủy không hoàn hai lần, trạng thái sai bị từ chối, RLS/quyền hàm được kiểm thử. Browser QA: thêm sản phẩm → checkout → nhận đơn → tra cứu đúng đơn trên backend thử biệt lập. Giao diện kiểm tra bằng trình duyệt ở kích thước panel hẹp. Chưa xác nhận trên desktop rộng, Supabase production hoặc nhiều kết nối tranh tồn thực tế.

## Giới hạn cần biết
Cẩm nang hiện nằm trong mã nguồn, chưa có CMS. Chưa có tài khoản khách, thông báo tự động, cổng thanh toán online, vận đơn, đối soát, voucher, đánh giá xác thực, quy trình đổi trả hay SEO render phía server. Khóa tra cứu hiển thị một lần sau đặt; khách có thể tải file để lưu. Chưa có khôi phục khóa qua email. Catalog 5 sản phẩm vẫn do hệ thống quản trị cũ quản lý; tạo/xóa sản phẩm và ảnh cần phát triển CMS tiếp. Các hạng mục này được xếp giai đoạn sau trong PLAN_ECOMMERCE.md, không được giả lập là đã hoạt động.

Đã push mã nguồn lên GitHub main (1ce1cec), Vercel Production Ready ngày 19/10/2026 tại https://daizypilates.vercel.app. Đã áp dụng commerce.sql, khởi tạo catalog 5 sản phẩm và 70 biến thể trên Supabase production; tổng tồn kho bằng 0. Chủ shop cần nhập tồn kho thực tại /admin trước khi nhận đơn. Đã kiểm tra HTTP 200 trang chủ, deep link, admin, catalog và inventory; session chưa đăng nhập trả 401. 29/29 kiểm thử và build đạt. Chưa tạo đơn thử hoặc đăng nhập quản trị trên production.
