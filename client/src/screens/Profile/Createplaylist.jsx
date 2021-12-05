/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Createplaylist.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Createplaylist.module.scss';

export const Createplaylist = (props) => {
  const [playlistName, setPlaylistName] = useState('');
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const createHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Update the formData object/

    formData.append('image', selectedFile);
    formData.append('name', playlistName);
    formData.append('userID', props.user.id);

    axios({
      method: 'post',
      url: '/api/playlist/create',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          console.log(props.update);
          props.updateHandler(props.update + 1);
          console.log(props.update);
        } else {
          alert('Failed to upload');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changeHandler = (event) => {
    if (event.target.files[0] !== undefined) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {}, [selectedFile]);

  return (
    <div className={styles.CreatePlaylist}>
      <div className={styles.contentContainer}>
        <div className={styles.playlistControl}>
          <h1>Name your new playlist</h1>

          <input
            type='text'
            placeholder='Playlist name'
            required
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
            title='My_Playlist.5'></input>

          <div className={styles.uploadImage}>
            <p>Upload Image</p>
            <input
              id='file-upload'
              accept='image/*'
              type='file'
              onChange={changeHandler}
            />
          </div>

          <input
            className={styles.submitButton}
            type='submit'
            value={'Create'}
            onClick={createHandler}
          />
        </div>
      </div>
    </div>
  );
};
