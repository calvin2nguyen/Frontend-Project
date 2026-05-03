import { musicApi } from "../../lib/api";


export async function getTracksbyAlbumId(albumId) {
    const response = await musicApi.get(`/albums/${albumId}/tracks`)
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