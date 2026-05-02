import { musicApi } from "../../lib/api";


export async function getAlbums(queryType) {
    const response = await musicApi.get("/search",{
        params: {
            q: "2024",
            type: "album",
            limit: 10
        }
    })
    return response.data.albums.items
}