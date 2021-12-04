import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Playlist.module.scss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import tracks from "../../tracks";
const Playlist = (props) => {
  const [trackIndex, setTrackIndex] = useState(0);
    const handleClick = (foo,index) => {
        if (props.currSong === foo) props.playHandler(!props.playing); 
        else {
            props.songHandler(foo)
            props.playHandler(true);
            let index =  Object.values(tracks).indexOf(index);
            console.log("index"+index);
            let queue = [];
            for (index; index < tracks.length; index++) queue.push(tracks[index]);
            props.queueHandler(queue);
        }
        
    }
    const songs = ["Suck", "On", "Deez", "Nuts"]

    const { title, artist, audioSrc } = tracks[trackIndex];
   
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
