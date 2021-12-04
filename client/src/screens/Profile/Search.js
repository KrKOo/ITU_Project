import { useState, useEffect } from 'react';
import styles from './Search.module.scss';

const Search = (props) => {
  const [searchVal, setSearchVal] = useState("");
  const [add, setAdd] = useState(false);
  //-----Stavy pre upload-------
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [release, setRelease] = useState("");

  const SubmitUpload = async e => {
      e.preventDefault();
      if (title==="" || album==="" || artist==="" || release==="") alert("Please fill in all upload details")
      else {
        console.log(title);
        console.log(album);
        console.log(artist);
        console.log(release);
      }
  }

  return (
    <div className={`${styles.Search} ${props.className}`}>
      <div className={styles.inputContainer}>
          <label>Search for a song</label>
          <input type="text" defaultValue="Search" value={searchVal} onChange={e => {setSearchVal(e.target.value)}}/>
      </div>
      <div>
        <p>vyfiltrovany list s pesnickami</p>
      </div>
      <div>
        <button className={add ? styles.activeButton : ""} onClick={e => {setAdd(!add)}}>Upload new song</button>
      </div>
      {add && <form onSubmit={SubmitUpload}>
        <div className={styles.inputContainer}>
          <label>Title</label>
          <input type="text" value={title} onChange={e => {setTitle(e.target.value)}}/>
        </div>
        <div className={styles.inputContainer}>
          <label>Album</label>
          <input type="text" value={album} onChange={e => {setAlbum(e.target.value)}}/>
        </div>
        
        <div className={styles.inputContainer}>
          <label>Artist</label>
          <input type="text" value={artist} onChange={e => {setArtist(e.target.value)}}/>
        </div>
        
        <div className={styles.inputContainer}>
          <label>Release Date</label>
          <input type="date" value={release} onChange={e => {setRelease(e.target.value)}}/>
        </div>
        <div className={styles.inputContainer}>
          <label>Song file</label>
          <input type="file"/>
        </div>
        <input
              className={styles.submitButton}
              type='submit'
              value="Upload"
            />
      </form>}
    </div>
  );
};

export default Search;
//
