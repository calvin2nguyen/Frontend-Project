import { musicApi } from "../../lib/api";
import { getAccessToken } from "../auth/Musicauth";


export async function getTracksbyAlbumId(albumId) {
    const token = getAccessToken();
    const response = await musicApi.get(`/albums/${albumId}/tracks`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.items
}

export async function searchTracks(query) {
  const response = await musicApi.get("/search", {
    params: {
      q: query.trim(),
      type: "track",
      limit: 10,
      market: "US",
    },
  })

  return response.data.tracks.items
}