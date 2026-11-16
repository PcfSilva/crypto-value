import { useState, type ChangeEvent, useEffect } from "react"
import { useNavigate } from "react-router"
import { BsSearch } from "react-icons/bs"
import styles from "./home.module.css"

export function Home() {
  const [input, setInput] = useState("")
  const [coins, setCoins] = useState<CoinProps[]>([])

  const navigate = useNavigate()


  useEffect(() => {
    getData()
  }, [])

  interface CoinProps {
    changePercent24Hr: String,
    id: String,
    marketCapUsd: String,
    maxSupply: String,
    name: String,
    priceUsd: String,
    supply: String,
    symbol: String,
    volumeUsd24Hr: String,
    vwap24Hr: String
  }

  interface DataProps {
    data: CoinProps[]
  }

  async function getData() {
    fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=cc8568949291c0f8ea5d9b1e29d1c1db5e5a83492468ab6bb560c1cb82182941")
      .then((response) => response.json())
      .then((data: DataProps) => {
        const dataResult = data.data
        const price = Intl.NumberFormat("en-US", {
          currency: "USD"
        })

        const resultFormated = dataResult.map((item) => {
          const formated = {
            ...item,
            priceUsdFormated: price.format(Number(item.priceUsd))
          }

          return formated
        })

        console.log(resultFormated)
      })
  }

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault()

    if (input === "") return
    navigate(`detail/${input}`)
  }

  function handleGetMore() {
    alert("BUSCAR MAIS")
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite sua moeda aqui!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
      <button className={styles.getMore} onClick={handleGetMore}>
        Carregar mais
      </button>
    </main>
  )
}