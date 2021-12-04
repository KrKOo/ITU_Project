import styles from './Home.module.scss';
import { Link ,Navigate} from 'react-router-dom';
import Profile from '../Profile/Profile';
import Playlist from '../Profile/Playlist';
import Search from '../Profile/Search';
import { SidePanel } from '../../components/SidePanel';
import { Player } from '../../components/Player';
import { useState, useEffect } from 'react';
import { Createplaylist } from '../Profile/Createplaylist';
const Home = (props) => {
  const [page, setPage] = useState("Home");
  const [currPlaylist, setCurrPlaylist] = useState([]);
  const [currSong, setCurrSong] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setqueueIndex] = useState(0);

  useEffect(() => {
    if (playing) {
      console.log("Playing: " + queue[0].title + " queue: ");
      for (let i = 1; i < queue.length; i++) console.log(queue[i].title + ",");
    }
    else console.log("Pausing");
  }, [playing, queue]);

  const queueHandler = (foo) => { 
    setQueue(foo);
    setqueueIndex(0);
  }
  const indexHandler = (foo) => { 
    setqueueIndex(foo);
    setCurrSong(queue[foo]);
    console.log("here");
  } 
  const songHandler = (foo) => {
    setCurrSong(foo)
  }
  const pageHandler = (foo) => {
    setPage(foo)
  }
  const playlistHandler = (foo) => {
    setCurrPlaylist(foo)
  }
  const playHandler = (foo) => {
    setPlaying(foo)
  }
  return (
    <div className={styles.Home}>
      <div className={styles.flexRow}>
      {props.user.username==="" && <Navigate to={'/login' } />}
        <SidePanel className={styles.SidePanel} page={page} pageHandler={pageHandler} playlistHandler={playlistHandler} currPlaylist={currPlaylist}/>
        {page==="Profile" && <Profile
          className={styles.Profile}
          user={props.user}
          setUserHandler={props.setUserHandler}
        />
        }
        {page==="NewPlaylist" && <Createplaylist/>}
        {page==="Playlist" && <Playlist queueHandler={queueHandler} currPlaylist={currPlaylist} playing={playing} currSong={currSong} playHandler={playHandler} songHandler={songHandler}/>}
        {page==="Search" && <Search/>}
        
      </div>

      <Player playing={playing} queueIndex={queueIndex} indexHandler={indexHandler} audioSrc={!playing ? "":currSong.audioSrc} queue={queue} playHandler={playHandler} currSong={currSong}/>
    </div>
  );
};

export default Home;
