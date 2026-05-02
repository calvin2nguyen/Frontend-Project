import { useEffect, useState } from 'react'
import { getAlbums } from './features/albums/albumApi'
import { getArtists } from './features/artists/artists'
import AlbumSection from './features/albums/albumSection'
import ArtistSection from './features/artists/artistsSection'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])

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

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>New Releases</h2>
          <ul>
            <AlbumSection albums={albums} />
          <h2>Top Artists</h2>
            <ArtistSection artists={artists} />
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
