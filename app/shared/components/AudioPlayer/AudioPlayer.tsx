'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import styles from './AudioPlayer.module.scss';
import SeekSlider from './SeekSlider/SeekSlider';
import VolumeSlider from './volumeSlider/VolumeSlider';

const Audioplayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setCurrentTime(0);
      setIsPlaying(false);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    if (audio.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
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
  const toggleMenu = () => setIsOpen(prev => !prev);
  return (
    <div className={styles.container}>
      <audio
        ref={audioRef}
        src="/Luna997 x Eko - Aante [Prod.Sabanadze].mp3"
        preload="metadata"
        hidden
      />
      <div className={styles.wrapper}>
        <div className={styles.album}>
          <Image alt="Album card" height={112} width={112} src="/audio/anate.png" />
          <div className={styles.paraghraps}>
            <p className={styles.paraghrap}>Anate</p>
            <p className={styles.musicartist}>Luna 997</p>
          </div>
        </div>
        <div className={styles.audiobuttons}>
          <div className={styles.player}>
            <Image src="/audio/backward.svg" height={64} width={64} alt="backward" />
            <button onClick={togglePlayback} className={styles.playbutton}>
              <div className={styles.playWrapper}>
                <Image
                  src={isPlaying ? '/audio/play.svg' : '/audio/pause.svg'}
                  width={64}
                  height={64}
                  alt={isPlaying ? 'Play' : 'Pause'}
                  className={isPlaying ? styles.pauseIcon : styles.playIcon}
                />
              </div>
            </button>
            <Image src="/audio/forward.svg" height={64} width={64} alt="forward" />
          </div>
          <div className={styles.seekload}>
            <div className={styles.timer}>
              <SeekSlider
                duration={duration}
                currentTime={currentTime}
                onChange={value => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = value;
                    setCurrentTime(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonwrapper}>
          <Image src="/audio/shuffle.svg" height={32} width={32} alt="shuffle" />
          <div className={styles.volumecontainer}>
            <Image
              src={isMuted ? '/audio/mute.svg' : '/audio/volume.svg'}
              height={32}
              width={32}
              alt="volume"
              className={styles.box1}
              onClick={toggleMute}
            />
            {!isMuted && (
              <div className={styles.box}>
                <VolumeSlider
                  value={volume}
                  onChange={(vol: number) => {
                    setVolume(vol);
                    setIsMuted(vol === 0);
                    if (audioRef.current) audioRef.current.volume = vol;
                  }}
                />
              </div>
            )}
          </div>

          <Image src="/audio/expand.svg" height={32} width={32} alt="expand" />
          <div className={styles.content} ref={menuRef}>
            <button onClick={toggleMenu} className={styles.dotButton}>
              <Image src="/audio/dot.svg" height={32} width={32} alt="dots" />
            </button>
            <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`}>
              <div className={styles.item}>
                <Image src="/audio/add.svg" height={20} width={20} alt="Add To Playlist" />
                <span className={styles.span}>Add To Playlist</span>
              </div>
              <div className={styles.item}>
                <Image src="/audio/repeat.svg" height={20} width={20} alt="Play Again" />
                <span className={styles.span}>Play Again</span>
              </div>
              <div className={styles.item}>
                <Image src="/audio/next.svg" height={20} width={20} alt="Play Next" />
                <span className={styles.span}>Play Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audioplayer;
