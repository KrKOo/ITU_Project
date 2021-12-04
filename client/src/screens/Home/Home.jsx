import styles from './Home.module.scss';
import { Link ,Navigate} from 'react-router-dom';
import Profile from '../Profile/Profile';
import Playlist from '../Profile/Playlist';
import Search from '../Profile/Search';
import { SidePanel } from '../../components/SidePanel';
import { Player } from '../../components/Player';
import { useState } from 'react';
import { Createplaylist } from '../Profile/Createplaylist';
const Home = (props) => {
  const [page, setPage] = useState("Home");
  const [currPlaylist, setCurrPlaylist] = useState([]);
  const [currSong, setCurrSong] = useState([]);
  const [playing, setPlaying] = useState(false);
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
        {page==="Playlist" && <Playlist currPlaylist={currPlaylist} playing={playing} currSong={currSong} playHandler={playHandler} songHandler={songHandler}/>}
        {page==="Search" && <Search/>}
        
      </div>

      <Player playing={playing} playHandler={playHandler} currSong={currSong}/>
    </div>
  );
};

export default Home;
