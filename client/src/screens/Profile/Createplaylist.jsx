import React from 'react';
import { useState, useEffect } from 'react';

import styles from './Createplaylist.module.scss';

export const Createplaylist = () => {
  const [playlistName, setPlaylistName] = useState(false);
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState({
    name: '',
    type: '',
    size: '',
    lastModifiedDate: '',
  });
  const createHandler = () => {};

  const changeHandler = (event) => {
    if (event.target.files[0] !== undefined) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
      setIsImagePicked(true);
    }
  };

  useEffect(() => {}, [selectedFile]);

  return (
    <div className={styles.wrapper}>
      <label for='file-upload'>
        <div className={styles.imageWrapper}>
          {!isImagePicked && <h1>Upload Image</h1>}
          {isImagePicked && (
            <img alt='Upload playlist cover' src={selectedFile} />
          )}

          <input
            id='file-upload'
            accept='image/*'
            type='file'
            onChange={changeHandler}
          />
        </div>
      </label>
      <div className={styles.playlistControl}>
        <b>Name your new playlist</b>

        <form>
          <input
            type='text'
            placeholder='Playlist name'
            required
            onChange={setPlaylistName}
            pattern='^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
            title='My_Playlist.5'></input>
          <input type='submit' value={'Create'} onClick={createHandler()} />
        </form>
      </div>

      <div className={styles.playlistControl}>Search for a song;</div>
    </div>
  );
};
