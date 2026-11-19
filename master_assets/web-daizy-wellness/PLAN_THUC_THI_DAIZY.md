# DAIZY WELLNESS — Kế hoạch thực thi cho các phiên build

Đọc cùng `PLAN_TONG_THE_DAIZY.md`. Mỗi phiên chỉ chọn một lát cắt có thể demo và nghiệm thu. Không sửa toàn bộ dự án cùng lúc.

## 1. Quy trình mỗi phiên

1. Đọc hai plan, kiểm tra `git status`, giữ thay đổi hiện có; ghi phạm vi và giả định phiên.
2. Chạy baseline tests/build. Chụp/kiểm tra UI desktop và mobile nếu phiên tác động giao diện.
3. Thực hiện lát cắt theo thứ tự dưới đây; cập nhật tài liệu cùng tính năng.
4. Chạy các kiểm tra có ý nghĩa cho thay đổi; ghi kết quả, hạn chế và file thay đổi.
5. Cập nhật checklist, quyết định và phần bàn giao. Không đánh dấu xong khi mới có giao diện giả.

## 2. Backlog theo phụ thuộc

### Phiên 1 — Giá, combo và nguồn phát hành (A1–A4)

**A1. Kiểm kê và baseline.** Lập map UI/handler của catalog, search, sale, quick view, combo, cart; ghi 5 giá niêm yết và 2 giá sale; xác nhận hành vi hiện tại. Không reset các sửa đổi đang có.

**A2. Giá chuẩn VND.** Tạo module dữ liệu/giá với `listPriceVnd`, `salePriceVnd`, cấu hình combo và chính sách ship. Tạo hàm thuần `quoteCart` để catalog/cart/combo dùng chung. Giữ các mức hiện hành: bra 290k, pants 350k, wrap 350k/280k, socks 80k, headband 60k/45k; combos 550k/199k/950k. Quy đổi tiền chỉ là tham khảo, không gọi realtime. Migration giỏ cũ suy ra giá từ nguồn catalog/combo hợp lệ; không tin customPrice cũ.

**A3. Combo có danh tính.** Thêm `bundleGroupId`/bundle definition; xác định quy tắc xóa thành phần, tăng nhóm, món lẻ cùng biến thể; bảo toàn tổng số nguyên. Chưa cần thiết kế builder hoàn chỉnh nhưng phải loại lỗ hổng giữ giá combo khi nhóm không đủ.

**A4. Nội dung/phát hành.** Sửa phần trăm tiết kiệm, ghi rõ demo cho voucher/review/ship chưa hỗ trợ; đồng bộ README và hướng dẫn. Sinh bản một file từ HTML/CSS/JS nguồn bằng build, hoặc đánh dấu bản cũ là không dùng. Sửa lệnh dev để không phụ thuộc dist chưa tạo/đã cũ; thống nhất cách chạy local có kiểm tra root.

**Nghiệm thu:** giá của cùng sản phẩm nhất quán ở card/search/quick view/sale/cart; 3 combo đúng tổng; xóa/tăng combo không tạo ưu đãi trái quy tắc; dữ liệu cũ không gây crash; storage bị chặn vẫn mua demo được; bản một file không báo email/thanh toán thành công giả. Tests hiện có cần cập nhật sang hợp đồng VND thay vì giữ test phụ thuộc formatPrice USD bằng mọi giá.

**Kiểm tra quan trọng:** giá 199.000 không sai làm tròn; bundle bị thiếu; hai bundle cùng thành phần nhưng cấu hình khác; mua lẻ cùng SKU; wishlist cũ; HTML từ dữ liệu storage không được render trực tiếp.

### Phiên 2 — Catalog, biến thể và chi tiết (B1–B3; sau A)

**B1. Schema biến thể.** ID ổn định cho sản phẩm/màu/size; `sizes` theo sản phẩm; adapter fixture cho tồn demo. Xác nhận size thực tế trước khi seed tồn thật. Lập mapping localStorage v1 sang ID mới, bỏ dữ liệu không ánh xạ được và thông báo phù hợp.

**B2. Render chung.** Gộp card catalog/search về một component/function; trạng thái query/category/color/size/sort duy nhất; tìm bỏ dấu tiếng Việt; preserve filter khi tìm/xóa tìm; deep link phản ánh trạng thái cần chia sẻ.

**B3. Trang chi tiết.** URL sản phẩm, ảnh theo màu, chọn size có chủ đích, size chart đúng nhóm, trạng thái hết hàng, hướng dẫn chăm sóc/chính sách. Link trực tiếp và reload không lỗi. Không tạo mô tả hoặc ảnh “thực tế” không có nguồn.

**Nghiệm thu:** “quan loe” tìm được quần loe; lọc kết hợp đúng; xóa tìm không làm mất danh mục đang chọn; thêm đúng màu/size; phụ kiện không áp size quần áo; hết hàng không thêm được; URL chi tiết mở lại được.

### Phiên 3 — Combo builder, wishlist, giỏ và accessibility (B4–B6)

**B4. Builder:** chọn biến thể từng thành phần; combo tất chọn ba đôi; chọn màu/size chung nhanh; cảnh báo thiếu chọn/hết hàng; hiển thị giá niêm yết, giá lẻ hiện hành và tổng combo với nhãn rõ.

**B5. Wishlist:** drawer/page có trạng thái trống, danh sách, xóa và mua; chuẩn hóa lưu theo sản phẩm hoặc biến thể và dùng nhất quán. Đề xuất lưu sản phẩm kèm màu ưu tiên, yêu cầu chọn size khi mua.

**B6. Cart/overlay:** chỉnh màu/size trong giỏ, cảnh báo giá/tồn, phí ship ước tính; Escape, focus trap, return focus, scroll-lock có quản lý khi size guide mở từ quick view; icon label, live region, reduced motion.

**Nghiệm thu:** đóng size guide trở lại quick view đúng focus và vẫn khóa scroll; không mất cart khi chuyển trang; quản lý được hai combo; nút wishlist header mở danh sách thật. Kiểm tra 360/390px và bàn phím, không chỉ snapshot HTML.

### Phiên 4 — Quyết định backend và schema (C1; sau A và B1)

**Đầu ra:** tài liệu quyết định kiến trúc ngắn: công nghệ server/database/hosting, chi phí dự kiến, cách local/staging/production, migration, secret và backup. Kiểm tra tài liệu chính thức hiện hành trước chọn nhà cung cấp. Không tự đăng ký dịch vụ trả phí nếu chưa được yêu cầu.

**Schema đề xuất:**

| Bảng / thực thể | Trường và ràng buộc chính |
|---|---|
| products, categories | ID, slug unique, tên, mô tả, status, timestamps |
| product_variants, media | productId, màu, size, SKU unique, giá VND; ảnh gắn màu/biến thể |
| inventory, inventory_movements | variantId, onHand, reserved; lý do, delta, actor, reference; available = onHand − reserved |
| bundles, bundle_components | ID, giá, điều kiện, số lượng thành phần, thời gian áp dụng |
| promotions, promotion_redemptions | code unique, điều kiện, hạn dùng, usage limits; việc dùng mã cập nhật atomic |
| orders, order_items | mã/token tra cứu, trạng thái tách biệt, totals, snapshots, nhóm combo, idempotency key unique |
| stock_reservations | orderId, variantId, qty, expiresAt, status; chuyển trạng thái một lần |
| payments, shipments | phương thức, amount, status, external reference; vận đơn/timeline |
| admin_users, roles, audit_logs | quyền server; không chứa mật khẩu rõ hay secret trong log |
| content_pages | key/slug, bản nháp/publish, nội dung chính sách |

Review, subscribers và return_requests có thể bổ sung sau lõi đơn. Không cần xây toàn bộ bảng tăng trưởng ngay.

**Nghiệm thu:** migration dựng database trống; seed đúng 5 sản phẩm/giá/ảnh; ràng buộc ngăn SKU trùng và tồn sai; môi trường tách biệt, không commit credentials. Có mô tả rollback migration và thử backup/restore ở staging trước launch.

### Phiên 5 — Catalog/tồn và admin tối thiểu (C2–C3)

**C2. API catalog:** read published products/variants; ghi dữ liệu qua admin có validation. Media kiểm tra loại/kích thước, tên file và đường dẫn an toàn nếu có upload. Kết nối storefront API qua adapter; lỗi API hiển thị retry, không đổi sang dữ liệu giả âm thầm.

**C3. Admin:** login/logout, session hết hạn, quyền owner/operator; danh sách/sửa sản phẩm và biến thể, publish, điều chỉnh tồn có lý do; ẩn sản phẩm đã bán thay vì xóa snapshot đơn.

**Nghiệm thu:** khách/role không đủ quyền nhận 401/403 ở API; sửa giá hoặc tồn phản ánh storefront; dữ liệu sai bị từ chối; audit có actor và trước/sau; request giả vượt UI vẫn bị chặn. Có rate-limit đăng nhập và chống CSRF nếu dùng cookie session.

### Phiên 6 — Báo giá và tạo đơn an toàn (C4)

**Hợp đồng API dự kiến:**

- `GET /api/products`, `GET /api/products/:slug`: dữ liệu công khai.
- `POST /api/checkout/quote`: nhận variantId/qty, bundle definition/config, voucher và vùng giao; trả dòng giá, ship, totals, cảnh báo và quote token/version/expiry.
- `POST /api/orders`: nhận quote reference, người nhận, COD và idempotency key; trả orderId/mã và token tra cứu. Không nhận giá client như giá quyết định.
- `GET /api/orders/track`: tra cứu bằng credential bí mật/OTP, che dữ liệu nhạy cảm; rate-limit. Không trả đơn đầy đủ chỉ qua mã đơn.
- `/api/admin/products`, `/api/admin/inventory`, `/api/admin/orders`: API riêng có quyền server.
- `POST /api/admin/orders/:id/transitions`: action và expected version để tránh hai admin ghi đè trạng thái.

**Transaction tạo đơn:** kiểm tra input → xác thực quote/giá/ưu đãi → kiểm tra và giữ tồn atomic → lưu order/items/snapshots/redemption → commit → gửi thông báo qua job sau commit. Lỗi rollback toàn bộ. Retry cùng key trả cùng kết quả; cùng key với payload khác bị từ chối.

**Giữ tồn:** tạo đơn giữ lượng hàng có hạn; xác nhận chuyển sang tồn phân bổ; giao hàng trừ onHand/reserved theo quy tắc; hủy/hết hạn giải phóng đúng một lần; trả hàng nhập tồn sau kiểm tra. Có job và kiểm tra an toàn khi job chạy lại. Chủ shop chốt thời hạn đơn chờ xác nhận trước vận hành.

**Nghiệm thu bắt buộc:** hai khách tranh món cuối chỉ một đơn được nhận; sửa giá localStorage/request không giảm tổng server; hết hạn quote yêu cầu xác nhận lại; retry sau timeout không đơn trùng; rollback không giữ tồn/voucher mồ côi; tổng dòng + ship đúng tổng đơn; job hết hạn chạy hai lần không cộng tồn hai lần.

### Phiên 7 — Checkout COD và theo dõi (D1)

Form gồm tên, số điện thoại, địa chỉ, khu vực giao, ghi chú tùy chọn; email tùy chọn theo nhu cầu gửi thông báo. Chỉ thu dữ liệu cần thiết. Validation client hỗ trợ UX, server quyết định. Bước review hiển thị sản phẩm/biến thể/giá/discount/ship/tổng và chính sách trước xác nhận.

Thành công chỉ khi API trả đơn đã lưu; trang thành công có mã và credential/link tracking an toàn. Chỉ xóa các món đã được đặt khỏi giỏ; tạo đơn lỗi giữ giỏ/form. Không lưu địa chỉ/số điện thoại lâu dài trong localStorage mặc định.

**Nghiệm thu:** guest hoàn thành trên mobile; lỗi từng trường rõ; ship không hỗ trợ có thông báo; double click không trùng; API lỗi không toast thành công; refresh trang thành công vẫn đọc được thông tin theo quyền phù hợp; tracking không lộ đơn của người khác.

### Phiên 8 — Admin xử lý đơn và vận hành (D2)

Danh sách với bộ lọc, chi tiết, snapshot, lịch sử, note; action xác nhận/hủy/đóng gói/giao/đã giao, COD đã thu/đối soát; nhập vận đơn thủ công. Dashboard việc cần làm và tồn thấp. Ghi yêu cầu đổi trả cơ bản; hoàn tiền thao tác thủ công phải có lý do và log.

**Nghiệm thu:** một đơn đi từ tạo đến giao; hủy trả tồn đúng; giao thất bại không tự cộng tồn; trạng thái payment/fulfillment độc lập; thao tác trái flow bị API chặn; hai admin cập nhật đồng thời không ghi đè âm thầm; tổng dashboard phân biệt doanh thu đơn và tiền đã thu.

### Phiên 9 — QA và chuẩn bị ra mắt (E)

- Chạy unit logic giá/combo; integration transaction/API/quyền; E2E luồng guest + admin + ngoại lệ quan trọng. Không chỉ test mirror implementation.
- Duyệt ở 360/390/768/1440px, keyboard, focus, lỗi tải ảnh, mạng chậm và storage bị chặn. Đo hiệu năng; tối ưu ảnh và font/CDN theo kết quả.
- SEO cho URL thật: title/description riêng, canonical, sitemap, Open Graph, structured data chỉ từ dữ liệu xác thực. Kiểm tra direct navigation và 404 trên host thực tế.
- Hoàn thiện chính sách, liên hệ, thông tin hàng, bỏ claims/reviews không chứng minh; phân biệt demo/production.
- Thử backup/restore, cảnh báo lỗi, secret/session, rate-limit, phân quyền và rollback release. Dry run đơn COD staging rồi kiểm tra kho/admin/tracking.

**Go/no-go:** chỉ ra mắt bán thật khi các kiểm tra giao dịch và vận hành đều đạt; không có lỗi nghiêm trọng về giá/tồn/quyền/đơn; người vận hành biết xử lý hủy/giao thất bại/đổi trả. Nếu chỉ phục vụ môn học, bàn giao demo A–B với phạm vi được ghi rõ.

### Sau MVP (F; backlog tùy nhu cầu)

Thanh toán online với webhook xác thực chữ ký, xử lý trùng và đối soát; giao vận tự động; review từ đơn mua thật; newsletter có consent/unsubscribe; tài khoản tự nguyện và mua lại; dashboard funnel. Mỗi tích hợp có sandbox, lỗi/retry, giới hạn quyền và tiêu chí riêng. Không coi browser redirect thanh toán là bằng chứng đã thu tiền.

## 3. Những quyết định cần xác nhận đúng thời điểm

| Quyết định | Mặc định thiết kế | Phải chốt trước |
|---|---|---|
| Mục đích | Demo tốt, kiến trúc nâng cấp bán thật | Bắt đầu chặng C |
| Size từng món | Quần áo chưa chọn sẵn; phụ kiện One Size nếu phù hợp | Seed variants |
| Ship | Nội địa, 500k sau giảm giá là đề xuất | Báo giá production |
| Voucher | Không chồng combo/sale mặc định | Publish ưu đãi |
| Thanh toán | COD trước | Nhận đơn thật |
| Chính sách/claims | Demo khi chưa có bằng chứng | Publish nội dung thật |
| Backend/hosting | Chưa chọn nhà cung cấp | Chặng C |
| Tồn/giữ chỗ | Một kho, giữ lúc tạo đơn có hạn | Nhận đơn thật |

Các quyết định này không chặn phiên 1: có thể chuẩn hóa giá và nguồn phát hành ngay bằng dữ liệu demo hiện có.

## 4. Prompt để bắt đầu phiên tiếp theo

> Hãy đọc PLAN_TONG_THE_DAIZY.md và PLAN_THUC_THI_DAIZY.md trong dự án DAIZY WELLNESS. Bắt đầu phiên 1, thực hiện A1–A4: kiểm kê baseline, chuẩn hóa giá số nguyên VND với một hàm báo giá, sửa quy tắc combo để không giữ ưu đãi khi thiếu thành phần, đồng bộ nội dung demo và bản phát hành một file/tài liệu. Giữ phong cách và asset hiện tại, giữ mọi thay đổi đang có trong workspace. Chưa tích hợp backend hay thanh toán thật. Hoàn thành lát cắt có thể chạy thử; kiểm tra giá trên catalog/search/quick view/sale/cart, totals combo và migration giỏ cũ; chạy test/build và kiểm tra desktop/mobile. Cập nhật checklist cùng kết quả và các việc còn lại. Nếu cần lựa chọn nhỏ, tự quyết định theo plan và ghi lại.

## 5. Checklist bàn giao

- [x] A: Giá/combo/nguồn phát hành thống nhất.
- [ ] B: Biến thể, chi tiết, builder, wishlist, giỏ, accessibility.
- [ ] C: Backend, admin bảo vệ, giá/tồn/đơn atomic.
- [ ] D: Guest COD, tracking, admin xử lý xuyên suốt.
- [ ] E: QA, nội dung thật, backup/restore và go/no-go.
- [ ] F: Tích hợp tăng trưởng theo nhu cầu.

Hiện tại: phiên 1 triển khai A1–A4. Baseline 6/6; sau thay đổi 10/10 tests và build đạt. Chặng B–F chưa triển khai. Ước lượng lịch chỉ nên đặt sau phiên 1 và quyết định demo hay bán thật; dependencies/tiêu chí nghiệm thu quan trọng hơn cam kết số ngày chưa có cơ sở.

## Bàn giao phiên 1 — 14/10/2026

- Giá niêm yết: bra 290.000; pants 350.000; wrap 350.000 (sale 280.000); socks 80.000; headband 60.000 (sale 45.000). Catalog, search, quick view, sale, atelier lấy giá VND; giỏ qua quoteCart.
- Nhóm combo riêng cho mỗi lần thêm, phân bổ theo tỷ trọng giá lẻ hiện hành, phần dư vào dòng cuối. ± áp dụng cả nhóm; xóa một dòng làm mất ưu đãi nhóm. Mua lẻ không gộp vào combo. Migration bỏ giá cũ; không suy đoán nhóm từ giỏ v1.
- pricing.js tách logic giá; giữ JS classic để mở file trực tiếp. Build sinh HTML gộp, không inline ảnh; giữ thư mục assets đi kèm. npm dev phục vụ nguồn; cả server Node và PowerShell kiểm tra đường dẫn root.
- Các thay đổi plan chưa commit được giữ nguyên. Không triển khai backend/thanh toán thật; chưa deploy phiên này.
- Kiểm tra tự động: 10/10 tests; build xác minh 25 đường dẫn ảnh. Kiểm tra UI desktop 1440 và mobile 390/360, combo và reload; ghi kết quả thực tế trong HANDOVER.
- Phiên kế tiếp: B1–B3 (biến thể, catalog chung, trang chi tiết). Size phụ kiện, builder và focus overlay còn trong backlog B.
