import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { SidePanel } from '../../components/SidePanel';
import { Player } from '../../components/Player';

const Home = (props) => {
  return (
    <div className={styles.Home}>
      <div className={styles.flexRow}>
        <SidePanel className={styles.SidePanel} />
        <Profile
          className={styles.Profile}
          user={props.user}
          setUserHandler={props.setUserHandler}
        />
      </div>

      <Player />
    </div>
  );
};

export default Home;
