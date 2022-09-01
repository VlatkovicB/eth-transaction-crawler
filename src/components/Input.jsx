import React from "react"

const Input = ({ title, type, placeholder, name, onChange }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">{title}</span>
      <input
        type={type}
        className="form-control"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
