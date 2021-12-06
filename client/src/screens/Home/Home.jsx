/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Home.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import styles from './Home.module.scss';
import { Link, Navigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Playlist from '../Playlist/Playlist';
import Search from '../Search/Search';
import { SidePanel } from '../../components/SidePanel';
import { Player } from '../../components/Player';
import { useState, useEffect } from 'react';
import { Createplaylist } from '../Profile/Createplaylist';
import Login from '../Login/Login';
const Home = (props) => {
  const [page, setPage] = useState('Profile');
  const [currPlaylist, setCurrPlaylist] = useState([]);
  const [currSong, setCurrSong] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setqueueIndex] = useState(0);
  const [update, setUpdate] = useState(0);

  const [user, setUser] = useState({ username: '' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (playing) {
      console.log('Playing: ' + queue[0].title + ' queue: ');
      for (let i = 1; i < queue.length; i++) console.log(queue[i].title + ',');
    } else console.log('Pausing');
  }, [playing, queue]);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('logged_user'));

    setUser(loggedInUser);
  }, [props.logg]);
  const updateHandler = (foo) => {
    setUpdate(foo);
  };
  const queueHandler = (foo, index) => {
    setQueue(foo);
    setqueueIndex(index);
  };
  const indexHandler = (foo) => {
    setqueueIndex(foo);
    setCurrSong(queue[foo]);
  };
  const songHandler = (foo) => {
    console.log(foo);
    setCurrSong(foo);
  };
  const pageHandler = (foo) => {
    setPage(foo);
  };
  const playlistHandler = (foo) => {
    setCurrPlaylist(foo);
  };
  const playHandler = (foo) => {
    setPlaying(foo);
  };

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  if ((user?.username && props.logg) || !isLoaded) {
    return (
      <div className={styles.Home}>
        <div className={styles.flexRow}>
          <SidePanel
            update={update}
            className={styles.SidePanel}
            page={page}
            user={user}
            pageHandler={pageHandler}
            playlistHandler={playlistHandler}
            currPlaylist={currPlaylist}
          />
          {page === 'Profile' && (
            <Profile
              className={styles.Profile}
              user={user}
              setLoggHandler={props.setLoggHandler}
              pageHandler={pageHandler}
              playlistHandler={playlistHandler}
            />
          )}
          {page === 'NewPlaylist' && (
            <Createplaylist
              user={user}
              updateHandler={updateHandler}
              update={update}
            />
          )}
          {page === 'Playlist' && (
            <Playlist
              queueHandler={queueHandler}
              currPlaylist={currPlaylist}
              playing={playing}
              currSong={currSong}
              playHandler={playHandler}
              songHandler={songHandler}
            />
          )}
          {page === 'Search' && (
            <Search
              user={user}
              updateHandler={updateHandler}
              update={update}
              queueHandler={queueHandler}
              currPlaylist={currPlaylist}
              playing={playing}
              currSong={currSong}
              playHandler={playHandler}
              songHandler={songHandler}
            />
          )}
        </div>

        <Player
          className={styles.Player}
          playing={playing}
          queueIndex={queueIndex}
          indexHandler={indexHandler}
          audioSrc={
            Object.keys(currSong).length === 0
              ? ''
              : `/api/song/getFileById?id=${currSong.id}`
          }
          queue={queue}
          playHandler={playHandler}
          currSong={currSong}
        />
      </div>
    );
  } else
    return (
      <div>
        <Login setLoggHandler={props.setLoggHandler} />
      </div>
    );
};

export default Home;
