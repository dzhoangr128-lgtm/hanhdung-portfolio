# DAIZY WELLNESS — LUXURY PILATES ATHLEISURE WEBSITE

## Nâng cấp thương mại điện tử — 19/10/2026

Nguồn hiện tại đã chuyển sang storefront nhiều trang: trang chủ, danh mục/chi tiết sản phẩm, cẩm nang/bài viết, yêu thích, giỏ, checkout COD và tra đơn. Backend mới có đơn hàng, tồn kho theo biến thể và quản trị trạng thái. Xem [PLAN_ECOMMERCE.md](PLAN_ECOMMERCE.md) cho kế hoạch đã tự phản biện và [ECOMMERCE_HANDOVER.md](ECOMMERCE_HANDOVER.md) cho trạng thái, kiểm thử và cách kích hoạt.

**Chưa deploy phiên nâng cấp này và chưa chạy migration production.** Cần áp dụng `supabase/commerce.sql`, nhập tồn thực và xác nhận điều kiện vận hành trước khi nhận đơn. Thanh toán online, hãng vận chuyển và email/SMS chưa tích hợp. Những mô tả storefront landing page và chưa có API đơn ở các phần lịch sử dưới đây được thay thế bởi bản bàn giao mới.

Chạy `npm install`, `npm test`, `npm run build`, `npm run dev`. Mở http://localhost:8080. Giao diện mới dùng `storefront.js` và `storefront.css`; bản HTML gộp là tài liệu lịch sử và không được sinh lại khi build.

## Cập nhật vận hành — 19/10/2026

Trang quản trị đã triển khai tại https://daizypilates.vercel.app/admin. Đã tạo project Supabase, bảng shop_catalog có RLS và tài khoản quản trị do chủ website tự đặt mật khẩu. Bốn biến môi trường Production được lưu dưới dạng Secret trên Vercel, không lưu khóa hoặc mật khẩu trong Git. Kiểm tra production: /admin HTTP 200; /api/catalog HTTP 200 với 5 sản phẩm; /api/session HTTP 401 khi chưa đăng nhập. Chưa kiểm thử đăng nhập bằng mật khẩu thật của chủ website. Các ghi chú bên dưới về chưa triển khai/chưa cấu hình là lịch sử phiên 14/10 và được thay thế bằng trạng thái này. Đơn hàng, tồn kho và thanh toán vẫn chưa tích hợp.

## Trạng thái tiếp quản — 14/10/2026

Đã bổ sung trang quản trị tại `/admin`: đăng nhập Supabase, kiểm tra email quản trị phía server và sửa tên/mô tả/giá của 5 sản phẩm. Cần tạo project, tài khoản và cấu hình biến môi trường trước khi sử dụng thật; xem [HUONG_DAN_QUAN_TRI.md](HUONG_DAN_QUAN_TRI.md). Phiên này chưa triển khai production. `npm run dev` phục vụ cả website và API; local server PowerShell hoặc mở trực tiếp HTML không chạy API quản trị.

Website hiện là bản xem trước giao diện bán hàng. Giỏ hàng, yêu thích và đơn vị tiền tệ được lưu trên trình duyệt; **chưa có hệ thống nhận đơn hàng, thanh toán hoặc đăng ký email thật**.

```powershell
npm install
npm test
npm run build
npm run dev
```

Mở `http://localhost:8080`. Build kiểm tra ảnh và tạo `dist/` chỉ gồm `index.html`, `styles.css`, `app.js`, `assets/`. Vercel dùng cấu hình trong `vercel.json`: preset Other, lệnh `npm run build`, output `dist`.

Repository: https://github.com/dzhoangr128-lgtm/Daizy-Wellness

Website: https://daizypilates.vercel.app — Vercel project `daizy_pilates`, team `Daizy`. GitHub đã kết nối Vercel, cập nhật nhánh `main` sẽ tạo deployment production mới.

Xem `HANDOVER.md` cho báo cáo rà soát, các lỗi đã sửa và kế hoạch phát triển. Bản HTML gộp `daizy_wellness_single_file.html` là bản đóng gói cũ, không dùng để deploy hoặc phát triển tiếp.

Nội dung thuyết minh bài tập bên dưới mô tả phiên bản ban đầu; trạng thái tiếp quản ở trên được ưu tiên.
> **Dự án:** Thiết kế Website Thương mại điện tử Thời trang Đồ tập Pilates Cao cấp  
> **Môn học:** Vibe Coding — Bài tập 1  
> **Ngôn ngữ & Công nghệ:** HTML5, CSS3, Vanilla JavaScript (ES6+), Responsive Web Design  
> **Phong cách thiết kế:** Quiet Luxury, Studio Pilates Aesthetic, Balletcore, Tone màu Pastel & Earthy

---

## 1. Hướng Dẫn Giáo Viên / Người Kiểm Tra Mở Bài Nhanh

Có 2 cách cực kỳ đơn giản để chấm điểm và trải nghiệm toàn bộ tính năng của trang web:

### 🌟 Cách 1: Mở trực tiếp (Nhanh nhất - Không cần cài đặt gì thêm)
* **Cách thực hiện:** Nhấp đúp chuột trái vào file **`Chay_Web.bat`** (hoặc nhấp đúp file **`index.html`**).
* Website sẽ tự động mở ngay trên trình duyệt mặc định (Google Chrome, Microsoft Edge, Cốc Cốc, Safari, v.v.) với đầy đủ hình ảnh và tính năng tương tác.

### 🌐 Cách 2: Chạy qua Local HTTP Server
* **Cách thực hiện:** Nhấp đúp chuột trái vào file **`Chay_Local_Server.bat`** (hoặc mở PowerShell gõ `powershell -ExecutionPolicy Bypass -File serve.ps1`).
* Truy cập địa chỉ: **`http://localhost:8080/`** trên trình duyệt.

---

## 2. Cấu Trúc Thư Mục Dự Án (Đóng Gói Gọn Gàng)

```text
bài 1/
│
├── index.html              # Mã nguồn trang chủ và giao diện hoàn chỉnh
├── styles.css              # Hệ thống CSS Design System chuẩn Quiet Luxury & Responsive
├── app.js                  # Engine JavaScript xử lý giỏ hàng, bảng màu, Quick View, bộ lọc
├── serve.ps1               # Bộ phát Local HTTP Server gọn nhẹ viết bằng PowerShell
├── Chay_Web.bat            # Phím tắt 1-click mở website ngay lập tức
├── Chay_Local_Server.bat   # Phím tắt 1-click mở Local Server cổng 8080
├── README.md               # Bản thuyết minh và hướng dẫn chi tiết
│
└── assets/
    └── images/             # Toàn bộ 25+ ảnh sản phẩm chuẩn studio Pinterest (5 món x 5 màu)
        ├── bra_*.jpg       # 5 màu Áo Bra Cổ Halter (Hồng, Trắng, Vàng, Xám, Nâu)
        ├── pants_*.jpg     # 5 màu Quần Loe Cạp Gập Pilates
        ├── wrap_*.jpg      # 5 màu Áo Khoác Wrap Crossover Kiểu Ballet
        ├── socks_*.jpg/png # 5 màu Tất Chống Trượt Reformer Hở Mu
        └── headband_*.jpg  # 5 màu Băng Đô Dệt Gân Co Giãn Êm Ái
```

---

## 3. Các Tính Năng & Tiêu Chí Đã Hoàn Thiện Trong Bài 1

### A. Thanh công cụ Navigation chuẩn 6 mục theo yêu cầu:
1. **`New`**: Khám phá 5 thiết kế cốt lõi của bộ sưu tập mùa mới.
2. **`Trang Phục`**: Menu mở rộng (Mega Menu) dẫn tới các trang chuyên biệt cho từng loại trang phục:
   * **Quần tập Pilates**: Trang chuyên biệt hiển thị rõ **cả 5 màu sắc** (*Hồng Phấn, Trắng Kem, Vàng Bơ, Xám Xi Măng, Nâu Mocha*).
   * **Áo bra Pilates**: Trang chuyên biệt hiển thị **đầy đủ 5 màu sắc**.
   * **Áo wrap Pilates**: Trang chuyên biệt hiển thị **đầy đủ 5 màu sắc**.
3. **`Phụ Kiện`**: Menu chuyên biệt cho phụ kiện Reformer:
   * **Tất chống trượt Pilates**: Hiển thị riêng với **5 màu sắc**.
   * **Băng đô Pilates**: Hiển thị riêng với **5 màu sắc**.
4. **`Best Seller`**: Các gói combo ưu đãi bán chạy nhất:
   * Combo Bộ Quần Áo Pilates (Áo Bra + Quần Loe): **550.000₫** *(Tiết kiệm 90.000₫)*.
   * Combo 3 Đôi Tất Chống Trượt: **199.000₫** *(Tiết kiệm 41.000₫)*.
   * Full Set 5 Món Pilates Hoàn Hảo: **950.000₫** *(Tiết kiệm 180.000₫ so với giá niêm yết; 95.000₫ so với giá lẻ sale)*.
5. **`Review Khách Hàng`**: Khu vực đánh giá 5 sao từ nội dung minh họa chưa xác thực.
6. **`Sale`**:
   * Áo wrap Pilates: Ưu đãi **280.000₫** *(Giá gốc 350.000₫)* kèm bộ chọn trực tiếp 5 màu sắc.
   * Băng đô dệt gân Pilates: Ưu đãi **45.000₫** *(Giá gốc 60.000₫)* kèm bộ chọn trực tiếp 5 màu sắc.

### B. Hệ thống hình ảnh thẩm mỹ cao (Pinterest Pilates Aesthetic):
* Sử dụng hình ảnh người mẫu studio chuyên nghiệp, ánh sáng dịu nhẹ tự nhiên.
* Đúng chuẩn 5 gam màu signature cho từng sản phẩm: *Vanilla Cream (Trắng Kem), Ballet Pink (Hồng Phấn), Butter Yellow (Vàng Bơ), Pale Cement (Xám Xi Măng), Mocha Brown (Nâu Mocha)*.
* Không sử dụng filter nhuộm màu trùng lặp, không có ảnh lỗi 404.

### C. Mức giá thực tế cho tệp khách hàng Việt Nam:
* Tất chống trượt: **80.000₫** (Combo 3 đôi: 199.000₫).
* Băng đô: **60.000₫** (Sale: 45.000₫).
* Áo bra: **290.000₫**.
* Quần loe pilates: **350.000₫**.
* Áo wrap ballet: **350.000₫** (Sale: 280.000₫).
* Ngưỡng Freeship: **500.000₫** (thanh tiến trình động trong giỏ hàng).

### D. Trải nghiệm tương tác hiện đại (UX/UI):
* **Xem nhanh (Quick View)**: Mở popup xem chi tiết từng màu sắc, chọn size, xem ảnh phóng to và thêm trực tiếp vào giỏ.
* **Giỏ hàng trượt (Cart Drawer)**: Thêm/xóa sản phẩm, tăng giảm số lượng, lưu trữ phiên mua sắm, hiển thị tiến trình miễn phí giao hàng.
* **Danh sách yêu thích (Wishlist)**: Thả tim lưu lại những món đồ ưa thích.
* **Đổi đơn vị tiền tệ**: Hỗ trợ chuyển đổi VND (₫), USD ($), EUR (€), GBP (£).
* **Bảng chọn size (Size Guide)**: Bảng tra cứu số đo 3 vòng (Ngực - Eo - Mông) cho size XS, S, M, L.
* **Tìm kiếm trực tiếp (Live Search)**: Tìm kiếm nhanh theo tên sản phẩm, danh mục hoặc sắc thái màu sắc.
* **Responsive 100%**: Tối ưu hiển thị hoàn hảo trên Desktop, Tablet và Mobile.

## Phiên build 1 — 14/10/2026

Chạy `npm run dev` để xem nguồn hiện tại tại http://localhost:8080; không cần build trước. `npm test` kiểm tra giá và giỏ; `npm run build` xuất website vào dist và sinh lại daizy_wellness_single_file.html từ nguồn. HTML gộp cần đi cùng assets/images; font/icon còn cần mạng. Không sửa trực tiếp bản gộp.

Giá gốc dùng số nguyên VND trong catalog; pricing.js chứa quoteCart, combo và ngưỡng miễn ship demo 500.000₫ sau ưu đãi. Ngoại tệ chỉ tham khảo bằng tỷ giá cố định. Combo có nhóm riêng; ± thay đổi cả nhóm; xóa thành phần bỏ ưu đãi, tính lại giá lẻ. Giỏ v1 được dựng lại từ catalog, bỏ giá tự lưu; combo cũ không có danh tính nhóm được chuyển về giá lẻ. Reviews/voucher/ship chỉ minh họa, checkout và newsletter chưa kết nối.
