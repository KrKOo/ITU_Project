/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Upload.js
 * Autori: Boris Hlavienka (xhlavi18)
 *
 */

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './SidePanel.module.scss';

export const SidePanel = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [listItems, setListItems] = useState();

  useEffect(() => {
    axios.get('/api/playlist/getByUserId', {
      params: {
        id: props.user.id
      }
    }).then((res) => {
      setPlaylists(res.data);
    })
      .catch((e) => {
        console.error(e);
      })
  }, [props.update, props.user.id])

  useEffect(() => {
    const li = playlists.map((item, index) => (
      <button className={props.currPlaylist.id === item.id ? styles.activeButton : ""}
        onClick={e => { props.pageHandler("Playlist"); props.playlistHandler(item); }}>
        <li key={index}> {item.name} </li>
      </button >
    ))

    setListItems(li)
  }, [props, playlists])

  return (
    <div className={`${styles.SidePanel} ${props.className}`}>
      <h2>Music Player</h2>
      <ul>
        <button
          className={props.page === "Profile" && styles.activeButton}
          onClick={e => { props.pageHandler("Profile"); props.playlistHandler("") }}>
          My profile
        </button>

        <button
          className={props.page === "Search" && styles.activeButton}
          onClick={e => { props.pageHandler("Search"); props.playlistHandler("") }}>
          Search
        </button>
        <button
          className={props.page === "NewPlaylist" && styles.activeButton}
          onClick={e => { props.pageHandler("NewPlaylist"); props.playlistHandler("") }}>
          New playlist
        </button>
      </ul>
      <div>
        <h2>My playlists</h2>
        <ul>
          {listItems}
        </ul>
      </div>

    </div >
  )
}
