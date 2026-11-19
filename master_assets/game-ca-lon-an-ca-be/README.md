# 🌊 ĐẠI DƯƠNG SĂN MỒI (OCEAN FEEDING FRENZY)
> **Dự án Game Canvas HTML5 & Procedural Web Audio API - Môn Vibe Coding**

---

## 🎮 1. Hướng Dẫn Chơi Ngay

- **Cách 1 (Nhanh nhất):** Nhấp đúp vào file `CHOI_NGAY.bat` hoặc mở trực tiếp `index.html` bằng trình duyệt web bất kỳ.
- **Cách 2 (Bản Portable 1 file):** Mở file `game_single_file.html` — toàn bộ mã nguồn HTML/CSS/JS đã được đóng gói thành 1 file độc lập duy nhất, chạy offline trên mọi thiết bị.

---

## 🕹️ 2. Hướng Dẫn Điều Khiển

| Thao Tác | Phím / Chuột | Chức Năng |
| :--- | :--- | :--- |
| **Bơi lội** | `Di chuột` HOẶC `W, A, S, D` / `Phím Mũi Tên` | Điều khiển cá bơi mượt mà theo mọi hướng |
| **Lướt nhanh (Dash)** | Giữ `Chuột Trái` HOẶC phím `Space` | Tăng tốc độ gấp đôi (tiêu hao Thể Lực) |
| **Tạm dừng** | Phím `P` hoặc `Escape` | Dừng tạm thời màn chơi |
| **Bật/Tắt Âm thanh** | Nút `🔊` & `🎵` góc trên màn hình | Điều chỉnh SFX và Nhạc nền |

---

## 🌟 3. Cơ Chế Gameplay Nổi Bật

1. **Chuỗi Tiến Hóa 4 Cấp Độ:**
   - **Cấp 1:** Cá Hề sơ sinh bé nhỏ (ăn sinh vật phù du, cá bé).
   - **Cấp 2:** Cá Thần Tiên sọc vàng tím nhanh nhẹn.
   - **Cấp 3:** Cá Ngừ Hoàng Gia uy mãnh.
   - **Cấp 4:** Cá Mập Trắng - Chúa tể biển sâu nuốt trọn mọi loài.
2. **Cơn Cuồng Nộ (Frenzy Mode):**
   - Đớp mồi liên tiếp để tích lũy Combo x2 $\rightarrow$ x10.
   - Khi thanh Combo đầy, người chơi bước vào trạng thái **CUỒNG NỘ FRENZY**: Cá hóa vàng rực cháy, tốc độ bơi vượt bậc và có thể nuốt chửng ngay cả các loài thú dữ khổng lồ!
3. **Hệ Thống Vật Phẩm Bổ Trợ (Power-ups):**
   - 🛡️ **Khiên Bảo Vệ:** Miễn nhiễm 1 lần va chạm chí mạng hoặc gai cá nóc.
   - 🧲 **Nam Châm Đại Dương:** Hút toàn bộ cá nhỏ xung quanh vào miệng.
   - ⚡ **Siêu Tốc Độ:** Hồi phục thể lực và bơi lướt cực nhanh.
   - 💎 **Ngọc Bội Biển Sâu:** Thưởng ngay +500 điểm.
4. **Sự Kiện Kỳ Thú - Nàng Tiên Cá Huyền Thoại:**
   - Nàng Tiên Cá thi thoảng bơi lướt qua màn hình với dải lụa phát quang lộng lẫy. Bơi lại gần để nhận **Lời Chúc Phúc Thần Kỳ (+1,000 điểm)**!

---

## 💻 4. Điểm Nhấn Kỹ Thuật

- **Pure HTML5 Canvas 2D:** Không dùng thư viện đồ họa ngoài (Zero Dependency), 100% hình dạng cá, chuyển động uốn lượn, bóng phát quang và khúc xạ ánh sáng (Caustics) được dựng bằng toán học và Canvas API thuần.
- **Procedural Web Audio API:** Toàn bộ nhạc nền và hiệu ứng âm thanh (đớp mồi, tăng tốc, vỡ khiên, thăng cấp, tiếng chuông tiên cá) được tổng hợp trực tiếp bằng các bộ dao động âm thanh sóng sin/vuông/tam giác thời gian thực, không tải file `.mp3` ngoài.
- **Tối ưu 60 FPS:** Thuật toán AI bầy đàn (Flocking/Flee/Chase), cân bằng ngăn xếp đồ họa chuẩn xác tuyệt đối (Diff = 0) và khối bảo vệ Game Loop chống gián đoạn.

---

*Chúc Thầy có những giây phút trải nghiệm thú vị dưới đáy đại dương!* 🐠🦈🌊
