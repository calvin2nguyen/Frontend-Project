import { IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import AddIcon from "@mui/icons-material/Add"

function TrackList({ tracks, onPlay, onAdd }) {
  return (
    <>
      {tracks.map((track) => (
        <div
          key={track.id}
          className="track-result"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
            cursor: "pointer"
          }}
        >
          <img src={track.album.images[0]?.url} width={60} />

          <div style={{ flex: 1 }}>
            <p>{track.name}</p>
            <span>{track.artists[0]?.name}</span>
          </div>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onAdd(track)
            }}
            sx={{
              color: "white",
              "&:hover": { color: "#A2BFFE" }
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onPlay(track)
            }}
            sx={{
              background: "#A2BFFE",
              color: "black",
              "&:hover": { background: "#749df7" }
            }}
          >
            <PlayArrowIcon />
          </IconButton>
        </div>
      ))}
    </>
  )
}

export default TrackList