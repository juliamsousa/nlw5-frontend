// o contexto permite o compartilhamento de dados entre componentes diferentes
import { createContext, useState, ReactNode } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  // recebe uma funcao de retorno void
  play: (episodes: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

type PlayerContextProviderProps = {
  children: ReactNode
}

// criacao do contexto e sua tipagem
// simulacao de um object do tipo PlayerContextData
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider ( { children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList (list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if (hasNext) 
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);

    return;
  }

  function playPrevious() {
    if (hasPrevious)
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);

    return;
  }

  return (
    <PlayerContext.Provider value = {{ 
      episodeList, 
      currentEpisodeIndex, 
      play, 
      playList,
      isPlaying, 
      togglePlay, 
      playNext,
      playPrevious,
      setPlayingState,
      hasNext,
      hasPrevious
    }}>
      {children}
    </PlayerContext.Provider>
  );
}