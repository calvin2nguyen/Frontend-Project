import { musicApi } from "../../lib/api";


export async function getArtists(queryType) {
    const response = await musicApi.get("/search",{
        params: {
            q: queryType,
            type: "artist",
            limit: 10
        }
    })
    return response.data.artists.items
}
export async function getArtistAlbums(artistId) {
    console.log(artistId)
    const response = await musicApi.get(`/artists/${artistId}/albums`)
    return response.data.items
}