// o contexto permite o compartilhamento de dados entre componentes diferentes
import { createContext } from 'react';

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
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

// criacao do contexto e sua tipagem
// simulacao de um object do tipo PlayerContextData
export const PlayerContext = createContext({} as PlayerContextData);