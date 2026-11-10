import { Race } from '../types/starcraft';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxVolume: number = 0.7;
  private ambientVolume: number = 0.25;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private currentRace: Race = 'terran';

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.value = muted ? 0 : this.ambientVolume;
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
  }

  public setAmbientVolume(vol: number) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && !this.isMuted) {
      this.ambientGain.gain.value = this.ambientVolume;
    }
  }

  // Play UI clicks based on active race
  public playUIClick(race: Race = this.currentRace) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (race === 'terran') {
      // Metallic mechanical click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.04);
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    } else if (race === 'zerg') {
      // Organic wet squish
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    } else {
      // Protoss crystal chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.03);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.12);
      gain.gain.setValueAtTime(0.3 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Play Ability SFX
  public playAbilitySound(soundType: string) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (soundType) {
      case 'stim': {
        // Stimpack injection hiss + adrenaline pulse
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.4, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1800, t);
        filter.frequency.exponentialRampToValueAtTime(400, t + 0.35);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5 * this.sfxVolume, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        whiteNoise.start(t);

        // Heartbeat thump
        const heartOsc = this.ctx.createOscillator();
        const heartGain = this.ctx.createGain();
        heartOsc.type = 'sine';
        heartOsc.frequency.setValueAtTime(85, t + 0.15);
        heartOsc.frequency.exponentialRampToValueAtTime(35, t + 0.35);
        heartGain.gain.setValueAtTime(0.6 * this.sfxVolume, t + 0.15);
        heartGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        heartOsc.connect(heartGain);
        heartGain.connect(this.ctx.destination);
        heartOsc.start(t + 0.15);
        heartOsc.stop(t + 0.45);
        break;
      }

      case 'explosion': {
        // Heavy cannon / blast
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(25, t + 0.6);
        gain.gain.setValueAtTime(0.8 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.7);
        break;
      }

      case 'lightning': {
        // Psionic storm crackle
        for (let i = 0; i < 5; i++) {
          const delay = i * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(600 + Math.random() * 800, t + delay);
          osc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 200, t + delay + 0.15);
          gain.gain.setValueAtTime(0.4 * this.sfxVolume, t + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.18);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + delay);
          osc.stop(t + delay + 0.2);
        }
        break;
      }

      case 'teleport': {
        // Protoss Blink / Warp
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(1760, t + 0.25);
        gain.gain.setValueAtTime(0.5 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
        break;
      }

      case 'mechanical': {
        // Tank siege mode / transformation gears
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.linearRampToValueAtTime(120, t + 0.3);
        osc.frequency.linearRampToValueAtTime(340, t + 0.6);
        gain.gain.setValueAtTime(0.3 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.7);
        break;
      }

      case 'bio': {
        // Zerg roar / frenzy
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + 0.4);
        gain.gain.setValueAtTime(0.5 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.55);
        break;
      }

      default: {
        // Generic laser / projectile sound
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(900, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.18);
        gain.gain.setValueAtTime(0.35 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
      }
    }
  }

  // Play unit voice lines with radio / alien modulation
  public playVoiceQuote(text: string, race: Race) {
    if (this.isMuted) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // cancel previous
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (race === 'terran') {
        utterance.pitch = 0.85; // radio operator pitch
        utterance.rate = 1.05;
      } else if (race === 'zerg') {
        utterance.pitch = 0.35; // deep guttural swarm voice
        utterance.rate = 0.85;
      } else {
        utterance.pitch = 1.25; // resonant psionic telepathy
        utterance.rate = 0.95;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  // Start continuous ambient background drone according to race
  public setRaceAmbient(race: Race) {
    this.currentRace = race;
    this.initCtx();
    if (!this.ctx) return;

    // Stop previous oscillators
    this.ambientOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.ambientOscillators = [];

    if (!this.ambientGain) {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.connect(this.ctx.destination);
    }
    this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.ambientVolume, this.ctx.currentTime);

    const t = this.ctx.currentTime;

    if (race === 'terran') {
      // Low industrial drone + engine hum (60Hz & 120Hz harmonics)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, t);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, t);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.ambientGain);

      osc1.start();
      osc2.start();
      this.ambientOscillators.push(osc1, osc2);
    } else if (race === 'zerg') {
      // Swarm breathing biomechanical drone (pulsating low frequency)
      const osc = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(70, t);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.3, t); // slow 0.3Hz breathing
      lfoGain.gain.setValueAtTime(25, t);

      lfo.connect(osc.frequency);
      osc.connect(this.ambientGain);

      osc.start();
      lfo.start();
      this.ambientOscillators.push(osc, lfo);
    } else {
      // Protoss ethereal harmonic chord (C minor modal psionic hum)
      const freqs = [130.81, 155.56, 196.00, 261.63]; // C3, Eb3, G3, C4
      freqs.forEach(f => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        subGain.gain.setValueAtTime(0.2, t);
        osc.connect(subGain);
        subGain.connect(this.ambientGain);
        osc.start();
        this.ambientOscillators.push(osc);
      });
    }
  }
}

export const soundEngine = new SoundEngine();
