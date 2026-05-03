import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { getTracksbyAlbumId } from "../tracks/TrackApi"
import { useEffect, useState } from 'react';



const Widget = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,

  height: 72,
  padding: '0 16px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  backgroundColor: '#121212',   // 🔥 use dark, not white
  color: '#fff',

  borderTop: '1px solid #282828',

  zIndex: 1000,
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function PlaybackSelection({ album, track }) {
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [savedAlbum , setSavedAlbum] = useState(null)

  
  async function getRandomTrack(){
    const response = await getTracksbyAlbumId(album.id)
    const trackNum = Math.floor(Math.random() * response.length)
  // while (response[trackNum]?.id === selectedTrack?.id) {
  //   trackNum = Math.floor(Math.random() * response.length)
  // }
    setSelectedTrack(response[trackNum])
    setSavedAlbum(album)
  }

useEffect(() => {
  if (track) {
    setSelectedTrack(track)
    setSavedAlbum(track.album)
    return
  }
  if (album) {
    getRandomTrack()
  }
}, [album, track])
  
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  return (
   <Box
  sx={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 2000,

    backgroundColor: "#181818",   // 👈 dark
    borderTop: "1px solid #282828",

    px: 2,
    py: 1,
  }}
>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="can't win - Chilling Sunday"
              src={savedAlbum.images[0]?.url}
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
                {selectedTrack?.artists?.[0].name}
            </Typography>
            <Typography noWrap>
              <b>{selectedTrack?.name}</b>
            </Typography>
            <Typography noWrap sx={{ letterSpacing: -0.25 }}>
              {savedAlbum?.name}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={(t) => ({
            color: 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                ...t.applyStyles('dark', {
                  boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                }),
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
            ...t.applyStyles('dark', {
              color: '#fff',
            }),
          })}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
            '& svg': {
              color: '#000',
              ...theme.applyStyles('dark', {
                color: '#fff',
              }),
            },
          })}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={(theme) => ({
            alignItems: 'center',
            mb: 1,
            px: 1,
            '& > svg': {
              color: 'rgba(0,0,0,0.4)',
              ...theme.applyStyles('dark', {
                color: 'rgba(255,255,255,0.4)',
              }),
            },
          })}
        >
          <VolumeDownRounded />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={(t) => ({
              color: 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              ...t.applyStyles('dark', {
                color: '#fff',
              }),
            })}
          />
          <VolumeUpRounded />
        </Stack>
      </Widget>

    </Box>
  );
}

// function PlaybackSelection({ selectedAlbum }) {
//   const [paused, setPaused] = useState(true)
//   async function getRandomTrack(){
//     const response = await getTracksbyAlbumId(selectedAlbum)
//     console.log(response)
//   }

// return(
// <Card
//   variant="outlined"
//   sx={{  p: 2,
//     width: { xs: '100%', sm: 'auto' },
//     display: 'flex',
//     flexDirection: { xs: 'column', sm: 'row' },
//     alignItems: 'center',
//     gap: 2,
//   }}
// >
//   <CardMedia
//     component="img"
//     width="100"
//     height="100"
//     alt="Contemplative Reptile album cover"
//     src="/images/contemplative-reptile.jpg"
//     sx={{    width: { xs: '100%', sm: 100 },
//     }}
//   />
//   <Stack direction="column" sx={{ alignItems: 'center' }} spacing={1} useFlexGap>
//     <div>
//       <Typography sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
//         Contemplative Reptile
   
//       </Typography>
//       <Typography
//         variant="caption"
//         sx={{ color: 'text.secondary', fontWeight: 'medium', textAlign: 'center', width: '100%' }}
//       >
//         Sounds of Nature
//       </Typography>
//     </div>
//     <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1} useFlexGap>
//       <IconButton aria-label="Shuffle" disabled size="small">
//         <ShuffleRounded fontSize="small" />
//       </IconButton>
//       <IconButton aria-label="Fast rewind" disabled size="small">
//         <FastRewindRounded fontSize="small" />
//       </IconButton>
//       <IconButton
//         aria-label={paused ? 'Play music' : 'Pause music'}
//         onClick={() => setPaused((val) => !val)}
//         sx={{ mx: 1 }}
//       >
//         {paused ? <PlayArrowRounded /> : <PauseRounded />}
//       </IconButton>
//       <IconButton aria-label="Fast forward" disabled size="small">
//         <FastForwardRounded fontSize="small" />
//       </IconButton>
//       <IconButton aria-label="Loop music" disabled size="small">
//         <LoopRounded fontSize="small" />
//       </IconButton>
//     </Stack>
//   </Stack>
// </Card>
// )
// }

export default PlaybackSelection