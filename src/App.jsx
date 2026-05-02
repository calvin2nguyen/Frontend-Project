import { useEffect, useState } from 'react'
import { getAlbums } from './features/albums/AlbumApi'
import { getArtists ,  getArtistAlbums } from './features/artists/ArtistsApi'
import PlaybackSelection from './features/playback/PlaybackSection'
import AlbumSection from './features/albums/AlbumSection'
import ArtistSection from './features/artists/ArtistsSection'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
 
  

function handleSelectAlbum(album) {
  setSelectedAlbum(null) // reset first
  setTimeout(() => {
    setSelectedAlbum(album)
  }, 0)
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


      <section id="next-steps">
        <div id="docs">
          <h2>New Releases</h2>
            <AlbumSection albums={albums} onSelectAlbum={handleSelectAlbum} />
          <h2>Top Artists</h2>
            <ArtistSection artists={artists} onSelectArtist={handleSelectArtist} /> 
        </div>
      </section>

      <PlaybackSelection album={selectedAlbum}/>
      
 
    </>
    
  )
}

export default App
