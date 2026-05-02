import { musicApi } from "../../lib/api";


export async function getTracksbyAlbumId(albumId) {
    const response = await musicApi.get(`/albums/${albumId}/tracks`)
    return response.data.items
}