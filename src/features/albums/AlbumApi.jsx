import { musicApi } from "../../lib/api";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { getAccessToken } from "../auth/Musicauth";

export async function getAlbums(queryType) {
    const token = await getAccessToken()
    const response = await musicApi.get("/search",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            q: queryType,
            type: "album",
            limit: 10
        }
    })
    return response.data.albums.items
}

export async function getAlbum(queryType){
    const token = await getAccessToken()
    const response = await musicApi.get("/search",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}