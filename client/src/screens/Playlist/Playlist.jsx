/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Playlist.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Playlist.module.scss';

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState([]);

  const handleClick = (foo, index) => {
    if (props.currSong === foo) props.playHandler(!props.playing);
    else {
      props.songHandler(foo);
      props.queueHandler(playlist, index);
      props.playHandler(true);
    }
  };

  useEffect(() => {
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
        <h2>{props.currPlaylist.name}</h2>
        <div>
          <ul className={styles.songList}>
            {playlist.length > 0 ? (
              playlist
                .filter((item) => item.id != null)
                .map((item, index) => (
                  <div
                    className={styles.listItem}
                    key={index}
                    onClick={(e) => {
                      handleClick(item, index);
                    }}>
                    <p className={styles.songName}>{item.name}</p>
                    <p className={styles.artist}>{item.artist}</p>
                  </div>
                ))
            ) : (
              <h3>This playlist is empty. Fill it with your favorite songs.</h3>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
//
