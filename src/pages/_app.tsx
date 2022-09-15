import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContextProvider } from "../contexts/PlayerContext";
import styles from "../styles/app.module.scss";
import "../styles/global.scss";

// dentro de app colocamos tudo que eh comum a todas as paginas.
// os componentes aparecerao em todas as telas

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.appWrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp
