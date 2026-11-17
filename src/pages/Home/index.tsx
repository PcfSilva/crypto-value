import { useState, type ChangeEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { BsSearch } from "react-icons/bs"
import styles from "./home.module.css"

export function Home() {
  const [input, setInput] = useState("")
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [offset, setOffSet] = useState("0")

  const navigate = useNavigate()


  useEffect(() => {
    getData()
  }, [offset])

  interface CoinProps {
    changePercent24Hr: string,
    id: string,
    marketCapUsd: string,
    maxSupply: string,
    name: string,
    priceUsd: string,
    supply: string,
    symbol: string,
    volumeUsd24Hr: string,
    vwap24Hr: string,
    formatedPriceUsd?: string,
    formatedMarketUsd?: string,
    formatedVolumeUsd?: string
  }

  interface DataProps {
    data: CoinProps[]
  }

  async function getData() {
    fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=cc8568949291c0f8ea5d9b1e29d1c1db5e5a83492468ab6bb560c1cb82182941`)
      .then((response) => response.json())
      .then((data: DataProps) => {
        const dataResult = data.data
        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact"
        })

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        })

        const resultFormated = dataResult.map((item) => {
          const formated = {
            ...item,
            formatedPriceUsd: price.format(Number(item.priceUsd)),
            formatedMarketUsd: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolumeUsd: priceCompact.format(Number(item.volumeUsd24Hr))
          }

          return formated
        })
        const listCoins = [...coins, ...resultFormated]
        setCoins(listCoins)
      })
  }

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault()

    if (input === "") return
    navigate(`detail/${input}`)
  }

  function handleGetMore() {
    setOffSet(offset + 10)
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
          {coins.length > 0 && coins.map((item) =>
            <tr className={styles.tr} key={item.id}>
              <td className={(styles.tdLabel, styles.tdLogo)} data-label="Moeda">
                <img className={styles.logoCripto} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} />
                <div>
                  <Link to={`detail/${item.id}`}><span>{item.name}</span> | {item.symbol}</Link>
                </div>
              </td>
              <td className={styles.tdLabel} data-label="Valor de mercado">
                {item.formatedMarketUsd}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {item.formatedPriceUsd}
              </td>
              <td className={styles.tdLabel} data-label="Volume">
                {item.formatedVolumeUsd}
              </td>
              <td className={(Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss)} data-label="Mudança 24h">
                {Number(item.changePercent24Hr).toFixed(2)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className={styles.getMore} onClick={handleGetMore}>
        Carregar mais
      </button>
    </main>
  )
}