import styles from "./header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
      <h1>Cripto<span className={styles.subName}>Value</span></h1>
    </header>
  )
}