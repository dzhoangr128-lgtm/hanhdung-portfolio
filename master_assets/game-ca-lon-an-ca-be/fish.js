/**
 * OCEAN FRENZY - FISH SPECIES & PROCEDURAL ANATOMY
 * Dựng hình học và diễn hoạt chuyển động bơi cá chân thực:
 * - Uốn lượn đuôi theo tần số sóng sin
 * - Mắt đảo theo hướng mồi/kẻ thù
 * - Miệng tự động há to khi tới gần con mồi
 * - Vây ngực vẫy nhịp nhàng
 * - Đa dạng giống loài: Cá Hề, Cá Nóc gai tự phồng, Cá Kiếm săn mồi, Cá Mập Trắng, Megalodon
 */

class Fish {
  constructor(x, y, type = 'clownfish', isPlayer = false, level = 1) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.targetAngle = 0;

    this.type = type;
    this.isPlayer = isPlayer;
    this.level = level;

    // Chu kỳ bơi uốn đuôi
    this.swimPhase = Math.random() * Math.PI * 2;
    this.swimSpeed = 0.15;
    this.swimAmp = 1;

    // Miệng há / khép
    this.mouthOpen = 0;
    this.targetMouthOpen = 0;

    // Hướng nhìn của mắt
    this.lookAngle = 0;

    // Trạng thái cá nóc (Pufferfish)
    this.isPuffed = false;
    this.puffTimer = 0;
    this.puffScale = 1;

    // Thiết lập thông số theo chủng loại
    this.initSpeciesProps();

    // AI chuyển hướng ngẫu nhiên
    this.aiWanderTimer = Math.random() * 60;
    this.targetX = x;
    this.targetY = y;
  }

  initSpeciesProps() {
    if (this.isPlayer) {
      this.updatePlayerStats(this.level);
      return;
    }

    switch (this.type) {
      case 'krill': // Tép / Tảo phát quang siêu nhỏ (chậm chạp, mồi ngon dễ nuốt)
        this.radius = 10;
        this.baseSpeed = 0.8;
        this.maxSpeed = 1.3;
        this.fleeDist = 45;
        this.scoreValue = 15;
        this.growthValue = 20;
        this.bodyColor = '#ff758f';
        this.accentColor = '#ffb3c1';
        this.name = 'Tép Biển';
        break;

      case 'neon': // Cá Neon nhỏ bơi thong thả
        this.radius = 14;
        this.baseSpeed = 1.2;
        this.maxSpeed = 1.8;
        this.fleeDist = 75;
        this.scoreValue = 30;
        this.growthValue = 35;
        this.bodyColor = '#0077b6';
        this.accentColor = '#00b4d8';
        this.tailColor = '#ef233c';
        this.name = 'Cá Neon';
        break;

      case 'clownfish': // Cá Hề cam vằn trắng
        this.radius = 20;
        this.baseSpeed = 1.5;
        this.maxSpeed = 2.2;
        this.fleeDist = 95;
        this.scoreValue = 60;
        this.growthValue = 65;
        this.bodyColor = '#fb8500';
        this.accentColor = '#ffffff';
        this.tailColor = '#ffb703';
        this.name = 'Cá Hề';
        break;

      case 'pufferfish': // Cá Nóc Gai (di chuyển chậm rãi)
        this.radius = 24;
        this.baseSpeed = 1.1;
        this.maxSpeed = 1.7;
        this.fleeDist = 80;
        this.scoreValue = 90;
        this.growthValue = 95;
        this.bodyColor = '#c77dff';
        this.accentColor = '#7b2cbf';
        this.name = 'Cá Nóc Gai';
        this.puffTimer = 140 + Math.random() * 180;
        break;

      case 'swordfish': // Cá Kiếm / Ngừ lao nhanh
        this.radius = 35;
        this.baseSpeed = 2.2;
        this.maxSpeed = 3.8;
        this.fleeDist = 110;
        this.scoreValue = 160;
        this.growthValue = 180;
        this.bodyColor = '#1d3557';
        this.accentColor = '#457b9d';
        this.tailColor = '#a8dadc';
        this.name = 'Cá Kiếm Săn Mồi';
        break;

      case 'shark': // Cá Mập Trắng khổng lồ sát thủ
        this.radius = 58;
        this.baseSpeed = 2.0;
        this.maxSpeed = 3.4;
        this.fleeDist = 0;
        this.scoreValue = 450;
        this.growthValue = 500;
        this.bodyColor = '#343a40';
        this.accentColor = '#e9ecef';
        this.tailColor = '#212529';
        this.name = 'Cá Mập Trắng';
        break;

      case 'jellyfish': // Sứa Phát Quang bồng bềnh
        this.radius = 16;
        this.baseSpeed = 0.7;
        this.maxSpeed = 1.2;
        this.fleeDist = 45;
        this.scoreValue = 45;
        this.growthValue = 50;
        this.bodyColor = '#f72585';
        this.accentColor = '#4cc9f0';
        this.tailColor = '#7209b7';
        this.name = 'Sứa Phát Quang';
        break;

      case 'turtle': // Rùa Biển Cổ Đại vững chãi
        this.radius = 42;
        this.baseSpeed = 1.3;
        this.maxSpeed = 2.0;
        this.fleeDist = 85;
        this.scoreValue = 220;
        this.growthValue = 240;
        this.bodyColor = '#2b9348';
        this.accentColor = '#55a630';
        this.tailColor = '#007f5f';
        this.name = 'Rùa Biển Cổ Đại';
        break;

      case 'moorish': // Cá Thần Tiên Cờ Hoàng Gia
        this.radius = 26;
        this.baseSpeed = 1.6;
        this.maxSpeed = 2.4;
        this.fleeDist = 90;
        this.scoreValue = 85;
        this.growthValue = 90;
        this.bodyColor = '#ffd166';
        this.accentColor = '#ffffff';
        this.tailColor = '#06d6a0';
        this.name = 'Cá Thần Tiên Cờ';
        break;

      case 'anglerfish': // Cá Đèn Biển Sâu
        this.radius = 38;
        this.baseSpeed = 1.8;
        this.maxSpeed = 3.0;
        this.fleeDist = 95;
        this.scoreValue = 200;
        this.growthValue = 220;
        this.bodyColor = '#240046';
        this.accentColor = '#00f5d4';
        this.tailColor = '#10002b';
        this.name = 'Cá Đèn Biển Sâu';
        break;

      case 'hammerhead': // Cá Mập Đầu Búa hung hãn
        this.radius = 52;
        this.baseSpeed = 2.3;
        this.maxSpeed = 3.8;
        this.fleeDist = 0;
        this.scoreValue = 380;
        this.growthValue = 420;
        this.bodyColor = '#495057';
        this.accentColor = '#ced4da';
        this.tailColor = '#343a40';
        this.name = 'Cá Mập Đầu Búa';
        break;

      case 'golden': // Cá Vàng May Mắn hiếm
        this.radius = 18;
        this.baseSpeed = 1.8;
        this.maxSpeed = 2.6;
        this.fleeDist = 80;
        this.scoreValue = 350;
        this.growthValue = 280;
        this.bodyColor = '#ffd166';
        this.accentColor = '#fff3b0';
        this.tailColor = '#ffb703';
        this.name = 'Cá Vàng May Mắn';
        break;

      default:
        this.radius = 16;
        this.baseSpeed = 1.2;
        this.maxSpeed = 1.8;
        this.fleeDist = 70;
        this.scoreValue = 30;
        this.growthValue = 30;
        this.bodyColor = '#2a9d8f';
        this.accentColor = '#e76f51';
        this.name = 'Cá Nhỏ';
    }

    this.speed = this.baseSpeed;
    this.facing = Math.random() > 0.5 ? 1 : -1;
    this.vx = (Math.random() * 2 - 1) * this.speed;
    this.vy = (Math.random() * 1.5 - 0.75) * this.speed;
  }

  // Cập nhật chỉ số người chơi theo từng cấp độ tiến hóa (Cực nhanh và linh hoạt)
  updatePlayerStats(level) {
    this.level = level;
    this.facing = 1;
    switch (level) {
      case 1:
        this.radius = 22;
        this.baseSpeed = 6.2;
        this.boostSpeed = 11.0;
        this.speciesName = 'Cá Hề Nhỏ';
        this.bodyColor = '#ff7b00';
        this.accentColor = '#ffffff';
        this.tailColor = '#ffaa00';
        break;

      case 2:
        this.radius = 32;
        this.baseSpeed = 6.8;
        this.boostSpeed = 12.0;
        this.speciesName = 'Cá Bác Sĩ Lam';
        this.bodyColor = '#0077b6';
        this.accentColor = '#ffbe0b';
        this.tailColor = '#00b4d8';
        break;

      case 3:
        this.radius = 48;
        this.baseSpeed = 7.5;
        this.boostSpeed = 13.5;
        this.speciesName = 'Cá Ngừ Hoàng Gia';
        this.bodyColor = '#2b2d42';
        this.accentColor = '#8d99ae';
        this.tailColor = '#d90429';
        break;

      case 4:
      default:
        this.radius = 72;
        this.baseSpeed = 8.4;
        this.boostSpeed = 15.0;
        this.speciesName = 'Bá Chủ Megalodon';
        this.bodyColor = '#1b263b';
        this.accentColor = '#e0e1dd';
        this.tailColor = '#0d1b2a';
        break;
    }
    this.speed = this.baseSpeed;
  }

  // Cập nhật vật lý và trạng thái
  update(bounds, player = null) {
    // 1. Logic riêng cho cá nóc (Pufferfish)
    if (this.type === 'pufferfish') {
      this.puffTimer--;
      if (this.puffTimer <= 0) {
        this.isPuffed = !this.isPuffed;
        this.puffTimer = this.isPuffed ? 180 : (240 + Math.random() * 200);
      }

      const targetScale = this.isPuffed ? 2.1 : 1.0;
      this.puffScale += (targetScale - this.puffScale) * 0.08;
    }

    // 2. Chuyển động và bơi
    this.x += this.vx;
    this.y += this.vy;

    // Góc quay thân mượt mà theo vận tốc
    if (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05) {
      this.targetAngle = Math.atan2(this.vy, this.vx);

      // Xử lý góc xoay vòng 360 độ mượt mà an toàn tuyệt đối
      let diff = Math.atan2(Math.sin(this.targetAngle - this.angle), Math.cos(this.targetAngle - this.angle));
      this.angle += diff * 0.12;
      this.angle = Math.atan2(Math.sin(this.angle), Math.cos(this.angle));

      // Hướng mặt chính (trái / phải)
      this.facing = Math.cos(this.angle) >= 0 ? 1 : -1;
    }

    // Tần số quẫy đuôi phụ thuộc tốc độ
    const curSpeed = Math.hypot(this.vx, this.vy);
    this.swimSpeed = 0.15 + (curSpeed / this.baseSpeed) * 0.18;
    this.swimPhase += this.swimSpeed;

    // Chuyển động há mồm mượt mà
    this.mouthOpen += (this.targetMouthOpen - this.mouthOpen) * 0.2;

    // 3. AI hành vi nếu là NPC
    if (!this.isPlayer) {
      this.updateNPC_AI(bounds, player);
    }
  }

  // Hành vi trí tuệ nhân tạo (NPC AI)
  updateNPC_AI(bounds, player) {
    this.aiWanderTimer--;

    // Khoảng cách tới người chơi
    let distToPlayer = 9999;
    let angleToPlayer = 0;
    if (player) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      distToPlayer = Math.hypot(dx, dy);
      angleToPlayer = Math.atan2(dy, dx);
    }

    const currentRadius = this.radius * (this.puffScale || 1);
    const playerRadius = player ? player.radius : 20;

    const fleeDistance = this.fleeDist || 80;

    // Nếu con mồi nhỏ hơn người chơi: Chỉ bỏ chạy nhẹ khi người chơi ĐẾN RẤT GẦN
    if (currentRadius < playerRadius) {
      if (distToPlayer < fleeDistance) {
        const fleeAngle = angleToPlayer + Math.PI;
        this.vx += Math.cos(fleeAngle) * 0.2;
        this.vy += Math.sin(fleeAngle) * 0.2;
      }
      this.targetMouthOpen = 0;
    }
    // Nếu là kẻ săn mồi lớn hơn: Rình rập và săn đuổi nếu người chơi vào tầm nguy hiểm
    else if (currentRadius > playerRadius * 1.15) {
      if (distToPlayer < 260) {
        this.vx += Math.cos(angleToPlayer) * 0.18;
        this.vy += Math.sin(angleToPlayer) * 0.18;

        if (distToPlayer < 110) {
          this.targetMouthOpen = 0.8;
        } else {
          this.targetMouthOpen = 0.1;
        }
      }
    } else {
      this.targetMouthOpen = 0;
    }

    // Đi tuần ngẫu nhiên (Wander)
    if (this.aiWanderTimer <= 0) {
      this.aiWanderTimer = 90 + Math.random() * 150;
      const randAngle = Math.random() * Math.PI * 2;
      const targetSpeed = this.baseSpeed * (0.8 + Math.random() * 0.4);
      this.vx = Math.cos(randAngle) * targetSpeed;
      this.vy = Math.sin(randAngle) * (targetSpeed * 0.5);
    }

    // Giới hạn tốc độ NPC
    const speed = Math.hypot(this.vx, this.vy);
    const maxSpd = this.maxSpeed;
    if (speed > maxSpd) {
      this.vx = (this.vx / speed) * maxSpd;
      this.vy = (this.vy / speed) * maxSpd;
    }

    // Đẩy nhẹ vào trong nếu chạm mép màn hình
    const margin = 50;
    if (this.x < -margin) this.x = bounds.width + margin;
    if (this.x > bounds.width + margin) this.x = -margin;
    if (this.y < 30) this.vy += 0.3;
    if (this.y > bounds.height - 30) this.vy -= 0.3;
  }

  // =================== VẼ CÁ VỚI HIỆU ỨNG THỰC THỂ ===================

  draw(ctx, isFrenzy = false, hasShield = false, hasMagnet = false) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Xoay theo góc di chuyển
    ctx.rotate(this.angle);

    // Lật cá nếu bơi sang trái để mắt và lưng luôn đúng hướng
    if (this.facing < 0) {
      ctx.scale(1, -1);
    }

    const rad = this.radius * (this.puffScale || 1);
    const tailWiggle = Math.sin(this.swimPhase) * (rad * 0.25);
    const finFlap = Math.sin(this.swimPhase * 1.5) * 0.3;

    // Hào quang Frenzy rực rỡ khi người chơi kích hoạt siêu cuồng nộ
    if (this.isPlayer && isFrenzy) {
      ctx.save();
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 25;
      ctx.strokeStyle = 'rgba(255, 209, 102, 0.8)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, rad * 1.5, rad * 1.1, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Khiên Bong Bóng thần kỳ (Shield)
    if (this.isPlayer && hasShield) {
      ctx.save();
      const shieldGrad = ctx.createRadialGradient(-rad * 0.3, -rad * 0.3, rad * 0.2, 0, 0, rad * 1.55);
      shieldGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      shieldGrad.addColorStop(0.6, 'rgba(0, 245, 212, 0.2)');
      shieldGrad.addColorStop(1, 'rgba(0, 180, 216, 0.65)');
      ctx.fillStyle = shieldGrad;
      ctx.strokeStyle = '#48cae4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, rad * 1.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Điểm phản quang lấp lánh trên bong bóng
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(-rad * 0.75, -rad * 0.75, rad * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Vòng từ tính Nam Châm (Magnet)
    if (this.isPlayer && hasMagnet) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 110, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(rad * 0.4, 0, rad * 1.8, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
      ctx.restore();
    }

    // Vẽ cá theo từng chủng loài
    if (this.type === 'pufferfish') {
      this.drawPufferfish(ctx, rad, tailWiggle);
    } else if (this.type === 'krill') {
      this.drawKrill(ctx, rad, tailWiggle);
    } else if (this.type === 'swordfish') {
      this.drawSwordfish(ctx, rad, tailWiggle, finFlap);
    } else if (this.type === 'shark' || (this.isPlayer && this.level === 4)) {
      this.drawShark(ctx, rad, tailWiggle, finFlap);
    } else if (this.type === 'jellyfish') {
      this.drawJellyfish(ctx, rad, tailWiggle);
    } else if (this.type === 'turtle') {
      this.drawTurtle(ctx, rad, tailWiggle, finFlap);
    } else if (this.type === 'anglerfish') {
      this.drawAnglerfish(ctx, rad, tailWiggle, finFlap);
    } else if (this.type === 'hammerhead') {
      this.drawHammerhead(ctx, rad, tailWiggle, finFlap);
    } else if (this.type === 'moorish') {
      this.drawMoorishIdol(ctx, rad, tailWiggle, finFlap);
    } else {
      this.drawStandardFish(ctx, rad, tailWiggle, finFlap);
    }

    ctx.restore();
  }

  // 1. Vẽ cá tiêu chuẩn (Cá Hề, Cá Neon, Cá Bác Sĩ, Cá Ngừ)
  drawStandardFish(ctx, r, tailWiggle, finFlap) {
    // VÂY ĐUÔI (Caudal Fin) - Dáng vây lượn sóng mềm mại
    ctx.save();
    const finGrad = ctx.createLinearGradient(-r * 0.8, 0, -r * 1.8, tailWiggle * 1.3);
    finGrad.addColorStop(0, this.bodyColor);
    finGrad.addColorStop(0.5, this.tailColor || this.accentColor);
    finGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = finGrad;

    ctx.beginPath();
    ctx.moveTo(-r * 0.8, 0);
    ctx.quadraticCurveTo(-r * 1.3, -r * 0.75 + tailWiggle, -r * 1.75, -r * 0.85 + tailWiggle * 1.3);
    ctx.quadraticCurveTo(-r * 1.35, tailWiggle * 0.8, -r * 1.75, r * 0.85 + tailWiggle * 1.3);
    ctx.quadraticCurveTo(-r * 1.3, r * 0.75 + tailWiggle, -r * 0.8, 0);
    ctx.closePath();
    ctx.fill();

    // Viền đen và tia vây đuôi
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();

    // VÂY LƯNG (Dorsal Fin)
    ctx.save();
    ctx.fillStyle = this.accentColor;
    ctx.beginPath();
    ctx.moveTo(-r * 0.45, -r * 0.55);
    ctx.quadraticCurveTo(-r * 0.1, -r * 1.15, r * 0.35, -r * 0.5);
    ctx.quadraticCurveTo(-r * 0.1, -r * 0.75, -r * 0.45, -r * 0.55);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // VÂY BỤNG (Ventral Fin)
    ctx.save();
    ctx.fillStyle = this.accentColor;
    ctx.beginPath();
    ctx.moveTo(-r * 0.35, r * 0.5);
    ctx.quadraticCurveTo(-r * 0.1, r * 0.95, r * 0.25, r * 0.45);
    ctx.quadraticCurveTo(-r * 0.1, r * 0.65, -r * 0.35, r * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // THÂN CÁ CHÍNH (Teardrop Torpedo Body có chiều sâu 3D)
    ctx.save();
    const bodyGrad = ctx.createRadialGradient(r * 0.2, -r * 0.25, r * 0.1, 0, 0, r * 1.25);
    bodyGrad.addColorStop(0, '#ffffff');
    bodyGrad.addColorStop(0.2, this.accentColor);
    bodyGrad.addColorStop(0.65, this.bodyColor);
    bodyGrad.addColorStop(1, this.tailColor || '#780000');
    ctx.fillStyle = bodyGrad;

    ctx.beginPath();
    // Đỉnh mõm & Miệng
    const mouthGap = this.mouthOpen * (r * 0.42);
    ctx.moveTo(r, -mouthGap);

    // Lưng trên
    ctx.bezierCurveTo(r * 0.6, -r * 0.75, -r * 0.4, -r * 0.8, -r, tailWiggle * 0.4);
    // Bụng dưới
    ctx.bezierCurveTo(-r * 0.4, r * 0.8, r * 0.6, r * 0.75, r, mouthGap);

    // Miệng há to khi săn mồi
    if (this.mouthOpen > 0.05) {
      // Vòm họng đen đỏ
      ctx.lineTo(r * 0.6, 0);
    }
    ctx.closePath();
    ctx.fill();

    // Chi tiết bên trong miệng khi há to
    if (this.mouthOpen > 0.08) {
      ctx.save();
      ctx.fillStyle = '#6a040f';
      ctx.beginPath();
      ctx.moveTo(r, -mouthGap);
      ctx.lineTo(r * 0.58, 0);
      ctx.lineTo(r, mouthGap);
      ctx.closePath();
      ctx.fill();

      // Chiếc lưỡi hồng hào bên trong
      ctx.fillStyle = '#ff758f';
      ctx.beginPath();
      ctx.arc(r * 0.75, mouthGap * 0.25, r * 0.12, 0, Math.PI * 2);
      ctx.fill();

      // Răng nhọn tí hon hoạt hình
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(r * 0.95, -mouthGap + 1);
      ctx.lineTo(r * 0.88, -mouthGap + r * 0.15);
      ctx.lineTo(r * 0.82, -mouthGap + 1);
      ctx.fill();
      ctx.restore();
    }

    // ĐỐM SÁNG PHẢN CHIẾU 3D TRÊN LƯNG CÁ (Dorsal Specular Ridge)
    const ridgeGrad = ctx.createLinearGradient(0, -r * 0.75, 0, -r * 0.15);
    ridgeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    ridgeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = ridgeGrad;
    ctx.beginPath();
    ctx.ellipse(r * 0.05, -r * 0.4, r * 0.6, r * 0.22, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // Viền nhẹ cho thân sắc nét
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // HOA VĂN THÂN: Sọc trắng cá hề hoặc đốm/sọc dạ quang
    if (this.type === 'clownfish' || (this.isPlayer && this.level === 1)) {
      this.drawClownfishStripes(ctx, r);
    } else if (this.type === 'neon') {
      this.drawNeonStripe(ctx, r);
    }
    ctx.restore();

    // VÂY BƠI NGỰC (Pectoral Fin - vẫy phập phồng nhịp nhàng)
    ctx.save();
    ctx.translate(r * 0.1, r * 0.12);
    ctx.rotate(finFlap);
    const pecGrad = ctx.createLinearGradient(0, 0, r * 0.35, r * 0.2);
    pecGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    pecGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
    pecGrad.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
    ctx.fillStyle = pecGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.38, r * 0.2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // MẮT CÁ LONG LANH CÓ HỒN (Expressive Eye)
    this.drawFishEye(ctx, r * 0.46, -r * 0.22, r * 0.25);
  }

  // 2. Vẽ Cá Nóc Gai (Pufferfish)
  drawPufferfish(ctx, r, tailWiggle) {
    const isPuffed = this.isPuffed || this.puffScale > 1.2;

    // Gai nhọn nhô ra khi phồng
    if (isPuffed) {
      ctx.save();
      const spikeCount = 14;
      const spikeLen = r * 0.35;
      ctx.fillStyle = '#ffbe0b';
      ctx.strokeStyle = '#d90429';
      ctx.lineWidth = 2;

      for (let i = 0; i < spikeCount; i++) {
        const ang = (i / spikeCount) * Math.PI * 2;
        const sx = Math.cos(ang) * (r * 0.9);
        const sy = Math.sin(ang) * (r * 0.9);
        const tipX = Math.cos(ang) * (r * 0.9 + spikeLen);
        const tipY = Math.sin(ang) * (r * 0.9 + spikeLen);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Đuôi nhỏ
    ctx.fillStyle = this.accentColor;
    ctx.beginPath();
    ctx.moveTo(-r * 0.7, 0);
    ctx.lineTo(-r * 1.2, -r * 0.4 + tailWiggle);
    ctx.lineTo(-r * 1.2, r * 0.4 + tailWiggle);
    ctx.closePath();
    ctx.fill();

    // Thân tròn ủng xị
    ctx.save();
    const grad = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
    grad.addColorStop(0, isPuffed ? '#ff5400' : '#ffe6a7');
    grad.addColorStop(0.7, isPuffed ? '#d90429' : '#bb9457');
    grad.addColorStop(1, '#6f1d1b');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Đốm chấm tròn trên lưng
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.arc(-r * 0.2, -r * 0.3, r * 0.12, 0, Math.PI * 2);
    ctx.arc(r * 0.1, -r * 0.4, r * 0.1, 0, Math.PI * 2);
    ctx.arc(-r * 0.1, r * 0.3, r * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Mắt cá nóc
    const eyeRadius = r * 0.2;
    this.drawFishEye(ctx, r * 0.4, -r * 0.25, eyeRadius);
  }

  // 3. Vẽ Cá Kiếm (Swordfish / Barracuda)
  drawSwordfish(ctx, r, tailWiggle, finFlap) {
    // Đuôi trăng khuyết cực sắc
    ctx.fillStyle = this.tailColor;
    ctx.beginPath();
    ctx.moveTo(-r * 1.1, 0);
    ctx.lineTo(-r * 1.8, -r * 0.9 + tailWiggle * 1.4);
    ctx.quadraticCurveTo(-r * 1.3, tailWiggle, -r * 1.8, r * 0.9 + tailWiggle * 1.4);
    ctx.closePath();
    ctx.fill();

    // Thân thon dài xé gió
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.moveTo(r * 1.2, 0); // Gốc kiếm
    ctx.quadraticCurveTo(0, -r * 0.45, -r * 1.1, tailWiggle * 0.3);
    ctx.quadraticCurveTo(0, r * 0.45, r * 1.2, 0);
    ctx.fill();

    // Bụng ánh bạc
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.moveTo(r * 1.1, 0);
    ctx.quadraticCurveTo(0, r * 0.45, -r * 1.1, tailWiggle * 0.3);
    ctx.quadraticCurveTo(0, r * 0.1, r * 1.1, 0);
    ctx.fill();

    // MŨI KIẾM NHỌN HOẮT (Bill/Sword)
    ctx.fillStyle = '#1d3557';
    ctx.beginPath();
    ctx.moveTo(r * 1.1, -r * 0.08);
    ctx.lineTo(r * 2.3, 0); // Mũi kiếm vươn dài ra trước
    ctx.lineTo(r * 1.1, r * 0.08);
    ctx.closePath();
    ctx.fill();

    // Vây lưng dài dựng đứng
    ctx.fillStyle = this.accentColor;
    ctx.beginPath();
    ctx.moveTo(-r * 0.2, -r * 0.4);
    ctx.lineTo(-r * 0.1, -r * 0.9);
    ctx.lineTo(r * 0.5, -r * 0.35);
    ctx.closePath();
    ctx.fill();

    this.drawFishEye(ctx, r * 0.7, -r * 0.15, r * 0.18);
  }

  // 4. Vẽ Sát Thủ Cá Mập / Megalodon
  drawShark(ctx, r, tailWiggle, finFlap) {
    // VÂY ĐUÔI CÁ MẬP LỚN
    ctx.fillStyle = this.tailColor || this.bodyColor;
    ctx.beginPath();
    ctx.moveTo(-r * 1.0, 0);
    ctx.lineTo(-r * 1.9, -r * 1.1 + tailWiggle * 1.2); // Thùy trên to dài
    ctx.quadraticCurveTo(-r * 1.3, tailWiggle, -r * 1.6, r * 0.7 + tailWiggle * 1.2); // Thùy dưới
    ctx.closePath();
    ctx.fill();

    // VÂY LƯNG TAM GIÁC NỔI TIẾNG (Iconic Dorsal Fin)
    ctx.beginPath();
    ctx.moveTo(r * 0.1, -r * 0.5);
    ctx.lineTo(-r * 0.2, -r * 1.25);
    ctx.quadraticCurveTo(-r * 0.1, -r * 0.7, -r * 0.4, -r * 0.45);
    ctx.closePath();
    ctx.fill();

    // THÂN CÁ MẬP KHỔNG LỒ
    ctx.save();
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    const mouthGap = this.mouthOpen * (r * 0.4);
    ctx.moveTo(r * 1.2, -mouthGap);
    ctx.bezierCurveTo(r * 0.7, -r * 0.65, -r * 0.3, -r * 0.6, -r * 1.0, tailWiggle * 0.3);
    ctx.bezierCurveTo(-r * 0.3, r * 0.6, r * 0.7, r * 0.65, r * 1.1, mouthGap);
    if (this.mouthOpen > 0.05) {
      ctx.lineTo(r * 0.7, 0);
    }
    ctx.closePath();
    ctx.fill();

    // BỤNG TRẮNG CẢNH BÁO (Countershading)
    ctx.fillStyle = '#e9ecef';
    ctx.beginPath();
    ctx.moveTo(r * 1.0, 0);
    ctx.bezierCurveTo(r * 0.5, r * 0.5, -r * 0.3, r * 0.45, -r * 0.9, tailWiggle * 0.3);
    ctx.bezierCurveTo(-r * 0.3, r * 0.15, r * 0.4, r * 0.1, r * 1.0, 0);
    ctx.fill();

    // HÀM RĂNG CÁ MẬP SẮC LẸM (Sharp Teeth)
    if (this.mouthOpen > 0.15) {
      ctx.fillStyle = '#ffffff';
      const teethCount = 6;
      for (let i = 0; i < teethCount; i++) {
        const tx = r * 0.75 + (i * r * 0.06);
        ctx.beginPath();
        ctx.moveTo(tx, -mouthGap * 0.8);
        ctx.lineTo(tx + r * 0.03, -mouthGap * 0.1);
        ctx.lineTo(tx + r * 0.06, -mouthGap * 0.8);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(tx, mouthGap * 0.8);
        ctx.lineTo(tx + r * 0.03, mouthGap * 0.1);
        ctx.lineTo(tx + r * 0.06, mouthGap * 0.8);
        ctx.fill();
      }
    }

    // MANG CÁ (3 vạch mang)
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2.5;
    for (let m = 0; m < 3; m++) {
      ctx.beginPath();
      ctx.arc(r * 0.2 - (m * r * 0.1), 0, r * 0.25, -Math.PI * 0.3, Math.PI * 0.3);
      ctx.stroke();
    }
    ctx.restore();

    // VÂY NGỰC SẮC NHỌN
    ctx.save();
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.moveTo(r * 0.3, r * 0.2);
    ctx.lineTo(0, r * 1.0);
    ctx.lineTo(r * 0.6, r * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // MẮT SÁT THỦ ĐEN SÂU THẲM
    this.drawFishEye(ctx, r * 0.75, -r * 0.25, r * 0.18, '#000000', '#ff0054');
  }

  // 5. Vẽ Tép / Tảo phát quang
  drawKrill(ctx, r, tailWiggle) {
    ctx.save();
    ctx.fillStyle = this.bodyColor;
    ctx.shadowColor = this.accentColor;
    ctx.shadowBlur = 10;

    // Râu tép
    ctx.strokeStyle = this.accentColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(r * 0.8, -r * 0.2);
    ctx.lineTo(r * 1.8, -r * 0.8);
    ctx.moveTo(r * 0.8, r * 0.2);
    ctx.lineTo(r * 1.8, r * 0.8);
    ctx.stroke();

    // Thân tép bán trong suốt
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mắt hạt tiêu
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(r * 0.5, -r * 0.15, r * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Vẽ các sọc trắng viền đen đặc trưng của cá hề
  drawClownfishStripes(ctx, r) {
    ctx.save();
    const stripeXs = [r * 0.2, -r * 0.25, -r * 0.7];
    const stripeWs = [r * 0.22, r * 0.24, r * 0.18];

    for (let i = 0; i < stripeXs.length; i++) {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.ellipse(stripeXs[i], 0, stripeWs[i] * 0.5, r * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  // Vẽ dải đèn dạ quang của cá Neon
  drawNeonStripe(ctx, r) {
    ctx.save();
    ctx.shadowColor = '#00f5d4';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#00f5d4';
    ctx.lineWidth = r * 0.25;
    ctx.beginPath();
    ctx.moveTo(r * 0.5, -r * 0.05);
    ctx.lineTo(-r * 0.7, -r * 0.05);
    ctx.stroke();
    ctx.restore();
  }

  // Vẽ mắt cá long lanh có đồng tử theo hướng nhìn phong cách hoạt hình sống động
  drawFishEye(ctx, x, y, radius, scleraColor = '#ffffff', pupilColor = '#0a0908') {
    ctx.save();
    // 1. Lòng trắng mắt với bóng cong 3D viền bóng bẩy
    const eyeGrad = ctx.createRadialGradient(x - radius * 0.25, y - radius * 0.25, radius * 0.1, x, y, radius);
    eyeGrad.addColorStop(0, '#ffffff');
    eyeGrad.addColorStop(0.8, '#edf2f4');
    eyeGrad.addColorStop(1, '#8d99ae');
    ctx.fillStyle = eyeGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1b263b';
    ctx.lineWidth = 1.3;
    ctx.stroke();

    // 2. Đồng tử & Vòng mống mắt (Iris) hướng theo mục tiêu
    const pupilDist = radius * 0.32;
    const px = x + pupilDist * Math.cos(this.lookAngle);
    const py = y + pupilDist * Math.sin(this.lookAngle);

    const isExcited = (this.mouthOpen > 0.1 || (this.isPlayer && (this.speed > 5 || this.isDashing)));
    const irisR = radius * (isExcited ? 0.72 : 0.62);

    const irisGrad = ctx.createRadialGradient(px, py, radius * 0.1, px, py, irisR);
    irisGrad.addColorStop(0, '#ffd166');
    irisGrad.addColorStop(0.45, '#e85d04');
    irisGrad.addColorStop(1, '#6a040f');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(px, py, irisR, 0, Math.PI * 2);
    ctx.fill();

    // 3. Con ngươi đen
    const pupilR = irisR * (isExcited ? 0.68 : 0.52);
    ctx.fillStyle = pupilColor;
    ctx.beginPath();
    ctx.arc(px, py, pupilR, 0, Math.PI * 2);
    ctx.fill();

    // 4. Điểm phản chiếu ánh sáng (Specular Highlights) tạo mắt ướt lấp lánh
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px - radius * 0.18, py - radius * 0.18, radius * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px + radius * 0.16, py + radius * 0.16, radius * 0.11, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 6. Vẽ Sứa Biển Phát Quang (Jellyfish)
  drawJellyfish(ctx, r, tailWiggle) {
    const pulse = 1 + Math.sin(this.swimPhase * 1.6) * 0.12;
    ctx.save();

    // Các xúc tu mềm mại đung đưa phía sau
    const tentacleCount = 5;
    ctx.strokeStyle = this.accentColor;
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    for (let t = 0; t < tentacleCount; t++) {
      const offsetY = (t - (tentacleCount - 1) / 2) * (r * 0.35);
      const wave = Math.sin(this.swimPhase + t * 0.8) * (r * 0.4);
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, offsetY);
      ctx.quadraticCurveTo(-r * 1.2, offsetY + wave, -r * 2.2, offsetY + wave * 1.4);
      ctx.stroke();
    }

    // Thân vòm nón sứa trong suốt phát sáng (Bell Dome)
    const bellGrad = ctx.createRadialGradient(r * 0.2, 0, r * 0.1, 0, 0, r * pulse);
    bellGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    bellGrad.addColorStop(0.5, 'rgba(247, 37, 133, 0.6)');
    bellGrad.addColorStop(1, 'rgba(76, 201, 240, 0.75)');
    ctx.fillStyle = bellGrad;
    ctx.shadowColor = '#4cc9f0';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(-r * 0.5, -r * 0.7 * pulse);
    ctx.quadraticCurveTo(r * 1.1 * pulse, -r * 0.7 * pulse, r * 1.1 * pulse, 0);
    ctx.quadraticCurveTo(r * 1.1 * pulse, r * 0.7 * pulse, -r * 0.5, r * 0.7 * pulse);
    ctx.quadraticCurveTo(-r * 0.2, 0, -r * 0.5, -r * 0.7 * pulse);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // 7. Vẽ Rùa Biển Cổ Đại (Sea Turtle)
  drawTurtle(ctx, r, tailWiggle, finFlap) {
    ctx.save();

    // 2 Chi sau (Rear Flippers)
    ctx.fillStyle = this.tailColor;
    ctx.beginPath();
    ctx.ellipse(-r * 0.8, -r * 0.5, r * 0.35, r * 0.18, -Math.PI / 4, 0, Math.PI * 2);
    ctx.ellipse(-r * 0.8, r * 0.5, r * 0.35, r * 0.18, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // 2 Bơi chèo trước (Front Flippers paddle)
    ctx.save();
    ctx.fillStyle = this.accentColor;
    ctx.translate(r * 0.2, -r * 0.6);
    ctx.rotate(-finFlap * 1.2 - 0.4);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.4, r * 0.2, r * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = this.accentColor;
    ctx.translate(r * 0.2, r * 0.6);
    ctx.rotate(finFlap * 1.2 + 0.4);
    ctx.beginPath();
    ctx.ellipse(0, r * 0.4, r * 0.2, r * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Mai rùa hình vòm đồi (Carapace Shell)
    const shellGrad = ctx.createRadialGradient(-r * 0.1, 0, r * 0.2, 0, 0, r);
    shellGrad.addColorStop(0, '#55a630');
    shellGrad.addColorStop(0.7, '#2b9348');
    shellGrad.addColorStop(1, '#004b23');
    ctx.fillStyle = shellGrad;

    ctx.beginPath();
    ctx.ellipse(0, 0, r * 0.9, r * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#002911';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Họa tiết mai rùa mai lục giác
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
    ctx.moveTo(-r * 0.4, 0); ctx.lineTo(-r * 0.8, 0);
    ctx.moveTo(r * 0.4, 0); ctx.lineTo(r * 0.8, 0);
    ctx.moveTo(0, -r * 0.4); ctx.lineTo(0, -r * 0.65);
    ctx.moveTo(0, r * 0.4); ctx.lineTo(0, r * 0.65);
    ctx.stroke();

    // Đầu rùa hiền hòa
    ctx.fillStyle = this.accentColor;
    ctx.beginPath();
    ctx.ellipse(r * 1.05, 0, r * 0.32, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.drawFishEye(ctx, r * 1.15, -r * 0.1, r * 0.12, '#ffffff', '#004b23');

    ctx.restore();
  }

  // 8. Vẽ Cá Thần Tiên Cờ Hoàng Gia (Moorish Idol)
  drawMoorishIdol(ctx, r, tailWiggle, finFlap) {
    ctx.save();

    // VÂY LƯNG DÂY CỜ SIÊU DÀI ĐUNG ĐƯA (Long Streamer Filament)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.9);
    const streamWave = Math.sin(this.swimPhase) * (r * 0.5);
    ctx.bezierCurveTo(-r * 0.8, -r * 1.8, -r * 1.6, -r * 1.6 + streamWave, -r * 2.8, -r * 1.2 + streamWave * 1.5);
    ctx.stroke();

    // Đuôi đen vây quạt
    ctx.fillStyle = '#10002b';
    ctx.beginPath();
    ctx.moveTo(-r * 0.8, 0);
    ctx.lineTo(-r * 1.4, -r * 0.6 + tailWiggle);
    ctx.lineTo(-r * 1.4, r * 0.6 + tailWiggle);
    ctx.closePath();
    ctx.fill();

    // Thân dẹt cao hình đĩa (Disc body)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r * 1.1, 0); // Mõm nhọn
    ctx.bezierCurveTo(r * 0.3, -r * 1.1, -r * 0.3, -r * 1.1, -r * 0.9, tailWiggle * 0.3);
    ctx.bezierCurveTo(-r * 0.3, r * 1.1, r * 0.3, r * 1.1, r * 1.1, 0);
    ctx.closePath();

    // Nền vàng rực
    ctx.fillStyle = '#ffd166';
    ctx.fill();
    ctx.clip();

    // Dải sọc đen & trắng đặc trưng tương phản
    ctx.fillStyle = '#10002b';
    ctx.fillRect(r * 0.15, -r * 1.2, r * 0.35, r * 2.4);
    ctx.fillRect(-r * 0.65, -r * 1.2, r * 0.35, r * 2.4);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-r * 0.2, -r * 1.2, r * 0.25, r * 2.4);
    ctx.restore();

    // Viền thân sắc nét
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Mắt
    this.drawFishEye(ctx, r * 0.5, -r * 0.2, r * 0.18, '#ffffff', '#000000');
    ctx.restore();
  }

  // 9. Vẽ Cá Đèn Biển Sâu (Anglerfish)
  drawAnglerfish(ctx, r, tailWiggle, finFlap) {
    ctx.save();

    // Cần câu phát sáng trên đầu (Lure / Esca)
    ctx.strokeStyle = '#ced4da';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(r * 0.2, -r * 0.7);
    ctx.quadraticCurveTo(r * 0.8, -r * 1.6, r * 1.3, -r * 1.1);
    ctx.stroke();

    // Bóng đèn dạ quang phát sáng rực rỡ
    const bulbPulse = 1 + Math.sin(this.swimPhase * 2) * 0.2;
    ctx.save();
    ctx.shadowColor = '#00f5d4';
    ctx.shadowBlur = 18;
    ctx.fillStyle = '#00f5d4';
    ctx.beginPath();
    ctx.arc(r * 1.3, -r * 1.1, r * 0.22 * bulbPulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(r * 1.3, -r * 1.1, r * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Đuôi quẫy
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.moveTo(-r * 0.8, 0);
    ctx.lineTo(-r * 1.5, -r * 0.6 + tailWiggle);
    ctx.lineTo(-r * 1.5, r * 0.6 + tailWiggle);
    ctx.closePath();
    ctx.fill();

    // Thân tròn màu tối bí hiểm đáy đại dương
    const bodyGrad = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
    bodyGrad.addColorStop(0, '#3c096c');
    bodyGrad.addColorStop(0.7, '#240046');
    bodyGrad.addColorStop(1, '#10002b');
    ctx.fillStyle = bodyGrad;

    ctx.beginPath();
    ctx.moveTo(r * 1.0, 0);
    ctx.bezierCurveTo(r * 0.4, -r * 0.85, -r * 0.4, -r * 0.85, -r * 0.9, tailWiggle * 0.3);
    ctx.bezierCurveTo(-r * 0.4, r * 0.95, r * 0.5, r * 0.95, r * 1.0, 0);
    ctx.closePath();
    ctx.fill();

    // Răng nanh sắc nhọn như kim
    ctx.fillStyle = '#ffffff';
    const teeth = 5;
    for (let i = 0; i < teeth; i++) {
      const tx = r * 0.6 + i * (r * 0.08);
      ctx.beginPath();
      ctx.moveTo(tx, r * 0.1);
      ctx.lineTo(tx + r * 0.03, -r * 0.3);
      ctx.lineTo(tx + r * 0.06, r * 0.1);
      ctx.fill();
    }

    // Mắt trắng đục rùng rợn
    this.drawFishEye(ctx, r * 0.45, -r * 0.35, r * 0.15, '#e0aaff', '#10002b');
    ctx.restore();
  }

  // 10. Vẽ Cá Mập Đầu Búa (Hammerhead Shark)
  drawHammerhead(ctx, r, tailWiggle, finFlap) {
    ctx.save();

    // Vây đuôi cá mập
    ctx.fillStyle = this.tailColor;
    ctx.beginPath();
    ctx.moveTo(-r * 0.9, 0);
    ctx.lineTo(-r * 1.8, -r * 1.0 + tailWiggle * 1.2);
    ctx.quadraticCurveTo(-r * 1.2, tailWiggle, -r * 1.5, r * 0.7 + tailWiggle * 1.2);
    ctx.closePath();
    ctx.fill();

    // Vây lưng cao vút
    ctx.beginPath();
    ctx.moveTo(r * 0.1, -r * 0.5);
    ctx.lineTo(-r * 0.2, -r * 1.25);
    ctx.quadraticCurveTo(-r * 0.1, -r * 0.7, -r * 0.4, -r * 0.45);
    ctx.closePath();
    ctx.fill();

    // Thân cá mập thuôn dài
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.moveTo(r * 0.9, 0);
    ctx.bezierCurveTo(r * 0.4, -r * 0.55, -r * 0.3, -r * 0.55, -r * 0.9, tailWiggle * 0.3);
    ctx.bezierCurveTo(-r * 0.3, r * 0.55, r * 0.4, r * 0.55, r * 0.9, 0);
    ctx.closePath();
    ctx.fill();

    // ĐẦU BÚA CHỮ T ĐỘC ĐÁO (Hammerhead Cephalofoil)
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.ellipse(r * 1.05, 0, r * 0.32, r * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2 Mắt nằm ở 2 đầu xa tít của chiếc búa
    this.drawFishEye(ctx, r * 1.05, -r * 0.8, r * 0.14, '#ffffff', '#000000');
    this.drawFishEye(ctx, r * 1.05, r * 0.8, r * 0.14, '#ffffff', '#000000');

    ctx.restore();
  }
}

/**
 * NÀNG TIÊN CÁ HUYỀN THOẠI (Legendary Mermaid)
 * Tạo hình công chúa tiên cá đại dương tuyệt mỹ phong cách Disney/Anime:
 * Gương mặt thanh tú, mắt biếc long lanh có hồn, mái tóc bồng bềnh 5 lớp gợn sóng,
 * Áo ngực vỏ sò ngọc trai, thân đuôi vảy cá óng ánh ngọc bích đổi màu tím hồng,
 * Vây đuôi lụa phát quang mềm mại và hào quang ngôi sao lấp lánh kỳ ảo!
 */
class Mermaid {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fromLeft = Math.random() > 0.5;
    this.x = this.fromLeft ? -160 : canvasWidth + 160;
    this.y = 80 + Math.random() * (canvasHeight * 0.45);
    this.speed = 2.6;
    this.vx = this.fromLeft ? this.speed : -this.speed;
    this.facing = this.fromLeft ? 1 : -1;
    this.swimPhase = 0;
    this.radius = 55;
    this.hasBlessed = false;
    this.isDone = false;
  }

  update(effects, player, sound) {
    this.swimPhase += 0.075;
    this.x += this.vx;
    this.y += Math.sin(this.swimPhase * 0.8) * 1.2;

    // Rải hào quang sao lấp lánh và bọt khí ngũ sắc sau lưng
    if (Math.random() < 0.65) {
      const col = ['#ffd166', '#00f5d4', '#f72585', '#b5179e', '#ffffff'][Math.floor(Math.random() * 5)];
      effects.spawnStarParticle(this.x - (this.facing * 45), this.y + (Math.random() * 20 - 10), col, 8 + Math.random() * 5);
    }
    if (Math.random() < 0.3) {
      effects.spawnBubble(this.x - (this.facing * 50), this.y + (Math.random() * 16 - 8), 3.5, 1.4);
    }

    // Tương tác ban phước lành khi người chơi bơi đến gần
    if (player && !this.hasBlessed) {
      const dist = Math.hypot(this.x - player.x, this.y - player.y);
      if (dist < 130) {
        this.hasBlessed = true;
        sound.playMermaidSong();
        effects.triggerScreenShake(10, 20);
        effects.spawnShockwave(this.x, this.y, 280, '#ffd166');
        effects.spawnShockwave(player.x, player.y, 320, '#00f5d4');
        effects.spawnFloatingText('👑 PHƯỚC LÀNH CÔNG CHÚA TIÊN CÁ! +1000 💖', player.x, player.y - 70, '#ffbe0b', 32);

        for (let i = 0; i < 40; i++) {
          const c = ['#ff0054', '#00f5d4', '#ffd166', '#ffffff', '#7209b7'][i % 5];
          effects.spawnStarParticle(player.x, player.y, c, 10);
        }
        return { blessed: true, score: 1000 };
      }
    }

    // Kiểm tra bơi khỏi màn hình
    if (this.fromLeft && this.x > this.canvasWidth + 200) this.isDone = true;
    if (!this.fromLeft && this.x < -200) this.isDone = true;

    return null;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.facing < 0) ctx.scale(-1, 1);

    const wave1 = Math.sin(this.swimPhase) * 14;
    const wave2 = Math.sin(this.swimPhase - 0.4) * 20;
    const finWave = Math.sin(this.swimPhase * 1.3) * 22;
    const armWave = Math.sin(this.swimPhase) * 0.45;
    const hairWave = Math.sin(this.swimPhase * 0.9) * 8;

    // Hào quang lấp lánh huyền ảo bao bọc nàng tiên cá
    ctx.save();
    const auraGrad = ctx.createRadialGradient(0, 0, 20, 0, 0, 95);
    auraGrad.addColorStop(0, 'rgba(255, 209, 102, 0.28)');
    auraGrad.addColorStop(0.5, 'rgba(0, 245, 212, 0.16)');
    auraGrad.addColorStop(0.8, 'rgba(247, 37, 133, 0.08)');
    auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 95, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 1. MÁI TÓC DÀI BỒNG BỀNH LỚP SAU (Background Hair Flow)
    ctx.save();
    for (let h = 0; h < 3; h++) {
      const hOffset = h * 7;
      const hWave = Math.sin(this.swimPhase + h * 0.6) * 10;
      const hairGrad = ctx.createLinearGradient(20, -15, -70, 0);
      hairGrad.addColorStop(0, '#ff9e00');
      hairGrad.addColorStop(0.4, '#e85d04');
      hairGrad.addColorStop(0.8, '#d00000');
      hairGrad.addColorStop(1, '#9d0208');
      ctx.fillStyle = hairGrad;

      ctx.beginPath();
      ctx.moveTo(30, -18);
      ctx.quadraticCurveTo(0, -32 - hOffset, -40, -22 + hWave - hOffset);
      ctx.quadraticCurveTo(-70, -15 + hWave, -85 - hOffset, -5 + hWave * 1.2);
      ctx.quadraticCurveTo(-60, 5 + hWave, -35, -5);
      ctx.quadraticCurveTo(5, -8, 25, -6);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // 2. VÂY ĐUÔI CÁ TIÊN LỤA PHÁT QUANG (Gossamer Butterfly Caudal Fin)
    ctx.save();
    const flukeX = -65;
    const flukeY = wave2 * 0.7;

    // Vạt vây đuôi trên
    const topFinGrad = ctx.createLinearGradient(flukeX, flukeY, flukeX - 70, flukeY - 45);
    topFinGrad.addColorStop(0, '#00f5d4');
    topFinGrad.addColorStop(0.4, '#06d6a0');
    topFinGrad.addColorStop(0.7, '#7209b7');
    topFinGrad.addColorStop(1, '#f72585');
    ctx.fillStyle = topFinGrad;
    ctx.beginPath();
    ctx.moveTo(flukeX, flukeY);
    ctx.quadraticCurveTo(flukeX - 35, flukeY - 35 + finWave * 0.6, flukeX - 75, flukeY - 48 + finWave);
    ctx.quadraticCurveTo(flukeX - 55, flukeY - 15, flukeX - 60, flukeY + 5);
    ctx.quadraticCurveTo(flukeX - 30, flukeY - 5, flukeX, flukeY);
    ctx.closePath();
    ctx.fill();

    // Vạt vây đuôi dưới
    const botFinGrad = ctx.createLinearGradient(flukeX, flukeY, flukeX - 70, flukeY + 45);
    botFinGrad.addColorStop(0, '#00f5d4');
    botFinGrad.addColorStop(0.4, '#3a0ca3');
    botFinGrad.addColorStop(0.8, '#f72585');
    botFinGrad.addColorStop(1, '#ff0054');
    ctx.fillStyle = botFinGrad;
    ctx.beginPath();
    ctx.moveTo(flukeX, flukeY);
    ctx.quadraticCurveTo(flukeX - 30, flukeY + 5, flukeX - 60, flukeY + 5);
    ctx.quadraticCurveTo(flukeX - 55, flukeY + 25, flukeX - 72, flukeY + 45 - finWave);
    ctx.quadraticCurveTo(flukeX - 35, flukeY + 30 - finWave * 0.6, flukeX, flukeY);
    ctx.closePath();
    ctx.fill();

    // Viền sáng ánh ngọc tia lụa trên vây đuôi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 1.6;
    for (let r = 0; r < 5; r++) {
      ctx.beginPath();
      ctx.moveTo(flukeX, flukeY);
      ctx.quadraticCurveTo(flukeX - 30, flukeY - 20 + r * 10, flukeX - 65, flukeY - 40 + r * 20);
      ctx.stroke();
    }
    ctx.restore();

    // 3. THÂN ĐUÔI VẢY CÁ NGỌC BÍCH (Iridescent Scaled Tail Body)
    ctx.save();
    const tailGrad = ctx.createLinearGradient(10, 0, -65, wave2 * 0.7);
    tailGrad.addColorStop(0, '#00f5d4');
    tailGrad.addColorStop(0.3, '#06d6a0');
    tailGrad.addColorStop(0.65, '#3a0ca3');
    tailGrad.addColorStop(0.85, '#7209b7');
    tailGrad.addColorStop(1, '#f72585');
    ctx.fillStyle = tailGrad;

    ctx.beginPath();
    ctx.moveTo(8, -11);
    ctx.quadraticCurveTo(-15, -14 + wave1 * 0.4, -40, -8 + wave2 * 0.5);
    ctx.quadraticCurveTo(-52, wave2 * 0.65 - 5, flukeX, flukeY - 4);
    ctx.lineTo(flukeX, flukeY + 4);
    ctx.quadraticCurveTo(-52, wave2 * 0.65 + 5, -40, 8 + wave2 * 0.5);
    ctx.quadraticCurveTo(-15, 14 + wave1 * 0.4, 8, 11);
    ctx.closePath();
    ctx.fill();

    // Lớp vảy cá ngọc bích óng ánh
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.4;
    for (let row = -50; row < 5; row += 10) {
      const rowProgress = (row + 50) / 55;
      const currentWave = wave1 * (1 - rowProgress) + wave2 * rowProgress;
      const scaleY = (row / -65) * (flukeY - 0);
      for (let s = -6; s <= 6; s += 5) {
        ctx.beginPath();
        ctx.arc(row, scaleY + s * 0.8, 3.8, 0, Math.PI);
        ctx.stroke();
      }
    }

    // Vây lụa bên hông hông (Ventral Silk Fin)
    ctx.fillStyle = 'rgba(0, 245, 212, 0.65)';
    ctx.beginPath();
    ctx.moveTo(4, 8);
    ctx.quadraticCurveTo(-10, 22 + wave1 * 0.5, -22, 16 + wave1 * 0.3);
    ctx.quadraticCurveTo(-8, 12, 4, 8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. THÂN TRÊN & LÀN DA TRẮNG HỒNG (Slender Torso)
    ctx.save();
    const skinGrad = ctx.createLinearGradient(8, -12, 35, 12);
    skinGrad.addColorStop(0, '#fff0eb');
    skinGrad.addColorStop(0.5, '#fde2e4');
    skinGrad.addColorStop(1, '#ffccd5');
    ctx.fillStyle = skinGrad;

    ctx.beginPath();
    ctx.moveTo(8, -11);
    ctx.quadraticCurveTo(18, -11, 28, -8);
    ctx.quadraticCurveTo(36, -5, 38, 0);
    ctx.quadraticCurveTo(36, 6, 28, 8);
    ctx.quadraticCurveTo(18, 11, 8, 11);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ÁO NGỰC VỎ SÒ TÍM NGỌC LẤP LÁNH (Shell Bra)
    ctx.save();
    const shellGrad = ctx.createLinearGradient(20, -8, 28, 8);
    shellGrad.addColorStop(0, '#c77dff');
    shellGrad.addColorStop(0.5, '#9d4edd');
    shellGrad.addColorStop(1, '#7b2cbf');
    ctx.fillStyle = shellGrad;
    ctx.strokeStyle = '#5a189a';
    ctx.lineWidth = 1.2;

    // Vỏ sò trái & phải
    [-4.5, 4.5].forEach((offsetY) => {
      ctx.beginPath();
      ctx.ellipse(25, offsetY, 5.5, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Khía vỏ sò
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1;
      for (let k = -2; k <= 2; k++) {
        ctx.beginPath();
        ctx.moveTo(22, offsetY);
        ctx.lineTo(28, offsetY + k * 1.6);
        ctx.stroke();
      }
    });

    // Viên ngọc trai sáng bóng ở giữa ngực
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#00f5d4';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(25, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. CÁNH TAY BƠI UỐN LƯỢN KIỀU DIỄM (Graceful Arms)
    ctx.save();
    ctx.fillStyle = '#fde2e4';
    ctx.strokeStyle = '#ffb3c1';
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';

    // Cánh tay trước bơi lướt
    ctx.beginPath();
    ctx.moveTo(26, -3);
    ctx.quadraticCurveTo(38, -10 + armWave * 10, 52, -4 + armWave * 6);
    ctx.stroke();

    // Bàn tay thanh tú
    ctx.fillStyle = '#fde2e4';
    ctx.beginPath();
    ctx.ellipse(53, -4 + armWave * 6, 3, 2, armWave, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6. GƯƠNG MẶT CÔNG CHÚA ANIME/DISNEY TUYỆT ĐẸP (Adorable Anime/Disney Face)
    ctx.save();
    ctx.fillStyle = '#fff0eb';
    ctx.beginPath();
    ctx.moveTo(30, -14);
    ctx.quadraticCurveTo(44, -14, 46, -3);
    ctx.quadraticCurveTo(46, 7, 38, 9);
    ctx.quadraticCurveTo(30, 9, 30, -5);
    ctx.closePath();
    ctx.fill();

    // Đôi má ửng hồng e thẹn (Rosy Blush)
    ctx.fillStyle = 'rgba(255, 117, 143, 0.42)';
    ctx.beginPath();
    ctx.ellipse(42, 2, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // ĐÔI MẮT BIẾC LONG LANH CÓ HỒN (Expressive Disney Anime Eyes)
    const eyeX = 42;
    const eyeY = -4;

    // Lòng trắng
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(eyeX, eyeY, 4.5, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Tròng mắt xanh ngọc bích đa tầng (Sapphire & Cyan Iris)
    const irisGrad = ctx.createRadialGradient(eyeX + 0.5, eyeY, 0.5, eyeX, eyeY, 3.2);
    irisGrad.addColorStop(0, '#00b4d8');
    irisGrad.addColorStop(0.5, '#0077b6');
    irisGrad.addColorStop(1, '#03045e');
    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.arc(eyeX + 0.8, eyeY, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Con ngươi đen láy
    ctx.fillStyle = '#0a0908';
    ctx.beginPath();
    ctx.arc(eyeX + 0.9, eyeY, 1.6, 0, Math.PI * 2);
    ctx.fill();

    // Đốm sáng phản chiếu to nhỏ (Sparkling Specular Glints)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(eyeX + 1.6, eyeY - 1.2, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(eyeX + 0.2, eyeY + 1.2, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Hàng lông mi cong vút kiêu kỳ
    ctx.strokeStyle = '#2b2b2b';
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(eyeX - 4.2, eyeY - 2.8);
    ctx.quadraticCurveTo(eyeX, eyeY - 4.5, eyeX + 4.8, eyeY - 3.2);
    ctx.stroke();

    // Lông mày mềm mại
    ctx.strokeStyle = '#b03a2e';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(eyeX - 3.5, eyeY - 6.5);
    ctx.quadraticCurveTo(eyeX, eyeY - 8.2, eyeX + 4.2, eyeY - 6.5);
    ctx.stroke();

    // Nụ cười chúm chím ngọt ngào
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(43, 4.5, 2.8, 0.1 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
    ctx.restore();

    // 7. MÁI TÓC BỒNG BỀNH LỚP TRÊN & HOA SAO BIỂN CÀI TÓC (Lush Fore Hair)
    ctx.save();
    for (let f = 0; f < 2; f++) {
      const fWave = Math.sin(this.swimPhase + f * 0.8) * 8;
      const foreHairGrad = ctx.createLinearGradient(35, -20, -50, 0);
      foreHairGrad.addColorStop(0, '#ffd166');
      foreHairGrad.addColorStop(0.3, '#ff9e00');
      foreHairGrad.addColorStop(0.7, '#e85d04');
      foreHairGrad.addColorStop(1, '#9d0208');
      ctx.fillStyle = foreHairGrad;

      ctx.beginPath();
      ctx.moveTo(35, -16);
      ctx.quadraticCurveTo(15, -26, -15, -20 + fWave);
      ctx.quadraticCurveTo(-45, -16 + fWave, -65, -6 + fWave);
      ctx.quadraticCurveTo(-35, -2, -5, -8);
      ctx.quadraticCurveTo(15, -10, 32, -6);
      ctx.closePath();
      ctx.fill();
    }

    // Hoa Sao Biển đỏ hồng cài tóc đính kim cương
    const starX = 33;
    const starY = -18;
    ctx.fillStyle = '#ff0054';
    ctx.shadowColor = '#ff0054';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    for (let s = 0; s < 5; s++) {
      const a = (s * Math.PI * 2) / 5 - Math.PI / 2;
      const x1 = starX + Math.cos(a) * 6;
      const y1 = starY + Math.sin(a) * 6;
      const a2 = a + Math.PI / 5;
      const x2 = starX + Math.cos(a2) * 2.8;
      const y2 = starY + Math.sin(a2) * 2.8;
      if (s === 0) ctx.moveTo(x1, y1);
      else ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    ctx.fill();

    // Nhụy ngọc trai vàng lấp lánh
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(starX, starY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }
}

