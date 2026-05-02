import { musicApi } from "../../lib/api";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

export async function getAlbums(queryType) {
    const response = await musicApi.get("/search",{
        params: {
            q: queryType,
            type: "album",
            limit: 10
        }
    })
    return response.data.albums.items
}

export async function getAlbum(queryType){
    const response = await musicApi.get("/search",{
        params: {

        }
    })
}