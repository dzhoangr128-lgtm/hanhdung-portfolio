# SePay Test mode — trạng thái 06/11/2026

## Cập nhật luồng cửa hàng

Trang checkout có lựa chọn COD hoặc SePay thử nghiệm khi API báo đã cấu hình. Sau đặt đơn, SePay tự lấy mã đơn/khóa trong bộ nhớ, khởi tạo nội dung và số tiền từ server, hiển thị ngay trên trang kết quả, tự kiểm tra mỗi 5 giây trong tối đa 5 phút. Trang tra đơn cũng cho mở lại panel thanh toán thử với khóa người dùng đã nhập. Không chuyển khóa qua URL hoặc localStorage. Đã thử đầy đủ chọn sản phẩm → đặt đơn → tự hiện thông tin SePay → nhận webhook → giao diện cập nhật trên QA PostgreSQL riêng, không tạo đơn production trong lần thử này. Ảnh: checkout-sepay-qa.png. Toàn bộ tồn production vẫn 0, cần chuẩn bị tồn demo trước khi quay thao tác mua trên web thật.

Đã kích hoạt gói Free (chủ tài khoản tự xác nhận), bật Test mode, tạo tài khoản MBBank giả lập `0000000001`, chủ tài khoản giả lập `DAIZY DEMO`.

Đã triển khai `/sepay-test.html`, `/api/sepay-test`, `/api/sepay-test-webhook`. Đã chạy `supabase/sepay-test.sql` trên Supabase và nhận kết quả Success. Đã lưu 3 biến Production trên Vercel: `SEPAY_TEST_ENABLED=true`, `SEPAY_TEST_ACCOUNT=0000000001`, `SEPAY_TEST_BANK=MBBank`. Các biến chưa có hiệu lực cho đến lần triển khai mới.

Đã kiểm tra SQL chống sai số tiền, lặp giao dịch, dùng lại giao dịch cho đơn khác. Đã kiểm thử giao dịch xuyên suốt với SePay ngày 06/11/2026: mô phỏng 75.000đ → webhook thành công → Daizy báo đã nhận thanh toán THỬ. Ảnh xác nhận: sepay-test-success.png.

Chủ tài khoản đã lưu khóa webhook và lưu Secret trong Vercel với tên `Daizy`. Mã nguồn hỗ trợ tên `SEPAY_TEST_WEBHOOK_KEY` hoặc tên dự phòng `Daizy`, không cần nhập lại khóa. Các biến đã có hiệu lực sau triển khai. Đã bổ sung `includeFiles: pricing.js` trong vercel.json để API orders và sepay-test có đủ phụ thuộc runtime.

Đơn kỹ thuật DZ-B51BD57AB3B343E5 không có dòng hàng, không giao hàng, dùng để kiểm tra kết nối webhook; đã hủy sau kiểm thử. Đây không phải bằng chứng mua hàng qua giỏ. Đã hoàn lại tồn cloud-headband/Hồng Phấn/One size về 0; tổng tồn toàn bộ là 0. Giỏ Chrome của chủ tài khoản đã giữ lại 3 đôi tất trước khi thử.

## Bước đang chờ chủ tài khoản

Hai tab Chrome được mở sẵn:

1. SePay Test mode → Thêm Webhook → Bảo mật → API Key. Tên và URL đã điền: `DAIZY - THANH TOAN THU`, `https://daizypilates.vercel.app/api/sepay-test-webhook`. JSON, tiền vào, gửi lại khi lỗi. Chưa bấm Thêm.
2. Vercel project `daizy_pilates` → Add Environment Variable → Secret. Tên đã điền `SEPAY_TEST_WEBHOOK_KEY`; giá trị còn trống, Production.

Chủ tài khoản tự tạo một chuỗi ngẫu nhiên dài (ít nhất 32 ký tự), nhập cùng giá trị vào API Key trong SePay và Value trong Vercel, tự bấm Thêm và Save. Không gửi khóa vào chat, không lưu khóa vào repo. Quy định công cụ trình duyệt yêu cầu chủ tài khoản tự hoàn tất bước nhập và lưu thông tin xác thực mới.

Sau đó agent có thể thực hiện Redeploy, xác nhận endpoint, chuẩn bị tồn kho và đơn thử rồi mô phỏng giao dịch. Hiện tồn kho production bằng 0 theo kiểm tra trước; không tự nhập tồn thật khi chưa biết số lượng. Chưa tạo đơn production hoặc mô phỏng tiền vào trong phiên thiết lập này.

## Luồng thử

Tạo đơn COD thử → mở `/sepay-test.html` → nhập mã đơn và khóa tra cứu → nhận mã `DZTEST...` và số tiền do server lấy từ đơn → mô phỏng tiền vào đúng tài khoản/nội dung/số tiền trong SePay Test mode → webhook lưu `paid_test` → bấm kiểm tra lại.

Đây là mô phỏng SePay webhook ngân hàng, không phải cổng thanh toán thẻ hoặc giao dịch tiền thật. Không hiển thị QR ngân hàng thật. Kết quả thử được lưu trong bảng riêng, không đánh dấu đơn COD là đã thanh toán thật, không thay đổi tồn kho. `SEPAY_TEST_ENABLED` phải luôn là false hoặc bỏ đi khi không dùng thử. Khóa webhook Test mode không được dùng lại cho môi trường Live.

Tài liệu: https://developer.sepay.vn/vi/tien-ich-khac/test-mode và https://developer.sepay.vn/vi/sepay-webhooks/xac-thuc
