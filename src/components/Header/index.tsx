import styles from "./styles.module.scss";
import ptBR from 'date-fns/locale/pt-BR';
import format from "date-fns/format";

export function Header() {

    const currentDate = format(new Date(), "EEEEEEE, d MMMM", {
        locale : ptBR
    });

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr"></img>

            <p>O melhor para você ouvir, sempre</p>

            <span>{ currentDate }</span>
        </header>
    );
}