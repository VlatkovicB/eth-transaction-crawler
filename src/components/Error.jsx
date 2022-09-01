import React from "react"

const Error = ({ error }) => {
  return (
    <div className="alert alert-danger d-flex justify-content-center">
      {error.message}
    </div>
  )
}

export default Error
