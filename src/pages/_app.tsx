import "../styles/global.scss";

import { Header } from "../components/Header";
import { Player } from "../components/Player";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  // dentro de app colocamos tudo que eh comum a todas as paginas.
  // os componentes aparecerao em todas as telas
  return (
    <div className={styles.appWrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}

export default MyApp
