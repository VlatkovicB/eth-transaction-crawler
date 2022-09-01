import axios from "axios"

import { useEffect, useState } from "react"

import UrlBuilder from "./UrlBuilder"
import Table from "./components/Table"
import Loader from "./components/Loader"
import Error from "./components/Error"
import Search from "./components/Search"

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState({
    address: "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
    startblock: 0,
    endblock: 9999999,
  })

  useEffect(() => {
    getTransactions()
    // eslint-disable-next-line
  }, [])

  const getTransactions = async () => {
    const url = new UrlBuilder(data.address)
      .setStartblock(data.startblock)
      .setEndblock(data.endblock)
      .setModule("account")
      .setAction("txlist")
      .build()

    try {
      setLoading(true)
      const {
        data: { result },
      } = await axios.get(url)
      if (Array.isArray(result)) {
        setTransactions(result)
      } else {
        console.log(result)
        setError({ message: result })
      }
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-5">
      <Search
        data={data}
        loading={loading}
        onChange={onChange}
        submit={getTransactions}
      />
      {loading ? <Loader /> : <Table transactions={transactions} />}
      {!!error && <Error error={error} />}
    </div>
  )
}

export default App
