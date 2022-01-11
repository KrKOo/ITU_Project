/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Upload.js
 * Autori: Kristian Kovac (xkovac61)
 *
 */

import { useState, useEffect } from 'react';
import styles from './Upload.module.scss';
import axios from 'axios';
const Search = (props) => {
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [release, setRelease] = useState('');
  const [selectedFile, setSelectedFile] = useState({
    name: '',
    type: '',
    size: '',
    lastModifiedDate: '',
  });
  const SubmitUpload = async (e) => {
    e.preventDefault();
    if (title === '' || album === '' || artist === '' || release === '')
      alert('Please fill in all upload details');
    else {
      const formData = new FormData();

      // Update the formData object
      formData.append("file", selectedFile);
      formData.append("name", title);
      formData.append("username", props.user.username);
      formData.append("album", album);
      formData.append("artist", artist);

      axios({
        method: "post",
        url: "/api/song/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.status === 200) {
            props.updateHandler(props.update + 1);
            props.hide();
          } else {
            alert("Failed to upload")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const uploadHandler = (event) => {
    if (event.target.files[0] !== undefined) {
      setSelectedFile(event.target.files[0]);

    }
  };

  return (
    <div className={`${styles.Upload} ${props.className}`}>
      <form onSubmit={SubmitUpload}>
        <div className={styles.inputContainer}>
          <label>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Album</label>
          <input
            type='text'
            value={album}
            onChange={(e) => {
              setAlbum(e.target.value);
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Artist</label>
          <input
            type='text'
            value={artist}
            onChange={(e) => {
              setArtist(e.target.value);
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Release Date</label>
          <input
            type='date'
            value={release}
            onChange={(e) => {
              setRelease(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label for="uploadButton">Upload</label>
          <input
            id='file-upload'
            accept='audio/*'
            type='file'
            onChange={uploadHandler}
          />
        </div>

        <div className={styles.submitContainer}>
          <input className={styles.submitButton} type='submit' value='Upload' />
        </div>
      </form>
    </div>
  );
};

export default Search;
