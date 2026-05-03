import { musicApi } from "../../lib/api";
import { getAccessToken } from "../auth/Musicauth";


export async function getArtists(queryType) {

const token = await getAccessToken();

    const response = await musicApi.get("/search",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            q: queryType,
            type: "artist",
            limit: 10
        }
    })
    return response.data.artists.items
}
export async function getArtistAlbums(artistId) {
    const token = await getAccessToken()
    const response = await musicApi.get(`/artists/${artistId}/albums`, {
            headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data.items
}