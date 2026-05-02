import axios from "axios"

const TOKEN = "hidden"

export const musicApi = axios.create(  
    {
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        Authorization : `Bearer ${TOKEN}`
    }
    }
)




