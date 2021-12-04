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
      <header>
        <b>Search for a song</b>{' '}
      </header>
      <div>
        <input type="text" defaultValue="Search" value={searchVal} onChange={e => {setSearchVal(e.target.value)}}/>
        <p>vyfiltrovany list s pesnickami</p>
      </div>
      <div>
        <button className={add ? styles.activeButton : ""} onClick={e => {setAdd(!add)}}>Upload new song</button>
      </div>
      {add && <form onSubmit={SubmitUpload}>
        Title
        <input type="text" value={title} onChange={e => {setTitle(e.target.value)}}/>
        Album
        <input type="text" value={album} onChange={e => {setAlbum(e.target.value)}}/>
        Artist
        <input type="text" value={artist} onChange={e => {setArtist(e.target.value)}}/>
        Release Date
        <input type="text" value={release} onChange={e => {setRelease(e.target.value)}}/>
        <input type="submit" value="Upload"/>
      </form>}
    </div>
  );
};

export default Search;
//
