import { useEffect, useState } from 'react'
import { getAlbums } from './features/albums/AlbumApi'
import { getArtists ,  getArtistAlbums } from './features/artists/ArtistsApi'
import { searchTracks } from './features/tracks/TrackApi'
import PlaybackSelection from './features/playback/PlaybackSection'
import AlbumSection from './features/albums/AlbumSection'
import ArtistSection from './features/artists/ArtistsSection'
import Search from "./features/search/Search"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [tracks, setTracks] = useState([])
 
  

function handleSelectAlbum(album) {
  setSelectedAlbum(null)
  setTimeout(() => {
    setSelectedAlbum(album)
  }, 0)
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
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>TuneStream</h1>
          <p>
            Explore Music
          </p>
        </div>
      </section>

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

    {tracks.map((track) => (
      <div key={track.id} className="track-result">
        <img src={track.album.images[0]?.url} />
        <div>
          <p>{track.name}</p>
          <span>{track.artists[0]?.name}</span>
        </div>
      </div>
    ))}
  </aside>
</div>

      {/* <PlaybackSelection album={selectedAlbum}/> */}
      
 
    </>
    
  )
}

export default App
