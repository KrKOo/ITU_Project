import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Playlist.module.scss';

const Playlist = (props) => {

    const songs = ["Suck", "On", "Deez", "Nuts"]
    const listItems = songs.map((title, index) => (
        <li key={index}> {title} </li>
      ));
  
  return (
    <div className={`${styles.Profile} ${props.className}`}>
      <header>
        <b>Playlist name: {props.currPlaylist}</b>{' '}
      </header>
      <div>
          <ul>{listItems}</ul>
      </div>
    </div>
  );
};

export default Playlist;
//
