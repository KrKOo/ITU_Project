import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';

const Profile = (props) => {
  const [newDetails, setNewDetails] = useState('');
  const [settings, setSettings] = useState(false);
  const HandleSubmit = async (e) => {
    alert('Changing username to: ' + newDetails.username);
    //request na BE
  };
  useEffect(() => {
    setNewDetails(props.user);
  }, [props.user]);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const listItems = numbers.map((number, index) => (
    <Link to='/'>
      <li className={styles.playlist_list} key={index}></li>
    </Link>
  ));
  return (
    <div className={`${styles.Profile} ${props.className}`}>
      <div className={styles.profileInfoContainer}>
        <button
          onClick={(e) => {
            setSettings(!settings);
          }}
          className={styles.accountDetailButton}>
          Change account details
        </button>
        <div className={styles.profileInfo}>
          <img
            className={styles.profilePic}
            src='https://c.tenor.com/yheo1GGu3FwAAAAd/rick-roll-rick-ashley.gif'></img>

          <p>{props.user.username}</p>
        </div>
      </div>

      <h1>My playlists</h1>

      <div className={styles.listWrapper}>
        <ul>{listItems}</ul>
      </div>

      {settings && (
        <div>
          <p>
            <b>Change account details</b>
          </p>
          <form onSubmit={HandleSubmit}>
            <input
              type='text'
              defaultValue={props.user.username}
              onChange={(e) => setNewDetails(e.target.value)}
            />
            <br></br>
            <input type='submit' value='Change details' />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
//
