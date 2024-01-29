import axios from "axios"
import fs from 'fs'

const http = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${fs.readFileSync('token', 'utf8')}`
  }
})

export default http
