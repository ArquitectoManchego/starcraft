import { Race, SC2Entity } from '../types/starcraft';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxVolume: number = 0.8;
  private ambientVolume: number = 0.2;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;

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
    if (this.currentAudioElement) {
      this.currentAudioElement.muted = muted;
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public setSfxVolume(vol: number) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.sfxVolume;
    }
  }

  // Play authentic ripped audio file
  public playAudioFile(path: string): Promise<void> {
    if (this.isMuted) return Promise.resolve();
    return new Promise((resolve) => {
      try {
        if (this.currentAudioElement) {
          this.currentAudioElement.pause();
          this.currentAudioElement = null;
        }
        const audio = new Audio(path);
        audio.volume = this.sfxVolume;
        this.currentAudioElement = audio;
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      } catch {
        resolve();
      }
    });
  }

  // Play unit voice response - authentic audio file if available, or synthesized voice
  public playEntityVoice(entity: SC2Entity) {
    if (this.isMuted) return;

    if (entity.audioClips && entity.audioClips.length > 0) {
      // Pick random authentic audio clip
      const randomClip = entity.audioClips[Math.floor(Math.random() * entity.audioClips.length)];
      this.playAudioFile(randomClip);
      return;
    }

    // Fallback to speech synthesis
    this.playVoiceQuote(entity.quote, entity.race);
  }

  // Play UI clicks
  public playUIClick(race: Race = 'terran') {
    if (this.isMuted) return;
    // Play authentic SC2 select sound if available
    try {
      const audio = new Audio('/sounds/select.wav');
      audio.volume = this.sfxVolume * 0.6;
      audio.play().catch(() => {
        this.synthesizeClick(race);
      });
    } catch {
      this.synthesizeClick(race);
    }
  }

  private synthesizeClick(race: Race) {
    this.initCtx();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (race === 'terran') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.04);
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    } else if (race === 'zerg') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.03);
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
        break;
      }
      case 'explosion': {
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
      default: {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.15);
        gain.gain.setValueAtTime(0.4 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      }
    }
  }

  // Speech synthesis fallback
  public playVoiceQuote(text: string, race: Race) {
    if (this.isMuted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (race === 'terran') {
        utterance.pitch = 0.85;
        utterance.rate = 1.05;
      } else if (race === 'zerg') {
        utterance.pitch = 0.35;
        utterance.rate = 0.85;
      } else {
        utterance.pitch = 1.25;
        utterance.rate = 0.95;
      }
      window.speechSynthesis.speak(utterance);
    }
  }

  // Ambient race drone
  public setRaceAmbient(race: Race) {
    this.initCtx();
    if (!this.ctx) return;

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
  }
}

export const soundEngine = new SoundEngine();
