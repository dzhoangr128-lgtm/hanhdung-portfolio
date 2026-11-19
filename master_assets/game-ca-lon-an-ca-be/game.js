/**
 * OCEAN FRENZY - CORE GAME ENGINE
 * Quản lý vòng lặp chính, vật lý va chạm, hệ thống tiến hóa, Combo Frenzy,
 * Trí tuệ bầy đàn, Giao diện HUD và Âm thanh.
 */

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // Khởi tạo kích thước canvas
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Các hệ thống phụ trợ
    this.effects = new EffectManager(this.canvas);
    this.sound = window.soundEngine;

    // Trạng thái người chơi
    this.player = null;
    this.level = 1;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('ocean_frenzy_high_score') || '0', 10);
    this.fishEaten = 0;
    this.growthXP = 0;
    this.growthRequired = [0, 160, 480, 1100, 99999]; // XP cần để lên cấp 1, 2, 3, 4

    // Thể lực bơi nhanh (Stamina)
    this.stamina = 100;
    this.maxStamina = 100;
    this.isDashing = false;

    // Hệ thống Combo & Frenzy
    this.combo = 0;
    this.maxCombo = 1;
    this.comboTimer = 0;
    this.comboDuration = 180; // 3 giây (60fps)
    this.isFrenzy = false;
    this.frenzyTimer = 0;
    this.frenzyDuration = 480; // 8 giây

    // Mảng danh sách cá NPC trong biển
    this.fishes = [];
    this.maxFishes = 40;
    this.spawnTimer = 0;

    // Hệ thống Vật phẩm bổ trợ (Powerups: Khiên, Nam châm, Tốc độ, Ngọc bội)
    this.powerups = [];
    this.powerupSpawnTimer = 0;
    this.hasShield = false;
    this.hasMagnet = false;
    this.magnetTimer = 0;
    this.hasSpeed = false;
    this.speedTimer = 0;

    // Nàng Tiên Cá (Mermaid Event)
    this.mermaid = null;
    this.mermaidTimer = 350; // Xuất hiện lần đầu sau ~6 giây

    // Sinh cá bơi lội ngay trên nền menu Start
    this.populateInitialFishes();

    // Điều khiển chuột & phím
    this.mouse = { x: this.canvas.width / 2, y: this.canvas.height / 2, isDown: false };
    this.keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, w: false, s: false, a: false, d: false, Space: false };
    this.inputMode = 'mouse'; // 'mouse' hoặc 'keyboard'

    // Trạng thái trò chơi: 'start', 'playing', 'paused', 'gameover'
    this.state = 'start';

    // UI Elements
    this.bindUI();
    this.initControls();

    // Hoạt họa cá trên menu
    this.initPreviewStage();

    // Khởi động vòng lặp render
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.effects) {
      this.effects.resize();
    }
  }

  // =================== GẮN SỰ KIỆN GIAO DIỆN ===================

  bindUI() {
    this.startScreen = document.getElementById('startScreen');
    this.pauseScreen = document.getElementById('pauseScreen');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.hud = document.getElementById('hud');

    // Nút Bắt đầu & Chơi lại
    document.getElementById('btnStartGame').addEventListener('click', () => this.startGame());
    document.getElementById('btnPlayAgain').addEventListener('click', () => this.startGame());
    document.getElementById('btnResume').addEventListener('click', () => this.togglePause());
    document.getElementById('btnRestartFromPause').addEventListener('click', () => {
      this.togglePause();
      this.startGame();
    });

    // Nút Âm thanh & Âm nhạc
    const btnSound = document.getElementById('btnSound');
    btnSound.addEventListener('click', () => {
      const active = this.sound.toggleSound();
      btnSound.textContent = active ? '🔊' : '🔇';
    });

    const btnMusic = document.getElementById('btnMusic');
    btnMusic.addEventListener('click', () => {
      const active = this.sound.toggleMusic();
      btnMusic.textContent = active ? '🎵' : '🎼';
    });

    // Nút Tạm dừng
    document.getElementById('btnPause').addEventListener('click', () => this.togglePause());

    // Cập nhật kỷ lục ban đầu
    document.getElementById('highScoreSmall').textContent = this.highScore.toLocaleString();
  }

  initControls() {
    // Di chuột
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.inputMode = 'mouse';
    });

    // Nhấp chuột để Dash
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0 && this.state === 'playing') {
        this.mouse.isDown = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
    });

    // Điều khiển bàn phím (WASD / Phím mũi tên / Space)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        if (this.state === 'playing' || this.state === 'paused') {
          this.togglePause();
        }
        return;
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        this.inputMode = 'keyboard';
      }

      if (e.key === ' ') {
        this.keys.Space = true;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.keys.ArrowUp = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.ArrowDown = true;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.ArrowLeft = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.ArrowRight = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === ' ') this.keys.Space = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.keys.ArrowUp = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.keys.ArrowDown = false;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.keys.ArrowLeft = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.keys.ArrowRight = false;
    });

    // Hỗ trợ cảm ứng trên điện thoại / máy tính bảng
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.isDown = true;
        this.inputMode = 'mouse';
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.isDown = false;
    });
  }

  // =================== KHỞI ĐỘNG TRÒ CHƠI ===================

  startGame() {
    this.sound.ensureContext();
    this.sound.startMusic();

    // Reset chỉ số
    this.level = 1;
    this.score = 0;
    this.fishEaten = 0;
    this.growthXP = 0;
    this.combo = 0;
    this.maxCombo = 1;
    this.comboTimer = 0;
    this.isFrenzy = false;
    this.frenzyTimer = 0;
    this.stamina = 100;

    // Reset các bùa bổ trợ & Nàng Tiên Cá
    this.powerups = [];
    this.powerupSpawnTimer = 0;
    this.hasShield = false;
    this.hasMagnet = false;
    this.magnetTimer = 0;
    this.hasSpeed = false;
    this.speedTimer = 0;
    this.mermaid = null;
    this.mermaidTimer = 350;

    // Tạo cá người chơi ở giữa màn hình
    this.player = new Fish(this.canvas.width / 2, this.canvas.height / 2, 'clownfish', true, 1);

    // Dọn sạch danh sách cá và sinh cá ban đầu
    this.fishes = [];
    this.populateInitialFishes();

    // Chuyển màn hình
    this.startScreen.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
    this.pauseScreen.classList.add('hidden');
    this.hud.classList.remove('hidden');

    this.state = 'playing';
    this.updateHUD();
    this.drawAvatarBadge();

    // Sóng xung kích chào sân
    this.effects.spawnShockwave(this.player.x, this.player.y, 160, '#00f5d4');
    this.sound.playLevelUp();
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      this.pauseScreen.classList.remove('hidden');
    } else if (this.state === 'paused') {
      this.state = 'playing';
      this.pauseScreen.classList.add('hidden');
    }
  }

  // =================== SINH CÁ THẾ GIỚI TỰ NHIÊN ===================

  populateInitialFishes() {
    // Sinh số lượng cá đa dạng phân bổ khắp đại dương
    for (let i = 0; i < 24; i++) {
      this.spawnRandomFish(true);
    }
  }

  spawnRandomFish(initial = false) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Vị trí sinh: Nếu initial thì rải đều, nếu trong lúc chơi thì sinh ngoài mép màn hình
    let x, y;
    if (initial) {
      x = Math.random() * w;
      y = 40 + Math.random() * (h - 80);
      // Tránh sinh đè lên người chơi
      if (this.player && Math.hypot(x - this.player.x, y - this.player.y) < 150) {
        x += 250;
      }
    } else {
      const fromLeft = Math.random() > 0.5;
      x = fromLeft ? -60 : w + 60;
      y = 40 + Math.random() * (h - 80);
    }

    // Tỉ lệ sinh loại cá đa dạng, cân bằng theo từng cấp độ
    let type = 'krill';
    const rand = Math.random();

    if (this.level === 1) {
      if (rand < 0.28) type = 'krill';
      else if (rand < 0.52) type = 'neon';
      else if (rand < 0.72) type = 'jellyfish';
      else if (rand < 0.88) type = 'clownfish';
      else if (rand < 0.95) type = 'pufferfish';
      else type = 'golden';
    } else if (this.level === 2) {
      if (rand < 0.15) type = 'krill';
      else if (rand < 0.35) type = 'neon';
      else if (rand < 0.52) type = 'jellyfish';
      else if (rand < 0.70) type = 'clownfish';
      else if (rand < 0.84) type = 'moorish';
      else if (rand < 0.92) type = 'pufferfish';
      else if (rand < 0.96) type = 'turtle';
      else type = 'golden';
    } else if (this.level === 3) {
      if (rand < 0.10) type = 'neon';
      else if (rand < 0.22) type = 'jellyfish';
      else if (rand < 0.38) type = 'clownfish';
      else if (rand < 0.55) type = 'moorish';
      else if (rand < 0.68) type = 'turtle';
      else if (rand < 0.80) type = 'anglerfish';
      else if (rand < 0.90) type = 'swordfish';
      else if (rand < 0.96) type = 'hammerhead';
      else type = 'golden';
    } else { // Level 4 (Bá chủ)
      if (rand < 0.10) type = 'jellyfish';
      else if (rand < 0.22) type = 'clownfish';
      else if (rand < 0.38) type = 'moorish';
      else if (rand < 0.52) type = 'turtle';
      else if (rand < 0.68) type = 'anglerfish';
      else if (rand < 0.80) type = 'swordfish';
      else if (rand < 0.90) type = 'hammerhead';
      else if (rand < 0.96) type = 'shark';
      else type = 'golden';
    }

    const fish = new Fish(x, y, type, false);

    // Định hướng bơi ban đầu về phía trong màn hình
    if (x < 0) {
      fish.vx = Math.abs(fish.vx);
    } else if (x > w) {
      fish.vx = -Math.abs(fish.vx);
    }

    this.fishes.push(fish);
  }

  // =================== VÒNG LẶP CHÍNH (UPDATE & RENDER) ===================

  loop(currentTime) {
    requestAnimationFrame((t) => this.loop(t));

    try {
      if (this.state === 'playing') {
        this.update();
      } else if (this.state === 'start') {
        this.effects.update();
        for (const f of this.fishes) {
          f.update({ width: this.canvas.width, height: this.canvas.height }, null);
        }
        if (this.mermaid) {
          this.mermaid.update(this.effects, null, this.sound);
          if (this.mermaid.isDone) this.mermaid = null;
        }
      }

      this.render();
    } catch (err) {
      console.error('Lỗi trong vòng lặp game:', err);
    }
  }

  update() {
    this.effects.update();

    // 1. Cập nhật thời gian bùa & Tăng tốc (Dash / Siêu tốc)
    if (this.speedTimer > 0) {
      this.speedTimer--;
      if (this.speedTimer <= 0) this.hasSpeed = false;
    }
    if (this.magnetTimer > 0) {
      this.magnetTimer--;
      if (this.magnetTimer <= 0) this.hasMagnet = false;
    }

    const wantsDash = this.mouse.isDown || this.keys.Space || this.hasSpeed;
    if (wantsDash && (this.stamina > 3 || this.hasSpeed)) {
      this.isDashing = true;
      if (!this.hasSpeed) {
        this.stamina = Math.max(0, this.stamina - 0.7);
      }
      this.effects.spawnDashWake(this.player.x, this.player.y, this.player.radius, this.player.angle);

      // Âm thanh lướt mỗi 12 frames
      if (Math.floor(this.effects.time) % 12 === 0) {
        this.sound.playDash();
      }
    } else {
      this.isDashing = false;
      this.stamina = Math.min(this.maxStamina, this.stamina + 0.75);
    }

    // 2. Điều khiển Người chơi (Mouse & Keyboard)
    this.updatePlayerMovement();

    // 3. Hệ thống Combo & Frenzy đếm lùi
    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        document.getElementById('comboContainer').classList.add('hidden');
      }
    }

    if (this.isFrenzy) {
      this.frenzyTimer--;
      if (this.frenzyTimer <= 0) {
        this.isFrenzy = false;
        this.sound.setFrenzy(false);
        document.getElementById('frenzyBanner').classList.add('hidden');
      }
    }

    // 4. Cập nhật cá người chơi
    this.player.update({ width: this.canvas.width, height: this.canvas.height });

    // Giữ người chơi trong giới hạn màn hình
    const pr = this.player.radius;
    this.player.x = Math.max(pr, Math.min(this.canvas.width - pr, this.player.x));
    this.player.y = Math.max(pr, Math.min(this.canvas.height - pr, this.player.y));

    // 5. Cập nhật các cá NPC & Kiểm tra va chạm
    let hasBigBossNearby = false;

    // Tọa độ miệng của người chơi (vị trí săn mồi thực tế)
    const mouthX = this.player.x + Math.cos(this.player.angle) * (this.player.radius * 0.95);
    const mouthY = this.player.y + Math.sin(this.player.angle) * (this.player.radius * 0.95);

    for (let i = this.fishes.length - 1; i >= 0; i--) {
      const fish = this.fishes[i];
      fish.update({ width: this.canvas.width, height: this.canvas.height }, this.player);

      const effectiveRadius = fish.radius * (fish.puffScale || 1);
      const distToPlayer = Math.hypot(fish.x - this.player.x, fish.y - this.player.y);
      const distMouthToFish = Math.hypot(mouthX - fish.x, mouthY - fish.y);

      // Cảnh báo quái vật khổng lồ
      if (fish.radius > this.player.radius * 1.25 && distToPlayer < 450) {
        hasBigBossNearby = true;
      }

      // LỰC HÚT TỰ NHIÊN: Khi bơi sát con mồi nhỏ hơn, miệng cá tự hút nhẹ mồi vào
      if (effectiveRadius <= this.player.radius && distToPlayer < 100) {
        const suckDx = mouthX - fish.x;
        const suckDy = mouthY - fish.y;
        const suckDist = Math.hypot(suckDx, suckDy);
        if (suckDist > 5) {
          fish.vx += (suckDx / suckDist) * 1.1;
          fish.vy += (suckDy / suckDist) * 1.1;
        }
      }

      // PHẠM VI ĐỚP MỒI HÀO PHÓNG: Miệng chạm mồi hoặc thân cá chạm mồi
      const canEatReach = distMouthToFish < (effectiveRadius + this.player.radius * 0.75) ||
                          distToPlayer < (this.player.radius + effectiveRadius * 0.95);

      if (canEatReach) {
        // TRƯỜNG HỢP 1: Chạm cá nóc đang phồng gai
        if (fish.type === 'pufferfish' && (fish.isPuffed || fish.puffScale > 1.3) && !this.isFrenzy) {
          if (this.hasShield) {
            this.hasShield = false;
            this.sound.playShieldBreak();
            this.effects.triggerScreenShake(8, 14);
            this.effects.spawnShockwave(this.player.x, this.player.y, 180, '#00f5d4');
            this.effects.spawnFloatingText('🛡️ KHIÊN ĐÃ CHỐNG GAI!', this.player.x, this.player.y - 35, '#00f5d4', 24);
            const bounce = Math.atan2(this.player.y - fish.y, this.player.x - fish.x);
            this.player.vx = Math.cos(bounce) * 8;
            this.player.vy = Math.sin(bounce) * 8;
            continue;
          }
          this.handlePufferSting(fish);
          continue;
        }

        // TRƯỜNG HỢP 2: Người chơi to hơn HOẶC đang trong trạng thái Cuồng Nộ Frenzy -> ĐỚP MỒI!
        if (this.player.radius >= effectiveRadius || this.isFrenzy) {
          this.eatFish(fish, i);
          continue;
        }
      }

      // TRƯỜNG HỢP 3: Cá lớn hơn nuốt chửng người chơi -> Chỉ khi MIỆNG của kẻ săn mồi tiến sát bạn
      if (effectiveRadius > this.player.radius * 1.15 && !this.isFrenzy) {
        const predatorMouthX = fish.x + Math.cos(fish.angle) * (effectiveRadius * 0.85);
        const predatorMouthY = fish.y + Math.sin(fish.angle) * (effectiveRadius * 0.85);
        const distPredatorMouth = Math.hypot(predatorMouthX - this.player.x, predatorMouthY - this.player.y);

        if (distPredatorMouth < (this.player.radius * 0.75 + effectiveRadius * 0.6) || distToPlayer < (this.player.radius + effectiveRadius) * 0.65) {
          if (this.hasShield) {
            this.hasShield = false;
            this.sound.playShieldBreak();
            this.effects.triggerScreenShake(14, 22);
            this.effects.spawnShockwave(this.player.x, this.player.y, 220, '#00f5d4');
            this.effects.spawnFloatingText('🛡️ KHIÊN ĐÃ CỨU MẠNG!', this.player.x, this.player.y - 45, '#00f5d4', 26);
            const awayAngle = Math.atan2(fish.y - this.player.y, fish.x - this.player.x);
            fish.vx = Math.cos(awayAngle) * 9;
            fish.vy = Math.sin(awayAngle) * 9;
            this.player.vx = -Math.cos(awayAngle) * 8;
            this.player.vy = -Math.sin(awayAngle) * 8;
            continue;
          }
          this.handleGameOver(fish);
          return;
        }
      }
    }

    // Cập nhật âm thanh đe dọa và banner cảnh báo
    this.sound.setBossNearby(hasBigBossNearby);
    const warningBanner = document.getElementById('warningBanner');
    if (hasBigBossNearby && !this.isFrenzy) {
      if (warningBanner.classList.contains('hidden')) {
        warningBanner.classList.remove('hidden');
        this.sound.playWarning();
      }
    } else {
      warningBanner.classList.add('hidden');
    }

    // 6. Tự động sinh thêm cá mới khi số lượng giảm
    this.spawnTimer++;
    if (this.spawnTimer > 45 && this.fishes.length < this.maxFishes) {
      this.spawnTimer = 0;
      this.spawnRandomFish(false);
    }

    // 7. Cập nhật Vật phẩm bổ trợ (Powerups)
    this.powerupSpawnTimer++;
    if (this.powerupSpawnTimer > 750 && this.powerups.length < 2) {
      this.powerupSpawnTimer = 0;
      this.spawnPowerup();
    }

    for (let pIdx = this.powerups.length - 1; pIdx >= 0; pIdx--) {
      const p = this.powerups[pIdx];
      p.y -= p.speed;
      p.x += Math.sin(this.effects.time * 0.03 + p.seed) * 0.9;

      // Kiểm tra va chạm với người chơi
      const distToPlayer = Math.hypot(p.x - this.player.x, p.y - this.player.y);
      if (distToPlayer < this.player.radius + p.radius) {
        this.collectPowerup(p);
        this.powerups.splice(pIdx, 1);
        continue;
      }

      // Xóa nếu bay quá cao khỏi màn hình
      if (p.y < -50) {
        this.powerups.splice(pIdx, 1);
      }
    }

    // 8. Lực hút xoáy nước khi Lướt nhanh (Dash Suction) hoặc Nam Châm
    if (this.player && (this.hasMagnet || this.isDashing)) {
      const suctionStrength = this.hasMagnet ? 2.4 : 1.6;
      const suctionDist = this.hasMagnet ? 280 : 160;
      const headX = this.player.x + Math.cos(this.player.angle) * this.player.radius;
      const headY = this.player.y + Math.sin(this.player.angle) * this.player.radius;

      for (const f of this.fishes) {
        if (f.radius < this.player.radius) {
          const mdx = headX - f.x;
          const mdy = headY - f.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < suctionDist && mdist > 6) {
            f.vx += (mdx / mdist) * suctionStrength;
            f.vy += (mdy / mdist) * suctionStrength;
          }
        }
      }
    }

    // 9. Tương tác Sò Ngọc Khổng Lồ ở đáy biển (Pearl Clam Eating)
    if (this.player) {
      const clamX = this.canvas.width * 0.22;
      const clamY = this.canvas.height - 30;
      const cycle = (this.effects.time * 0.02) % (Math.PI * 2);
      const openAmount = Math.max(0, Math.sin(cycle));

      if (openAmount > 0.4 && !this.clamCollectedInCycle) {
        const distToClam = Math.hypot(this.player.x - clamX, this.player.y - (clamY - 10));
        if (distToClam < this.player.radius + 22) {
          this.clamCollectedInCycle = true;
          this.score += 500;
          this.stamina = 100;
          this.effects.spawnShockwave(clamX, clamY - 10, 180, '#00f5d4');
          this.effects.spawnFloatingText('💎 NGỌC TRAI ĐẠI DƯƠNG! +500 ✨', clamX, clamY - 50, '#ffd166', 28);
          this.sound.playLevelUp();
          for (let i = 0; i < 25; i++) {
            this.effects.spawnStarParticle(clamX, clamY - 10, '#ffffff', 8);
          }
        }
      }
      if (openAmount <= 0.05) {
        this.clamCollectedInCycle = false;
      }
    }

    // 10. Cập nhật Nàng Tiên Cá bơi qua đại dương
    if (!this.mermaid) {
      this.mermaidTimer--;
      if (this.mermaidTimer <= 0) {
        this.mermaid = new Mermaid(this.canvas.width, this.canvas.height);
        this.mermaidTimer = 1600 + Math.random() * 1200; // Mỗi 25-45 giây xuất hiện một lần
        this.sound.playMermaidSong();
        this.effects.spawnShockwave(this.mermaid.x, this.mermaid.y, 220, '#ffd166');
        this.effects.spawnFloatingText('🧜‍♀️ CÔNG CHÚA TIÊN CÁ ĐANG BƠI QUA!', this.canvas.width / 2, 70, '#f72585', 28);
      }
    } else {
      const blessing = this.mermaid.update(this.effects, this.player, this.sound);
      if (blessing && blessing.blessed) {
        this.score += blessing.score;
        this.hasShield = true;
        this.stamina = 100;
        this.effects.spawnShockwave(this.player.x, this.player.y, 260, '#ff0054');
      }
      if (this.mermaid.isDone) {
        this.mermaid = null;
      }
    }

    // Cập nhật giao diện HUD
    this.updateHUD();
  }

  // =================== XỬ LÝ DI CHUYỂN NGƯỜI CHƠI ===================

  updatePlayerMovement() {
    const currentSpeed = this.isDashing ? this.player.boostSpeed : this.player.baseSpeed;

    if (this.inputMode === 'mouse') {
      const dx = this.mouse.x - this.player.x;
      const dy = this.mouse.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 6) {
        // Luôn bơi hết tốc lực, chỉ hãm nhẹ khi chuột ở cực sát (< 18px) để không rung lắc
        const moveRatio = dist < 20 ? (dist / 20) : 1;
        this.player.vx = (dx / dist) * currentSpeed * moveRatio;
        this.player.vy = (dy / dist) * currentSpeed * moveRatio;
      } else {
        this.player.vx *= 0.4;
        this.player.vy *= 0.4;
      }
    } else {
      // Keyboard input
      let moveX = 0;
      let moveY = 0;
      if (this.keys.ArrowLeft) moveX -= 1;
      if (this.keys.ArrowRight) moveX += 1;
      if (this.keys.ArrowUp) moveY -= 1;
      if (this.keys.ArrowDown) moveY += 1;

      if (moveX !== 0 || moveY !== 0) {
        const mag = Math.hypot(moveX, moveY);
        this.player.vx = (moveX / mag) * currentSpeed;
        this.player.vy = (moveY / mag) * currentSpeed;
      } else {
        this.player.vx *= 0.88;
        this.player.vy *= 0.88;
      }
    }

    // Mắt người chơi nhìn về hướng con mồi nhỏ gần nhất
    let nearestPrey = null;
    let minDist = 300;
    for (const f of this.fishes) {
      if (f.radius < this.player.radius || this.isFrenzy) {
        const d = Math.hypot(f.x - this.player.x, f.y - this.player.y);
        if (d < minDist) {
          minDist = d;
          nearestPrey = f;
        }
      }
    }

    if (nearestPrey) {
      this.player.lookAngle = Math.atan2(nearestPrey.y - this.player.y, nearestPrey.x - this.player.x);
      // Tự động há mồm thèm thuồng khi rất gần mồi
      if (minDist < this.player.radius * 2.2) {
        this.player.targetMouthOpen = 1.0;
      } else {
        this.player.targetMouthOpen = 0.1;
      }
    } else {
      this.player.lookAngle = this.player.angle;
      this.player.targetMouthOpen = 0;
    }
  }

  // =================== XỬ LÝ ĐỚP MỒI & COMBO TIẾN HÓA ===================

  eatFish(fish, index) {
    // 1. Âm thanh đớp mồi giòn giã
    this.sound.playChomp(fish.radius / this.player.radius);

    // 2. Hiệu ứng cắn vỡ mồi
    this.effects.spawnBiteSplash(fish.x, fish.y, fish.bodyColor, 16);

    // 3. Tính điểm Combo
    this.combo++;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    this.comboTimer = this.comboDuration;

    let multiplier = 1;
    if (this.combo >= 2) multiplier = 2;
    if (this.combo >= 4) multiplier = 3;
    if (this.combo >= 7) multiplier = 5;
    if (this.isFrenzy) multiplier *= 2;

    const earnedScore = fish.scoreValue * multiplier;
    this.score += earnedScore;
    this.fishEaten++;

    // Điểm bay lên màn hình
    const comboPrefix = multiplier > 1 ? `x${multiplier} ` : '';
    this.effects.spawnFloatingText(`+${earnedScore} ${comboPrefix}`, fish.x, fish.y, multiplier > 1 ? '#ff0054' : '#ffd166');

    // Cập nhật Combo UI
    if (this.combo >= 2) {
      const comboContainer = document.getElementById('comboContainer');
      comboContainer.classList.remove('hidden');
      document.getElementById('comboMultiplier').textContent = `x${multiplier}`;
    }

    // 4. Kích hoạt Cuồng nộ (Frenzy Mode) khi combo đạt mốc 8 hoặc ăn Cá Vàng
    if (fish.type === 'golden' || this.combo === 8) {
      this.triggerFrenzy();
    }

    // 5. Thêm điểm tiến hóa (Growth XP)
    this.growthXP += fish.growthValue;
    this.checkEvolution();

    // 6. Xóa cá bị ăn và lập tức hồi sinh sau đó
    this.fishes.splice(index, 1);
  }

  triggerFrenzy() {
    this.isFrenzy = true;
    this.frenzyTimer = this.frenzyDuration;
    this.sound.setFrenzy(true);
    this.sound.playFrenzyStart();
    this.effects.triggerScreenShake(12, 20);
    this.effects.spawnShockwave(this.player.x, this.player.y, 250, '#ff0054');
    document.getElementById('frenzyBanner').classList.remove('hidden');
    this.effects.spawnFloatingText('🔥 FRENZY! BẤT KHẢ CHIẾN BẠI! 🔥', this.player.x, this.player.y - 50, '#ffbe0b', 30);
  }

  handlePufferSting(puffer) {
    this.sound.playPufferSting();
    this.effects.triggerScreenShake(7, 12);
    this.effects.spawnFloatingText('💥 BỊ CHÍCH GAI!', this.player.x, this.player.y - 30, '#ff4d6d', 22);

    // Bật nảy ra xa và ngắt combo
    const angle = Math.atan2(this.player.y - puffer.y, this.player.x - puffer.x);
    this.player.vx = Math.cos(angle) * 8;
    this.player.vy = Math.sin(angle) * 8;
    this.combo = 0;
    this.comboTimer = 0;
    document.getElementById('comboContainer').classList.add('hidden');
  }

  checkEvolution() {
    if (this.level >= 4) return;

    const nextXP = this.growthRequired[this.level];
    if (this.growthXP >= nextXP) {
      this.level++;
      this.player.updatePlayerStats(this.level);

      // Âm thanh & Hiệu ứng tiến hóa hoành tráng
      this.sound.playLevelUp();
      this.effects.spawnShockwave(this.player.x, this.player.y, 300, '#00f5d4');
      this.effects.triggerScreenShake(10, 18);
      this.effects.spawnFloatingText(`✨ TIẾN HÓA LÊN ${this.player.speciesName.toUpperCase()}! ✨`, this.player.x, this.player.y - 60, '#00f5d4', 28);

      this.drawAvatarBadge();
    }
  }

  // =================== XỬ LÝ GAME OVER ===================

  handleGameOver(predator) {
    this.state = 'gameover';
    this.sound.stopMusic();
    this.sound.playGameOver();
    this.effects.triggerScreenShake(15, 30);
    this.effects.spawnBiteSplash(this.player.x, this.player.y, this.player.bodyColor, 35);

    // Cập nhật kỷ lục
    let isNewRecord = false;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('ocean_frenzy_high_score', this.highScore.toString());
      isNewRecord = true;
    }

    // Hiển thị màn hình kết thúc
    setTimeout(() => {
      document.getElementById('endScore').textContent = this.score.toLocaleString();
      document.getElementById('endLevel').textContent = this.player.speciesName;
      document.getElementById('endFishCount').textContent = this.fishEaten;
      document.getElementById('endMaxCombo').textContent = `x${this.maxCombo}`;

      const newRecordBadge = document.getElementById('newRecordBadge');
      if (isNewRecord) {
        newRecordBadge.classList.remove('hidden');
      } else {
        newRecordBadge.classList.add('hidden');
      }

      this.hud.classList.add('hidden');
      this.gameOverScreen.classList.remove('hidden');
    }, 600);
  }

  // =================== CẬP NHẬT HUD & BẢNG TIẾN TRÌNH ===================

  updateHUD() {
    document.getElementById('scoreDisplay').textContent = this.score.toLocaleString();
    document.getElementById('playerLevelText').textContent = `CẤP ${this.level}`;
    document.getElementById('playerSpeciesText').textContent = this.player ? this.player.speciesName : 'Cá Nhỏ';

    // Thanh tiến hóa
    let percent = 100;
    if (this.level < 4) {
      const prevXP = this.level === 1 ? 0 : this.growthRequired[this.level - 1];
      const curReq = this.growthRequired[this.level] - prevXP;
      const progress = this.growthXP - prevXP;
      percent = Math.min(100, Math.max(0, Math.round((progress / curReq) * 100)));
    }
    document.getElementById('growthPercent').textContent = `${percent}%`;
    document.getElementById('growthBar').style.width = `${percent}%`;

    // Cập nhật các marker cấp độ
    for (let l = 1; l <= 4; l++) {
      const m = document.querySelector(`.marker.m${l}`);
      if (m) {
        if (l <= this.level) m.classList.add('active');
        else m.classList.remove('active');
      }
    }

    // Thanh thể lực Dash
    const staminaPct = Math.round((this.stamina / this.maxStamina) * 100);
    document.getElementById('staminaText').textContent = `${staminaPct}%`;
    document.getElementById('staminaBar').style.width = `${staminaPct}%`;

    // Thanh combo đếm lùi
    if (this.comboTimer > 0) {
      const comboPct = (this.comboTimer / this.comboDuration) * 100;
      document.getElementById('comboTimerFill').style.width = `${comboPct}%`;
    }
  }

  // Vẽ hình đại diện cá người chơi lên Avatar tròn
  drawAvatarBadge() {
    const avatarCanvas = document.getElementById('playerAvatarCanvas');
    if (!avatarCanvas) return;
    const actx = avatarCanvas.getContext('2d');
    actx.clearRect(0, 0, 60, 60);

    const tempFish = new Fish(30, 30, 'clownfish', true, this.level);
    tempFish.angle = 0;
    tempFish.facing = 1;
    tempFish.radius = 16;
    tempFish.draw(actx);
  }

  // =================== HỆ THỐNG VẬT PHẨM BỔ TRỢ (POWERUPS) ===================

  spawnPowerup() {
    const types = [
      { type: 'shield', icon: '🛡️', color: 'rgba(0, 245, 212, 0.45)' },
      { type: 'magnet', icon: '🧲', color: 'rgba(255, 0, 110, 0.45)' },
      { type: 'speed', icon: '⚡', color: 'rgba(255, 190, 11, 0.45)' },
      { type: 'pearl', icon: '💎', color: 'rgba(114, 9, 183, 0.45)' }
    ];
    const item = types[Math.floor(Math.random() * types.length)];
    this.powerups.push({
      x: 80 + Math.random() * (this.canvas.width - 160),
      y: this.canvas.height + 40,
      radius: 22,
      speed: 1.2 + Math.random() * 0.8,
      seed: Math.random() * 100,
      type: item.type,
      icon: item.icon,
      bubbleColor: item.color
    });
  }

  collectPowerup(p) {
    this.sound.playPearlCollect();
    this.effects.spawnBiteSplash(p.x, p.y, '#ffffff', 14);
    this.effects.spawnShockwave(p.x, p.y, 90, '#00f5d4');

    switch (p.type) {
      case 'shield':
        this.hasShield = true;
        this.effects.spawnFloatingText('🛡️ KHIÊN BẢO VỆ!', this.player.x, this.player.y - 35, '#00f5d4', 24);
        break;
      case 'magnet':
        this.hasMagnet = true;
        this.magnetTimer = 500; // ~8.3 giây
        this.effects.spawnFloatingText('🧲 HÚT MỒI!', this.player.x, this.player.y - 35, '#ff0054', 24);
        break;
      case 'speed':
        this.hasSpeed = true;
        this.speedTimer = 500;
        this.stamina = 100;
        this.effects.spawnFloatingText('⚡ SIÊU TỐC ĐỘ!', this.player.x, this.player.y - 35, '#f72585', 24);
        break;
      case 'pearl':
        this.score += 500;
        this.effects.spawnFloatingText('+500 💎 NGỌC BỘI!', this.player.x, this.player.y - 35, '#ffd166', 26);
        break;
    }
  }

  drawPowerups(ctx) {
    for (const p of this.powerups) {
      ctx.save();
      ctx.translate(p.x, p.y);

      // Bong bóng óng ánh
      const grad = ctx.createRadialGradient(-p.radius * 0.3, -p.radius * 0.3, p.radius * 0.2, 0, 0, p.radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.5, p.bubbleColor);
      grad.addColorStop(1, 'rgba(0, 119, 182, 0.7)');
      ctx.fillStyle = grad;
      ctx.strokeStyle = '#caf0f8';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hào quang lấp lánh trên bong bóng
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(-p.radius * 0.45, -p.radius * 0.45, p.radius * 0.26, 0, Math.PI * 2);
      ctx.fill();

      // Icon vật phẩm bên trong
      ctx.font = `${p.radius * 1.05}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.icon, 0, 2);

      ctx.restore();
    }
  }

  // Hoạt họa cá trên màn hình chào đón (Start Preview)
  initPreviewStage() {
    const previewCanvas = document.getElementById('previewCanvas');
    if (!previewCanvas) return;
    const pctx = previewCanvas.getContext('2d');

    const previewFish = new Fish(110, 70, 'clownfish', true, 1);
    previewFish.facing = 1;
    previewFish.radius = 24;

    const animatePreview = () => {
      pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      previewFish.swimPhase += 0.12;
      previewFish.draw(pctx);
      requestAnimationFrame(animatePreview);
    };
    requestAnimationFrame(animatePreview);
  }

  // =================== VẼ CANVAS TOÀN TRÒ CHƠI ===================

  render() {
    const ctx = this.ctx;
    ctx.save();

    // Rung lắc màn hình nếu có
    this.effects.applyShake();

    // 1. Nền đại dương sâu thẳm, tia nắng caustics, rong biển
    this.effects.drawBackground();

    // 2. Vẽ tất cả cá NPC
    for (const f of this.fishes) {
      f.draw(ctx);
    }

    // Vẽ Nàng Tiên Cá kiều diễm
    if (this.mermaid) {
      this.mermaid.draw(ctx);
    }

    // Vẽ các bọt bóng chứa vật phẩm bổ trợ
    this.drawPowerups(ctx);

    // 3. Vẽ cá người chơi
    if (this.player && (this.state === 'playing' || this.state === 'paused')) {
      this.player.draw(ctx, this.isFrenzy, this.hasShield, this.hasMagnet);
    }

    // 4. Các hiệu ứng mặt trước (Bọt khí, Splash, Text bay, Sóng xung kích)
    this.effects.drawForeground();

    // 5. Vẽ radar / mũi tên cảnh báo quanh mép màn hình khi có sát thủ lớn
    this.drawPredatorWarnings();

    ctx.restore();
  }

  // Mũi tên cảnh báo đỏ nhấp nháy chỉ hướng kẻ săn mồi khổng lồ ngoài màn hình
  drawPredatorWarnings() {
    if (!this.player || this.isFrenzy) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    for (const f of this.fishes) {
      if (f.radius > this.player.radius * 1.25) {
        // Nếu cá nằm ngoài màn hình hoặc gần mép
        if (f.x < -20 || f.x > w + 20 || f.y < -20 || f.y > h + 20) {
          const dx = f.x - this.player.x;
          const dy = f.y - this.player.y;
          const angle = Math.atan2(dy, dx);

          // Vị trí icon cảnh báo trên viền màn hình
          const edgeMargin = 40;
          let ix = Math.max(edgeMargin, Math.min(w - edgeMargin, this.player.x + Math.cos(angle) * (w * 0.4)));
          let iy = Math.max(edgeMargin, Math.min(h - edgeMargin, this.player.y + Math.sin(angle) * (h * 0.4)));

          ctx.save();
          ctx.translate(ix, iy);
          ctx.rotate(angle);

          // Nhấp nháy cảnh báo
          const blink = Math.sin(this.effects.time * 0.2) > 0 ? 1 : 0.4;
          ctx.globalAlpha = blink;

          // Mũi tên đỏ
          ctx.fillStyle = '#ff0054';
          ctx.beginPath();
          ctx.moveTo(15, 0);
          ctx.lineTo(-10, -10);
          ctx.lineTo(-5, 0);
          ctx.lineTo(-10, 10);
          ctx.closePath();
          ctx.fill();

          // Dấu chấm than cảnh báo
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('!', -1, 0);

          ctx.restore();
        }
      }
    }
  }
}

// Khởi tạo trò chơi khi tải xong trang web
window.addEventListener('load', () => {
  window.gameInstance = new Game();
});
