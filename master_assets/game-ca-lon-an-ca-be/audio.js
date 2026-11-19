/**
 * OCEAN FRENZY - PROCEDURAL AUDIO ENGINE
 * Hệ thống âm thanh tổng hợp 100% bằng Web Audio API
 * Không cần tải file ngoài, phản hồi tức thì, âm thanh sinh động kích thích!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.isMuted = false;
    this.isMusicMuted = false;

    // Trạng thái nhạc nền
    this.isPlayingMusic = false;
    this.tempo = 104; // BPM thông thường
    this.frenzyTempo = 138; // BPM khi Frenzy
    this.currentBeat = 0;
    this.musicTimer = null;
    this.isFrenzyActive = false;
    this.isBossActive = false;

    // Thang âm Đại Dương (D Minor Pentatonic / Dorians: D, F, G, A, C)
    this.scale = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00, 523.25];
    this.bassNotes = [73.42, 87.31, 98.00, 110.00]; // D2, F2, G2, A2
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Music Bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

    } catch (e) {
      console.warn("Web Audio API không khả dụng:", e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // =================== CÁC HIỆU ỨNG ÂM THANH (SFX) ===================

  /**
   * Tiếng cắn / đớp cá cực kỳ thỏa mãn (Chomp / Gulp)
   * Pitch biến thiên tùy theo kích cỡ con mồi
   */
  playChomp(sizeFactor = 1) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Tần số giảm dần nếu mồi lớn, cao hơn nếu mồi nhỏ
    const baseFreq = 220 / Math.max(0.6, Math.min(2.0, sizeFactor));

    // 1. Âm thanh bập miệng chính (Oscillator hạ tần số nhanh)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';

    osc.frequency.setValueAtTime(baseFreq * 2.2, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.12);

    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.13);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.13);

    // 2. Tiếng "Pop" bọt nước giòn tan kèm theo
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(baseFreq * 3.5, now);
    popOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.06);

    popGain.gain.setValueAtTime(0.5, now);
    popGain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    popOsc.connect(popGain);
    popGain.connect(this.sfxGain);

    popOsc.start(now);
    popOsc.stop(now + 0.07);

    // 3. Tiếng nhai vụn (Crunch/Splash) bằng filtered noise
    this.playBiteNoise(now);
  }

  playBiteNoise(time) {
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.setValueAtTime(3, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  /**
   * Tiếng Lướt Nhanh / Dash rẽ sóng nước
   */
  playDash() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.25);
  }

  /**
   * Tiếng Tiến Hóa / Level Up hào hùng và rực rỡ
   */
  playLevelUp() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';

      const startTime = now + idx * 0.07;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  /**
   * Tiếng Bắt đầu chế độ Frenzy Cuồng Nộ
   */
  playFrenzyStart() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Power chord hoành tráng
    const chord = [220, 277.18, 329.63, 440, 554.37, 659.25];
    chord.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(4500, now + 0.3);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);

      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 1.2);
    });
  }

  /**
   * Tiếng Cảnh Báo Sát Thủ / Cá Mập xuất hiện (Sonar Ping rùng mình)
   */
  playWarning() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Sonar Ping cao vút
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.8);

    // Tiếng gầm gừ sub trầm đe dọa
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.linearRampToValueAtTime(45, now + 0.9);

    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.9);

    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);

    subOsc.start(now);
    subOsc.stop(now + 0.9);
  }

  /**
   * Tiếng Bị Gai Cá Nóc chích (Pufferfish sting)
   */
  playPufferSting() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Tiếng Ăn Ngọc Bội (Pearl Bonus)
   */
  playPearlCollect() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const freqs = [1046.50, 1318.51, 1567.98, 2093.00];

    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.05);

      gain.gain.setValueAtTime(0.3, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.3);
    });
  }

  /**
   * Tiếng vỡ khiên bong bóng cứu mạng
   */
  playShieldBreak() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.22);
    this.playBubble();
  }

  /**
   * Khúc ca huyền diệu khi Nàng Tiên Cá bơi qua (Harp & Crystal Chimes)
   */
  playMermaidSong() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98, 2093.00];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const startTime = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.35, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.65);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(6, startTime);
      lfoGain.gain.setValueAtTime(4, startTime);
      lfo.connect(osc.frequency);
      lfo.start(startTime);
      lfo.stop(startTime + 0.65);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  }

  /**
   * Tiếng Game Over (Bị cá lớn nuốt chửng)
   */
  playGameOver() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [330, 293.66, 261.63, 196, 146.83, 98];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const startTime = now + idx * 0.12;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  /**
   * Tiếng vỡ bọt bong bóng lách tách
   */
  playBubble() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 400 + Math.random() * 400;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // =================== NHẠC NỀN DẠNG PROCEDURAL SYNTH ===================

  startMusic() {
    if (this.isPlayingMusic) return;
    this.ensureContext();
    this.isPlayingMusic = true;
    this.currentBeat = 0;
    this.scheduleNextBeat();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  setFrenzy(active) {
    this.isFrenzyActive = active;
  }

  setBossNearby(active) {
    this.isBossActive = active;
  }

  scheduleNextBeat() {
    if (!this.isPlayingMusic) return;

    const currentBpm = this.isFrenzyActive ? this.frenzyTempo : this.tempo;
    const stepDuration = 60 / currentBpm / 4; // 16th note step

    this.playStep(this.currentBeat);
    this.currentBeat = (this.currentBeat + 1) % 32;

    this.musicTimer = setTimeout(() => {
      this.scheduleNextBeat();
    }, stepDuration * 1000);
  }

  playStep(step) {
    if (!this.ctx || this.isMusicMuted) return;
    const now = this.ctx.currentTime;

    // 1. Kick/Sub-drum ở nhịp 0, 8, 16, 24
    if (step % 8 === 0) {
      this.synthKick(now);
    }

    // 2. Bubble hi-hat/shaker ở mỗi nhịp chẵn
    if (step % 2 === 0) {
      this.synthBubbleHat(now, step % 4 === 2 ? 0.15 : 0.08);
    }

    // 3. Bassline mượt mà
    if (step % 4 === 0) {
      const bassIndex = (Math.floor(step / 8)) % this.bassNotes.length;
      let bassFreq = this.bassNotes[bassIndex];
      if (this.isBossActive) bassFreq = 65; // Đổi sang tông đe dọa khi có cá mập
      this.synthBass(now, bassFreq);
    }

    // 4. Giai điệu Marimba / Đàn gõ đại dương (Melody)
    const melodySteps = [0, 3, 6, 10, 12, 14, 18, 22, 26, 28, 30];
    if (melodySteps.includes(step)) {
      const noteIdx = (step * 3 + Math.floor(step / 5)) % this.scale.length;
      const freq = this.scale[noteIdx];
      this.synthMarimba(now, freq, this.isFrenzyActive ? 0.35 : 0.2);
    }

    // 5. Nếu đang Frenzy: Thêm arpeggio synth năng lượng cao
    if (this.isFrenzyActive && step % 2 === 1) {
      const arpFreq = this.scale[(step * 2) % this.scale.length] * 1.5;
      this.synthArp(now, arpFreq);
    }
  }

  synthKick(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  synthBubbleHat(time, vol) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, time);
    osc.frequency.exponentialRampToValueAtTime(2500, time + 0.03);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + 0.035);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.035);
  }

  synthBass(time, freq) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  synthMarimba(time, freq, vol) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + 0.28);

    // Kèm theo harmonic tinh tế
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    gain2.gain.setValueAtTime(vol * 0.3, time);
    gain2.gain.exponentialRampToValueAtTime(0.005, time + 0.15);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.musicGain);
    gain2.connect(this.musicGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.28);
    osc2.stop(time + 0.15);
  }

  synthArp(time, freq) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, time);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.005, time + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.09);
  }

  // =================== ĐIỀU KHIỂN ÂM LƯỢNG / MUTE ===================

  toggleSound() {
    this.isMuted = !this.isMuted;
    if (this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.9, this.ctx.currentTime);
    }
    return !this.isMuted;
  }

  toggleMusic() {
    this.isMusicMuted = !this.isMusicMuted;
    if (this.musicGain) {
      this.musicGain.gain.setValueAtTime(this.isMusicMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return !this.isMusicMuted;
  }
}

// Khởi tạo instance toàn cục
window.soundEngine = new SoundEngine();
