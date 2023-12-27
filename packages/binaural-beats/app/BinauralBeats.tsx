"use client";
import { useState, useMemo, useEffect } from 'react';
import SineWave from './SineWave';
import audioController from './AudioController';
import FrequencySlider from './FrequencySlider';
import VolumeSlider from './VolumeSlider';
import MoodInfo from './MoodInfo';
import FrequencyInfo from './FrequencyInfo';
import PlaybackControls from './PlaybackControls';

const BinauralBeats = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userVolume, setUserVolume] = useState(1);
  const [baseFrequency, setBaseFrequency] = useState(100);
  const [frequencyDifference, setFrequencyDifference] = useState(4);

  const leftFrequency = useMemo(() => baseFrequency - frequencyDifference / 2, [baseFrequency, frequencyDifference]);
  const rightFrequency = useMemo(() => baseFrequency + frequencyDifference / 2, [baseFrequency, frequencyDifference]);

  useEffect(() => {
    if (audioController === null) return;
    audioController.setVolume(isPlaying ? userVolume : 0);
  }, [isPlaying, userVolume]);

  useEffect(() => {
    if (audioController === null) return;
    audioController.setFrequency(leftFrequency, rightFrequency);
  }, [leftFrequency, rightFrequency]);
        <div className="w-64">
          <PlaybackControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>

  useEffect(() => {
    if (audioController === null) return;
    if (isPlaying) {
      audioController.play();
    } else {
      audioController.pause();
    }
  }, [isPlaying]);

  return (
      <div className="flex flex-row flex-wrap space-x-4 space-y-4 w-full max-w-4xl justify-center items-center">
        <div className="w-64">
          <PlaybackControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
        <div className="w-64">
        <FrequencySlider min={20} max={300} value={baseFrequency} onChange={(value) => setBaseFrequency(value)} label="Base Frequency" />
        </div>
        <div className="w-64">
        <FrequencySlider min={1} max={30} value={frequencyDifference} onChange={(value) => setFrequencyDifference(value)} label="Frequency Difference" />
        </div>
        <div className="w-64">
        <VolumeSlider value={userVolume} onChange={(value) => setUserVolume(value)} />
        </div>
        <div className="w-64">
        <MoodInfo frequency={frequencyDifference} />
        </div>
        <div className="w-64">
        <FrequencyInfo leftFrequency={leftFrequency} rightFrequency={rightFrequency} />
        </div>
        <div className="w-128">
        <SineWave frequencies={[leftFrequency, rightFrequency]} themeColors={['rgba(156, 39, 176, 0.5)', 'rgba(76, 175, 80, 0.5)']} />
        </div>
      </div>
    );
}

export default BinauralBeats;