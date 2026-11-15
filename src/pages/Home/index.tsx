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
      <table>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <div>
                <span>Bitcoin</span> | BTC
              </div>
            </td>
            <td className={styles.tdLabel} data-label="Valor de mercado">
              3T
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              8.000M
            </td>
            <td className={styles.tdLabel} data-label="Volume">
              6B
            </td>
            <td className={styles.tdProfit} data-label="Mudança 24h">
              1.5
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}