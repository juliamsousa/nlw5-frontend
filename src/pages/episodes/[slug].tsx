import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
import { convetDurationToTimeString } from "../../utils/convertDurationToTimeString";
import ptBR from 'date-fns/locale/pt-BR';
import { api }from '../../services/api';
import Image from 'next/image';
import styles from './episode.module.scss';
import Link from 'next/link';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: string;
  description: string;
  durationAsString: string;
  url: string;
  publishedAt: string;
} 

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  // const router = useRouter();

  return(
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href={'/'}> 
          <button type="button">
            <img src="/arrow-left.svg" alt="Retornar"/>
          </button>
        </Link>
        <Image 
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit='cover'
        />
        <button>
          <img src='/play.svg' alt="Tocar podcast" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div 
        className={styles.description} 
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // nome do aquivo que vem dentro de []
  // [slug]
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    description: data.description,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    durationAsString: convetDurationToTimeString(data.file.duration),
    url: data.file.url
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24
  }
}