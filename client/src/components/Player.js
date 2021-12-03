import React, { useState } from 'react'
import styles from './Player.module.scss';
import Slider from '@mui/material/Slider';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import SkipNext from '@mui/icons-material/SkipNext';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Player = () => {
  const [slider, setSlider] = useState(0);
  const [playing, setPlaying] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#eb892e",
      },
    },
  });


  return (
    <div className={styles.Player}>
      <div className={styles.controlsContainer}>
        <ThemeProvider theme={theme}>
          <div className={styles.sliderRow}>
            <p style={{ textAlign: 'left' }}>{slider}%</p>
            <div className={styles.sliderContainer}>

              <Slider defaultValue={0} setp={1} min={0} max={100} onChange={e => { setSlider(e.target.value) }} value={slider} />


            </div>
            <p style={{ textAlign: 'right' }}>{slider}%</p>
          </div>

          <div className={styles.Buttons}>
            <SkipPrevious />
            {!playing && <PlayCircleIcon onClick={e => { setPlaying(true) }} />}
            {playing && <PauseCircleIcon onClick={e => { setPlaying(false) }} />}
            <SkipNext />
          </div>
        </ThemeProvider>
      </div >

    </div >);

}
