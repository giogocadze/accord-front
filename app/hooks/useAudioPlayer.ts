import { useEffect, useRef, useState } from 'react';
import { Track } from '../shared/components/AudioPlayer/Interfaces/trackListInterface';
import { trackList } from '../shared/components/AudioPlayer/data/tracklist';

const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const menuRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTrack: Track = trackList[currentIndex];
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    if (audio.readyState >= 1) handleLoadedMetadata();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentTrack.src;
    audio.load();

    setCurrentTime(0);
    audio.play();
  }, [currentTrack]);
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      const restored = prevVolume > 0 ? prevVolume : 0.5;
      audio.volume = restored;
      setVolume(restored);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % trackList.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? trackList.length - 1 : prev - 1));
    setCurrentTime(0);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setCurrentTime(0);
  };
  const toggleMenu = () => setIsOpen(prev => !prev);

  return {
    audioRef,
    currentTime,
    duration,
    isOpen,
    volume,
    isMuted,
    currentIndex,
    menuRef,
    currentTrack,
    togglePlayback,
    toggleMute,
    toggleMenu,
    setCurrentTime,
    setVolume,
    setCurrentIndex,
    handleNext,
    handlePrevious,
    handleReplay,
  };
};

export default useAudioPlayer;
