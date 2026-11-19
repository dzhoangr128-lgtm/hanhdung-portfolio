# Đăng nhập và sử dụng quản trị DAIZY

**Trạng thái ngày 19/10/2026:** Đã tạo project Supabase và tài khoản admin, cấu hình Secret Production trên Vercel và triển khai website. Bạn có thể mở https://daizypilates.vercel.app/admin, nhập email quản trị đã cung cấp cùng mật khẩu admin bạn tự đặt. API catalog đã đọc được 5 sản phẩm. Không cần thực hiện lại bước tạo project bên dưới; các bước này giữ lại để tái thiết lập khi cần. Phiên đăng nhập/ghi sản phẩm bằng tài khoản thật chưa được kiểm thử, vì mật khẩu chỉ chủ website biết.

Trang quản trị thật đã được bổ sung tại `/admin`. Cần hoàn tất cấu hình dưới đây để đăng nhập và lưu dữ liệu. Không có tài khoản hoặc mật khẩu mặc định.

## 1. Thiết lập Supabase

1. Tạo một project tại https://supabase.com/dashboard bằng tài khoản của bạn.
2. Mở SQL Editor, chạy toàn bộ `supabase/schema.sql` trong dự án này.
3. Trong Authentication → Users, dùng Add user để tạo tài khoản bằng email của bạn và mật khẩu mạnh; xác nhận email tài khoản (Auto Confirm nếu giao diện cung cấp). Bạn tự nhập mật khẩu, không gửi mật khẩu vào chat hoặc đưa vào mã nguồn.
4. Tắt cho phép đăng ký tài khoản mới trong cấu hình Auth nếu chỉ dùng cho quản trị. Supabase Auth đảm nhiệm giới hạn số lần đăng nhập.
5. Lấy project URL, anon key và service_role key trong Project Settings / API. service_role là khóa bí mật chỉ đặt trên server. Dự án dùng khóa JWT anon/service_role của Supabase.

## 2. Cấu hình website Vercel

Trong project Vercel của website, Settings → Environment Variables, thêm:

| Biến | Giá trị |
|---|---|
| SUPABASE_URL | URL project Supabase |
| SUPABASE_ANON_KEY | anon key |
| SUPABASE_SERVICE_ROLE_KEY | service_role key, giữ bí mật |
| ADMIN_EMAILS | Email tài khoản vừa tạo; nhiều email ngăn bằng dấu phẩy |

Triển khai mã nguồn mới kèm thư mục `api/`, `server/` và cấu hình Vercel. Redeploy sau khi thêm biến môi trường. Chỉ build `dist/` và mở file HTML sẽ không chạy được API. Phiên làm việc này chưa tự cấu hình Supabase hoặc triển khai production.

## 3. Chạy trên máy

Sao chép `.env.example` thành `.env`, điền 4 giá trị ở trên. `.env` đã được loại khỏi Git. Chạy `npm run dev` bằng Node >=22; nếu server cũ đang chạy, dừng bằng Ctrl+C rồi chạy lại. Mở http://localhost:8080/admin.

## 4. Đăng nhập và sử dụng

1. Website public sau triển khai: https://daizypilates.vercel.app/admin. Khi chạy local: http://localhost:8080/admin.
2. Nhập email và mật khẩu tài khoản Supabase đã tạo. Email phải có trong ADMIN_EMAILS.
3. Sửa tên, mô tả, giá gốc hoặc giá sale của 5 sản phẩm. Đơn vị giá là VND nguyên; giá sale phải thấp hơn giá gốc; để trống để bỏ sale.
4. Bấm **Lưu lên cửa hàng**, đợi thông báo đã lưu. Dữ liệu được lưu chung trên Supabase, không lưu riêng trong trình duyệt.
5. Bấm **Xem cửa hàng**, tải lại trang để xem sản phẩm và giá mới. Giỏ hàng tính lại theo catalog mới.
6. Bấm **Đăng xuất** khi dùng xong. Phiên hết hạn sau tối đa một giờ, đăng nhập lại để tiếp tục. Đổi mật khẩu trong Supabase khi cần; trang này chưa có chức năng tự khôi phục mật khẩu.

Chỉ quản lý sản phẩm hiện có; chưa thêm/xóa sản phẩm, thay ảnh, quản lý tồn kho, nhận đơn, thanh toán hoặc quản lý khách hàng. Giá combo còn cố định, nội dung quảng cáo tĩnh chưa được chỉnh trong trang quản trị. Khi đổi giá bán, kiểm tra giá combo và các nội dung quảng cáo trước khi vận hành shop thật. Nếu API catalog không kết nối, cửa hàng vẫn mở bằng catalog gốc đóng gói; quản trị báo lỗi và không báo lưu thành công.

## 5. Khi có lỗi

- **Chưa cấu hình Supabase**: kiểm tra 4 biến môi trường, restart local hoặc redeploy Vercel.
- **Không thể đăng nhập**: kiểm tra email, mật khẩu, tài khoản đã xác nhận email và trạng thái project Supabase.
- **Không có quyền quản trị**: thêm đúng email vào ADMIN_EMAILS rồi restart/redeploy.
- **Không kết nối dịch vụ** khi lưu: kiểm tra đã chạy SQL, service_role key đúng và Supabase project đang hoạt động.
- **Dữ liệu đã được sửa ở phiên khác**: tải lại trang để lấy dữ liệu mới trước khi sửa tiếp; tránh ghi đè phiên khác.

API kiểm tra phiên bằng Supabase và danh sách email trên server. Cookie phiên HttpOnly, SameSite=Strict, Secure khi chạy HTTPS. Bảng catalog bật RLS và không cấp quyền trực tiếp cho trình duyệt. Không đưa khóa server vào JavaScript public.

Tài liệu dịch vụ: [Supabase đăng nhập bằng mật khẩu](https://supabase.com/docs/guides/auth/passwords), [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Vercel Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js).
