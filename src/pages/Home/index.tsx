import { BsSearch } from "react-icons/bs"
import styles from "./home.module.css"

export function Home() {
  return (
    <main className={styles.container}>
      <form>
        <input
          type="text"
          placeholder="Digite sua moeda aqui!"
        />
        <button>
          <BsSearch size={30} color="#fff" />
        </button>
      </form>
    </main>
  )
}