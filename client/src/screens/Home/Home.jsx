import styles from './Home.module.scss';
import Profile from '../Profile/Profile';
import { SidePanel } from '../../components/SidePanel';
import { Player } from '../../components/Player';
import { useState } from 'react';

const Home = (props) => {
  const [page, setPage] = useState("Home");
  const [currPlaylist, setCurrPlaylist] = useState([]);
  const pageHandler = (foo) => {
    setPage(foo)
  }
  const playlistHandler = (foo) => {
    setCurrPlaylist(foo)
  }
  return (
    <div className={styles.Home}>
      <div className={styles.flexRow}>
        <SidePanel className={styles.SidePanel} page={page} pageHandler={pageHandler} playlistHandler={playlistHandler} currPlaylist={currPlaylist}/>
        {page==="Profile" && <Profile
          className={styles.Profile}
          user={props.user}
          setUserHandler={props.setUserHandler}
        />
        }
        {page==="NewPlaylist" && <div>
          <p>Create a new playlist</p>
        </div>
        }
        {page==="Playlist" && <div>
          <p>Playlist stranka</p>
        </div>
        }
        
      </div>

      <Player />
    </div>
  );
};

export default Home;
