/**
 * OCEAN FRENZY 3D - VISUAL EFFECTS ENGINE (Three.js WebGL)
 * Môi trường đại dương 3D chiều sâu: Chùm tia nắng mặt trời 3D xuyên nước,
 * Rạn san hô & Rong biển 3D đung đưa, Bọt khí khúc xạ, Hạt sao lấp lánh, Sóng xung kích 3D.
 */

class EffectManager3D {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.time = 0;

    // Quản lý các nhóm hiệu ứng trong scene 3D
    this.bubbleGroup = new THREE.Group();
    this.particleGroup = new THREE.Group();
    this.kelpGroup = new THREE.Group();
    this.sunbeamGroup = new THREE.Group();
    this.shockwaveGroup = new THREE.Group();

    this.scene.add(this.bubbleGroup);
    this.scene.add(this.particleGroup);
    this.scene.add(this.kelpGroup);
    this.scene.add(this.sunbeamGroup);
    this.scene.add(this.shockwaveGroup);

    // Mảng dữ liệu cập nhật
    this.bubbles = [];
    this.particles = [];
    this.shockwaves = [];
    this.kelps = [];

    // Screen shake
    this.shakeIntensity = 0;
    this.shakeDuration = 0;

    this.initSunbeams();
    this.initKelpBed();
    this.initAmbientBubbles();
  }

  // Khởi tạo các chùm tia nắng 3D (Sunbeams / Volumetric Light Shafts)
  initSunbeams() {
    const beamCount = 6;
    const beamGeo = new THREE.ConeGeometry(80, 700, 16, 1, true);
    beamGeo.translate(0, -350, 0);

    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x64dfdf,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    for (let i = 0; i < beamCount; i++) {
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set((i - beamCount / 2) * 160 + (Math.random() * 60 - 30), 400, -100 - Math.random() * 80);
      beam.rotation.z = (Math.random() * 0.3 - 0.15);
      beam.baseRotZ = beam.rotation.z;
      beam.swaySpeed = 0.01 + Math.random() * 0.01;
      this.sunbeamGroup.add(beam);
    }
  }

  // Khởi tạo rạn rong biển 3D đung đưa ở đáy biển
  initKelpBed() {
    const kelpCount = 14;
    for (let i = 0; i < kelpCount; i++) {
      const kelpMeshGroup = new THREE.Group();
      const segments = 5;
      const height = 180 + Math.random() * 120;
      const segLen = height / segments;

      const segMeshes = [];
      let parentPivot = kelpMeshGroup;

      const kelpMat = new THREE.MeshPhongMaterial({
        color: ['#007f5f', '#2b9348', '#55a630', '#80b918'][Math.floor(Math.random() * 4)],
        shininess: 30
      });

      for (let s = 0; s < segments; s++) {
        const segGeo = new THREE.CylinderGeometry(4 - s * 0.6, 5 - s * 0.6, segLen, 8);
        segGeo.translate(0, segLen / 2, 0);
        const segMesh = new THREE.Mesh(segGeo, kelpMat);

        const pivot = new THREE.Group();
        pivot.position.y = s === 0 ? 0 : segLen;
        pivot.add(segMesh);
        parentPivot.add(pivot);

        segMeshes.push(pivot);
        parentPivot = pivot;
      }

      kelpMeshGroup.position.set((i - kelpCount / 2) * 75 + (Math.random() * 40 - 20), -350, -40 - Math.random() * 60);
      this.kelpGroup.add(kelpMeshGroup);

      this.kelps.push({
        group: kelpMeshGroup,
        segments: segMeshes,
        swaySpeed: 0.02 + Math.random() * 0.015,
        swayOffset: Math.random() * Math.PI * 2
      });
    }
  }

  // Bọt khí môi trường 3D
  initAmbientBubbles() {
    const bubbleGeo = new THREE.SphereGeometry(3, 10, 10);
    const bubbleMat = new THREE.MeshPhongMaterial({
      color: 0xcaf0f8,
      specular: 0xffffff,
      shininess: 120,
      transparent: true,
      opacity: 0.55
    });

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(bubbleGeo, bubbleMat);
      const bubble = {
        mesh: mesh,
        x: (Math.random() - 0.5) * 1100,
        y: (Math.random() - 0.5) * 700,
        z: (Math.random() - 0.5) * 200,
        speed: 1.0 + Math.random() * 1.8,
        wobbleSpeed: 0.03 + Math.random() * 0.03,
        wobbleAmp: 0.8 + Math.random() * 1.2,
        scale: 0.6 + Math.random() * 1.2
      };
      mesh.scale.setScalar(bubble.scale);
      this.bubbleGroup.add(mesh);
      this.bubbles.push(bubble);
    }
  }

  // Tạo hạt bọt khí 3D mới bay lên
  spawnBubble(threeX, threeY, scale = 1, speed = 1.6) {
    const bubbleGeo = new THREE.SphereGeometry(3, 8, 8);
    const bubbleMat = new THREE.MeshPhongMaterial({
      color: 0xcaf0f8,
      specular: 0xffffff,
      shininess: 120,
      transparent: true,
      opacity: 0.65
    });
    const mesh = new THREE.Mesh(bubbleGeo, bubbleMat);
    mesh.position.set(threeX + (Math.random() * 16 - 8), threeY + (Math.random() * 16 - 8), (Math.random() - 0.5) * 30);
    mesh.scale.setScalar(scale);
    this.bubbleGroup.add(mesh);
    this.bubbles.push({
      mesh: mesh,
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z,
      speed: speed,
      wobbleSpeed: 0.04 + Math.random() * 0.03,
      wobbleAmp: 0.8 + Math.random() * 0.8,
      scale: scale,
      temporary: true
    });
  }

  // Chữ nổi điểm số & thông báo hiệu ứng (DOM Floating Text)
  spawnFloatingText(text, screenX, screenY, color = '#ffd166', fontSize = 24) {
    const container = document.getElementById('game-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'floating-score';
    el.textContent = text;
    el.style.left = `${screenX}px`;
    el.style.top = `${screenY}px`;
    el.style.color = color;
    el.style.fontSize = `${fontSize}px`;
    container.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1000);
  }

  // Tạo hiệu ứng cắn nổ vụn 3D (Bite Splash)
  spawnBiteSplash(threeX, threeY, colorHex = 0xffbe0b, count = 16) {
    const col = typeof colorHex === 'string' ? parseInt(colorHex.replace('#', '0x'), 16) : colorHex;
    const partGeo = new THREE.SphereGeometry(2.5, 8, 8);
    for (let i = 0; i < count; i++) {
      const partMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 1
      });
      const mesh = new THREE.Mesh(partGeo, partMat);
      mesh.position.set(threeX, threeY, 0);

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;

      this.particles.push({
        mesh: mesh,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        vz: (Math.random() - 0.5) * 3,
        decay: 0.03 + Math.random() * 0.02
      });
      this.particleGroup.add(mesh);
    }
  }

  // Tạo hạt sao lấp lánh 3D (cho Nàng Tiên Cá và Frenzy)
  spawnStarParticle(threeX, threeY, colorHex = 0xffd166, size = 5) {
    const col = typeof colorHex === 'string' ? parseInt(colorHex.replace('#', '0x'), 16) : colorHex;
    const starGeo = new THREE.OctahedronGeometry(size, 0);
    const starMat = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 1
    });
    const mesh = new THREE.Mesh(starGeo, starMat);
    mesh.position.set(threeX + (Math.random() * 20 - 10), threeY + (Math.random() * 20 - 10), (Math.random() - 0.5) * 30);

    this.particles.push({
      mesh: mesh,
      vx: (Math.random() - 0.5) * 1.2,
      vy: 0.8 + Math.random() * 1.2,
      vz: (Math.random() - 0.5) * 1.5,
      rotSpeed: 0.08 + Math.random() * 0.08,
      decay: 0.025 + Math.random() * 0.02
    });
    this.particleGroup.add(mesh);
  }

  // Sóng xung kích 3D (Shockwave Ring)
  spawnShockwave(threeX, threeY, maxRadius = 160, colorHex = 0x00f5d4) {
    const col = typeof colorHex === 'string' ? parseInt(colorHex.replace('#', '0x'), 16) : colorHex;
    const ringGeo = new THREE.RingGeometry(5, 12, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(ringGeo, ringMat);
    mesh.position.set(threeX, threeY, 5);

    this.shockwaves.push({
      mesh: mesh,
      radius: 10,
      maxRadius: maxRadius,
      width: 8
    });
    this.shockwaveGroup.add(mesh);
  }

  // Rung lắc màn hình
  triggerScreenShake(intensity = 10, duration = 16) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }

  // Cập nhật mọi hoạt họa 3D
  update() {
    this.time += 1;

    // Rung camera
    if (this.shakeDuration > 0) {
      this.shakeDuration--;
      this.shakeIntensity *= 0.9;
      this.camera.position.x = (Math.random() * 2 - 1) * this.shakeIntensity;
      this.camera.position.y = (Math.random() * 2 - 1) * this.shakeIntensity;
    } else {
      this.camera.position.x = 0;
      this.camera.position.y = 0;
    }

    // Đung đưa chùm tia nắng 3D
    this.sunbeamGroup.children.forEach((beam) => {
      beam.rotation.z = beam.baseRotZ + Math.sin(this.time * beam.swaySpeed) * 0.05;
    });

    // Uốn lượn rạn rong biển 3D
    this.kelps.forEach((kelp) => {
      const wave = Math.sin(this.time * kelp.swaySpeed + kelp.swayOffset);
      kelp.segments.forEach((seg, idx) => {
        seg.rotation.z = wave * (0.08 + idx * 0.04);
      });
    });

    // Cập nhật bọt khí 3D nổi lên
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      b.y += b.speed;
      b.x += Math.sin(this.time * b.wobbleSpeed) * b.wobbleAmp;

      if (b.y > 380) {
        if (b.temporary) {
          this.bubbleGroup.remove(b.mesh);
          b.mesh.geometry.dispose();
          b.mesh.material.dispose();
          this.bubbles.splice(i, 1);
          continue;
        } else {
          b.y = -380;
          b.x = (Math.random() - 0.5) * 1100;
        }
      }
      b.mesh.position.set(b.x, b.y, b.z);
    }

    // Cập nhật hạt 3D
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.mesh.position.x += p.vx;
      p.mesh.position.y += p.vy;
      p.mesh.position.z += p.vz;
      p.vx *= 0.96;
      p.vy *= 0.96;
      if (p.rotSpeed) {
        p.mesh.rotation.x += p.rotSpeed;
        p.mesh.rotation.y += p.rotSpeed;
      }
      p.mesh.material.opacity -= p.decay;

      if (p.mesh.material.opacity <= 0) {
        this.particleGroup.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
      }
    }

    // Cập nhật sóng xung kích 3D
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.18 + 2;
      const progress = sw.radius / sw.maxRadius;
      sw.mesh.scale.set(sw.radius / 10, sw.radius / 10, 1);
      sw.mesh.material.opacity = Math.max(0, 1 - progress);

      if (progress >= 0.98 || sw.mesh.material.opacity <= 0.05) {
        this.shockwaveGroup.remove(sw.mesh);
        sw.mesh.geometry.dispose();
        sw.mesh.material.dispose();
        this.shockwaves.splice(i, 1);
      }
    }
  }
}
