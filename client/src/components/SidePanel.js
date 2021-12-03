//import React, { useState } from 'react'
import styles from './SidePanel.module.scss';

export const SidePanel = (props) => {
  

  //Placeholder list, nahradi ho list s playlistami
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number, index) => (
    <button className={props.currPlaylist===number ? styles.activeButton : ""} onClick={e => {props.pageHandler("Playlist"); props.playlistHandler(number)}}><li key={index}> {number} </li></button>
  ));


  return (
    <div className={`${styles.SidePanel} ${props.className}`}>
      <h1>Edvánsd Mjúzik Pleja</h1>
      <div >
        <button className={props.page==="Profile" ? styles.activeButton : ""} onClick={e => {props.pageHandler("Profile"); props.playlistHandler("")}}>My profile</button>
        <button className={props.page==="NewPlaylist" ? styles.activeButton : ""} onClick={e => {props.pageHandler("NewPlaylist"); props.playlistHandler("")}}>New playlist</button>
      </div>
      <div>
        <h2>My playlists</h2>
        <ul>{listItems}</ul>
      </div>

    </div >
  )
}
