import React, { useEffect } from "react"
import Input from "./Input"

const Search = ({
  data: { address, startblock, endblock },
  onChange,
  loading,
  submit,
}) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        submit()
        event.preventDefault()
      }
    }
    document.addEventListener("keydown", listener)
    return () => {
      document.removeEventListener("keydown", listener)
    }
  })

  return (
    <div className="row">
      <div className="col">
        <Input
          name="address"
          placeholder={address}
          title="Address:"
          type="text"
          onChange={onChange}
        />
      </div>
      <div className="col">
        <Input
          name="startblock"
          placeholder={startblock}
          title="Start Block:"
          type="number"
          onChange={onChange}
        />
      </div>
      <div className="col">
        <Input
          name="endblock"
          placeholder={endblock}
          title="End Block:"
          type="number"
          onChange={onChange}
        />
      </div>
      <div className="col-auto">
        <button className="btn btn-primary" onClick={submit}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span>{" "}
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  )
}

export default Search
