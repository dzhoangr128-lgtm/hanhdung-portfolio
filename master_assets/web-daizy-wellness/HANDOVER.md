# Daizy Wellness — Tiếp quản và rà soát

## Vận hành ngày 19/10/2026

- Mã nguồn quản trị và responsive đã đẩy lên main tại commit 9aa6e3f; Vercel Production Ready.
- Đã tạo tổ chức Daizy Wellness (Free), project daizy-wellness, thực thi supabase/schema.sql thành công và xác nhận tài khoản quản trị xuất hiện trong Authentication. Chủ website tự đặt cả mật khẩu database và mật khẩu admin.
- Đã cấu hình SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY và ADMIN_EMAILS dưới dạng Secret, chỉ Production trên Vercel; redeploy thành công.
- Xác minh website công khai: /admin 200; /api/catalog 200 và 5 sản phẩm; /api/session 401 khi chưa đăng nhập. Không đọc hoặc lưu mật khẩu admin; chưa kiểm thử phiên đăng nhập thật hoặc ghi sản phẩm trên production.
- 17/17 kiểm thử và build đạt trước khi đồng bộ. Không đưa khóa Supabase vào repository. Những ghi chú bên dưới về chưa có project hoặc chưa deploy là lịch sử phiên 14/10.

Ngày: 14/10/2026. Mã nguồn chính: index.html, styles.css, app.js và assets/images.

## Cập nhật quản trị và giao diện

Đã bổ sung `/admin`, API session/catalog, cấu hình mẫu Supabase và SQL bật RLS. Quản lý tên, mô tả, giá gốc và sale cho 5 sản phẩm; danh sách admin kiểm tra trên server. Chưa cấu hình project Supabase thật hoặc deploy bản cập nhật. Các ghi chú cũ bên dưới về chưa có trang quản trị nay được thay bằng trạng thái này; checkout/đơn hàng/tồn kho vẫn chưa có.

Sửa menu bằng nhãn không xuống dòng, ổn định chiều rộng ô tìm kiếm, chia hàng trên desktop vừa và chuyển menu drawer dưới 1181px. Sửa tràn giá combo và trích dẫn ở 320px; hỗ trợ focus mở mega menu, Escape đóng drawer và tự đóng drawer khi đổi sang desktop. Kiểm tra storefront 320/390/768/1180/1181/1280/1366/1440px và admin 320/390/1280px, không tràn ngang trong các lần kiểm tra. Kiểm thử API dùng dịch vụ giả lập cách ly, đã thử đăng nhập → sửa giá wrap 270.000₫ → lưu → tải lại → cửa hàng cập nhật → đăng xuất. Không dùng dữ liệu test trong production. Xem HUONG_DAN_QUAN_TRI.md để kích hoạt.

## Kết quả triển khai

- GitHub: https://github.com/dzhoangr128-lgtm/Daizy-Wellness (repository riêng tư, nhánh main).
- Website công khai: https://daizypilates.vercel.app
- Vercel dashboard: https://vercel.com/daizy2/daizy_pilates
- Deployment đầu tiên: commit 8b3550b, Ready / Production, build hoàn thành trong 5 giây.
- Đã xác minh HTTP 200 trang chủ, JS, CSS và ảnh; HANDOVER.md và serve.ps1 trả 404 trên website.
- Đã thử combo tất trên production: 199.000đ, 3 món vẫn được lưu khi tải lại trang, không ghi nhận lỗi JavaScript hoặc ảnh đã tải bị lỗi.
- Đã thử giao diện 390px; không còn tràn ngang sau sửa menu.
- Git Credential Manager đã được chủ tài khoản cho phép đăng nhập để tiếp tục đồng bộ Git. Không lưu token trong repository.

## Kiến trúc hiện có

- HTML/CSS/JavaScript thuần; không cần framework hoặc dịch vụ backend để hiển thị.
- 5 sản phẩm, mỗi sản phẩm có 5 màu. Điều hướng danh mục dùng hash URL và render trong cùng trang.
- Giá và dữ liệu sản phẩm đặt trực tiếp trong app.js. Tỷ giá ngoại tệ là giá trị cố định dùng để hiển thị.
- Hình ảnh sản phẩm lưu tại máy; font và icon tải từ Google Fonts và cdnjs.
- Git có một commit ban đầu. Remote cấu hình sẵn nhưng repository GitHub chưa có mã nguồn khi kiểm tra trong Chrome.

## Lỗi đã sửa

- Combo 5 món hiển thị 950.000đ nhưng trước đây giỏ hàng thu 904.000đ. Hiện tổng các dòng đúng 950.000đ.
- Combo 3 tất tổng 199.000đ, các dòng trước đây bị làm tròn theo nghìn; nay hiển thị số tiền VND đúng từng đồng.
- Gỡ thông báo phần trăm tiết kiệm không khớp giá combo; dùng số tiền tiết kiệm thực tế.
- Đồng bộ giá sale trong danh mục, tìm kiếm, xem nhanh và khu trưng bày.
- Giỏ hàng và yêu thích trước đây mất khi tải lại trang. Nay lưu và khôi phục từ localStorage; bỏ qua dữ liệu hỏng, kiểm tra số lượng, sản phẩm, màu, size và dựng lại tên/ảnh từ catalog.
- Escape nội dung tìm kiếm và toast; tránh đưa dữ liệu nhập của khách thành HTML thực thi.
- Giới hạn event selector theo khu danh mục, tránh gắn thêm handler vào màu của modal xem nhanh hoặc khu sale khi render lại.
- Sửa tên sản phẩm trong toast yêu thích cho ID có dấu gạch nối.
- Xem nhanh mở đúng màu đang chọn trên card.
- Sửa điều hướng footer bị hash #capsule ghi đè danh mục vừa chọn.
- Điều chỉnh thanh menu trên điện thoại, ẩn nhãn giỏ hàng ở màn hình nhỏ.
- Checkout và newsletter hiển thị đúng trạng thái chưa kết nối, không báo giả thành công. Thêm thông báo bản xem trước trên trang.

## Build và deploy

- package.json và package-lock.json không có dependency ứng dụng bên ngoài.
- npm test chạy kiểm thử giá combo qua các click handler thực tế, lưu/khôi phục giỏ, dữ liệu lưu hỏng, storage bị chặn và escape nội dung nhập.
- npm run build xác minh 25 đường dẫn ảnh đang dùng và xuất storefront vào dist.
- vercel.json cấu hình preset Other, output dist, các header nosniff, DENY iframe và Referrer-Policy.
- .gitignore loại dữ liệu xác thực, .env, output build, node_modules và ảnh chụp cấp quyền khỏi Git.
- File ZIP, script PowerShell/batch và bản HTML gộp cũ không thuộc output website.

## Hạn chế cần phát triển để bán hàng thật

1. Backend lưu sản phẩm, tồn kho, đơn hàng và tính giá đáng tin cậy phía server. Giá trong localStorage chỉ phục vụ giao diện, không dùng làm căn cứ thu tiền.
2. Checkout thu tên, số điện thoại, địa chỉ; giao hàng/COD và thanh toán trực tuyến theo nhà cung cấp được chủ shop chọn.
3. Trang quản trị đơn hàng và sản phẩm, phân quyền, thông báo đơn và theo dõi giao hàng.
4. Cho khách chọn size/màu combo; hiện combo dùng cấu hình mặc định được ghi trên giao diện. Phụ kiện vẫn dùng bộ chọn size giống quần áo, cần thiết kế lại Freesize.
5. Kết nối newsletter, xác thực đăng ký, chính sách dữ liệu và hủy đăng ký.
6. Hoàn thiện nội dung giao hàng, đổi trả, bảo quản, liên hệ, điều khoản và quyền riêng tư; một số mục footer còn là placeholder.
7. Chủ shop xác minh quyền sử dụng ảnh, đánh giá khách hàng, trích dẫn báo chí và các tuyên bố chất liệu/chứng nhận hiện có trước khi vận hành thương mại.
8. Chuẩn hóa VND thành tiền tệ gốc, SEO sản phẩm, tối ưu ảnh và accessibility (focus modal, bàn phím chọn màu, đóng bằng Escape).

Thứ tự tiếp theo đề xuất: hoàn tất nhận đơn COD và quản trị đơn trước, sau đó tích hợp thanh toán trực tuyến và tối ưu trải nghiệm mua hàng.

Cập nhật phiên 1 (14/10/2026): npm run dev chạy nguồn trực tiếp; npm run build sinh dist và bản HTML gộp cùng assets. Giá VND nguyên, combo theo nhóm; xóa món tính lại giá lẻ. Giỏ cũ không giữ giá giảm tùy ý. Đánh giá/voucher/ship là demo, chưa nhận đơn thật.

Kiểm tra UI phiên 1: desktop 1440px; mobile viewport 360/390px (clientWidth 345/375 vì thanh cuộn), scrollWidth khớp clientWidth sau sửa newsletter và floating pills. Combo tất cộng 199.000₫; tăng cả nhóm cộng thêm 199.000₫; xóa một đôi khiến hai đôi còn lại chuyển về 80.000₫/đôi. Reload giữ giỏ. Bản HTML gộp phục vụ qua HTTP hiển thị 199.000₫ và không ghi nhận lỗi JS trong lần kiểm tra. Chưa kiểm thử file:// thực tế, keyboard/focus toàn bộ hoặc checkout thật. Bộ test 10/10 đạt; build kiểm tra 25 ảnh. Preview local: http://localhost:8080. Phiên này chưa deploy production.
