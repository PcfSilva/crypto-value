import { Link } from "react-router"
import styles from "./header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          Cripto<span className={styles.subName}>Value</span>
        </Link>
      </h1>
    </header>
  )
}