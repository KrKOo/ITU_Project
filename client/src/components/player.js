import React, { useState } from 'react'
import styles from './Player.module.scss';
import Slider from '@mui/material/Slider';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
export const Player = () => {
    const [slider, setSlider] = useState(0);
    const [playing, setPlaying] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div class={styles.controls} >
                <Slider defaultValue={0} setp={1} min={0} max={100} onChange={e => {setSlider(e.target.value)}} value={slider} />
            </div><br></br>
            <div class={styles.buttons}>
                <FastRewindIcon />
                {!playing && <PlayCircleIcon onClick={e => {setPlaying(true)}}/>}
                {playing && <StopCircleIcon onClick={e => {setPlaying(false)}}/>}
                <FastForwardIcon />
                <p>{slider}%</p>
            </div>    
            
        </div>
    )
}
