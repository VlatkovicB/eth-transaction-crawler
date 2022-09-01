import { useEffect, useState } from "react"
import axios from "axios"
import UrlBuilder from "./UrlBuilder"
import Table from "./components/Table"
import Loader from "./components/Loader"
import Error from "./components/Error"

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    const address = "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f"
    const url = new UrlBuilder(address)
      .setModule("account")
      .setAction("txlist")
      .build()

    try {
      setLoading(true)
      const {
        data: { result },
      } = await axios.get(url)
      setTransactions(result)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5">
      {loading ? <Loader /> : <Table transactions={transactions} />}
      {!!error && <Error error={error} />}
    </div>
  )
}

export default App
