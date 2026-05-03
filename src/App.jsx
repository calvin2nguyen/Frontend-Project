import { useEffect, useState } from 'react'
import { getAlbums } from './features/albums/AlbumApi'
import { getArtists ,  getArtistAlbums } from './features/artists/ArtistsApi'
import { searchTracks } from './features/tracks/TrackApi'
import TrackList from "./features/tracks/TrackList"
import PlaybackSelection from './features/playback/PlaybackSection'
import AlbumSection from './features/albums/AlbumSection'
import ArtistSection from './features/artists/ArtistsSection'
import Search from "./features/search/Search"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { IconButton } from "@mui/material"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import homeLogo from './assets/logo.png'

import './App.css'


function App() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [tracks, setTracks] = useState([])
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [playlist, setPlaylist] = useState([])
 
  

function handleSelectAlbum(album) {
  setSelectedAlbum(null)
  setSelectedTrack(null)
  setTimeout(() => {
    setSelectedAlbum(album)
  }, 0)
}

function handleAddToPlaylist(track) {
  if (playlist.find((t) => t.id === track.id)) return

  setPlaylist((prev) => [...prev, track])
}

async function handleSearch(query) {
  if (!query.trim()) return
  const tracks = await searchTracks(query)
  setTracks(tracks)
}
  
  async function handleSelectArtist(artist){
    const albums = await getArtistAlbums(artist.id)
    // Have to get random album here because getting Artist top picks was deprecated and not working :(
    const randomNum = Math.floor(Math.random() * albums.length)
    setSelectedAlbum(albums[randomNum])
  }

  useEffect( () => {
    async function loadAlbums(){
      const data = await getAlbums("year:2026")
      setAlbums(data);
    }
  loadAlbums()
  },[])

  useEffect( () => {
    async function loadArtists(){
      const data = await getArtists("year:2026")
      setArtists(data);
    }
    loadArtists()
  },[])

  

  return (
    <>
 <>
<section
  id="center"
  style={{ backgroundImage: `url(${homeLogo})` }}
>
</section>
</>

<div className="app-shell">
  <aside className="left-sidebar">
    <p>Playlists</p>
  </aside>

  <main className="main-content">
    <AlbumSection albums={albums} onSelectAlbum={handleSelectAlbum} />
    <ArtistSection artists={artists} onSelectArtist={handleSelectArtist} />
  </main>

  <aside className="right-sidebar">
    <Search onSearch={handleSearch} />
    <TrackList
    tracks={tracks}
    onPlay={setSelectedTrack}
    onAdd={handleAddToPlaylist}
  />
  </aside>
</div>

    {selectedAlbum && (
  <PlaybackSelection album={selectedAlbum} track={selectedTrack} />
  
)}
      
 
    </>
    
  )
}

export default App
