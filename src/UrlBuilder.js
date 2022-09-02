const {
  REACT_APP_ETHSCAN_API_KEY,
  REACT_APP_DEFAULT_PAGESIZE,
  REACT_APP_DEFAULT_STARTBLOCK,
  REACT_APP_DEFAULT_ENDBLOCK,
} = process.env

export default class UrlBuilder {
  baseUrl = "https://api.etherscan.io/api?"
  starblock = REACT_APP_DEFAULT_STARTBLOCK
  endblock = REACT_APP_DEFAULT_ENDBLOCK
  apiKey = REACT_APP_ETHSCAN_API_KEY
  pagination = false
  page = 1
  pageSize = REACT_APP_DEFAULT_PAGESIZE
  offset = this.page * this.pageSize
  sort = "asc"

  constructor(address) {
    this.address = address
  }

  setModule(module) {
    this.module = module
    return this
  }

  setAction(action) {
    this.action = action
    return this
  }

  setStartblock(startblock) {
    this.startblock = startblock
    return this
  }

  setEndblock(endblock) {
    this.endblock = endblock
    return this
  }

  setTag(tag) {
    this.tag = tag
    return this
  }

  setPage(page) {
    this.page = page
    return this
  }

  setPageSize(pageSize) {
    this.pageSize = pageSize
    return this
  }

  setSort(sort) {
    this.sort = sort
    return this
  }

  setPaginationUsage(value) {
    this.pagination = value
    return this
  }

  build() {
    let url = this.baseUrl
    if (this.module) url += `&module=${this.module}`
    if (this.action) url += `&action=${this.action}`
    if (this.address) url += `&address=${this.address}`
    if (this.startblock) url += `&startblock=${this.startblock}`
    if (this.endblock) url += `&endblock=${this.endblock}`
    if (this.tag) url += `&tag=${this.tag}`

    if (this.pagination) {
      if (this.page) url += `&page=${this.page}`
      if (this.offset) url += `&offset=${this.offset}`
    }

    if (this.sort) url += `&sort=${this.sort}`
    url += `&apiKey=${this.apiKey}`

    return url
  }
}
