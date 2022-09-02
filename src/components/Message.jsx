import React, { useEffect, useState } from "react"
import { MESSAGE_TYPES } from "../constants"

const Message = ({ message }) => {
  const [alertType, setAlertType] = useState()

  useEffect(() => {
    let alert = ""
    const { type } = message
    if (type === MESSAGE_TYPES.INFO) {
      alert = "alert-info"
    }
    if (type === MESSAGE_TYPES.DANGER) {
      alert = "alert-danger"
    }

    setAlertType(alert)
  }, [message])

  return (
    <div className={`alert ${alertType} d-flex justify-content-center`}>
      {message.message}
    </div>
  )
}

export default Message
