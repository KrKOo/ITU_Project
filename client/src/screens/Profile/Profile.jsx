/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Profile.jsx
 * Autori: Boris Hlavienka (xhlavi18)
 *
 */

import { useState, useEffect, useRef } from 'react';
import styles from './Profile.module.scss';
import axios from 'axios';
const Profile = (props) => {
  const [newDetails, setNewDetails] = useState('');
  const [settings, setSettings] = useState(false);
  const [playlistList, setPlaylistList] = useState(false);
  const [newMail, setnewMail] = useState('@');
  const [newPwd, setnewPwd] = useState('New Password');
  const [confNewPwd, setConfNewPwd] = useState('Repeat New Password');
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSettings(false);
    }
  };

  useEffect(() => {
    setNewDetails(props.user);

    axios
      .get('/api/playlist/getByUserId', {
        params: { id: props.user.id },
      })
      .then(function (response) {
        if (response.status === 200) {
          setPlaylistList(response.data);
        } else {
          alert('Failed to get user playlist from server');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.user]);

  const SubmitPwd = async (e) => {
    console.log('Changing pwd');
  };
  const SubmitMail = async (e) => {
    console.log('Changing mail');
  };

  const listItems = Object.values(playlistList).map((playlistList, index) => (
    <div
      onClick={(e) => {
        props.pageHandler('Playlist');
        props.playlistHandler(playlistList);
      }}
      className={styles.gridItem}
      key={index}>
      <div className={styles.thumbnail}>
        <img src={'/api/playlist/getImageById?id=' + playlistList.id} alt='' />
      </div>
      <div className={styles.description}>
        <h3>{playlistList.name}</h3>
        <p className={styles.author}>{props.user.username}</p>
      </div>
    </div>
  ));
  return (
    <div className={`${styles.Profile} ${props.className}`}>
      <div className={styles.profileInfoContainer}>
        <button
          onClick={(e) => {
            sessionStorage.clear();
            props.setLoggHandler(false);
          }}
          className={styles.accountDetailButton}>
          Logout
        </button>
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
            src='https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png'
            alt=''></img>

          <p>{props.user.username}</p>
        </div>
        {settings && (
          <div className={styles.manageProfileWrapper} ref={ref}>
            <p>
              <b>Manage account details</b>
            </p>

            <div>
              <form>
                <div className={styles.inputContainer}>
                  <input
                    type='password'
                    onChange={(e) => setnewPwd(e.target.value)}
                    placeholder='Old Password'
                  />
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type='password'
                    onChange={(e) => setnewPwd(e.target.value)}
                    placeholder='New Password'
                  />
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type='password'
                    onChange={(e) => setConfNewPwd(e.target.value)}
                    placeholder='Repeat New Password'
                  />
                </div>
              </form>
            </div>
            <a onClick={SubmitPwd} style={{ cursor: 'pointer' }}>
              Change Password
            </a>

            <div>
              <form>
                <div className={styles.inputContainer}>
                  <input
                    type='text'
                    onChange={(e) => setnewMail(e.target.value)}
                    placeholder='New Email'
                  />
                </div>
              </form>
            </div>
            <a
              style={{ marginBottom: 20, cursor: 'pointer' }}
              onClick={SubmitMail}>
              Change Email
            </a>
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
