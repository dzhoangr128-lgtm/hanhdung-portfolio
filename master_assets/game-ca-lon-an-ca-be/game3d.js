/**
 * OCEAN FRENZY 3D - CORE ENGINE (Three.js WebGL)
 * Trò chơi Cá Lớn Nuốt Cá Bé 3D chân thực, đồ họa lộng lẫy,
 * Nàng Tiên Cá 3D kiều diễm, hiệu ứng nước 3D có chiều sâu,
 * Âm thanh vòm sống động và lối chơi siêu cuốn hút!
 */

class Game3D {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.sound = window.soundEngine;

    // 1. Khởi tạo Three.js WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 2. Scene & Camera 3D
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x021329);
    this.scene.fog = new THREE.FogExp2(0x021329, 0.0011);

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 10, 2000);
    this.camera.position.set(0, 0, 600);

    // Tính toán hệ số chuyển đổi tọa độ pixel 2D sang không gian 3D
    this.calcScreenScale();
    window.addEventListener('resize', () => this.resize());

    // 3. Hệ thống Ánh sáng 3D đa tầng (Lighting)
    this.setupLighting();

    // 4. Hệ thống hiệu ứng hạt & môi trường 3D
    this.effects = new EffectManager3D(this.scene, this.camera);

    // 5. Trạng thái người chơi
    this.player = null;
    this.playerMesh = null;
    this.level = 1;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('ocean_frenzy_high_score') || '0', 10);
    this.fishEaten = 0;
    this.growthXP = 0;
    this.growthRequired = [0, 160, 480, 1100, 99999];

    // Thể lực Dash
    this.stamina = 100;
    this.maxStamina = 100;
    this.isDashing = false;

    // Combo & Frenzy
    this.combo = 0;
    this.maxCombo = 1;
    this.comboTimer = 0;
    this.comboDuration = 180;
    this.isFrenzy = false;
    this.frenzyTimer = 0;
    this.frenzyDuration = 480;

    // Bùa bổ trợ
    this.powerups = [];
    this.powerupSpawnTimer = 0;
    this.hasShield = false;
    this.hasMagnet = false;
    this.magnetTimer = 0;
    this.hasSpeed = false;
    this.speedTimer = 0;

    // NÀNG TIÊN CÁ 3D (Mermaid Event)
    this.mermaid = null;
    this.mermaidMesh = null;
    this.mermaidTimer = 300; // Xuất hiện lần đầu sau ~5 giây

    // Quản lý đàn cá NPC
    this.fishes = [];
    this.maxFishes = 40;
    this.spawnTimer = 0;

    // Điều khiển
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, isDown: false };
    this.keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, w: false, s: false, a: false, d: false, Space: false };
    this.inputMode = 'mouse';

    // Trạng thái game: 'start', 'playing', 'paused', 'gameover'
    this.state = 'start';

    this.bindUI();
    this.initControls();
    this.initPreviewStage();

    // Sinh cá bơi lội nền ngay từ menu bắt đầu
    this.populateInitialFishes();

    // Vòng lặp render 60fps
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  calcScreenScale() {
    const dist = this.camera.position.z;
    const vFov = (this.camera.fov * Math.PI) / 180;
    this.visibleHeight = 2 * Math.tan(vFov / 2) * dist;
    this.visibleWidth = this.visibleHeight * (window.innerWidth / window.innerHeight);
    this.scaleX = this.visibleWidth / window.innerWidth;
    this.scaleY = this.visibleHeight / window.innerHeight;
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.calcScreenScale();
  }

  // Chuyển đổi tọa độ chuột/pixel sang tọa độ 3D
  to3DX(px) {
    return (px - window.innerWidth / 2) * this.scaleX;
  }

  to3DY(py) {
    return -(py - window.innerHeight / 2) * this.scaleY;
  }

  // Thiết lập hệ thống ánh sáng 3D
  setupLighting() {
    // 1. Ánh sáng môi trường đại dương sâu thẳm
    const ambientLight = new THREE.AmbientLight(0x0077b6, 0.9);
    this.scene.add(ambientLight);

    // 2. Chùm ánh sáng mặt trời chiếu từ trên mặt nước
    const sunLight = new THREE.DirectionalLight(0xa7f3d0, 1.4);
    sunLight.position.set(100, 500, 300);
    this.scene.add(sunLight);

    // 3. Đèn viền xanh ngọc tạo bóng bóng bẩy (Rim light)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.85);
    rimLight.position.set(-200, -300, -100);
    this.scene.add(rimLight);

    // 4. Đèn hào quang người chơi (Frenzy / Level Up)
    this.playerLight = new THREE.PointLight(0xffd166, 0, 250);
    this.scene.add(this.playerLight);
  }

  // =================== GẮN SỰ KIỆN GIAO DIỆN ===================

  bindUI() {
    this.startScreen = document.getElementById('startScreen');
    this.pauseScreen = document.getElementById('pauseScreen');
    this.gameOverScreen = document.getElementById('gameOverScreen');
    this.hud = document.getElementById('hud');

    document.getElementById('btnStartGame').addEventListener('click', () => this.startGame());
    document.getElementById('btnPlayAgain').addEventListener('click', () => this.startGame());
    document.getElementById('btnResume').addEventListener('click', () => this.togglePause());
    document.getElementById('btnRestartFromPause').addEventListener('click', () => {
      this.togglePause();
      this.startGame();
    });

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

    document.getElementById('btnPause').addEventListener('click', () => this.togglePause());
    document.getElementById('highScoreSmall').textContent = this.highScore.toLocaleString();
  }

  initControls() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.inputMode = 'mouse';
    });

    window.addEventListener('mousedown', (e) => {
      if (e.button === 0 && this.state === 'playing') {
        this.mouse.isDown = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
    });

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

      if (e.key === ' ') this.keys.Space = true;
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

  // =================== KHỞI ĐỘNG GAME 3D ===================

  startGame() {
    this.sound.ensureContext();
    this.sound.startMusic();

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

    // Reset bùa
    this.powerups.forEach((p) => {
      if (p.mesh) this.scene.remove(p.mesh);
    });
    this.powerups = [];
    this.powerupSpawnTimer = 0;
    this.hasShield = false;
    this.hasMagnet = false;
    this.magnetTimer = 0;
    this.hasSpeed = false;
    this.speedTimer = 0;

    // Xóa Nàng Tiên Cá cũ nếu có
    if (this.mermaidMesh) {
      this.scene.remove(this.mermaidMesh);
      this.mermaidMesh = null;
    }
    this.mermaid = null;
    this.mermaidTimer = 280; // Xuất hiện sau ~4.6 giây

    // Xóa cá cũ trong scene
    this.clearAllFishMeshes();

    // Tạo cá người chơi 3D
    this.player = new Fish(window.innerWidth / 2, window.innerHeight / 2, 'clownfish', true, 1);
    this.createPlayerMesh();

    // Sinh cá ban đầu
    this.populateInitialFishes();

    this.startScreen.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
    this.pauseScreen.classList.add('hidden');
    this.hud.classList.remove('hidden');

    this.state = 'playing';
    this.updateHUD();
    this.drawAvatarBadge();

    this.effects.spawnShockwave(0, 0, 220, 0x00f5d4);
    this.sound.playLevelUp();
  }

  createPlayerMesh() {
    if (this.playerMesh) {
      this.scene.remove(this.playerMesh);
    }
    const r = this.player.radius * this.scaleY;
    this.playerMesh = Ocean3D.createFish3D('clownfish', r, true, this.level);
    this.scene.add(this.playerMesh);
  }

  clearAllFishMeshes() {
    this.fishes.forEach((f) => {
      if (f.mesh3D) {
        this.scene.remove(f.mesh3D);
      }
    });
    this.fishes = [];
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

  // =================== SINH CÁ 3D ===================

  populateInitialFishes() {
    for (let i = 0; i < 26; i++) {
      this.spawnRandomFish(true);
    }
  }

  spawnRandomFish(initial = false) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    let x, y;
    if (initial) {
      x = Math.random() * w;
      y = 40 + Math.random() * (h - 80);
      if (this.player && Math.hypot(x - this.player.x, y - this.player.y) < 160) {
        x += 250;
      }
    } else {
      const fromLeft = Math.random() > 0.5;
      x = fromLeft ? -60 : w + 60;
      y = 40 + Math.random() * (h - 80);
    }

    let type = 'krill';
    const rand = Math.random();

    if (this.level === 1) {
      if (rand < 0.28) type = 'krill';
      else if (rand < 0.50) type = 'neon';
      else if (rand < 0.70) type = 'jellyfish';
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
    } else {
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
    if (x < 0) fish.vx = Math.abs(fish.vx);
    else if (x > w) fish.vx = -Math.abs(fish.vx);

    // Tạo Mesh 3D tương ứng cho cá
    const r3D = fish.radius * this.scaleY;
    let mesh;
    if (type === 'jellyfish') mesh = Ocean3D.createFish3D('jellyfish', r3D);
    else if (type === 'turtle') mesh = Ocean3D.createFish3D('turtle', r3D);
    else if (type === 'anglerfish') mesh = Ocean3D.createFish3D('anglerfish', r3D);
    else if (type === 'hammerhead') mesh = Ocean3D.createFish3D('hammerhead', r3D);
    else mesh = Ocean3D.createFish3D(type, r3D);

    fish.mesh3D = mesh;
    mesh.position.set(this.to3DX(fish.x), this.to3DY(fish.y), (Math.random() - 0.5) * 60);
    this.scene.add(mesh);

    this.fishes.push(fish);
  }

  // =================== VÒNG LẶP RENDER 3D (ANIMATE) ===================

  animate(time) {
    requestAnimationFrame(this.animate);

    if (this.state === 'playing') {
      this.update();
    } else if (this.state === 'start') {
      this.updateStartScreen();
    }

    // Cập nhật hiệu ứng hạt & môi trường
    this.effects.update();

    // Render WebGL Scene
    this.renderer.render(this.scene, this.camera);
  }

  updateStartScreen() {
    for (const f of this.fishes) {
      f.update({ width: window.innerWidth, height: window.innerHeight }, null);
      if (f.mesh3D) {
        this.syncFish3D(f);
      }
    }

    // Nàng tiên cá bơi trên menu bắt đầu
    this.updateMermaid(null);
  }

  // Cập nhật tọa độ, uốn lượn xương và góc xoay 3D chân thực
  syncFish3D(f) {
    const mesh = f.mesh3D;
    if (!mesh) return;

    mesh.position.x = this.to3DX(f.x);
    mesh.position.y = this.to3DY(f.y);

    // Xoay hướng mặt trái/phải mượt mà (Yaw rotation)
    const targetRotY = f.facing < 0 ? Math.PI : 0;
    mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.15;

    // Góc nghiêng theo hướng bơi (Roll/Pitch)
    const pitch = f.facing < 0 ? -f.angle + Math.PI : f.angle;
    mesh.rotation.z += (pitch - mesh.rotation.z) * 0.18;

    // Diễn hoạt uốn quẫy đuôi trong 3D
    if (mesh.tailPivot) {
      mesh.tailPivot.rotation.y = Math.sin(f.swimPhase) * 0.38;
    }
    if (mesh.finPivot) {
      mesh.finPivot.rotation.y = Math.sin(f.swimPhase - 0.4) * 0.48;
    }
    if (mesh.leftFin && mesh.rightFin) {
      const finFlap = Math.sin(f.swimPhase * 1.5) * 0.35;
      mesh.leftFin.rotation.x = finFlap;
      mesh.rightFin.rotation.x = -finFlap;
    }
    if (mesh.jawMesh) {
      mesh.jawMesh.rotation.z = -Math.PI / 2 - f.mouthOpen * 0.45;
    }
    if (mesh.leftFlipper && mesh.rightFlipper) {
      const flipperFlap = Math.sin(f.swimPhase * 1.2) * 0.4;
      mesh.leftFlipper.rotation.x = flipperFlap;
      mesh.rightFlipper.rotation.x = -flipperFlap;
    }
  }

  // =================== CẬP NHẬT TRÒ CHƠI CHÍNH ===================

  update() {
    // 1. Thể lực & Tăng tốc (Dash)
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
      if (!this.hasSpeed) this.stamina = Math.max(0, this.stamina - 0.7);
      this.effects.spawnStarParticle(this.to3DX(this.player.x), this.to3DY(this.player.y), 0xcaf0f8, 3.5);

      if (Math.floor(this.effects.time) % 12 === 0) {
        this.sound.playDash();
      }
    } else {
      this.isDashing = false;
      this.stamina = Math.min(this.maxStamina, this.stamina + 0.75);
    }

    // 2. Di chuyển người chơi
    this.updatePlayerMovement();

    // 3. Combo & Frenzy
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
        if (this.playerMesh && this.playerMesh.auraMesh) {
          this.playerMesh.auraMesh.material.opacity = 0;
        }
        this.playerLight.intensity = 0;
      } else {
        // Tỏa sáng ánh vàng rực rỡ khi Frenzy
        this.playerLight.intensity = 2.0;
        this.playerLight.position.set(this.to3DX(this.player.x), this.to3DY(this.player.y), 50);
        if (this.playerMesh && this.playerMesh.auraMesh) {
          this.playerMesh.auraMesh.material.opacity = 0.65;
          this.playerMesh.auraMesh.rotation.y += 0.05;
        }
      }
    }

    // 4. Cập nhật cá người chơi 3D
    this.player.update({ width: window.innerWidth, height: window.innerHeight });
    const pr = this.player.radius;
    this.player.x = Math.max(pr, Math.min(window.innerWidth - pr, this.player.x));
    this.player.y = Math.max(pr, Math.min(window.innerHeight - pr, this.player.y));

    if (this.playerMesh) {
      this.player.mesh3D = this.playerMesh;
      this.syncFish3D(this.player);
    }

    // 5. Cập nhật NPC & Va chạm
    let hasBigBossNearby = false;
    const mouthX = this.player.x + Math.cos(this.player.angle) * (this.player.radius * 0.95);
    const mouthY = this.player.y + Math.sin(this.player.angle) * (this.player.radius * 0.95);

    for (let i = this.fishes.length - 1; i >= 0; i--) {
      const fish = this.fishes[i];
      fish.update({ width: window.innerWidth, height: window.innerHeight }, this.player);
      this.syncFish3D(fish);

      const effectiveRadius = fish.radius * (fish.puffScale || 1);
      const distToPlayer = Math.hypot(fish.x - this.player.x, fish.y - this.player.y);
      const distMouthToFish = Math.hypot(mouthX - fish.x, mouthY - fish.y);

      if (fish.radius > this.player.radius * 1.25 && distToPlayer < 450) {
        hasBigBossNearby = true;
      }

      // Hút mồi tự nhiên
      if (effectiveRadius <= this.player.radius && distToPlayer < 100) {
        const suckDx = mouthX - fish.x;
        const suckDy = mouthY - fish.y;
        const suckDist = Math.hypot(suckDx, suckDy);
        if (suckDist > 5) {
          fish.vx += (suckDx / suckDist) * 1.1;
          fish.vy += (suckDy / suckDist) * 1.1;
        }
      }

      const canEatReach = distMouthToFish < (effectiveRadius + this.player.radius * 0.75) ||
                          distToPlayer < (this.player.radius + effectiveRadius * 0.95);

      if (canEatReach) {
        // Cá nóc phồng gai
        if (fish.type === 'pufferfish' && (fish.isPuffed || fish.puffScale > 1.3) && !this.isFrenzy) {
          if (this.hasShield) {
            this.hasShield = false;
            this.sound.playShieldBreak();
            this.effects.triggerScreenShake(8, 14);
            this.effects.spawnShockwave(this.to3DX(this.player.x), this.to3DY(this.player.y), 180, 0x00f5d4);
            this.effects.spawnFloatingText('🛡️ KHIÊN ĐÃ CHỐNG GAI!', this.player.x, this.player.y - 35, '#00f5d4', 24);
            const bounce = Math.atan2(this.player.y - fish.y, this.player.x - fish.x);
            this.player.vx = Math.cos(bounce) * 8;
            this.player.vy = Math.sin(bounce) * 8;
            continue;
          }
          this.handlePufferSting(fish);
          continue;
        }

        // Đớp mồi!
        if (this.player.radius >= effectiveRadius || this.isFrenzy) {
          this.eatFish(fish, i);
          continue;
        }
      }

      // Cá lớn nuốt người chơi (chỉ khi miệng kẻ săn mồi chạm bạn)
      if (effectiveRadius > this.player.radius * 1.15 && !this.isFrenzy) {
        const predatorMouthX = fish.x + Math.cos(fish.angle) * (effectiveRadius * 0.85);
        const predatorMouthY = fish.y + Math.sin(fish.angle) * (effectiveRadius * 0.85);
        const distPredatorMouth = Math.hypot(predatorMouthX - this.player.x, predatorMouthY - this.player.y);

        if (distPredatorMouth < (this.player.radius * 0.75 + effectiveRadius * 0.6) || distToPlayer < (this.player.radius + effectiveRadius) * 0.65) {
          if (this.hasShield) {
            this.hasShield = false;
            this.sound.playShieldBreak();
            this.effects.triggerScreenShake(14, 22);
            this.effects.spawnShockwave(this.to3DX(this.player.x), this.to3DY(this.player.y), 220, 0x00f5d4);
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

    // Cảnh báo quái vật
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

    // Sinh thêm cá
    this.spawnTimer++;
    if (this.spawnTimer > 40 && this.fishes.length < this.maxFishes) {
      this.spawnTimer = 0;
      this.spawnRandomFish(false);
    }

    // 6. Cập nhật Nàng Tiên Cá 3D
    this.updateMermaid(this.player);

    // 7. Cập nhật Bùa bổ trợ 3D
    this.updatePowerups();

    // 8. Nam châm hút mồi
    if (this.hasMagnet && this.player) {
      for (const f of this.fishes) {
        if (f.radius < this.player.radius) {
          const mdx = this.player.x - f.x;
          const mdy = this.player.y - f.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 280 && mdist > 5) {
            f.vx += (mdx / mdist) * 2.4;
            f.vy += (mdy / mdist) * 2.4;
          }
        }
      }
    }

    this.updateHUD();
  }

  // Cập nhật Nàng Tiên Cá 3D bơi qua đại dương
  updateMermaid(player) {
    if (!this.mermaid) {
      this.mermaidTimer--;
      if (this.mermaidTimer <= 0) {
        this.mermaid = new Mermaid(window.innerWidth, window.innerHeight);
        this.mermaidTimer = 1600 + Math.random() * 1200; // Mỗi 25-45 giây xuất hiện

        // Tạo Mesh 3D Nàng Tiên Cá
        this.mermaidMesh = Ocean3D.createMermaid3D();
        this.scene.add(this.mermaidMesh);

        this.sound.playMermaidSong();
        this.effects.spawnShockwave(this.to3DX(this.mermaid.x), this.to3DY(this.mermaid.y), 240, 0xffd166);
        this.effects.spawnFloatingText('🧜‍♀️ NÀNG TIÊN CÁ ĐANG BƠI QUA!', window.innerWidth / 2, 70, '#f72585', 28);
      }
    } else {
      const effectsProxy = {
        spawnStarParticle: (px, py, col, sz) => this.effects.spawnStarParticle(this.to3DX(px), this.to3DY(py), col, sz),
        spawnBubble: (px, py, r, s) => this.effects.spawnBubble(this.to3DX(px), this.to3DY(py), r, s),
        spawnShockwave: (px, py, maxR, col) => this.effects.spawnShockwave(this.to3DX(px), this.to3DY(py), maxR, col),
        triggerScreenShake: (int, dur) => this.effects.triggerScreenShake(int, dur),
        spawnFloatingText: (txt, px, py, col, sz) => this.effects.spawnFloatingText(txt, px, py, col, sz)
      };
      const blessing = this.mermaid.update(effectsProxy, player, this.sound);
      if (blessing && blessing.blessed) {
        this.score += blessing.score;
        this.hasShield = true;
        this.stamina = 100;
        this.effects.spawnShockwave(this.to3DX(this.player.x), this.to3DY(this.player.y), 280, 0xff0054);
      }

      // Đồng bộ Mesh 3D Nàng Tiên Cá
      if (this.mermaidMesh) {
        const mm = this.mermaidMesh;
        mm.position.x = this.to3DX(this.mermaid.x);
        mm.position.y = this.to3DY(this.mermaid.y);
        mm.rotation.y = this.mermaid.facing < 0 ? Math.PI : 0;

        // Uốn lượn đuôi cá tiên mượt mà
        if (mm.tail1 && mm.tail2) {
          const wave = Math.sin(this.mermaid.swimPhase);
          mm.tail1.rotation.z = wave * 0.22;
          mm.tail2.rotation.z = Math.sin(this.mermaid.swimPhase - 0.4) * 0.32;
        }

        // Lọn tóc bồng bềnh trong dòng hải lưu
        if (mm.hairStrands) {
          mm.hairStrands.forEach((strand, idx) => {
            strand.rotation.y = Math.sin(this.mermaid.swimPhase + idx * 0.7) * 0.3;
          });
        }

        // Cánh tay bơi
        if (mm.leftArm && mm.rightArm) {
          const armFlap = Math.sin(this.mermaid.swimPhase) * 0.4;
          mm.leftArm.rotation.x = armFlap;
          mm.rightArm.rotation.x = -armFlap;
        }
      }

      if (this.mermaid.isDone) {
        if (this.mermaidMesh) {
          this.scene.remove(this.mermaidMesh);
          this.mermaidMesh = null;
        }
        this.mermaid = null;
      }
    }
  }

  // =================== CẬP NHẬT BÙA BỔ TRỢ 3D ===================

  updatePowerups() {
    this.powerupSpawnTimer++;
    if (this.powerupSpawnTimer > 750 && this.powerups.length < 2) {
      this.powerupSpawnTimer = 0;
      this.spawnPowerup3D();
    }

    for (let pIdx = this.powerups.length - 1; pIdx >= 0; pIdx--) {
      const p = this.powerups[pIdx];
      p.y -= p.speed;
      p.x += Math.sin(this.effects.time * 0.03 + p.seed) * 0.9;

      if (p.mesh) {
        p.mesh.position.x = this.to3DX(p.x);
        p.mesh.position.y = this.to3DY(p.y);
        p.mesh.rotation.y += 0.03;
      }

      // Va chạm với người chơi
      const dist = Math.hypot(p.x - this.player.x, p.y - this.player.y);
      if (dist < this.player.radius + p.radius) {
        this.collectPowerup(p);
        if (p.mesh) this.scene.remove(p.mesh);
        this.powerups.splice(pIdx, 1);
        continue;
      }

      if (p.y < -50) {
        if (p.mesh) this.scene.remove(p.mesh);
        this.powerups.splice(pIdx, 1);
      }
    }
  }

  spawnPowerup3D() {
    const types = [
      { type: 'shield', icon: '🛡️', color: 0x00f5d4 },
      { type: 'magnet', icon: '🧲', color: 0xff0054 },
      { type: 'speed', icon: '⚡', color: 0xffbe0b },
      { type: 'pearl', icon: '💎', color: 0x7209b7 }
    ];
    const item = types[Math.floor(Math.random() * types.length)];
    const x = 80 + Math.random() * (window.innerWidth - 160);
    const y = window.innerHeight + 40;
    const radius = 22;

    // Quả cầu pha lê 3D bóng bẩy bọc bùa bên trong
    const orbGroup = new THREE.Group();
    const glassGeo = new THREE.SphereGeometry(radius * this.scaleY, 16, 16);
    const glassMat = new THREE.MeshPhongMaterial({
      color: item.color,
      transparent: true,
      opacity: 0.6,
      shininess: 120,
      specular: 0xffffff
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    orbGroup.add(glassMesh);

    // Điểm sáng trung tâm
    const coreGeo = new THREE.OctahedronGeometry(radius * this.scaleY * 0.45, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    orbGroup.position.set(this.to3DX(x), this.to3DY(y), 0);
    this.scene.add(orbGroup);

    this.powerups.push({
      x: x,
      y: y,
      radius: radius,
      speed: 1.2 + Math.random() * 0.8,
      seed: Math.random() * 100,
      type: item.type,
      mesh: orbGroup
    });
  }

  collectPowerup(p) {
    this.sound.playPearlCollect();
    this.effects.spawnBiteSplash(this.to3DX(p.x), this.to3DY(p.y), 0xffffff, 16);
    this.effects.spawnShockwave(this.to3DX(p.x), this.to3DY(p.y), 90, 0x00f5d4);

    switch (p.type) {
      case 'shield':
        this.hasShield = true;
        this.effects.spawnFloatingText('🛡️ KHIÊN BẢO VỆ!', this.player.x, this.player.y - 35, '#00f5d4', 24);
        break;
      case 'magnet':
        this.hasMagnet = true;
        this.magnetTimer = 500;
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

  // =================== DI CHUYỂN NGƯỜI CHƠI ===================

  updatePlayerMovement() {
    const currentSpeed = this.isDashing ? this.player.boostSpeed : this.player.baseSpeed;

    if (this.inputMode === 'mouse') {
      const dx = this.mouse.x - this.player.x;
      const dy = this.mouse.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 6) {
        const moveRatio = dist < 20 ? (dist / 20) : 1;
        this.player.vx = (dx / dist) * currentSpeed * moveRatio;
        this.player.vy = (dy / dist) * currentSpeed * moveRatio;
      } else {
        this.player.vx *= 0.4;
        this.player.vy *= 0.4;
      }
    } else {
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

    // Mắt người chơi nhìn về hướng mồi gần nhất
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

  // =================== XỬ LÝ ĐỚP MỒI & TIẾN HÓA ===================

  eatFish(fish, index) {
    this.sound.playChomp(fish.radius / this.player.radius);
    this.effects.spawnBiteSplash(this.to3DX(fish.x), this.to3DY(fish.y), 0xffbe0b, 16);

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

    const comboPrefix = multiplier > 1 ? `x${multiplier} ` : '';
    this.effects.spawnFloatingText(`+${earnedScore} ${comboPrefix}`, fish.x, fish.y, multiplier > 1 ? '#ff0054' : '#ffd166');

    if (this.combo >= 2) {
      document.getElementById('comboContainer').classList.remove('hidden');
      document.getElementById('comboMultiplier').textContent = `x${multiplier}`;
    }

    if (fish.type === 'golden' || this.combo === 8) {
      this.triggerFrenzy();
    }

    this.growthXP += fish.growthValue;
    this.checkEvolution();

    // Xóa Mesh 3D của cá khỏi Scene
    if (fish.mesh3D) {
      this.scene.remove(fish.mesh3D);
    }
    this.fishes.splice(index, 1);
  }

  triggerFrenzy() {
    this.isFrenzy = true;
    this.frenzyTimer = this.frenzyDuration;
    this.sound.setFrenzy(true);
    this.sound.playFrenzyStart();
    this.effects.triggerScreenShake(12, 20);
    this.effects.spawnShockwave(this.to3DX(this.player.x), this.to3DY(this.player.y), 260, 0xff0054);
    document.getElementById('frenzyBanner').classList.remove('hidden');
    this.effects.spawnFloatingText('🔥 FRENZY! BẤT KHẢ CHIẾN BẠI! 🔥', this.player.x, this.player.y - 50, '#ffbe0b', 30);
  }

  handlePufferSting(puffer) {
    this.sound.playPufferSting();
    this.effects.triggerScreenShake(7, 12);
    this.effects.spawnFloatingText('💥 BỊ CHÍCH GAI!', this.player.x, this.player.y - 30, '#ff4d6d', 22);

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

      // Cập nhật lại Mesh 3D của người chơi theo cấp độ mới
      this.createPlayerMesh();

      this.sound.playLevelUp();
      this.effects.spawnShockwave(this.to3DX(this.player.x), this.to3DY(this.player.y), 320, 0x00f5d4);
      this.effects.triggerScreenShake(10, 18);
      this.effects.spawnFloatingText(`✨ TIẾN HÓA LÊN ${this.player.speciesName.toUpperCase()}! ✨`, this.player.x, this.player.y - 60, '#00f5d4', 28);

      this.drawAvatarBadge();
    }
  }

  handleGameOver(predator) {
    this.state = 'gameover';
    this.sound.stopMusic();
    this.sound.playGameOver();
    this.effects.triggerScreenShake(15, 30);
    this.effects.spawnBiteSplash(this.to3DX(this.player.x), this.to3DY(this.player.y), 0xff7b00, 35);

    if (this.playerMesh) {
      this.scene.remove(this.playerMesh);
      this.playerMesh = null;
    }

    let isNewRecord = false;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('ocean_frenzy_high_score', this.highScore.toString());
      isNewRecord = true;
    }

    setTimeout(() => {
      document.getElementById('endScore').textContent = this.score.toLocaleString();
      document.getElementById('endLevel').textContent = this.player.speciesName;
      document.getElementById('endFishCount').textContent = this.fishEaten;
      document.getElementById('endMaxCombo').textContent = `x${this.maxCombo}`;

      const newRecordBadge = document.getElementById('newRecordBadge');
      if (isNewRecord) newRecordBadge.classList.remove('hidden');
      else newRecordBadge.classList.add('hidden');

      this.hud.classList.add('hidden');
      this.gameOverScreen.classList.remove('hidden');
    }, 600);
  }

  // =================== CẬP NHẬT HUD ===================

  updateHUD() {
    document.getElementById('scoreDisplay').textContent = this.score.toLocaleString();
    document.getElementById('playerLevelText').textContent = `CẤP ${this.level}`;
    document.getElementById('playerSpeciesText').textContent = this.player ? this.player.speciesName : 'Cá Nhỏ';

    let percent = 100;
    if (this.level < 4) {
      const prevXP = this.level === 1 ? 0 : this.growthRequired[this.level - 1];
      const curReq = this.growthRequired[this.level] - prevXP;
      const progress = this.growthXP - prevXP;
      percent = Math.min(100, Math.max(0, Math.round((progress / curReq) * 100)));
    }
    document.getElementById('growthPercent').textContent = `${percent}%`;
    document.getElementById('growthBar').style.width = `${percent}%`;

    for (let l = 1; l <= 4; l++) {
      const m = document.querySelector(`.marker.m${l}`);
      if (m) {
        if (l <= this.level) m.classList.add('active');
        else m.classList.remove('active');
      }
    }

    const staminaPct = Math.round((this.stamina / this.maxStamina) * 100);
    document.getElementById('staminaText').textContent = `${staminaPct}%`;
    document.getElementById('staminaBar').style.width = `${staminaPct}%`;

    if (this.comboTimer > 0) {
      const comboPct = (this.comboTimer / this.comboDuration) * 100;
      document.getElementById('comboTimerFill').style.width = `${comboPct}%`;
    }
  }

  initPreviewStage() {
    const previewCanvas = document.getElementById('previewCanvas');
    if (!previewCanvas) return;
    const pctx = previewCanvas.getContext('2d');

    const previewFish = new Fish(110, 70, 'clownfish', true, 1);
    previewFish.facing = 1;
    previewFish.radius = 24;

    const animatePreview = () => {
      if (this.state !== 'start') return;
      pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      previewFish.swimPhase += 0.12;
      previewFish.draw(pctx);
      requestAnimationFrame(animatePreview);
    };
    requestAnimationFrame(animatePreview);
  }

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
}

// Khởi chạy game 3D
window.addEventListener('load', () => {
  window.gameInstance = new Game3D();
});
