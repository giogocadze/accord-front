'use client';
import Image from 'next/image';
import React from 'react';

import useAudioPlayer from '../../hooks/useAudioPlayer';
import styles from './AudioPlayer.module.scss';
import SeekSlider from './components/SeekSlider/SeekSlider';
import VolumeSlider from './components/volumeSlider/VolumeSlider';

const Audioplayer = () => {
  const {
    audioRef,
    currentTime,
    duration,
    isOpen,
    volume,
    isMuted,
    menuRef,
    togglePlayback,
    toggleMute,
    toggleMenu,
    setCurrentTime,
    setVolume,
  } = useAudioPlayer();

  let isPlaying = false;
  if (audioRef.current) {
    if (!audioRef.current.paused) {
      isPlaying = true;
    } else {
      isPlaying = false;
    }
  }
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
