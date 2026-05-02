import { useState } from "react"
import { Box, TextField, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

function Search({ onSearch }) {
  const [query, setQuery] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    onSearch(query)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search songs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          input: { color: "white" },
          "& input::placeholder": {
            color: "#b3b3b3",
            opacity: 1,
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#242424",
            borderRadius: "999px",
            "& fieldset": {
              borderColor: "#444",
            },
            "&:hover fieldset": {
              borderColor: "#777",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#A2BFFE",
            },
          },
        }}
      />

      <IconButton type="submit" sx={{ color: "white" }}>
        <SearchIcon />
      </IconButton>
    </Box>
  )
}

export default Search