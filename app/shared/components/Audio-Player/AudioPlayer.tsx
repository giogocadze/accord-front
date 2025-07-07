'use client';
import { Howl } from 'howler';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import styles from './AudioPlayer.module.scss';
import SeekSlider from './SeekSlider/SeekSlider';
import VolumeSlider from './volumeSlider/VolumeSlider';

const Audioplayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    const sound = new Howl({
      src: ['Luna997 x Eko - Aante [Prod.Sabanadze].mp3'],
      html5: true,
      volume: 0.5,
      onplay: () => {
        setIsPlaying(true);
        setDuration(sound.duration());
      },
      onend: () => {
        clearInterval(intervalRef.current!);
        setIsPlaying(false);
      },
    });

    soundRef.current = sound;

    intervalRef.current = setInterval(() => {
      if (sound.playing()) {
        setCurrentTime(sound.seek() as number);
      }
    }, 500);

    return () => {
      sound.stop();
      sound.unload();
      clearInterval(intervalRef.current!);
    };
  }, []);

  const togglePlayback = () => {
    if (!soundRef.current) return;
    if (soundRef.current.playing()) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };
  const toggleMute = () => {
    if (!soundRef.current) return;
    if (isMuted) {
      const restoredVolume = prevVolume > 0 ? prevVolume : 0.5;
      soundRef.current.volume(restoredVolume);
      setVolume(restoredVolume);
    } else {
      if (volume > 0) {
        setPrevVolume(volume);
      }
      soundRef.current.volume(0);
      setVolume(0);
    }

    setIsMuted(!isMuted);
  };

  const toggleMenu = () => setIsOpen(prev => !prev);
  return (
    <div className={styles.container}>
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
                  if (soundRef.current) {
                    soundRef.current.seek(value);
                    setCurrentTime(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonwrapper}>
          <Image src={'/audio/shuffle.svg'} height={32} width={32} alt="shuffle" />
          <div className={styles.volumecontainer}>
            <Image
              src={isMuted ? '/audio/mutee.svg' : 'audio/volume.svg'}
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
                    soundRef.current?.volume(vol);
                  }}
                />
              </div>
            )}
          </div>
          <Image src={'/audio/expand.svg'} height={32} width={32} alt="expand" />
          <div className={styles.content} ref={menuRef}>
            <button onClick={toggleMenu} className={styles.dotButton}>
              <Image src="/audio/dot.svg" height={32} width={32} alt="dots" />
            </button>
            <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`}>
              <div className={styles.item}>
                <Image src="/audio/add.svg" height={20} width={20} alt="Add To Playlist" />
                <span className={styles.span}>Add To Playlist</span>
              </div>
              <div className={styles.repeatitem}>
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
