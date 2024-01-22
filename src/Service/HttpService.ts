import axios from "axios"

const http = axios.create({
  baseURL: "https://api.spotify.com/v1/",
})

export default http
