import { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Upload from '../../components/Upload';

const Search = (props) => {
  const [searchVal, setSearchVal] = useState('');
  const [add, setAdd] = useState(false);
  const [showPlayists, setShowPlayists] = useState(false);
  const [songId, setSongId] = useState();
  const [playlistId, setPlaylistId] = useState();


  const ref = useRef(null);
  //-----Stavy pre upload-------

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setAdd(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });


  useEffect(() => {
    if(searchVal!==""){
      const response =  axios.get('/api/song/getAll ')    
      .then(function (response) {
        if(response.status===200){
          console.log(response.data);
        }else{
          alert("Failed to get songs")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  },[searchVal]);
  

  const addSongToPlaylist= ()=>{
    const response =  axios.post('/api/playlist/addSong  ' ,{
      songID:songId,
      playlistID:playlistId
    })
      .then(function (response) {
        if(response.status===200){
          console.log(response.data);
        }else{
          alert("Failed to add song to playlist")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
 
  
  
  const tracks = [{artist:"OSBringer",title:"bysbys"}, {artist:"Fekete",title:"xdd"}, {artist:"Fekete",title:"xdd"}, {artist:"Fekete",title:"xdd"}, {artist:"Fekete",title:"xdd"}]

  const listItems = Object.values(tracks).map((item, index) => (
    <li
     >
      {' '}
      {item.title} {item.artist} 
      <button onClick={e=> {setShowPlayists(true); setSongId(item.id);}} >Add to playlist</button> 
      {' '}
    </li>
  ));

  const number = ["Metal", "Rap", "Pop", "Cock", "Sock"];
  const playlistItems = number.map((number, index) => ( 
    <button  onClick={e => { setPlaylistId(playlistId);addSongToPlaylist(); }}> <li key={index}> {number} </li></button>
  ));



  return (
    <div className={`${styles.Search} ${props.className}`}>
      <div className={styles.contentContainer}>
        <h2>Search for a song</h2>
        <div className={styles.inputContainer}>
          <input
            type='text'
            defaultValue='Search'
            value={searchVal}
            placeholder='Song name'
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />

          <button
            className={add ? styles.activeButton : ''}
            onClick={(e) => {
              setAdd(!add);
            }}>
            <FontAwesomeIcon
              icon={faUpload}
              size='1x'
              className={styles.twitterButton}
            />
            Upload
          </button>
        </div>

        <div ref={ref}>{add && <Upload className={styles.Upload} />}</div>
      </div>
      <ul >{listItems}</ul>
      {showPlayists &&<div>
        <ul >{playlistItems}</ul>
        </div>}
    </div>
  );
};
export default Search;
//
