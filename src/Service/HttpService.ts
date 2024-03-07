import axios from "axios"
import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../../', 'token');

const http = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${fs.readFileSync(filePath, 'utf8')}`
  }
})

export default http
