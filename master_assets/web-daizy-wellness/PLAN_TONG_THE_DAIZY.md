# DAIZY WELLNESS — Rà soát và kế hoạch tổng thể

Ngày lập: 14/10/2026. Cơ sở: mã nguồn hiện có trong workspace; đây là đề xuất phát triển, chưa triển khai các tính năng mới.

## 1. Kết luận và phạm vi rà soát

Dự án có nền tảng trình bày thương hiệu và khám phá sản phẩm khá đầy đủ, nhưng hiện là storefront demo. Khoảng trống lớn nhất là chuỗi **chọn đúng biến thể → tính giá đáng tin cậy → tạo đơn → admin xử lý → khách theo dõi**. Nên hoàn thiện chuỗi này trước khi thêm nhiều nội dung hoặc hiệu ứng.

Đã đọc các nhóm: HTML chính và bản một file, CSS, JavaScript, dữ liệu sản phẩm, tests, build/server, cấu hình Vercel, script mở web/đóng gói và tài liệu. Không thấy AGENTS.md trong dự án. Workspace đang có thay đổi chưa commit; cần giữ lại khi build phiên sau.

Đã chạy: `npm test` đạt 6/6; `npm run build` thành công, kiểm tra 25 đường dẫn ảnh. Đây là kiểm tra logic hiện có và đóng gói, không chứng minh checkout, admin hay trải nghiệm trên thiết bị thật hoạt động. Phiên rà soát này chưa kiểm tra trực quan trình duyệt, Lighthouse, độ tương phản hoặc đọc màn hình; các mục đó phải được đo ở chặng nghiệm thu.

### Hiện trạng có bằng chứng

| Nhóm | Hiện có | Khoảng trống / tác động |
|---|---|---|
| Catalog | 5 sản phẩm, mỗi sản phẩm 5 màu trong `app.js`; ảnh local | Chưa có SKU/tồn kho theo màu–size; dữ liệu gắn trực tiếp trong mã |
| Khám phá | Danh mục, hash routing, tìm kiếm, spotlight màu, quick view | Chưa có trang sản phẩm với URL riêng; tìm kiếm chưa bỏ dấu; các bộ lọc chưa là một trạng thái chung |
| Giỏ hàng | Số lượng, xóa dòng, giá sale, lưu localStorage, freeship progress | Giá vẫn lấy từ dữ liệu client; chưa có báo giá server, phí vận chuyển hoặc kiểm tra tồn |
| Combo | Ba nút thêm combo; tests xác nhận tổng 550k/199k/950k | Mặc định size S và màu định sẵn; các dòng giá giảm có thể bị xóa/tăng độc lập mà vẫn giữ giá combo |
| Wishlist | Lưu và đếm số mục | Nút header chỉ thông báo số lượng; ID có cả theo sản phẩm lẫn màu, thiếu màn hình xem/mua |
| Checkout | `app.js:1612` thông báo bản xem trước | Không có form nhận hàng, tạo đơn, mã đơn, thanh toán hay tracking |
| Newsletter | `app.js:1602` báo chưa đăng ký | Chưa lưu email, trạng thái đồng ý hoặc tích hợp gửi thư |
| Admin | Không có màn hình, API, database hoặc xác thực admin trong nguồn hiện tại | Chưa quản lý sản phẩm, tồn, đơn, ưu đãi, nội dung |
| Nội dung | Review, số sao, số lượt review được viết sẵn | Không có nguồn đơn mua để chứng minh “xác thực”; phải coi là dữ liệu demo đến khi kiểm chứng |
| Giá / marketing | Giá gốc, giá sale, DAIZY15, freeship | Voucher mới là lời quảng bá; freeship hỏa tốc toàn quốc/quốc tế chưa có quy tắc vận hành |
| Bản phát hành | Build copy storefront vào `dist`; headers bảo vệ cơ bản | Bản một file và tài liệu đang khác bản chính; `npm run dev` phục vụ `dist` nên cần build trước |
| Accessibility / SEO | `lang=vi`, title, description, một số aria-label, media queries | Chưa thấy xử lý Escape/focus trap, dialog semantics, canonical, Open Graph hay structured data trong bản chính |

### Các vấn đề ưu tiên

1. **Một file cũ gây hiểu nhầm:** `daizy_wellness_single_file.html` còn toast “đã kích hoạt” đăng ký email và giả lập kết nối thanh toán. Phải sinh bản này từ nguồn chính hoặc ngừng coi là bản phát hành chính thức.
2. **Combo chưa là thực thể:** giảm từng dòng rồi xóa món khác vẫn giữ đơn giá giảm. Cần bundle/group ID và điều kiện hợp lệ, thay vì dùng customPrice tùy ý.
3. **Phần trăm tiết kiệm sai:** 640k → 550k là khoảng 14,06%; 240k → 199k là 17,08%; 1.130k → 950k là 15,93%. Nên ưu tiên số tiền tiết kiệm 90k/41k/180k và tính phần trăm tự động. Giá lẻ đang sale cộng lại chỉ là 1.045k, nên full set 950k tiết kiệm thêm 95k so với mua lẻ hiện tại. Phải phân biệt so với giá niêm yết và so với giá đang bán.
4. **Giá localStorage chưa đáng tin cho bán thật:** restore có kiểm tra hình dạng dữ liệu, nhưng chấp nhận giá dương thấp hơn giá niêm yết. Khi tạo đơn, server phải tự tính lại toàn bộ, không tin giá/discount gửi lên.
5. **Tiền tệ:** VND đang suy ra từ số thập phân USD với hệ số cố định; các tỷ giá khác cũng cố định. Tài liệu ghi “theo thời gian thực” không khớp nguồn. Đề xuất lấy số nguyên VND làm giá chuẩn và chỉ thanh toán VND trong MVP.
6. **Bảo trì:** `app.js` khoảng 74 KB, `styles.css` khoảng 65 KB; render card bị lặp giữa catalog và tìm kiếm, nhiều handler inline. Cần tách có kiểm soát, không viết lại toàn bộ giao diện trước khi có regression checks.
7. **Server local:** `serve.ps1` ghép đường dẫn và đọc file mà chưa kiểm tra đường dẫn chuẩn hóa nằm trong root. Nên thống nhất server Node có giới hạn root, chỉ dùng server local cho phát triển.

## 2. Góc nhìn chuyên gia xây dựng website

Mục tiêu: nền tảng dễ bảo trì, một nguồn dữ liệu và luồng giao dịch có thể kiểm tra.

### Cần thiết cho MVP

- Tách dữ liệu catalog, logic giá, giỏ hàng, render và điều hướng; giữ bảng màu, font, ảnh và cấu trúc thương hiệu hiện tại.
- Biến thể có ID ổn định: sản phẩm + màu + size; size hợp lệ theo từng sản phẩm, phụ kiện có thể dùng One Size nếu được xác nhận.
- Một hàm báo giá duy nhất: giá món, combo, voucher, phí ship, tổng trả. Server là nguồn quyết định khi có backend.
- Trang chi tiết sản phẩm: ảnh đúng màu, chất liệu, phom, size, chăm sóc, giá, tồn kho, chính sách và URL chia sẻ được.
- Tìm kiếm bỏ dấu, lọc phối hợp danh mục/màu/size/còn hàng, xóa lọc và trạng thái không có kết quả. Với 5 sản phẩm, sort giá là đủ; chưa cần search engine riêng.
- Đóng/mở modal bằng bàn phím, focus trap/return focus, aria-label cho icon, trạng thái loading/error/empty, reduced motion.
- Tối ưu ảnh bằng kích thước khai báo, lazy-load dưới fold, ảnh hero tải ưu tiên; đo hiệu năng trước/sau thay đổi.
- API có validation, phân quyền server, logging có che dữ liệu cá nhân, cấu hình môi trường và backup.
- Build tự sinh bản một file nếu tiếp tục cần nộp bài; tài liệu phải phân biệt demo và bản bán hàng.

### Sau MVP

SEO theo từng sản phẩm, sitemap/canonical/Open Graph, structured data từ dữ liệu thật; sự kiện funnel; tích hợp thanh toán/giao vận; newsletter thật. Chỉ chọn công nghệ/nhà cung cấp khi kiểm tra tài liệu chính thức, chi phí và điều kiện tích hợp ở phiên triển khai.

## 3. Góc nhìn khách hàng

Mục tiêu: tự tin chọn đúng đồ, biết số tiền cuối cùng và biết đơn đang ở đâu.

| Nhu cầu | Tính năng / trải nghiệm | Ưu tiên |
|---|---|---|
| “Tôi hợp size nào?” | Size chart theo loại đồ, cách đo, thông tin người mẫu và phom; không mặc định chọn S cho quần áo | MVP |
| “Màu và chất liệu thực tế ra sao?” | Album đúng biến thể, ảnh chi tiết khi có asset thật, mô tả có căn cứ; không đổi sang ảnh màu khác khi hover mà thiếu giải thích | MVP |
| “Combo có chọn riêng được không?” | Builder chọn màu/size từng món; báo món hết hàng; tổng và tiết kiệm rõ | MVP |
| “Tôi đã lưu gì?” | Wishlist hiển thị món đã lưu, xóa và thêm vào giỏ với kiểm tra biến thể | MVP |
| “Tôi phải trả bao nhiêu?” | Phí ship, giảm giá và điều kiện miễn ship trước bước xác nhận; lỗi voucher cụ thể | MVP |
| “Tôi không muốn tạo tài khoản” | Guest checkout; form ngắn, lỗi tại trường, giữ dữ liệu khi thử lại | MVP |
| “Đơn đã được nhận chưa?” | Trang thành công có mã đơn và bản tóm tắt từ server; retry không tạo đơn trùng | MVP |
| “Tôi theo dõi/đổi size ở đâu?” | Tra cứu an toàn, timeline, yêu cầu hỗ trợ/đổi trả; không công khai địa chỉ chỉ bằng mã đơn | MVP cơ bản |
| “Cửa hàng có đáng tin?” | Thông tin liên hệ thật, chính sách rõ, phân biệt review demo và review đã mua | MVP |
| “Tôi muốn quay lại mua dễ hơn” | Mua lại, tài khoản tự nguyện, địa chỉ lưu, đánh giá sau mua | Sau MVP |

Luồng chuẩn: Trang chủ/danh mục → chi tiết → chọn màu/size còn hàng → giỏ → nhập người nhận → xem giá/ship → xác nhận → mã đơn → theo dõi. Không buộc khách đăng ký để hoàn thành mua hàng.

Luồng ngoại lệ: món vừa hết hàng → chỉ rõ món/biến thể, gợi ý đổi; giá vừa thay đổi → hiển thị chênh lệch và yêu cầu xác nhận lại; mạng lỗi → giữ form và giỏ; nhấn nhiều lần → trả cùng đơn; voucher sai → bỏ ưu đãi và cho tiếp tục.

## 4. Góc nhìn admin

Mục tiêu: vận hành ít sai sót, biết việc cần làm và truy được ai đã thay đổi dữ liệu.

### Không gian quản trị

- Dashboard ưu tiên việc: đơn chờ xác nhận, đơn quá hạn xử lý, tồn thấp, đơn giao thất bại, yêu cầu đổi trả. Doanh thu phân biệt đã thu, COD chưa đối soát và hoàn tiền; không cộng tất cả đơn mới vào doanh thu thực thu.
- Sản phẩm: tạo/sửa/ẩn, danh mục, slug, ảnh theo màu, size chart, giá niêm yết/giá bán, trạng thái nháp/đang bán. Không xóa cứng sản phẩm đã nằm trong đơn.
- Biến thể/tồn: SKU duy nhất; số lượng thực có, giữ chỗ, khả dụng; nhập/điều chỉnh có lý do, lịch sử và ngưỡng cảnh báo.
- Đơn hàng: lọc/tìm theo mã, trạng thái, thời gian; chi tiết snapshot; xác nhận/hủy, ghi chú nội bộ, thông tin giao hàng, lịch sử trạng thái. Chỉ cho thao tác hợp lệ.
- Combo/voucher: chọn thành phần, thời gian, giới hạn sử dụng, mức tối thiểu, áp dụng/không áp dụng sale hoặc combo; preview báo giá trước publish.
- Nội dung: banner, chính sách, FAQ, liên hệ; review có trạng thái chờ duyệt/đã duyệt/ẩn và nguồn xác minh.
- Phân quyền: owner; vận hành đơn/kho; biên tập nội dung. MVP có thể triển khai owner và operator trước, nhưng thiết kế quyền tách ngay từ đầu.
- Audit: actor, thời gian, hành động, đối tượng, trước/sau với dữ liệu nhạy cảm được che; kiểm tra quyền cả API, không chỉ ẩn nút.

### Flow vận hành

1. **Sản phẩm:** tạo nháp → thêm biến thể/ảnh/giá/tồn → preview → publish → kiểm tra storefront.
2. **Đơn:** khách gửi → server tạo và giữ tồn → admin xác nhận → đóng gói → giao vận → đã giao. Đơn bị hủy giải phóng tồn đúng một lần.
3. **COD:** đơn đã giao vẫn có thể chưa thu/đối soát; chỉ cập nhật đã thu khi có xác nhận hợp lệ.
4. **Giao thất bại:** ghi lý do → giao lại hoặc hoàn hàng; hoàn tồn sau khi hàng đã nhận/kiểm tra, không ngay lúc đánh dấu giao thất bại.
5. **Đổi trả:** yêu cầu → xét điều kiện → nhận hàng → kiểm tra → nhập lại tồn nếu bán được → đổi/hoàn → đóng yêu cầu. MVP có thể xử lý thủ công với ghi nhận trên đơn.
6. **Khuyến mãi:** soạn → preview giỏ đại diện → kiểm tra thời gian/điều kiện → publish → xem hiệu quả; thay đổi không sửa snapshot đơn cũ.

Tách ba trạng thái: order (`pending_confirmation`, `confirmed`, `completed`, `cancelled`), fulfillment (`unfulfilled`, `packing`, `shipped`, `delivered`, `delivery_failed`, `returned`), payment (`unpaid`, `pending`, `paid`, `refund_pending`, `partially_refunded`, `refunded`). Chặn hoàn thành khi điều kiện chưa đủ; mỗi chuyển trạng thái có actor và lý do. Không cho dropdown đổi tùy ý từ bất kỳ trạng thái sang bất kỳ trạng thái.

## 5. Kế hoạch tổng thể đã tinh gọn

Giả định làm việc: giữ thương hiệu DAIZY, thị trường Việt Nam, 5 nhóm sản phẩm, một kho, VND, guest checkout và COD là hình thức đầu tiên. Đây là giả định để bắt đầu thiết kế; phí ship, size, tồn và chính sách cần chủ dự án xác nhận trước bán thật.

| Chặng | Kết quả | Điều kiện qua chặng |
|---|---|---|
| A — Chuẩn hóa demo | Giá/nội dung/bản phát hành nhất quán, logic tách được | Regression 6 tests còn đạt, thêm kiểm tra quy tắc giá; không thông báo giao dịch giả |
| B — Hoàn thiện chọn mua | Chi tiết, biến thể, combo builder, wishlist, giỏ có báo giá | Khách chọn đúng món; combo bị thiếu không giữ ưu đãi trái quy tắc |
| C — Backend và admin lõi | Catalog/tồn thật, admin bảo vệ, API báo giá/tạo đơn | Client không sửa được giá; race tồn và phân quyền được kiểm tra |
| D — Đặt hàng COD | Form, xác nhận, theo dõi và vận hành đơn xuyên suốt | Đơn tồn tại trong database, xuất hiện admin, không trùng/âm tồn |
| E — Sẵn sàng ra mắt | Kiểm tra mobile, accessibility, SEO, backup/restore, nội dung thật | Bộ nghiệm thu đạt; còn thiếu phải được ghi rõ trước ra mắt |
| F — Tăng trưởng | Thanh toán online, giao vận, review thật, CRM/newsletter | Chỉ làm khi có nhu cầu và khả năng vận hành |

MVP gồm A–E. Không đưa loyalty, AI chọn size, đa tiền tệ thanh toán, marketplace, multi-warehouse hoặc ứng dụng mobile vào MVP.

### Kiến trúc mục tiêu

Giữ storefront hiện tại và tách JavaScript thành module theo trách nhiệm. Backend là API cùng database quan hệ có transaction; admin gọi API này, không sửa localStorage để giả lập dữ liệu chung. localStorage chỉ lưu ID biến thể, số lượng, wishlist và lựa chọn UI; migration từ `daizy-store-v1` không giữ giá client như giá chuẩn.

Không bắt buộc chuyển framework. Chỉ cân nhắc framework khi routing, render SEO hoặc quản trị thực sự làm cách hiện tại khó bảo trì. Lựa chọn hosting/backend/database cụ thể cần một quyết định kiến trúc riêng trước chặng C; Vercel hiện chỉ đang build nội dung tĩnh, chưa đồng nghĩa có backend thương mại.

Demo offline vẫn có thể giữ bằng adapter dùng fixture; giao diện phải ghi rõ chế độ demo và không nhận thông tin/tiền như một cửa hàng thật. Production dùng adapter API và không fallback âm thầm sang tạo đơn local khi API lỗi.

### Quy tắc kinh doanh đề xuất

- Tiền dùng số nguyên VND. Giá niêm yết và giá bán tách riêng. Tổng = tiền hàng sau ưu đãi + phí giao hàng; không thêm khoản phí ẩn.
- MVP không cộng voucher trên combo/sale nếu chưa có quy tắc được duyệt. DAIZY15 phải bị ẩn hoặc ghi rõ demo đến khi có xử lý thật.
- Combo là nhóm có cấu hình hoàn chỉnh. Xóa một thành phần: bỏ nhóm ưu đãi và báo giá lại các món còn lại theo giá lẻ hiện hành; khách thấy và xác nhận chênh lệch. Tăng số combo tăng toàn bộ nhóm; mua lẻ thêm tạo dòng độc lập.
- Phân bổ giảm giá combo bằng số nguyên, phần dư theo quy tắc cố định để tổng dòng bằng tổng combo; lưu phân bổ trong đơn phục vụ hoàn một phần.
- Freeship 500k là mức đề xuất kế thừa demo. Cần chốt áp dụng trước/sau voucher và vùng giao; đề xuất sau giảm giá tiền hàng. Không hứa hỏa tốc/quốc tế khi chưa có vận hành tương ứng.
- Đơn lưu snapshot tên, SKU, biến thể, giá, phân bổ giảm, phí ship, người nhận và phiên bản chính sách; catalog đổi không đổi đơn cũ.
- Checkout tạo báo giá có hạn; khi giá/tồn thay đổi thì trả báo giá mới, không âm thầm tăng số tiền phải trả.

## 6. Tự phản biện và điều chỉnh

| Phản biện | Điều chỉnh cuối cùng |
|---|---|
| “Chỉ là bài môn học, backend/admin thật có quá sức?” | Chặng A–B tạo demo hoàn chỉnh; C–E là đường nâng cấp bán thật. Admin local chỉ được mô tả là mô phỏng, không thay thế vận hành thật |
| “Có 5 sản phẩm mà làm quá nhiều màn hình?” | Giữ danh mục gọn, filter cơ bản; không thêm engine tìm kiếm hay phân trang sớm |
| “Tách code khiến bản mở trực tiếp hỏng?” | Giữ bản build một file cho offline; kiểm tra cả HTTP và file sau khi chuyển module |
| “COD không cần thanh toán online, vậy sao phải có payment state?” | COD vẫn cần theo dõi thu/đối soát; payment state độc lập từ đầu để tránh sai báo cáo |
| “Combo builder làm mua hàng chậm?” | Cho chọn màu chung và size chung nhanh, nhưng luôn cho sửa riêng từng món; phụ kiện không ép size quần áo |
| “Không nhận tài khoản thì tracking thiếu an toàn?” | Dùng link/token bí mật hoặc OTP; không dựa vào mã đơn dễ đoán. Không buộc đăng nhập để mua |
| “Giữ tồn lúc nào sẽ tối ưu?” | MVP giữ tồn trong transaction lúc tạo đơn, có hạn xác nhận và cơ chế giải phóng; rate-limit để hạn chế giữ tồn ảo. Không giữ lúc thêm giỏ |
| “Thêm mọi tích hợp ngay sẽ tiện?” | COD và cập nhật vận đơn thủ công trước; payment/giao vận tự động sau khi lõi đơn/tồn ổn định |
| “Review đẹp giúp tăng chuyển đổi, vì sao gỡ?” | Giữ bố cục nhưng ghi demo; production chỉ dùng nội dung có căn cứ. Không sinh review giả để lấp chỗ |
| “Bảo mật và SEO có thể để cuối?” | Validation/phân quyền/transaction là điều kiện chặng C; kiểm tra SEO và hiệu năng đầy đủ ở E, không trì hoãn bảo vệ dữ liệu đến lúc ra mắt |

Kết quả sau phản biện: ưu tiên **đúng giá, đúng biến thể, đúng đơn, đúng tồn và admin xử lý được**; duy trì thẩm mỹ hiện tại. Các tính năng tăng trưởng không được làm chậm chuỗi này.

## 7. Đo lường và điều kiện ra mắt

Theo dõi `view_product`, `select_variant`, `add_to_cart`, `begin_checkout`, `order_created`; chỉ ghi order_created sau khi server xác nhận. Dùng ID đơn để chống ghi trùng, không đưa tên/số điện thoại/địa chỉ vào analytics.

Mục tiêu QA đề xuất: không âm tồn, không đơn trùng khi retry, tổng client khớp server ở đơn thành công; không lỗi chặn mua ở 360/390/768/1440px; dùng bàn phím hoàn thành chọn mua; không lỗi ảnh hay liên kết chính. Đo hiệu năng bằng công cụ trước khi đặt ngân sách cuối cùng; không cam kết điểm Lighthouse khi chưa đo.

Trước bán thật cần: sản phẩm/size/tồn xác nhận, nội dung và review có nguồn, vùng/phí ship, thông tin liên hệ, chính sách đổi trả/bảo mật, quyền tài khoản admin, cách thu COD, backup đã thử khôi phục và kênh nhận lỗi. Những yêu cầu pháp lý cụ thể cần được kiểm tra theo thị trường ở thời điểm ra mắt, tài liệu này không xác nhận tuân thủ pháp luật.

Kế hoạch từng việc, dữ liệu, API, tiêu chí nghiệm thu và prompt phiên tiếp theo nằm trong `PLAN_THUC_THI_DAIZY.md`.
