/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Profile.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import axios from 'axios';
const Profile = (props) => {
  const [newDetails, setNewDetails] = useState('');
  const [settings, setSettings] = useState(false);
  const [playlistList, setPlaylistList] = useState(false);
  const [changeMail, setChangeMail] = useState(false);
  const [image, setImage] = useState();
 
  useEffect(() => {
    setNewDetails(props.user);

    const response =  axios.get('/api/playlist/getByUserId', {
      params:{ id: props.user.id}
     
    }).then(function (response) {
      console.log('RESPONSE', response);
      if (response.status === 200) {
        console.log('RESPONSE', response.data);
        setPlaylistList(response.data);
        
  
      } else {
        alert('Failed to get user playlist from server');
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }, [props.user]);


   




  const listItems = Object.values(playlistList).map((playlistList, index) => (
 
    <div className={styles.gridItem} key={index}>
       
      <div className={styles.thumbnail}>
        <img
          src= {"/api/playlist/getImageById?id="+playlistList.id}
          alt=''
        />
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
        <button  onClick={e=>{sessionStorage.clear();props.setLoggHandler(false)  }} className={styles.accountDetailButton}>Logout</button>
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
            src={image}
            alt=''></img>

          <p>{props.user.username}</p>
        </div>
        {settings && (
          <div className={styles.manageProfileWrapper}>
            <p>
              <b>Manage account details</b>
            </p>
            <a >Change Password</a>
            <a >Change Email</a>
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
