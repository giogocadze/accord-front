import { useEffect, useRef, useState } from 'react';
import { Track } from '../shared/components/AudioPlayer/Interfaces/track-list.interface';

const useAudioPlayer = (songs: Track[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const menuRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentTrack = songs[currentIndex];
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.src;
    audio.load();
    audio.play();
  }, [currentTrack]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + songs.length) % songs.length);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const audioSpread = () => ({
    ref: audioRef,
    src: currentTrack?.src,
    preload: 'metadata',
    hidden: true,
  });
  return {
    audioRef,
    menuRef,
    currentTrack,
    currentIndex,
    currentTime,
    duration,
    volume,
    isMuted,
    isOpen,
    togglePlayback,
    toggleMute,
    toggleMenu,
    handleNext,
    handlePrevious,
    handleReplay,
    setCurrentTime,
    setCurrentIndex,
    setVolume,
    audioSpread,
  };
};

export default useAudioPlayer;
