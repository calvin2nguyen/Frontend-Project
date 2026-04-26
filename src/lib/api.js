import axios from "axios"

const clientId = "process.env.REACT_APP_CLIENT_ID"
const auth = clientId+":"+ clientSecret
export const musicApi = axios.create({
    baseURL: "https://api.spotify.com/"
})

