import { useState, useEffect, useRef } from 'react';
import styles from './Playlist.module.scss';
import tracks from '../../tracks';
const Playlist = (props) => {
  const handleClick = (foo, index) => {
    if (props.currSong === foo) props.playHandler(!props.playing);
    else {
      props.songHandler(tracks[index]);
      //console.log("index"+index);
        //console.log("index"+index);
        let queue = [];
        //for (index; index < tracks.length; index++)
        queue.push(tracks);
        props.queueHandler(tracks, index);
        props.playHandler(true);
    }
  };
  const songs = ['Suck', 'On', 'Deez', 'Nuts'];

  const listItems = Object.values(tracks).map((item, index) => (
    <li
      onClick={(e) => {
        handleClick(item, index);
      }}>
      {' '}
      {item.title} {item.artist}{' '}
    </li>
  ));

  return (
    <div className={`${styles.Playlist} ${props.className}`}>
      <div classname={styles.contentContainer}>
        <header>
          <b>Playlist name: {props.currPlaylist}</b>{' '}
        </header>
        <div>
          <ul>{listItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
//
