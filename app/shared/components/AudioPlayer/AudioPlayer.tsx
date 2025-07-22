'use client';
import Image from 'next/image';
import React from 'react';

import useAudioPlayer from '../../../hooks/useAudioPlayer';
import styles from './AudioPlayer.module.scss';
import { AudioplayerProps } from './Interfaces/AudioplayerPropsInterface';
import SeekSlider from './components/SeekSlider/SeekSlider';
import VolumeSlider from './components/volumeSlider/VolumeSlider';

function Audioplayer(props: AudioplayerProps) {
  const audioPlayerControls = useAudioPlayer(props.songs);

  const isPlaying =
    audioPlayerControls.audioRef.current && !audioPlayerControls.audioRef.current.paused;

  return (
    <div className={styles.container}>
      <audio {...audioPlayerControls.audioSpread()} />
      <div className={styles.wrapper}>
        <div className={styles.album}>
          <Image
            alt="Album Cover"
            height={112}
            width={112}
            src={audioPlayerControls.currentTrack?.cover || ''}
          />
          <div className={styles.paraghraps}>
            <p className={styles.paraghrap}>{audioPlayerControls.currentTrack?.title || ''}</p>
            <p className={styles.musicartist}>{audioPlayerControls.currentTrack?.artist || ''}</p>
          </div>
        </div>

        <div className={styles.audiobuttons}>
          <div className={styles.player}>
            <Image
              src="/audio/backward.svg"
              height={64}
              width={64}
              alt="backward"
              onClick={audioPlayerControls.handlePrevious}
              className={styles.forward}
            />
            <button onClick={audioPlayerControls.togglePlayback} className={styles.playbutton}>
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
            <Image
              src="/audio/forward.svg"
              height={64}
              width={64}
              alt="forward"
              onClick={audioPlayerControls.handleNext}
              className={styles.forward}
            />
          </div>
          <div className={styles.seekload}>
            <div className={styles.timer}>
              <SeekSlider
                duration={audioPlayerControls.duration}
                currentTime={audioPlayerControls.currentTime}
                onChange={value => {
                  if (audioPlayerControls.audioRef.current) {
                    audioPlayerControls.audioRef.current.currentTime = value;
                    audioPlayerControls.setCurrentTime(value);
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
              src={audioPlayerControls.isMuted ? '/audio/mute.svg' : '/audio/volume.svg'}
              height={32}
              width={32}
              alt="volume"
              className={styles.box1}
              onClick={audioPlayerControls.toggleMute}
            />
            {!audioPlayerControls.isMuted && (
              <div className={styles.box}>
                <VolumeSlider
                  value={audioPlayerControls.volume}
                  onChange={(vol: number) => audioPlayerControls.setVolume(vol)}
                />
              </div>
            )}
          </div>

          <Image src="/audio/expand.svg" height={32} width={32} alt="expand" />

          <div className={styles.content} ref={audioPlayerControls.menuRef}>
            <button onClick={audioPlayerControls.toggleMenu} className={styles.dotButton}>
              <Image src="/audio/dot.svg" height={32} width={32} alt="dots" />
            </button>

            <div
              className={`${styles.dropdown} ${
                audioPlayerControls.isOpen ? styles.dropdownOpen : ''
              }`}
            >
              <div className={styles.item}>
                <Image src="/audio/add.svg" height={20} width={20} alt="Add To Playlist" />
                <span className={styles.span}>Add To Playlist</span>
              </div>
              <div className={styles.item} onClick={audioPlayerControls.handleReplay}>
                <Image src="/audio/repeat.svg" height={20} width={20} alt="Play Again" />
                <span className={styles.span}>Play Again</span>
              </div>
              <div className={styles.item} onClick={audioPlayerControls.handleNext}>
                <Image src="/audio/next.svg" height={20} width={20} alt="Play Next" />
                <span className={styles.span}>Play Next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Audioplayer;
