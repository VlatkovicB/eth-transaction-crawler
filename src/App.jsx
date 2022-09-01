import { useEffect, useState } from "react"
import axios from "axios"
import UrlBuilder from "./UrlBuilder"

const App = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    const address = "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f"
    const url = new UrlBuilder(address)
      .setModule("account")
      .setAction("txlist")
      .build()

    const {
      data: { result },
    } = await axios.get(url)

    setTransactions(result)
  }

  return (
    <div className="p-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Block Number</th>
            <th scope="col">Time</th>
            <th scope="col">From</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ blockNumber, from, value, timeStamp }, i) => (
            <tr key={blockNumber + "" + i}>
              <td>{timeStamp}</td>
              <td>{blockNumber}</td>
              <td>{value}</td>
              <td>{from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
