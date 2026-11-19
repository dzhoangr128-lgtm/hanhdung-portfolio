/**
 * OCEAN FRENZY 3D - PROCEDURAL 3D MODELS ENGINE
 * Tạo hình học 3D chân thực, vật liệu bóng bẩy (Specular/Phong),
 * Hệ xương bơi uốn lượn và Nàng Tiên Cá 3D kiều diễm như Feeding Frenzy!
 */

const Ocean3D = (function() {
  // Bộ nhớ đệm vật liệu & Texture dùng chung để tối ưu hiệu năng 60fps
  const textureCache = {};

  // Tạo texture da cá thủ công sắc nét
  function getFishTexture(species) {
    if (textureCache[species]) return textureCache[species];

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    if (species === 'clownfish') {
      // Nền cam rực rỡ
      const grad = ctx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, '#ff6b00');
      grad.addColorStop(0.5, '#ff8500');
      grad.addColorStop(1, '#ffa200');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // 3 dải sọc trắng viền đen kinh điển
      const stripes = [120, 260, 420];
      const widths = [60, 55, 45];
      for (let i = 0; i < stripes.length; i++) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(stripes[i] - widths[i] / 2 - 4, 0, widths[i] + 8, 256);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(stripes[i] - widths[i] / 2, 0, widths[i], 256);
      }
    } else if (species === 'neon') {
      // Cá Neon: Lưng xanh dương thẫm, bụng ánh bạc
      ctx.fillStyle = '#001d3d';
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 128, 512, 128);

      // Dải đèn điện quang xanh ngọc neon
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(80, 85, 380, 28);
      // Đuôi đỏ tươi
      ctx.fillStyle = '#ef233c';
      ctx.fillRect(0, 40, 120, 180);
    } else if (species === 'tang') {
      // Cá Bác Sĩ Lam: Xanh hoàng gia, đuôi vàng óng
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.moveTo(0, 40); ctx.lineTo(150, 128); ctx.lineTo(0, 216);
      ctx.fill();
    } else if (species === 'shark' || species === 'megalodon') {
      // Cá mập: Lưng xám đen sát thủ, bụng trắng cảnh báo
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#212529');
      grad.addColorStop(0.55, '#343a40');
      grad.addColorStop(0.65, '#e9ecef');
      grad.addColorStop(1, '#ffffff');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // 3 Vạch mang cá
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(360 + i * 16, 100, 4, 55);
      }
    } else if (species === 'moorish') {
      // Cá Thần Tiên Cờ: Sọc vàng, đen, trắng
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#000814';
      ctx.fillRect(100, 0, 80, 256);
      ctx.fillRect(300, 0, 90, 256);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(180, 0, 60, 256);
    } else if (species === 'mermaid_tail') {
      // Vảy đuôi nàng tiên cá óng ánh ngọc bích
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0, '#00b4d8');
      grad.addColorStop(0.4, '#06d6a0');
      grad.addColorStop(0.8, '#7209b7');
      grad.addColorStop(1, '#f72585');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Hoa văn vảy cá lấp lánh
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      for (let y = 10; y < 256; y += 22) {
        for (let x = 10; x < 512; x += 22) {
          ctx.beginPath();
          ctx.arc(x + (y % 44 === 0 ? 11 : 0), y, 10, 0, Math.PI);
          ctx.stroke();
        }
      }
    } else {
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(0, 0, 512, 256);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    textureCache[species] = tex;
    return tex;
  }

  // =================== 1. TẠO MÔ HÌNH CÁ 3D CHUẨN ===================

  function createFish3D(type = 'clownfish', radius = 20, isPlayer = false, level = 1) {
    const group = new THREE.Group();
    group.fishType = type;
    group.baseRadius = radius;

    // Phân cấp cấu trúc xương để diễn hoạt uốn lượn khi bơi
    const bodyPivot = new THREE.Group();
    const tailPivot = new THREE.Group();
    const finPivot = new THREE.Group();

    group.add(bodyPivot);
    bodyPivot.add(tailPivot);
    tailPivot.add(finPivot);

    group.bodyPivot = bodyPivot;
    group.tailPivot = tailPivot;
    group.finPivot = finPivot;

    let textureName = 'clownfish';
    if (type === 'neon') textureName = 'neon';
    else if (type === 'shark' || (isPlayer && level === 4)) textureName = 'shark';
    else if (type === 'moorish') textureName = 'moorish';
    else if (isPlayer && level === 2) textureName = 'tang';

    const fishTex = getFishTexture(textureName);

    // THÂN CÁ 3D (Body Geometry bóng bẩy, khí động học)
    let bodyGeo;
    let bodyMat;

    if (type === 'jellyfish') {
      return createJellyfish3D(radius);
    } else if (type === 'turtle') {
      return createTurtle3D(radius);
    } else if (type === 'anglerfish') {
      return createAnglerfish3D(radius);
    } else if (type === 'hammerhead') {
      return createHammerhead3D(radius);
    }

    // Thân cá dạng Torpedo hình thoi mượt mà
    bodyGeo = new THREE.SphereGeometry(radius, 24, 16);
    bodyGeo.scale(1.25, 0.72, 0.42);

    bodyMat = new THREE.MeshPhongMaterial({
      map: fishTex,
      shininess: 90,
      specular: 0x48cae4,
      side: THREE.DoubleSide
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyPivot.add(bodyMesh);

    // VÂY LƯNG 3D (Dorsal Fin)
    const dorsalGeo = new THREE.ConeGeometry(radius * 0.35, radius * 0.75, 4);
    dorsalGeo.scale(0.8, 1, 0.12);
    const dorsalMat = new THREE.MeshPhongMaterial({
      color: (type === 'clownfish' || (isPlayer && level === 1)) ? 0xffffff : 0x00f5d4,
      transparent: true,
      opacity: 0.85,
      shininess: 100
    });
    const dorsalMesh = new THREE.Mesh(dorsalGeo, dorsalMat);
    dorsalMesh.position.set(-radius * 0.1, radius * 0.65, 0);
    dorsalMesh.rotation.z = -0.4;
    bodyPivot.add(dorsalMesh);

    // VÂY BƠI NGỰC 3D (2 Pectoral Fins vẫy nhịp nhàng)
    const pecGeo = new THREE.CircleGeometry(radius * 0.4, 8);
    const pecMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });

    const leftFin = new THREE.Mesh(pecGeo, pecMat);
    leftFin.position.set(radius * 0.25, -radius * 0.15, radius * 0.38);
    leftFin.rotation.y = 0.5;
    bodyPivot.add(leftFin);

    const rightFin = new THREE.Mesh(pecGeo, pecMat);
    rightFin.position.set(radius * 0.25, -radius * 0.15, -radius * 0.38);
    rightFin.rotation.y = -0.5;
    bodyPivot.add(rightFin);

    group.leftFin = leftFin;
    group.rightFin = rightFin;

    // KHỚP CUỐNG ĐUÔI 3D (Tail Stalk)
    tailPivot.position.set(-radius * 0.9, 0, 0);
    const tailGeo = new THREE.CylinderGeometry(radius * 0.25, radius * 0.1, radius * 0.6, 12);
    tailGeo.rotateZ(Math.PI / 2);
    tailGeo.scale(1, 0.6, 0.35);
    const tailMesh = new THREE.Mesh(tailGeo, bodyMat);
    tailMesh.position.set(-radius * 0.25, 0, 0);
    tailPivot.add(tailMesh);

    // VÂY ĐUÔI 3D (Caudal Fin)
    finPivot.position.set(-radius * 0.5, 0, 0);
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(-radius * 0.9, radius * 0.75);
    finShape.quadraticCurveTo(-radius * 0.5, 0, -radius * 0.9, -radius * 0.75);
    finShape.closePath();

    const finExtrudeGeo = new THREE.ExtrudeGeometry(finShape, { depth: radius * 0.08, bevelEnabled: false });
    finExtrudeGeo.center();
    finExtrudeGeo.translate(-radius * 0.45, 0, 0);

    const finMat = new THREE.MeshPhongMaterial({
      color: (type === 'clownfish' || (isPlayer && level === 1)) ? 0xffaa00 : 0x00b4d8,
      transparent: true,
      opacity: 0.9,
      shininess: 80,
      side: THREE.DoubleSide
    });
    const finMesh = new THREE.Mesh(finExtrudeGeo, finMat);
    finPivot.add(finMesh);

    // MẮT CÁ 3D LONG LANH (2 Eyes với con ngươi và tròng kính bóng bẩy)
    const eyeRadius = radius * 0.22;
    const eyeGeo = new THREE.SphereGeometry(eyeRadius, 12, 12);
    const eyeWhiteMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
    const pupilGeo = new THREE.SphereGeometry(eyeRadius * 0.6, 10, 10);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });

    // Mắt trái
    const leftEye = new THREE.Group();
    leftEye.add(new THREE.Mesh(eyeGeo, eyeWhiteMat));
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(eyeRadius * 0.55, 0, eyeRadius * 0.65);
    leftEye.add(leftPupil);
    leftEye.position.set(radius * 0.65, radius * 0.15, radius * 0.32);
    bodyPivot.add(leftEye);

    // Mắt phải
    const rightEye = new THREE.Group();
    rightEye.add(new THREE.Mesh(eyeGeo, eyeWhiteMat));
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(eyeRadius * 0.55, 0, -eyeRadius * 0.65);
    rightEye.add(rightPupil);
    rightEye.position.set(radius * 0.65, radius * 0.15, -radius * 0.32);
    bodyPivot.add(rightEye);

    // HÀM DƯỚI 3D (Lower Jaw cử động há miệng)
    const jawGeo = new THREE.ConeGeometry(radius * 0.28, radius * 0.45, 6);
    jawGeo.rotateZ(-Math.PI / 2);
    jawGeo.scale(0.4, 0.4, 0.4);
    const jawMesh = new THREE.Mesh(jawGeo, bodyMat);
    jawMesh.position.set(radius * 1.05, -radius * 0.15, 0);
    bodyPivot.add(jawMesh);
    group.jawMesh = jawMesh;

    // Hào quang Frenzy bọc ngoài (chỉ người chơi dùng)
    const auraGeo = new THREE.SphereGeometry(radius * 1.5, 16, 16);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xffd166,
      transparent: true,
      opacity: 0,
      wireframe: true
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    group.add(auraMesh);
    group.auraMesh = auraMesh;

    return group;
  }

  // =================== 2. SỨA PHÁT QUANG 3D (Jellyfish) ===================

  function createJellyfish3D(radius) {
    const group = new THREE.Group();
    group.fishType = 'jellyfish';
    group.baseRadius = radius;

    // Vòm nón sứa trong suốt dạ quang
    const domeGeo = new THREE.SphereGeometry(radius, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const domeMat = new THREE.MeshPhongMaterial({
      color: 0xf72585,
      emissive: 0x7209b7,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.75,
      shininess: 120,
      side: THREE.DoubleSide
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.rotation.z = -Math.PI / 2;
    group.add(domeMesh);
    group.domeMesh = domeMesh;

    // Các dải xúc tu 3D mềm mại
    group.tentacles = [];
    const tentacleMat = new THREE.MeshBasicMaterial({ color: 0x4cc9f0, transparent: true, opacity: 0.65 });
    for (let i = 0; i < 5; i++) {
      const tGeo = new THREE.CylinderGeometry(radius * 0.05, radius * 0.02, radius * 1.8, 6);
      tGeo.translate(0, -radius * 0.9, 0);
      tGeo.rotateZ(Math.PI / 2);
      const tMesh = new THREE.Mesh(tGeo, tentacleMat);
      const angle = (i / 5) * Math.PI * 2;
      tMesh.position.set(-radius * 0.3, Math.sin(angle) * (radius * 0.4), Math.cos(angle) * (radius * 0.4));
      group.add(tMesh);
      group.tentacles.push(tMesh);
    }

    return group;
  }

  // =================== 3. RÙA BIỂN CỔ ĐẠI 3D (Sea Turtle) ===================

  function createTurtle3D(radius) {
    const group = new THREE.Group();
    group.fishType = 'turtle';
    group.baseRadius = radius;

    // Mai rùa hình vòm đồi 3D
    const shellGeo = new THREE.SphereGeometry(radius, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55);
    shellGeo.scale(1.2, 0.55, 0.9);
    const shellMat = new THREE.MeshPhongMaterial({
      color: 0x2b9348,
      specular: 0x55a630,
      shininess: 40,
      side: THREE.DoubleSide
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.rotation.z = Math.PI;
    group.add(shellMesh);

    // Đầu rùa
    const headGeo = new THREE.SphereGeometry(radius * 0.32, 12, 10);
    headGeo.scale(1.2, 0.8, 0.9);
    const headMat = new THREE.MeshPhongMaterial({ color: 0x55a630 });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.set(radius * 1.2, -radius * 0.1, 0);
    group.add(headMesh);

    // 2 Bơi chèo trước đập nước
    const flipperGeo = new THREE.BoxGeometry(radius * 0.8, radius * 0.08, radius * 0.4);
    flipperGeo.translate(0, 0, radius * 0.2);
    const flipperMat = new THREE.MeshPhongMaterial({ color: 0x38b000 });

    const leftFlipper = new THREE.Mesh(flipperGeo, flipperMat);
    leftFlipper.position.set(radius * 0.4, -radius * 0.1, radius * 0.7);
    group.add(leftFlipper);
    group.leftFlipper = leftFlipper;

    const rightFlipper = new THREE.Mesh(flipperGeo, flipperMat);
    rightFlipper.position.set(radius * 0.4, -radius * 0.1, -radius * 0.7);
    rightFlipper.scale.z = -1;
    group.add(rightFlipper);
    group.rightFlipper = rightFlipper;

    return group;
  }

  // =================== 4. CÁ ĐÈN BIỂN SÂU 3D (Anglerfish) ===================

  function createAnglerfish3D(radius) {
    const group = createFish3D('anglerfish', radius);
    group.fishType = 'anglerfish';

    // Cần câu mồi trên đầu
    const rodGeo = new THREE.TorusGeometry(radius * 0.6, radius * 0.04, 6, 12, Math.PI * 0.6);
    const rodMat = new THREE.MeshBasicMaterial({ color: 0xced4da });
    const rodMesh = new THREE.Mesh(rodGeo, rodMat);
    rodMesh.position.set(radius * 0.3, radius * 0.7, 0);
    rodMesh.rotation.z = -Math.PI * 0.2;
    group.bodyPivot.add(rodMesh);

    // Bóng đèn phát sáng dạ quang (Esca)
    const bulbGeo = new THREE.SphereGeometry(radius * 0.18, 12, 12);
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.position.set(radius * 0.9, radius * 0.9, 0);
    group.bodyPivot.add(bulbMesh);

    // Nguồn sáng thực tế tỏa ra từ bóng đèn!
    const bulbLight = new THREE.PointLight(0x00f5d4, 1.2, 150);
    bulbLight.position.set(radius * 0.9, radius * 0.9, 0);
    group.bodyPivot.add(bulbLight);

    return group;
  }

  // =================== 5. CÁ MẬP ĐẦU BÚA 3D (Hammerhead) ===================

  function createHammerhead3D(radius) {
    const group = createFish3D('shark', radius);
    group.fishType = 'hammerhead';

    // Đầu búa chữ T bề thế
    const hammerGeo = new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, radius * 1.7, 12);
    hammerGeo.scale(1, 1, 0.45);
    const hammerMat = new THREE.MeshPhongMaterial({ color: 0x343a40 });
    const hammerMesh = new THREE.Mesh(hammerGeo, hammerMat);
    hammerMesh.position.set(radius * 1.0, 0, 0);
    group.bodyPivot.add(hammerMesh);

    return group;
  }

  // =================== 6. NÀNG TIÊN CÁ 3D KIỀU DIỄM (Mermaid 3D) ===================

  function createMermaid3D() {
    const group = new THREE.Group();
    group.isMermaid = true;

    // Chiều dài tổng thể ~120px
    const scale = 1.0;

    // 1. THÂN TRÊN & NGỰC (Torso với làn da trắng hồng mịn màng)
    const torsoGeo = new THREE.CylinderGeometry(8 * scale, 6 * scale, 24 * scale, 12);
    const skinMat = new THREE.MeshPhongMaterial({
      color: 0xffdfd3,
      emissive: 0x3d2018,
      emissiveIntensity: 0.1,
      shininess: 40
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, skinMat);
    torsoMesh.rotation.z = Math.PI / 2;
    torsoMesh.position.set(10 * scale, 0, 0);
    group.add(torsoMesh);

    // Áo ngực vỏ sò tím ngọc lấp lánh (Shell Bra)
    const shellGeo = new THREE.SphereGeometry(4.5 * scale, 8, 8);
    shellGeo.scale(1, 0.5, 1);
    const braMat = new THREE.MeshPhongMaterial({ color: 0xc77dff, shininess: 80, specular: 0xffffff });

    const leftBra = new THREE.Mesh(shellGeo, braMat);
    leftBra.position.set(14 * scale, -1 * scale, 4 * scale);
    group.add(leftBra);

    const rightBra = new THREE.Mesh(shellGeo, braMat);
    rightBra.position.set(14 * scale, -1 * scale, -4 * scale);
    group.add(rightBra);

    // 2. GƯƠNG MẶT & ĐẦU (Head & Face kiều diễm)
    const headGeo = new THREE.SphereGeometry(8.5 * scale, 16, 16);
    headGeo.scale(1, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(28 * scale, 0, 0);
    group.add(headMesh);

    // Đôi mắt biếc to tròn long lanh
    const eyeGeo = new THREE.SphereGeometry(1.8 * scale, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0077b6 });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(34 * scale, 1.5 * scale, 4 * scale);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(34 * scale, 1.5 * scale, -4 * scale);
    group.add(rightEye);

    // 3. MÁI TÓC DÀI BỒNG BỀNH TRONG NƯỚC (8 lọn tóc 3D uốn lượn)
    group.hairStrands = [];
    const hairMat = new THREE.MeshPhongMaterial({
      color: 0xff9e00,
      emissive: 0x9e2a2b,
      emissiveIntensity: 0.25,
      shininess: 60
    });

    for (let h = 0; h < 6; h++) {
      const strandGeo = new THREE.CylinderGeometry(1.8 * scale, 0.4 * scale, 35 * scale, 6);
      strandGeo.translate(0, -17 * scale, 0);
      strandGeo.rotateZ(Math.PI / 2);
      const strandMesh = new THREE.Mesh(strandGeo, hairMat);
      strandMesh.position.set(22 * scale - h * 3, 3 * scale + (h % 2) * 2, (h - 2.5) * 3);
      group.add(strandMesh);
      group.hairStrands.push(strandMesh);
    }

    // Bông hoa sao biển cài tóc
    const flowerGeo = new THREE.ConeGeometry(3 * scale, 1.5 * scale, 5);
    const flowerMat = new THREE.MeshBasicMaterial({ color: 0xff0054 });
    const flowerMesh = new THREE.Mesh(flowerGeo, flowerMat);
    flowerMesh.position.set(28 * scale, 7 * scale, 6 * scale);
    flowerMesh.rotation.x = Math.PI / 2;
    group.add(flowerMesh);

    // 4. CÁNH TAY BƠI UỐN LƯỢN (Slender Arms)
    const armGeo = new THREE.CylinderGeometry(1.6 * scale, 1.2 * scale, 22 * scale, 8);
    armGeo.translate(0, -11 * scale, 0);
    armGeo.rotateZ(Math.PI / 2);

    const leftArm = new THREE.Mesh(armGeo, skinMat);
    leftArm.position.set(16 * scale, 0, 7 * scale);
    group.add(leftArm);
    group.leftArm = leftArm;

    const rightArm = new THREE.Mesh(armGeo, skinMat);
    rightArm.position.set(16 * scale, 0, -7 * scale);
    group.add(rightArm);
    group.rightArm = rightArm;

    // 5. ĐUÔI CÁ 3 KHỚP UỐN SÓNG (3-Segment Mermaid Tail)
    const tailTex = getFishTexture('mermaid_tail');
    const tailMat = new THREE.MeshPhongMaterial({
      map: tailTex,
      shininess: 95,
      specular: 0x00f5d4,
      side: THREE.DoubleSide
    });

    const tail1 = new THREE.Group();
    const tail1Geo = new THREE.CylinderGeometry(6 * scale, 4.5 * scale, 24 * scale, 12);
    tail1Geo.rotateZ(Math.PI / 2);
    tail1.add(new THREE.Mesh(tail1Geo, tailMat));
    tail1.position.set(-10 * scale, 0, 0);
    group.add(tail1);

    const tail2 = new THREE.Group();
    const tail2Geo = new THREE.CylinderGeometry(4.5 * scale, 3 * scale, 22 * scale, 10);
    tail2Geo.rotateZ(Math.PI / 2);
    tail2.add(new THREE.Mesh(tail2Geo, tailMat));
    tail2.position.set(-22 * scale, 0, 0);
    tail1.add(tail2);

    // VÂY ĐUÔI CÁ TIÊN MỀM MẠI (Translucent Caudal Fin)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.quadraticCurveTo(-15 * scale, 18 * scale, -32 * scale, 22 * scale);
    finShape.quadraticCurveTo(-22 * scale, 0, -32 * scale, -22 * scale);
    finShape.quadraticCurveTo(-15 * scale, -18 * scale, 0, 0);

    const flukeGeo = new THREE.ShapeGeometry(finShape);
    flukeGeo.center();
    flukeGeo.translate(-16 * scale, 0, 0);
    const flukeMat = new THREE.MeshPhongMaterial({
      color: 0x00f5d4,
      emissive: 0x7209b7,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
      shininess: 100,
      side: THREE.DoubleSide
    });
    const flukeMesh = new THREE.Mesh(flukeGeo, flukeMat);
    flukeMesh.position.set(-12 * scale, 0, 0);
    tail2.add(flukeMesh);

    group.tail1 = tail1;
    group.tail2 = tail2;
    group.flukeMesh = flukeMesh;

    // Nguồn sáng ấm áp huyền diệu tỏa ra từ Nàng Tiên Cá
    const mermaidLight = new THREE.PointLight(0xffbe0b, 1.5, 220);
    group.add(mermaidLight);

    return group;
  }

  return {
    createFish3D,
    createMermaid3D,
    getFishTexture
  };
})();
