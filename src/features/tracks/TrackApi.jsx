import { musicApi } from "../../lib/api";
import { getAccessToken } from "../auth/Musicauth";


export async function getTracksbyAlbumId(albumId) {
    const token = await getAccessToken();
    const response = await musicApi.get(`/albums/${albumId}/tracks`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.items
}

export async function searchTracks(query) {
    const token = await getAccessToken();  
    const response = await musicApi.get("/search", {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    params: {
      q: query.trim(),
      type: "track",
      limit: 4,
    },
  })

  return response.data.tracks.items
}