/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Playlist.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Playlist.module.scss';
import tracks from '../../tracks';
const Playlist = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const [playlistID, setPlaylistID] = useState(1);

  const handleClick = (foo, index) => {
    if (props.currSong === foo) props.playHandler(!props.playing);
    else {
      props.songHandler(tracks[index]);
      //console.log("index"+index);
      //console.log("index"+index);
      let queue = [];
      //for (index; index < tracks.length; index++)
      queue.push(tracks);
      props.queueHandler(tracks, index);
      props.playHandler(true);
    }
  };

  useEffect(() => {
    console.log('asdfasdfasdfasdf');
    axios
      .get('/api/playlist/getAllSongs', {
        params: {
          id: props.currPlaylist.id,
        },
      })
      .then((res) => {
        setPlaylist(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [props.currPlaylist.id]);

  const listItems = playlist.map((item, index) => (
    <li
      onClick={(e) => {
        handleClick(item, index);
      }}>
      {item.name} {item.artist}
    </li>
  ));

  return (
    <div className={`${styles.Playlist} ${props.className}`}>
      <div classname={styles.contentContainer}>
        <header>
          <b>Playlist name: {props.currPlaylist.name}</b>
        </header>
        <div>
          <ul>{listItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
//
