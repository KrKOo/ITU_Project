import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Playlist.module.scss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const Playlist = (props) => {
    const handleClick = (foo) => {
        if (props.currSong === foo) props.playHandler(!props.playing); 
        else {
            props.songHandler(foo)
            props.playHandler(true);
        }
        
    }
    const songs = ["Suck", "On", "Deez", "Nuts"]
    const listItems = songs.map((title, index) => (
        <li key={index} onClick={e => { handleClick(title) }} >     {title} </li>
      ));
  
  return (
    <div className={`${styles.Playlist} ${props.className}`}>
      <header>
        <b>Playlist name: {props.currPlaylist}</b>{' '}
      </header>
      <div>
          <ul>{listItems}</ul>
      </div>
    </div>
  );
};

export default Playlist;
//
