/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Playlist.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Playlist.module.scss';

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const [playlistID, setPlaylistID] = useState(1);

  const handleClick = (foo, index) => {
    if (props.currSong === foo) props.playHandler(!props.playing);
    else {
      //console.log(foo)
      props.songHandler(foo);
      //console.log("index"+index);
      //console.log("index"+index);
      //for (index; index < tracks.length; index++)
      props.queueHandler(playlist, index);
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

  return (
    <div className={`${styles.Playlist} ${props.className}`}>
      <div className={styles.contentContainer}>
        <h2>Search for a song</h2>
        <div>
          <ul className={styles.songList}>
            {playlist.map((item, index) => (
              <div
                className={styles.listItem}
                key={index}
                onClick={(e) => {
                  handleClick(item, index);
                }}>
                <p className={styles.songName}>{item.name}</p>
                <p className={styles.artist}>{item.artist}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
//
