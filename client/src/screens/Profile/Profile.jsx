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
    <div className={styles.gridItem} key={index}>
      <div className={styles.thumbnail}>
        <img
          src='https://c.tenor.com/yheo1GGu3FwAAAAd/rick-roll-rick-ashley.gif'
          alt=''
        />
      </div>
      <div className={styles.description}>
        <h3>Title</h3>
        <p className={styles.author}>Author Authorsky</p>
      </div>
    </div>
  ));
  return (
    <div className={`${styles.Profile} ${props.className}`}>
      <div className={styles.profileInfoContainer}>
        <button
          onClick={(e) => {
            setSettings(!settings);
          }}
          className={styles.accountDetailButton}>
          Manage profile
        </button>
        <div className={styles.profileInfo}>
          <img
            className={styles.profilePic}
            src='https://c.tenor.com/yheo1GGu3FwAAAAd/rick-roll-rick-ashley.gif'
            alt=''></img>

          <p>{props.user.username}</p>
        </div>
        {settings && (
          <div className={styles.manageProfileWrapper}>
            <p>
              <b>Manage account details</b>
            </p>
            <a href='/'>Change Password</a>
            <a href='/'>Change Email</a>
          </div>
        )}
      </div>

      <div className={styles.contentContainer}>
        <h1>My playlists</h1>

        <div className={styles.listWrapper}>
          <div className={styles.listGrid}>{listItems}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
//
