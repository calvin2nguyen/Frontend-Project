import { musicApi } from "../../lib/api";


export async function getArtists(queryType) {
    const response = await musicApi.get("/search",{
        params: {
            q: queryType,
            type: "artist",
            limit: 10
        }
    })
    console.log(response)
    return response.data.artists.items

}

