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
  const [bool, setBool] = useState(false);

  //const { title, artist } = props.queue[0];
  const audio = useRef (new Audio(props.audioSrc));
  const interval = useRef();
  const ready = useRef(false);
  const { duration } = audio.current;

  const Timer = () => {
    // Clear any timers already running
    clearInterval(interval.current);

    interval.current = setInterval(() => {
      if (audio.current.ended) {
        if(props.queueIndex + 1 < props.queue.length) {
          props.indexHandler(props.queueIndex + 1);
          clearInterval(interval.current);
          audio.current.currentTime = 0;
          setSlider(audio.current.currentTime);
          audio.current.play();
          Timer();
        }
        else {
          props.playHandler(false)
          audio.current.pause();
        }
      } else {
        setSlider(audio.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(interval.current);
    audio.current.currentTime = value;
    setSlider(audio.current.currentTime);
    if(props.playing) Timer();
  };

  useEffect(() => {
    
    if (props.playing === true) {
      if (ready.current) {
        audio.current.play();
        Timer();
      } else {
        // Set the ready ref as true for the next pass
        ready.current = true;
      }
    }
    else audio.current.pause();
    
  }, [props.playing])

  useEffect(() => {
    
      audio.current.pause();

      audio.current = new Audio(props.audioSrc);
     ;
  
      if (ready.current ) {
        audio.current.play();
        Timer();
      } else {
        // Set the ready ref as true for the next pass
        ready.current = true;
      }
    
    
  }, [props.queue, props.currSong])
  






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
        <p>Song playing: {props.currSong.title}</p>
        <ThemeProvider theme={theme}>
          <div className={styles.sliderRow}>
            <p style={{ textAlign: 'left' }}>0:00</p>
            <div className={styles.sliderContainer}>

              <Slider defaultValue={0} min={0} max={duration ? duration : `${duration}`} onChange={(e) => onScrub(e.target.value)} value={slider} />


            </div>
            <p style={{ textAlign: 'right' }}>{Object.keys(props.currSong).length!==0 ? duration : ''}</p>
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
