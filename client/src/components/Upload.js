import { useState, useEffect } from 'react';
import styles from './Upload.module.scss';
import axios from 'axios';
const Search = (props) => {
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [release, setRelease] = useState('');

  const SubmitUpload = async (e) => {
    e.preventDefault();
    if (title === '' || album === '' || artist === '' || release === '')
      alert('Please fill in all upload details');
    else {


      const response = await axios.post('/api/song/upload', {
      
        name:title,
        artist:artist
      })    
      
      .then(function (response) {
        if(response.status===200){
          console.log(response.data);
        }else{
          alert("Failed to upload")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
          <input id="uploadButton" type='file' />
        </div>

        <div className={styles.submitContainer}>
          <input className={styles.submitButton} type='submit' value='Upload' />
        </div>
      </form>
    </div>
  );
};

export default Search;
