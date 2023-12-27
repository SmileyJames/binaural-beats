"use client"
import { useState, useMemo, ReactNode, useEffect, useRef } from 'react';

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
    this.leftOscillator.connect(this.leftChannel);
    this.rightOscillator.connect(this.rightChannel);
    this.rightOscillator.start();
    this.leftOscillator.start();
    this.leftChannel.connect(this.audioContext.destination);
    this.rightChannel.connect(this.audioContext.destination);
    this.leftChannel.connect(this.leftGain);
    this.rightChannel.connect(this.rightGain);
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

type FrequencySliderProps = {
  min: number,
  max: number,
  value: number,
  onChange: (value: number) => void,
  label: string
}

const Hz = ({ value }: { value: number }) => (
  <span className="text-2xl">
    {value} Hz
  </span>
)

const VolumeSlider = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => (
  <Card>
    <div className="flex-shrink-0">
      <span className="text-2xl">
        {value * 100}%
      </span>
    </div>
    <div>
      <div className="text-xl font-medium text-black">Volume</div>
      <input type="range" min={0} max={1} step={0.01} value={value} onChange={(e) => onChange(e.target.valueAsNumber)} className="mt-2 w-full" />
    </div>
  </Card>
);

const FrequencySlider = ({ min, max, value, onChange, label }: FrequencySliderProps) => (
  <Card>
    <div className="flex-shrink-0">
      <Hz value={value} />
    </div>
    <div>
      <div className="text-xl font-medium text-black">{label}</div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(e.target.valueAsNumber)} className="mt-2 w-full" />
    </div>
  </Card>
)

const PlaybackControls = ({ isPlaying, setIsPlaying }: { isPlaying: boolean, setIsPlaying: (isPlaying: boolean) => void }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button onClick={() => setIsPlaying(!isPlaying)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

const Card = ({ children }: { children: ReactNode }) => (
  // col
  <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-1">
    {children}
  </div>
)

const FrequencyInfo = ({ frequency }: { frequency: number }) => {
  let mood: string;
  let goal: string;
  let moodColor: string;

  switch (true) {
    case (frequency < 4):
      mood = 'Delta Waves - Deep Sleep';
      goal = 'Deep sleep or healing';
      moodColor = 'text-blue-500';
      break;
    case (frequency < 8):
      mood = 'Theta Waves - Meditation';
      goal = 'Meditation or stress reduction';
      moodColor = 'text-green-500';
      break;
    case (frequency < 14):
      mood = 'Alpha Waves - Relaxed Focus';
      goal = 'Light work or studying';
      moodColor = 'text-yellow-500';
      break;
    default:
      mood = 'Beta Waves - Intense Focus';
      goal = 'Intense work or studying';
      moodColor = 'text-red-500';
  }

  return (
    <Card>
      <div className={`p-4 ${moodColor}`}>
        <div className="text-xl font-bold">{mood}</div>
        <div className="text-sm">Ideal for {goal}</div>
      </div>
    </Card>
  )
}

const FrequencyInfo2 = ({ leftFrequency, rightFrequency }: { leftFrequency: number, rightFrequency: number }) => (
  <div className="flex justify-between">
    <Card>
      <div className="font-bold text-m mb-2">Left Frequency</div>
      <p className="text-gray-700 text-base text-center">
        {leftFrequency}
      </p>
    </Card>
    <Card>
        <div className="font-bold text-m mb-2">Right Frequency</div>
        <p className="text-gray-700 text-base text-center">
          {rightFrequency}
        </p>
    </Card>
  </div>
)

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userVolume, setUserVolume] = useState(1);
  const [baseFrequency, setBaseFrequency] = useState(440);
  const [frequencyDifference, setFrequencyDifference] = useState(4);

  const leftFrequency = useMemo(() => baseFrequency - frequencyDifference / 2, [baseFrequency, frequencyDifference]);
  const rightFrequency = useMemo(() => baseFrequency + frequencyDifference / 2, [baseFrequency, frequencyDifference]);

  useEffect(() => {
    audioController.setVolume(isPlaying ? userVolume : 0);
  }, [isPlaying, userVolume]);

  useEffect(() => {
    audioController.setFrequency(leftFrequency, rightFrequency);
  }, [leftFrequency, rightFrequency]);

  useEffect(() => {
    if (isPlaying) {
      audioController.play();
    } else {
      audioController.pause();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 space-y-8">
      <div className="w-full max-w-md px-4 sm:px-0 space-y-5">
        <h1 className="text-3xl font-bold text-center mb-4">Binaural Beats</h1>
        <h2 className="text-xl text-center mb-4">Experience the power of sound therapy with our binaural beats generator</h2>
        <FrequencySlider min={20} max={300} value={baseFrequency} onChange={(value) => setBaseFrequency(value)} label="Base Frequency" />
        <FrequencySlider min={1} max={30} value={frequencyDifference} onChange={(value) => setFrequencyDifference(value)} label="Frequency Difference" />
        <VolumeSlider value={userVolume} onChange={(value) => setUserVolume(value)} />
        <FrequencyInfo frequency={frequencyDifference} />
        <FrequencyInfo2 leftFrequency={leftFrequency} rightFrequency={rightFrequency} />
        <PlaybackControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </div>
  )
}

