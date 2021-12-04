import { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Playlist.module.scss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import tracks from "../../tracks";
const Playlist = (props) => {
 
    const handleClick = (foo,index) => {
        if (props.currSong === foo) props.playHandler(!props.playing); 
        else {
            props.songHandler(tracks[index].title)

            props.playHandler(true);
            console.log("index"+index);
            let queue = [];
            for (index; index < tracks.length; index++) queue.push(tracks[index]);
          
            props.queueHandler(queue);
        }
        
    }
    const songs = ["Suck", "On", "Deez", "Nuts"]
   






   
    const listItems = Object.values(tracks).map((item,index) => (
        <li  onClick={e => { handleClick(item,index) }} >     {item.title}  {item.artist}  </li>
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
