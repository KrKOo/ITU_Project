import React, { useState ,useEffect,useRef} from 'react'
import styles from './Player.module.scss';
import Slider from '@mui/material/Slider';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import SkipNext from '@mui/icons-material/SkipNext';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Player = (props) => {
  const [slider, setSlider] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [bool, setBool] = useState(false);

  //const { title, artist } = props.queue[0];
  const audioRef = useRef (new Audio(props.audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
 

  useEffect(() => {
    
    if (bool === props.playing){
      audioRef.current.pause();

      audioRef.current = new Audio(props.audioSrc);
     ;
  
      if (isReady.current ) {
        audioRef.current.play();
      } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
      }
    }
    else if (props.playing === true) {
      if (isReady.current) {
        audioRef.current.play();
      } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
      }
    }
    else audioRef.current.pause()
    setBool(props.playing);
    
  }, [props.queue, props.playing])
  






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
        <p>Song playing: {props.currSong}</p>
        <ThemeProvider theme={theme}>
          <div className={styles.sliderRow}>
            <p style={{ textAlign: 'left' }}>{slider}%</p>
            <div className={styles.sliderContainer}>

              <Slider defaultValue={0} step={1} min={0} max={100} onChange={e => { setSlider(e.target.value) }} value={slider} />


            </div>
            <p style={{ textAlign: 'right' }}>{slider}%</p>
          </div>

          <div className={styles.Buttons}>
            <SkipPrevious />
            {!props.playing && <PlayCircleIcon onClick={e => { if(Object.keys(props.currSong).length!==0) props.playHandler(true)} }/>}
            {props.playing && <PauseCircleIcon onClick={e => { props.playHandler(false) }} />}
            <SkipNext />
          </div>
        </ThemeProvider>
      </div >

    </div >);

}
