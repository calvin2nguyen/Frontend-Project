import axios from "axios"

//Expires every hour when generated.
const token = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN
console.log(token)
export const musicApi = axios.create(  
    {
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        Authorization : `Bearer ${token}`
    }
    }
)




