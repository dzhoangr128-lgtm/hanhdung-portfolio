/**
 * OCEAN FRENZY - VISUAL EFFECTS ENGINE
 * Hiệu ứng đại dương sống động: Ánh sáng Caustics, Rong biển mềm, Bọt khí,
 * Hiệu ứng hạt đớp mồi (Bite Splash), Chữ bay điểm số, Sóng xung kích, v.v.
 */

class EffectManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Mảng các thực thể hiệu ứng
    this.bubbles = [];
    this.particles = [];
    this.floatingTexts = [];
    this.shockwaves = [];
    this.seaweeds = [];

    // Screen Shake
    this.shakeIntensity = 0;
    this.shakeDuration = 0;

    // Thời gian cho hoạt họa
    this.time = 0;

    this.initSeaweeds();
    this.initAmbientBubbles();
  }

  resize() {
    this.initSeaweeds();
  }

  // Khởi tạo các rặng rong biển dưới đáy đại dương
  initSeaweeds() {
    this.seaweeds = [];
    const count = Math.max(12, Math.floor(this.canvas.width / 70));
    for (let i = 0; i < count; i++) {
      this.seaweeds.push({
        x: (i * (this.canvas.width / count)) + (Math.random() * 40 - 20),
        y: this.canvas.height,
        height: 120 + Math.random() * 180,
        segments: 6 + Math.floor(Math.random() * 4),
        width: 14 + Math.random() * 12,
        color: ['#007f5f', '#2b9348', '#55a630', '#80b918', '#107e7d'][Math.floor(Math.random() * 5)],
        swaySpeed: 0.0015 + Math.random() * 0.001,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmount: 20 + Math.random() * 25
      });
    }
  }

  // Bọt khí môi trường lơ lửng
  initAmbientBubbles() {
    const bubbleCount = 40;
    for (let i = 0; i < bubbleCount; i++) {
      this.bubbles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 2 + Math.random() * 6,
        speed: 0.5 + Math.random() * 1.5,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 0.5 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.4
      });
    }
  }

  // Thêm bọt khí mới
  spawnBubble(x, y, radius = 3 + Math.random() * 4, speed = 1.2 + Math.random() * 2) {
    this.bubbles.push({
      x: x + (Math.random() * 20 - 10),
      y: y + (Math.random() * 20 - 10),
      radius: radius,
      speed: speed,
      wobbleSpeed: 0.03 + Math.random() * 0.04,
      wobbleAmp: 1.2 + Math.random() * 1.5,
      alpha: 0.6 + Math.random() * 0.3
    });
  }

  // Hiệu ứng cắn vỡ mồi (Bite Splash)
  spawnBiteSplash(x, y, color = '#ffbe0b', count = 15) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 4,
        color: color,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.03,
        isBubble: Math.random() > 0.5
      });
    }

    // Luôn nhả thêm 4-6 bọt khí bay lên
    for (let i = 0; i < 5; i++) {
      this.spawnBubble(x, y, 2 + Math.random() * 5, 1.5 + Math.random() * 2);
    }
  }

  // Vết rẽ nước khi cá bơi nhanh / Dash
  spawnDashWake(x, y, radius, angle) {
    const backAngle = angle + Math.PI + (Math.random() * 0.4 - 0.2);
    const speed = 2 + Math.random() * 3;
    this.particles.push({
      x: x - Math.cos(angle) * radius * 0.8,
      y: y - Math.sin(angle) * radius * 0.8,
      vx: Math.cos(backAngle) * speed,
      vy: Math.sin(backAngle) * speed + (Math.random() * -0.5),
      radius: 3 + Math.random() * 4,
      color: '#caf0f8',
      alpha: 0.7,
      decay: 0.03 + Math.random() * 0.02,
      isBubble: true
    });
  }

  // Điểm số bay lượn trên màn hình
  spawnFloatingText(text, x, y, color = '#ffd166', fontSize = 24) {
    this.floatingTexts.push({
      text: text,
      x: x,
      y: y,
      color: color,
      fontSize: fontSize,
      scale: 0.6,
      alpha: 1,
      vy: -1.8,
      life: 0,
      maxLife: 45
    });
  }

  // Hạt sao lấp lánh (dùng cho Nàng Tiên Cá và Frenzy)
  spawnStarParticle(x, y, color = '#ffd166', radius = 7) {
    this.particles.push({
      x: x + (Math.random() * 24 - 12),
      y: y + (Math.random() * 24 - 12),
      vx: (Math.random() * 2 - 1) * 0.9,
      vy: -0.7 - Math.random() * 0.9,
      radius: radius,
      color: color,
      alpha: 1,
      decay: 0.02 + Math.random() * 0.02,
      isStar: true,
      rotation: Math.random() * Math.PI,
      rotSpeed: 0.05 + Math.random() * 0.06
    });
  }

  // Sóng xung kích khi tiến hóa hoặc ăn mồi lớn
  spawnShockwave(x, y, maxRadius = 120, color = '#00f5d4') {
    this.shockwaves.push({
      x: x,
      y: y,
      radius: 10,
      maxRadius: maxRadius,
      color: color,
      alpha: 0.8,
      width: 6
    });
  }

  // Rung màn hình
  triggerScreenShake(intensity = 8, duration = 15) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }

  // Cập nhật mọi hiệu ứng
  update() {
    this.time += 1;

    // Giảm dần rung lắc
    if (this.shakeDuration > 0) {
      this.shakeDuration--;
      this.shakeIntensity *= 0.9;
    } else {
      this.shakeIntensity = 0;
    }

    // Cập nhật bọt khí
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      b.y -= b.speed;
      b.x += Math.sin(this.time * b.wobbleSpeed) * b.wobbleAmp;

      if (b.y < -10) {
        b.y = this.canvas.height + 10;
        b.x = Math.random() * this.canvas.width;
      }
    }

    // Cập nhật hạt văng (particles)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      if (p.isBubble) p.vy -= 0.15; // Bọt khí tự động nổi lên nhẹ
      if (p.isStar && p.rotSpeed) p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Cập nhật chữ bay điểm số
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.life++;

      // Scale hiệu ứng pop-up ban đầu
      if (ft.life < 8) {
        ft.scale += 0.1;
      }

      if (ft.life > ft.maxLife * 0.6) {
        ft.alpha = 1 - (ft.life - ft.maxLife * 0.6) / (ft.maxLife * 0.4);
      }

      if (ft.life >= ft.maxLife) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Cập nhật sóng xung kích
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.15 + 2;
      sw.alpha = Math.max(0, 1 - (sw.radius / sw.maxRadius));
      sw.width = Math.max(1, 6 * sw.alpha);

      if (sw.radius >= sw.maxRadius || sw.alpha <= 0.05) {
        this.shockwaves.splice(i, 1);
      }
    }
  }

  // =================== VẼ HIỆU ỨNG NỀN & ÁNH SÁNG ===================

  // =================== VẼ NỀN ĐẠI DƯƠNG RỰC RỠ (FEEDING FRENZY TROPICAL REEF) ===================

  drawBackground() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. NỀN NƯỚC NHIỆT ĐỚI ĐA TẦNG (Tropical Ocean Gradient)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#00b4d8');    // Mặt nước ngập tràn ánh nắng
    bgGrad.addColorStop(0.25, '#0077b6'); // Xanh đại dương nhiệt đới
    bgGrad.addColorStop(0.65, '#023e8a'); // Lam ngọc thẳm sâu
    bgGrad.addColorStop(1, '#03045e');    // Vùng đáy san hô kỳ bí
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. TIA NẮNG MẶT TRỜI XUYÊN NƯỚC (Volumetric Sunbeam Shafts)
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      const rayX = (w / rayCount) * (i + 0.5) + Math.sin(this.time * 0.012 + i * 1.5) * 70;
      const rayWidth = 90 + Math.sin(this.time * 0.018 + i * 2) * 35;
      const rayAlpha = 0.16 + Math.sin(this.time * 0.02 + i) * 0.06;

      const rayGrad = ctx.createLinearGradient(rayX, 0, rayX + 90, h * 0.9);
      rayGrad.addColorStop(0, `rgba(167, 243, 208, ${rayAlpha})`);
      rayGrad.addColorStop(0.4, `rgba(100, 223, 223, ${rayAlpha * 0.6})`);
      rayGrad.addColorStop(1, 'rgba(2, 62, 138, 0)');

      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(rayX - rayWidth * 0.4, 0);
      ctx.lineTo(rayX + rayWidth * 0.4, 0);
      ctx.lineTo(rayX + rayWidth * 2.5 + 100, h * 0.92);
      ctx.lineTo(rayX - rayWidth * 1.8 - 100, h * 0.92);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 3. MẠNG LƯỚI KHÚC XẠ NƯỚC ÓNG ÁNH (Water Caustics Mesh)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'rgba(202, 240, 248, 0.08)';
    ctx.lineWidth = 1.5;
    const causticRows = 6;
    const causticCols = Math.ceil(w / 140) + 1;
    for (let row = 0; row < causticRows; row++) {
      const cy = (row / causticRows) * (h * 0.55);
      ctx.beginPath();
      for (let col = 0; col < causticCols; col++) {
        const cx = col * 140 + Math.sin(this.time * 0.02 + row * 0.7) * 25;
        const cyOffset = Math.cos(this.time * 0.025 + col * 0.5) * 12;
        if (col === 0) ctx.moveTo(cx, cy + cyOffset);
        else ctx.lineTo(cx, cy + cyOffset);
      }
      ctx.stroke();
    }
    ctx.restore();

    // 4. BÓNG CÁ VOI KHỔNG LỒ XA XĂM (Distant Whale Silhouette)
    this.drawDistantWhale(w, h);

    // 5. BÓNG TÀU ĐẮM CỔ & RƯƠNG KHO BÁU Ở XA (Sunken Pirate Galleon)
    this.drawSunkenShip(w, h);

    // 6. RẠN SAN HÔ & HẢI QUỲ ĐÁY BIỂN (Vibrant Coral Reef & Anemones)
    this.drawCoralReef(w, h);

    // 7. SÒ NGỌC KHỔNG LỒ (Giant Pearl Clam)
    this.drawGiantClam(w, h);

    // 8. RẶNG RONG BIỂN UỐN LƯỢN (Swaying Kelp Bed)
    this.drawSeaweeds();

    // 9. ĐÁY BIỂN CÁT VÀNG MỊN (Golden Sand Ocean Floor)
    ctx.save();
    const sandGrad = ctx.createLinearGradient(0, h - 45, 0, h);
    sandGrad.addColorStop(0, 'rgba(14, 50, 80, 0.45)');
    sandGrad.addColorStop(0.5, '#052b48');
    sandGrad.addColorStop(1, '#02182b');
    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 40) {
      const wave = Math.sin(x * 0.008 + this.time * 0.008) * 6;
      ctx.lineTo(x, h - 35 + wave);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Bóng cá voi khổng lồ lướt êm đềm ở tầng nước xa
  drawDistantWhale(w, h) {
    const ctx = this.ctx;
    ctx.save();
    const whaleX = ((this.time * 0.35) % (w + 400)) - 200;
    const whaleY = h * 0.28 + Math.sin(this.time * 0.008) * 18;

    ctx.fillStyle = 'rgba(0, 40, 85, 0.22)';
    ctx.beginPath();
    ctx.ellipse(whaleX, whaleY, 110, 32, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Đuôi cá voi
    ctx.beginPath();
    ctx.moveTo(whaleX - 90, whaleY);
    ctx.lineTo(whaleX - 150, whaleY - 24);
    ctx.lineTo(whaleX - 140, whaleY);
    ctx.lineTo(whaleX - 150, whaleY + 24);
    ctx.closePath();
    ctx.fill();

    // Vây bơi
    ctx.beginPath();
    ctx.ellipse(whaleX - 10, whaleY + 18, 30, 10, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Tàu hải tặc đắm ở đáy đại dương trong lớp sương lam
  drawSunkenShip(w, h) {
    const ctx = this.ctx;
    ctx.save();
    const shipX = w * 0.82;
    const shipY = h - 60;

    ctx.fillStyle = 'rgba(2, 30, 60, 0.45)';
    ctx.strokeStyle = 'rgba(2, 30, 60, 0.55)';
    ctx.lineWidth = 2;

    // Thân tàu nghiêng trên rạn đá
    ctx.beginPath();
    ctx.moveTo(shipX - 100, shipY);
    ctx.quadraticCurveTo(shipX - 70, shipY - 45, shipX, shipY - 50);
    ctx.lineTo(shipX + 85, shipY - 25);
    ctx.lineTo(shipX + 65, shipY);
    ctx.closePath();
    ctx.fill();

    // Cột buồm gãy
    ctx.beginPath();
    ctx.moveTo(shipX - 30, shipY - 48);
    ctx.lineTo(shipX - 25, shipY - 140);
    ctx.lineTo(shipX - 20, shipY - 140);
    ctx.lineTo(shipX - 22, shipY - 48);
    ctx.fill();

    // Xà ngang cột buồm
    ctx.beginPath();
    ctx.moveTo(shipX - 55, shipY - 110);
    ctx.lineTo(shipX + 8, shipY - 105);
    ctx.stroke();

    // Mỏ neo sắt rỉ
    ctx.beginPath();
    ctx.arc(shipX - 80, shipY + 10, 12, Math.PI, 0);
    ctx.stroke();
    ctx.restore();
  }

  // Rạn san hô rực rỡ nhiệt đới & Khóm hải quỳ đung đưa
  drawCoralReef(w, h) {
    const ctx = this.ctx;
    ctx.save();

    // San hô não hồng & tím (Brain Corals)
    const coralSpots = [
      { x: w * 0.12, r: 42, col: '#f72585' },
      { x: w * 0.28, r: 35, col: '#7209b7' },
      { x: w * 0.58, r: 38, col: '#ff006e' },
      { x: w * 0.72, r: 48, col: '#b5179e' }
    ];

    coralSpots.forEach((c) => {
      ctx.fillStyle = c.col;
      ctx.beginPath();
      ctx.arc(c.x, h - 25, c.r, Math.PI, 0);
      ctx.fill();

      // Hoa văn khía san hô não
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1.8;
      for (let a = 0.2; a < 0.9; a += 0.2) {
        ctx.beginPath();
        ctx.arc(c.x, h - 25, c.r * a, Math.PI, 0);
        ctx.stroke();
      }
    });

    // Ống bọt biển phát quang màu cam (Tube Sponges)
    const spongeSpots = [w * 0.06, w * 0.38, w * 0.65, w * 0.92];
    spongeSpots.forEach((sx, idx) => {
      for (let t = 0; t < 3; t++) {
        const tx = sx + t * 9;
        const th = 45 + ((t * 11 + idx * 7) % 25);
        const tubeGrad = ctx.createLinearGradient(tx, h - th, tx, h);
        tubeGrad.addColorStop(0, '#ffd166');
        tubeGrad.addColorStop(0.5, '#f77f00');
        tubeGrad.addColorStop(1, '#d62828');
        ctx.fillStyle = tubeGrad;

        ctx.beginPath();
        ctx.ellipse(tx, h - 20, 6, th * 0.5, 0, Math.PI, 0);
        ctx.fill();

        // Miệng ống bọt biển nhả bọt khí
        ctx.fillStyle = '#6a040f';
        ctx.beginPath();
        ctx.ellipse(tx, h - th - 5, 5, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nhả 1 bọt khí nhỏ định kỳ
        if ((Math.floor(this.time + t * 40) % 180) === 0) {
          this.spawnBubble(tx, h - th - 10, 2.2, 1.3);
        }
      }
    });

    // Khóm Hải Quỳ xanh ngọc đung đưa 12 xúc tu (Waving Sea Anemones)
    const anemoneX = w * 0.46;
    const anemoneY = h - 25;
    ctx.fillStyle = '#06d6a0';
    ctx.beginPath();
    ctx.arc(anemoneX, anemoneY, 26, Math.PI, 0);
    ctx.fill();

    ctx.strokeStyle = '#00f5d4';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    for (let i = 0; i < 11; i++) {
      const ang = (i / 10) * Math.PI;
      const tentLen = 32 + Math.sin(this.time * 0.04 + i) * 6;
      const sway = Math.sin(this.time * 0.03 + i * 0.6) * 12;

      ctx.beginPath();
      ctx.moveTo(anemoneX + Math.cos(ang) * 20, anemoneY - Math.sin(ang) * 10);
      ctx.quadraticCurveTo(
        anemoneX + Math.cos(ang) * 22 + sway * 0.6,
        anemoneY - tentLen * 0.6,
        anemoneX + Math.cos(ang) * 22 + sway,
        anemoneY - tentLen
      );
      ctx.stroke();

      // Đốm hồng trên chóp xúc tu
      ctx.fillStyle = '#ff758f';
      ctx.beginPath();
      ctx.arc(anemoneX + Math.cos(ang) * 22 + sway, anemoneY - tentLen, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Sò Ngọc Khổng Lồ (Giant Clam with Sparkling Pearl)
  drawGiantClam(w, h) {
    const ctx = this.ctx;
    ctx.save();
    const clamX = w * 0.22;
    const clamY = h - 30;

    // Chu kỳ đóng/mở vỏ sò (chu kỳ 8 giây)
    const cycle = (this.time * 0.02) % (Math.PI * 2);
    const openAmount = Math.max(0, Math.sin(cycle)); // 0 = đóng, 1 = mở to nhất

    // Vỏ sò dưới
    const clamGrad = ctx.createLinearGradient(clamX - 35, clamY, clamX + 35, clamY);
    clamGrad.addColorStop(0, '#5a189a');
    clamGrad.addColorStop(0.5, '#9d4edd');
    clamGrad.addColorStop(1, '#5a189a');
    ctx.fillStyle = clamGrad;
    ctx.beginPath();
    ctx.ellipse(clamX, clamY, 32, 14, 0, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#3c096c';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Lòng sò mềm mại màu hồng phấn
    if (openAmount > 0.1) {
      ctx.fillStyle = '#ffccd5';
      ctx.beginPath();
      ctx.ellipse(clamX, clamY - 2, 26, 10 * openAmount, 0, 0, Math.PI * 2);
      ctx.fill();

      // VIÊN NGỌC TRAI KHỔNG LỒ LẤP LÁNH (Giant Sparkling Pearl)
      const pearlR = 9;
      const pearlY = clamY - 4 - openAmount * 3;
      const pearlGrad = ctx.createRadialGradient(clamX - 3, pearlY - 3, 2, clamX, pearlY, pearlR);
      pearlGrad.addColorStop(0, '#ffffff');
      pearlGrad.addColorStop(0.6, '#edf2f4');
      pearlGrad.addColorStop(1, '#ffd166');
      ctx.fillStyle = pearlGrad;
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 14 * openAmount;
      ctx.beginPath();
      ctx.arc(clamX, pearlY, pearlR, 0, Math.PI * 2);
      ctx.fill();

      // Đốm sáng ngọc trai
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(clamX - 3, pearlY - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Vỏ sò trên (mở theo góc)
    ctx.save();
    ctx.translate(clamX, clamY);
    ctx.rotate(-openAmount * 0.45);
    ctx.fillStyle = clamGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 16, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3c096c';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // Vẽ các khóm rong biển uốn lượn nhiều tầng
  drawSeaweeds() {
    const ctx = this.ctx;
    ctx.save();
    for (const sw of this.seaweeds) {
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = sw.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(sw.x, sw.y);

      let currentX = sw.x;
      let currentY = sw.y;
      const segLen = sw.height / sw.segments;

      for (let s = 1; s <= sw.segments; s++) {
        const segRatio = s / sw.segments;
        const sway = Math.sin(this.time * sw.swaySpeed + sw.swayOffset + s * 0.4) * (sw.swayAmount * segRatio);
        const targetX = sw.x + sway;
        const targetY = sw.y - (s * segLen);

        ctx.quadraticCurveTo(currentX, currentY - segLen * 0.5, targetX, targetY);
        currentX = targetX;
        currentY = targetY;
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // =================== VẼ CÁC HIỆU ỨNG ĐỘNG (FOREGROUND) ===================

  drawForeground() {
    const ctx = this.ctx;

    // 1. Vẽ bọt khí
    ctx.save();
    for (const b of this.bubbles) {
      ctx.strokeStyle = `rgba(202, 240, 248, ${b.alpha})`;
      ctx.fillStyle = `rgba(202, 240, 248, ${b.alpha * 0.35})`;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Đốm sáng trên bọt nước
      ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9})`;
      ctx.beginPath();
      ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Vẽ hạt nổ vụn (particles)
    ctx.save();
    for (const p of this.particles) {
      ctx.globalAlpha = p.alpha;
      if (p.isBubble) {
        ctx.strokeStyle = '#caf0f8';
        ctx.fillStyle = 'rgba(202, 240, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (p.isStar) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation || 0);
        ctx.fillStyle = p.color;
        const r = p.radius;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.quadraticCurveTo(0, 0, 0, r);
        ctx.quadraticCurveTo(0, 0, -r, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // 3. Sóng xung kích (Shockwaves)
    ctx.save();
    for (const sw of this.shockwaves) {
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = sw.alpha;
      ctx.lineWidth = sw.width;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Chữ điểm số bay lượn (Floating Texts)
    ctx.save();
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.translate(ft.x, ft.y);
      ctx.scale(ft.scale, ft.scale);
      ctx.globalAlpha = ft.alpha;
      ctx.font = `900 ${ft.fontSize}px 'Fredoka', 'Nunito', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Bóng chữ & viền
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.lineWidth = 4;
      ctx.strokeText(ft.text, 0, 0);

      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  // Áp dụng rung lắc màn hình vào context
  applyShake() {
    if (this.shakeIntensity > 0.1) {
      const offsetX = (Math.random() * 2 - 1) * this.shakeIntensity;
      const offsetY = (Math.random() * 2 - 1) * this.shakeIntensity;
      this.ctx.translate(offsetX, offsetY);
    }
  }
}
