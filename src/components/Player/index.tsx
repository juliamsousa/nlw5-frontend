import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Image from 'next/image';
import styles from "./styles.module.scss";

export function Player() {
  // a ref é utilizada para mexer em elementos de forma imperativa
  // semelhante a um getElementById
  // o typescript informa que é uma ref do tipo nativo adio do html
  const audioRef = useRef<HTMLAudioElement>(null);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!audioRef.current)
      return;

    isPlaying ? 
      audioRef.current.play() :
      audioRef.current.pause();
    
  }, [isPlaying])
  
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora"></img>
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}> 
          <Image 
            width={192}
            height={192}
            src={episode.thumbnail}
            objectFit='cover'
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
            <div className={styles.slider}> 
            {
              episode ? (
                <Slider 
                  trackStyle={{ backgroundColor: '#04d361'}}
                  railStyle={{ backgroundColor: '#9f75ff'}}
                  handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                />
              ) : (
                <div className={styles.emptySlider} />
              )
            }
            </div>
          <span>00:00</span>
        </div>

        { episode && (
          <audio 
            src={episode.url}
            ref={audioRef}
            autoPlay
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="embaralhar"></img>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="tocar anterior"></img>
          </button>

          <button 
            type="button" 
            disabled={!episode} 
            className={styles.playButton}
            onClick={togglePlay}
          >
            { isPlaying ?
              <img src="/pause.svg" alt="tocar"></img> :
              <img src="/play.svg" alt="tocar"></img> 
            }
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="tocar ´próximo"></img>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="repetição"></img>
          </button>
        </div>
      </footer>
    </div>
  );
}
