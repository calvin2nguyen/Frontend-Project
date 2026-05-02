import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

function ArtistSection({ artists, onSelectArtist }) {
  return (
    <Box sx={{ bgcolor: "#121212", color: "white", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          New Releases 
        </Typography>
        
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {artists.map((artist) => (
          <Card
            key={artist.id}
            onClick={() => onSelectArtist(artist)}
            sx={{
              minWidth: 180,
              bgcolor: "#181818",
              color: "white",
              p: 1.5,
              borderRadius: 2,
              position: "relative",
              "&:hover": {
                bgcolor: "#282828",
              },
              "&:hover .playBtn": {
                opacity: 1,
                transform: "translateY(0)",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={artist.images[0]?.url}
                alt={artist.name}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />

              <IconButton
                className="playBtn"
                sx={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  bgcolor: "#939794",
                  color: "black",
                  opacity: 0,
                  transform: "translateY(8px)",
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "#939794",
                  },
                }}
              >
                <PlayArrowIcon />
              </IconButton>
            </Box>

            <Typography fontWeight="bold" sx={{ mt: 1 }} noWrap>
              {artist.name}
            </Typography>

            <Typography color="#b3b3b3" noWrap>
              {artist.artists}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default ArtistSection