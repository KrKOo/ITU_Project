/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Search.jsx
 * Autori: Kristian Kovac (xkovac61)
 *
 */

import { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Upload from '../../components/Upload';

const Search = (props) => {
  const [searchVal, setSearchVal] = useState('');
  const [add, setAdd] = useState(false);
  const [showPlayists, setShowPlayists] = useState(false);
  const [songId, setSongId] = useState();

  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const ref = useRef(null);
  const playlistRef = useRef(null);
  //-----Stavy pre upload-------

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setAdd(false);
    }
    if (playlistRef.current && !playlistRef.current.contains(event.target)) {
      setShowPlayists(false);
    }
  };
  const handleClick = (foo, index) => {
    if (props.currSong === foo) props.playHandler(!props.playing);
    else {
      props.songHandler(foo);
      props.queueHandler(songs, index);
      props.playHandler(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    axios
      .get('/api/playlist/getByUserId', {
        params: {
          id: props.user.id,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          setPlaylists(response.data);
        } else {
          alert('Failed to get playlists');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.user.id]);

  useEffect(() => {
    axios
      .get('/api/song/search', {
        params: {
          name: searchVal,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setSongs(response.data);
        } else {
          alert('Failed to get songs');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchVal, props.update]);

  const addSongToPlaylist = (playlistID) => {
    axios
      .post('/api/playlist/addSong', {
        songID: songId,
        playlistID: playlistID,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          alert('Failed to add song to playlist');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={`${styles.Search} ${props.className}`}>
      <div className={styles.contentContainer}>
        <h2>Search for a song</h2>
        <div className={styles.inputContainer}>
          <input
            type='text'
            defaultValue='Search'
            value={searchVal}
            placeholder='Song name'
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />

          <button
            className={add ? styles.activeButton : ''}
            onClick={(e) => {
              setAdd(!add);
            }}>
            <FontAwesomeIcon
              icon={faUpload}
              size='1x'
              className={styles.twitterButton}
            />
            Upload
          </button>
        </div>

        <div ref={ref}>
          {add && (
            <Upload
              className={styles.Upload}
              user={props.user}
              updateHandler={props.updateHandler}
              update={props.update}
            />
          )}
        </div>

        <ul className={styles.songList}>
          {songs.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                handleClick(item, index);
              }}>
              <p className={styles.songName}>{item.name}</p>
              <p className={styles.artist}>{item.artist}</p>
              <div className={styles.buttonContainer}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPlayists(true);
                    setSongId(item.id);
                  }}>
                  Add to playlist
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showPlayists && (
        <div className={styles.Playlists} ref={playlistRef}>
          {playlists.map((playlist, index) => (
            <div className={styles.playlistButtonContainer}>
              <button
                onClick={(e) => {
                  addSongToPlaylist(playlist.id);
                }}>
                {playlist.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Search;
//
