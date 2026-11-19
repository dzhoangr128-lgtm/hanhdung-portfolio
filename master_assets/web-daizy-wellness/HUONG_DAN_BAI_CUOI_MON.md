# Hoàn thiện và quay bài cuối môn — DAIZY WELLNESS

Website: https://daizypilates.vercel.app/
Quản trị: https://daizypilates.vercel.app/admin
Đối chiếu yêu cầu ngày 06/11/2026. Đây là kế hoạch thực hiện, không phải danh sách tính năng đã hoàn tất.

## 1. Các phần đang có và còn thiếu

| Yêu cầu | Hiện tại | Việc cần làm |
|---|---|---|
| Giới thiệu đề tài, trang chủ, phong cách | Đã có website và bộ sưu tập Studio Essentials | Chuẩn bị lời giới thiệu và tập cuộn trang |
| Giới thiệu từng trang | Có cửa hàng, danh mục, chi tiết, cẩm nang, giỏ hàng, tra đơn | Mở thử từng trang trước khi quay |
| Mua thử một sản phẩm | Có đặt hàng COD; 70 biến thể đều có tồn 0 | Chuẩn bị tồn cho biến thể dùng trình diễn, dùng thông tin người nhận thử do bạn tự nhập |
| Quản trị | Có đăng nhập, sửa tên/mô tả/giá, quản lý đơn và tồn | Đăng nhập trước buổi quay |
| Thêm/sửa/xóa sản phẩm | Mới có sửa; catalog hiện cố định 5 sản phẩm | Phát triển quản lý danh mục động, ảnh/biến thể/tồn; xóa theo kiểu ẩn để giữ lịch sử đơn |
| Thêm/sửa/xóa bài viết | Bài viết nằm trong mã nguồn | Phát triển quản trị bài viết, nháp/xuất bản/ẩn |
| SePay | Chưa tích hợp | Tạo tài khoản, dùng Sandbox trước, tích hợp và kiểm thử |
| Chat AI | Có giao diện và API kết nối; chưa có khóa | Cấu hình OPENAI_API_KEY trong Vercel nếu muốn trình diễn AI thật |
| Quay màn hình và mặt | Chưa làm | Chọn phần mềm quay có nguồn màn hình, webcam, micro |
| Nộp link | Chưa làm | Upload, kiểm tra quyền xem rồi nộp trên hệ thống của lớp |

## 2. Thứ tự thực hiện

### Bước 1 — Bạn tạo tài khoản SePay

1. Mở https://my.sepay.vn/.
2. Chọn đăng ký nếu chưa có tài khoản; tự nhập thông tin và hoàn tất xác minh theo giao diện.
3. Sau khi vào được trang quản lý, báo lại “Đã vào SePay”. Không gửi mật khẩu, OTP, secret key hoặc ảnh chứa khóa.
4. Dùng môi trường Sandbox của Cổng thanh toán để thử trước, không cần chuyển tiền thật cho video thử nghiệm. Sandbox và Production có thông tin cấu hình riêng; không trộn hai môi trường.

Tài liệu chính thức: https://developer.sepay.vn/vi/cong-thanh-toan/gioi-thieu

### Bước 2 — Hoàn thiện phần quản trị còn thiếu

Phần việc lập trình: bổ sung thêm/sửa/ẩn sản phẩm và bài viết; thay các giả định cố định 5 sản phẩm; đồng bộ catalog, tồn kho, tìm kiếm, trang chi tiết, giỏ hàng. Giữ sản phẩm có trong đơn cũ để không mất lịch sử. Kiểm thử bằng sản phẩm và bài viết riêng có tên “Demo bài cuối môn”.

### Bước 3 — Tích hợp thanh toán SePay

Phần việc lập trình: thêm lựa chọn SePay tại thanh toán, khởi tạo số tiền theo giá server, chuyển đến trang thanh toán, nhận thông báo có xác thực, lưu mã giao dịch và chống xử lý trùng. Chỉ cập nhật đã thanh toán khi nhận kết quả được xác thực từ server; không dựa riêng vào trang chuyển hướng thành công.

Bạn nhập thông tin cấu hình bí mật trực tiếp trong Vercel theo hướng dẫn ở bước triển khai, không đưa vào mã nguồn/chat. Kiểm thử thanh toán thành công, hủy, sai số tiền và thông báo gửi lặp trên Sandbox. Gắn nhãn “Thanh toán thử nghiệm” nếu trình diễn Sandbox; không nói là đã nhận tiền thật.

### Bước 4 — Chuẩn bị đơn mua thử

1. Chọn một sản phẩm, một màu, một size để dùng trong video.
2. Nhập tồn thử phù hợp trong quản trị; ghi lại số tồn trước khi thay đổi.
3. Đặt một đơn thử; kiểm tra mã đơn, khóa tra cứu, trạng thái thanh toán và tồn sau đặt.
4. Nếu dùng Sandbox, nói rõ giao dịch thử nghiệm. Không quay lộ mật khẩu, khóa API hoặc khóa tra đơn của đơn thật.
5. Dọn dữ liệu thử sau buổi trình diễn bằng quy trình hủy/hoàn kho phù hợp; không xóa lịch sử giao dịch thật.

### Bước 5 — Tập thuyết trình và quay

Thời lượng dưới đây là gợi ý 8–10 phút, không phải giới hạn do giảng viên quy định.

| Đoạn | Nội dung và thao tác |
|---|---|
| 0:00–0:45 | Giới thiệu tên, đề tài và mục đích website |
| 0:45–2:00 | Cuộn trang chủ từ trên xuống; giới thiệu bảng màu, ảnh, phông chữ, bộ sưu tập |
| 2:00–3:15 | Cửa hàng: tìm kiếm, lọc, chi tiết sản phẩm, chọn màu/size; cẩm nang và bài viết |
| 3:15–4:45 | Thêm giỏ, thanh toán thử, xem kết quả và tra cứu đơn |
| 4:45–7:15 | Vào quản trị; thêm/sửa/ẩn sản phẩm thử; thêm/sửa/ẩn bài viết thử; xem đơn và tồn kho |
| 7:15–8:15 | Giới thiệu SePay, chat nhanh, yêu thích; chỉ demo AI nếu đã kết nối thật |
| 8:15–8:45 | Kết luận những gì đã làm được và phần dự định phát triển |

Lời mở đầu tham khảo:

“Em xây dựng DAIZY WELLNESS, website giới thiệu và bán trang phục, phụ kiện Pilates. Em chọn đề tài này để thực hành một luồng mua sắm đầy đủ: tìm sản phẩm, chọn màu và kích cỡ, đặt hàng, thanh toán và quản lý nội dung phía quản trị. Thiết kế sử dụng các tông kem, nâu và hồng nhẹ để giữ sự nhất quán với hình ảnh thương hiệu.”

Lời giới thiệu trang chủ:

“Ở đầu trang là bộ sưu tập Studio Essentials và nút dẫn vào cửa hàng. Phía dưới lần lượt là sản phẩm, bảng màu, combo, gợi ý phối đồ và cẩm nang. Các hình ảnh giúp người xem hiểu phong cách bộ sưu tập trước khi đi vào từng sản phẩm.”

Trước khi quay: kiểm tra micro, webcam, cỡ chữ; tắt thông báo; mở sẵn trang cần dùng; quay thử 20 giây để nghe lại. Quay cả màn hình và mặt theo yêu cầu. Phần mềm nào có hai nguồn màn hình + webcam đều có thể dùng.

### Bước 6 — Nộp bài

1. Xem lại toàn bộ video, kiểm tra hình, tiếng và đủ các mục trong ảnh yêu cầu.
2. Upload Google Drive hoặc YouTube. Với Drive, bật quyền xem phù hợp để thầy mở được; với YouTube có thể dùng chế độ Không công khai nếu phù hợp yêu cầu lớp.
3. Mở link bằng cửa sổ không đăng nhập để xác nhận xem được.
4. Nộp link video lên hệ thống lớp. Đính kèm link website nếu ô nộp cho phép.

## Điểm dừng hiện tại

Đã kiểm tra mã nguồn và API công khai, lập lộ trình. Chưa thêm SePay hoặc CMS trong đợt kiểm tra này. Việc bạn cần làm ngay: tạo tài khoản SePay và báo đã vào trang quản lý; phần lập trình và chuẩn bị bài sẽ được thực hiện theo thứ tự trên.
