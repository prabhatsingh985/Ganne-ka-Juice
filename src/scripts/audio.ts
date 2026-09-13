/**
 * Zero-Asset Web Audio API Synthesizer & Ambient Generator for Ganna Baar
 * Procedurally generates ambient lo-fi vibes and drink SFX with zero external files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private lofiInterval: number | null = null;
  private isLofiPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopLofi();
    } else {
      this.startLofi();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startLofi() {
    this.initContext();
    if (!this.ctx || this.isLofiPlaying) return;
    this.isLofiPlaying = true;
    this.isMuted = false;

    // Generative Lo-Fi Ambient Chords (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
    const chords = [
      [349.23, 440.00, 523.25, 659.25], // F4, A4, C5, E5
      [329.63, 392.00, 493.88, 587.33], // E4, G4, B4, D5
      [293.66, 349.23, 440.00, 523.25], // D4, F4, A4, C5
      [261.63, 329.63, 392.00, 493.88], // C4, E4, G4, B4
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (!this.isLofiPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentNotes = chords[chordIdx % chords.length];
      chordIdx++;

      currentNotes.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Warm tape-like filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        // Slow attack & long release
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 4.6);
      });
    };

    playNextChord();
    this.lofiInterval = window.setInterval(playNextChord, 4200);
  }

  public stopLofi() {
    this.isLofiPlaying = false;
    if (this.lofiInterval !== null) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }
  }

  public toggleLofi(): boolean {
    if (this.isLofiPlaying) {
      this.stopLofi();
      this.isMuted = true;
      return false;
    } else {
      this.startLofi();
      return true;
    }
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // best-effort
    }
  }

  public playGulp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.16);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // best-effort
    }
  }

  public playCheers() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch {
      // best-effort
    }
  }
}

export const soundEngine = new SoundEngine();
