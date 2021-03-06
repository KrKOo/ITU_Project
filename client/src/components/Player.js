/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Player.js
 * Autori: Luboš Martinček (xmarti96)
 *
 */

import React, { useState, useEffect, useRef } from 'react'
import styles from './Player.module.scss';
import Slider from '@mui/material/Slider';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import SkipNext from '@mui/icons-material/SkipNext';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Player = (props) => {
  const [slider, setSlider] = useState(0);
  const [currTime, setCurrTime] = useState(0);

  const audio = useRef(new Audio(props.audioSrc));
  const interval = useRef();
  const ready = useRef(false);
  const { duration } = audio.current;


  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 32: //SPACE
        if (!props.playing) {
          if (Object.keys(props.currSong).length !== 0) {
            props.playHandler(true)
          }
        }
        else {
          props.playHandler(false)
        }
        break;
      case 39: //RIGHT ARROW
        if (Object.keys(props.currSong).length !== 0) handleChange(true)
        break;
      case 37: //LEFT ARROW
        if (Object.keys(props.currSong).length !== 0) handleChange(false)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [props])



  const Timer = () => {
    // Clear any timers already running
    clearInterval(interval.current);

    interval.current = setInterval(() => {
      if (audio.current.ended) {
        if (props.queueIndex + 1 < props.queue.length) {
          props.indexHandler(props.queueIndex + 1);
          clearInterval(interval.current);
          audio.current.currentTime = 0;
          setSlider(audio.current.currentTime);
          audio.current.play();
        }
        else {
          props.playHandler(false)
          audio.current.pause();
          clearInterval(interval.current);
          audio.current.currentTime = 0;
          setSlider(audio.current.currentTime);
        }
      } else {
        setSlider(audio.current.currentTime);
      }
    }, [100]);
  };

  const change = (value) => {
    // Clear any timers already running
    clearInterval(interval.current);
    audio.current.currentTime = value;
    setSlider(audio.current.currentTime);
    if (props.playing) Timer();
  };

  useEffect(() => {

    if (props.playing === true) {
      if (ready.current) {
        audio.current.pause();
        audio.current = new Audio(props.audioSrc);
        audio.current.currentTime = currTime;
        audio.current.play();
        Timer();
      } else {
        // Set the ready ref as true for the next pass
        ready.current = true;
      }
    }
    else {
      audio.current.pause();
      setCurrTime(audio.current.currentTime);
    }

  }, [props.playing])

  useEffect(() => {

    audio.current.pause();

    audio.current = new Audio(props.audioSrc);

    if (ready.current) {
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

  const handleChange = (value) => {
    if (value) {
      if (props.queueIndex + 1 < props.queue.length) {
        props.indexHandler(props.queueIndex + 1);
        clearInterval(interval.current);
        setCurrTime(0)
        setSlider(audio.current.currentTime);
        props.playHandler(true)
      }
      else {
        props.playHandler(false)
        props.indexHandler(props.queue.length - 1);
        clearInterval(interval.current);
        setCurrTime(0)
        setSlider(audio.current.currentTime);
      }
    }
    else {
      if (props.queueIndex - 1 >= 0) {
        props.indexHandler(props.queueIndex - 1);
        clearInterval(interval.current);
        setCurrTime(0)
        setSlider(audio.current.currentTime);
        props.playHandler(true)
      }
      else {
        props.playHandler(false)
        props.indexHandler(0);
        clearInterval(interval.current);
        setCurrTime(0);
        setSlider(audio.current.currentTime);
      }
    }
  };


  return (
    <div className={`${styles.Player} ${props.className}`}>
      <div className={styles.controlsContainer}>
        <p>Song playing: {props.currSong.name}</p>
        <ThemeProvider theme={theme}>
          <div className={styles.sliderRow}>

            <div className={styles.sliderContainer}>
              <Slider defaultValue={0} min={0} max={duration ? duration : `${duration}`} onChange={(e) => { if (Object.keys(props.currSong).length !== 0) change(e.target.value) }} value={slider} />
            </div>
          </div>
          <div className={styles.Buttons}>
            <SkipPrevious onClick={e => { if (Object.keys(props.currSong).length !== 0) handleChange(false) }} />
            {!props.playing && <PlayCircleIcon onClick={e => { if (Object.keys(props.currSong).length !== 0) props.playHandler(true) }} />}
            {props.playing && <PauseCircleIcon onClick={e => { props.playHandler(false) }} />}
            <SkipNext onClick={e => { if (Object.keys(props.currSong).length !== 0) handleChange(true) }} />
          </div>
        </ThemeProvider>
      </div >
    </div >);

}
