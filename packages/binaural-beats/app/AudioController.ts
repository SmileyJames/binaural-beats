class AudioController {
  private audioContext: AudioContext;
  private leftChannel: StereoPannerNode;
  private rightChannel: StereoPannerNode;
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode;
  private rightGain: GainNode;
  private leftFrequency: number;
  private rightFrequency: number;

  constructor() {
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.leftChannel = this.audioContext.createStereoPanner();
    this.rightChannel = this.audioContext.createStereoPanner();
    this.leftChannel.pan.value = -1;
    this.rightChannel.pan.value = 1;
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.leftFrequency = 98;
    this.rightFrequency = 102;
  }

  setVolume(volume: number) {
    this.leftGain.gain.value = volume;
    this.rightGain.gain.value = volume;
  }

  setFrequency(leftFrequency: number, rightFrequency: number) {
    this.leftFrequency = leftFrequency;
    this.rightFrequency = rightFrequency;

    if (!this.leftOscillator || !this.rightOscillator) return;
    this.leftOscillator.frequency.value = leftFrequency;
    this.rightOscillator.frequency.value = rightFrequency;
    this.leftOscillator.type = 'sine';
    this.rightOscillator.type = 'sine';
  }

  play() {
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
  
    // Set the frequency of the oscillators here
    this.leftOscillator.frequency.value = this.leftFrequency;
    this.rightOscillator.frequency.value = this.rightFrequency;
  
    this.leftOscillator.connect(this.leftGain);
    this.rightOscillator.connect(this.rightGain);
    this.leftGain.connect(this.leftChannel);
    this.rightGain.connect(this.rightChannel);
    this.rightOscillator.start();
    this.leftOscillator.start();
    this.leftChannel.connect(this.audioContext.destination);
    this.rightChannel.connect(this.audioContext.destination);
  }

  pause() {
    if (this.leftOscillator) {
      this.leftOscillator.stop();
      this.leftOscillator = null;
    }
    if (this.rightOscillator) {
      this.rightOscillator.stop();
      this.rightOscillator = null;
    }
  }
}

const audioController = typeof window !== 'undefined' ? new AudioController() : null;

export default audioController;