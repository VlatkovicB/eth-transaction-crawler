import axios from "axios"
import BigNumber from "bignumber.js"
import moment from "moment"

import { useEffect, useState } from "react"

import UrlBuilder from "./UrlBuilder"
import Table from "./components/Table"
import Loader from "./components/Loader"
import Message from "./components/Message"
import Search from "./components/Search"
import Input from "./components/Input"
import { DATE_REGEX, MESSAGE_TYPES, WEI_VALUE } from "./constants"

const { REACT_APP_DEFAULT_STARTBLOCK, REACT_APP_DEFAULT_ENDBLOCK } = process.env

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()
  const [balance, setBalance] = useState(0)
  const [date, setDate] = useState(null)
  const [data, setData] = useState({
    address: "0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f",
    startblock: Number(REACT_APP_DEFAULT_STARTBLOCK),
    endblock: Number(REACT_APP_DEFAULT_ENDBLOCK),
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
      let {
        data: { result },
      } = await axios.get(url)

      if (Array.isArray(result)) {
        if (!!date) {
          result = result.filter(({ timeStamp }) => {
            let dateToCompare = Math.floor(date / 1000)
            return (
              moment
                .utc(timeStamp, "X")
                .isAfter(moment.utc(dateToCompare, "X")) &&
              moment
                .utc(timeStamp, "X")
                .isBefore(moment.utc(dateToCompare, "X").add(1, "day"))
            )
          })
        }

        calculateAndSetBalance(result)
        setTransactions(result)
      } else {
        setMessage({ message: result, type: MESSAGE_TYPES.DANGER })
      }
    } catch (error) {
      console.error(error)
      setMessage({ ...error, type: MESSAGE_TYPES.DANGER })
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateAndSetBalance = (transactions) => {
    const sum = transactions
      .reduce((acc, curr) => acc.plus(curr.value), BigNumber(0))
      .div(WEI_VALUE)
      .toFixed(8)

    setBalance(sum)
  }

  const changeDate = (e) => {
    const { value } = e.target
    if (DATE_REGEX.test(value)) {
      const [year, month, date] = value.split("-")

      setDate(
        moment()
          .year(year)
          .month(month - 1)
          .date(date)
      )
      setMessage(null)
    } else {
      setMessage({
        message: "Invalid date format.",
        type: MESSAGE_TYPES.DANGER,
      })
    }

    if (value.length === 0) {
      setMessage(null)
      setDate(null)
    }
  }

  return (
    <div className="p-5">
      <div className="alert alert-info">Balance: {balance}</div>
      <Input
        type="text"
        title="Check for date:"
        onChange={changeDate}
        placeholder="YYYY-MM-DD"
      />
      {!!message && <Message message={message} />}
      <Search
        data={data}
        loading={loading}
        onChange={onChange}
        submit={getTransactions}
      />
      {loading ? <Loader /> : <Table transactions={transactions} />}
    </div>
  )
}

export default App
