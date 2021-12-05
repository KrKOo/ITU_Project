/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Search.jsx
 * Autori: Ľuboš Martinček (xmarti96)
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
  const [playlistId, setPlaylistId] = useState(false);

  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const ref = useRef(null);
  //-----Stavy pre upload-------

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setAdd(false);
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
  }, [searchVal]);

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

        <div ref={ref} className={styles.UploadScreen}>
          {add && <Upload className={styles.Upload} user={props.user} />}
        </div>

        <ul className={styles.songList}>
          {songs.map((item, index) => (
            <li key={index}>
              <p className={styles.songName}>{item.name}</p>
              <p className={styles.artist}>{item.artist}</p>
              <div className={styles.buttonContainer}>
                <button
                  onClick={(e) => {
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
        <div className={styles.playlists}>
          <ul>
            {playlists.map((playlist, index) => (
              <button
                onClick={(e) => {
                  addSongToPlaylist(playlist.id);
                }}>
                <li key={index}>{playlist.name}</li>
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Search;
//
