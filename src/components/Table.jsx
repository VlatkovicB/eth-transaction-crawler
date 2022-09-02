import React from "react"

import BigNumber from "bignumber.js"

import { WEI_VALUE } from "../constants"

const Table = ({ transactions }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Block Number</th>
          <th scope="col">Time</th>
          <th scope="col">Value</th>
          <th scope="col" className="d-flex justify-content-end">
            From
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions?.length > 0 &&
          transactions.map(({ blockNumber, from, value, timeStamp }, i) => (
            <tr key={blockNumber + "" + i}>
              <td className="col-1">
                {new Date(timeStamp * 1000).toUTCString()}
              </td>
              <td className="col-1">{blockNumber}</td>
              <td className="col-1">
                {BigNumber(value).div(WEI_VALUE).toFixed(8)}
              </td>
              <td className="col d-flex justify-content-end">{from}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Table
