import { GetStaticProps } from "next";
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import  Image  from 'next/image';
import  Link  from 'next/link';
import { format, parseISO } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convetDurationToTimeString } from "../utils/convertDurationToTimeString";
import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
} 

type HomeProps = {
  // array of episodes
  // equals to generic Array<Episode>
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { play } = useContext(PlayerContext);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {/* faz um map que renderiza todos os episodios do array
              eh possivel retornar codigo html atraves do map

              dentro do map eh necessario ter uma key unica
              o primeiro elemento deve conter essa chave
              essa prop serve para o react
          */}
          {latestEpisodes.map(episode => {
              return(
                <li key={episode.id}>
                  {/* componente de imagem do next que permite tratamento */}
                  <Image
                    width={192} 
                    height={192} 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    objectFit="cover"
                  />
                  
                  <div className={styles.episodeDetails}> 
                  {/* esse componente evita carregamento de todos os componentes */}
                    <Link href={`/episodes/${episode.id}`}>
                      <a >{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                    <button type="button" onClick={() => play(episode)}>
                      <img src="/play-green.svg" alt="Tocar episódio do podcast" />
                    </button>
                </li>
              )
            })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode =>{
              return(
                <tr key={episode.id}>
                  <td style={{width: 72}}>
                    <Image 
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit='cover'
                    />
                  </td>
                  <td>
                    <Link  href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{width:100}}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => play(episode)}>
                      <img src='/play-green.svg' alt="Tocar podcast" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  // faz o tratamento dos dados antes da renderizacao
  // recomenda-se fazer esse processo antes da renderizacao por causa de seo
  // e para evitar renderizacoes desnecessarias

  const episodes = data.map(episodes => {
    return {
      id: episodes.id,
      title: episodes.title,
      thumbnail: episodes.thumbnail,
      members: episodes.members,
      publishedAt: format(parseISO(episodes.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      duration: Number(episodes.file.duration),
      durationAsString: convetDurationToTimeString(episodes.file.duration),
      url: episodes.file.url
    }
  });

  // faz a separacao do array de episodios
  // o slice recebe como parametros a posicao inicial e final
  // faz a separacao das secoes da pagina inicial

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}
