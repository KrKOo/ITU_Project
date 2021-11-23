import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className={styles.Home}>
      Home
      <Link to='/profile'>Profile</Link>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Home;
