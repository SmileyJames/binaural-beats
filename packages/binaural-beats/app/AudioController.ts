class AudioController {
  private audioContext: AudioContext;
  private leftChannel: StereoPannerNode;
  private rightChannel: StereoPannerNode;
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode;
  private rightGain: GainNode;

  constructor() {
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.leftChannel = this.audioContext.createStereoPanner();
    this.rightChannel = this.audioContext.createStereoPanner();
    this.leftChannel.pan.value = -1;
    this.rightChannel.pan.value = 1;
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
  }

  setVolume(volume: number) {
    this.leftGain.gain.value = volume;
    this.rightGain.gain.value = volume;
  }

  setFrequency(leftFrequency: number, rightFrequency: number) {
    if (!this.leftOscillator || !this.rightOscillator) return;
    this.leftOscillator.frequency.value = leftFrequency;
    this.leftOscillator.type = 'sine';
    this.rightOscillator.frequency.value = rightFrequency;
    this.rightOscillator.type = 'sine';
  }

  play() {
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
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

const audioController = new AudioController();

export default audioController;