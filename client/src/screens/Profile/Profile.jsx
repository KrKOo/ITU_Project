import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Profile.module.scss';
import { Player } from '../../components/player';
import { ControlPanel } from '../../components/ControlPanel';
const Profile = (props) => {
  const [newDetails, setNewDetails] = useState("");
  const [settings, setSettings] = useState(false);
  const HandleSubmit = async e=> {
    alert("Changing username to: " + newDetails.username)
    //request na BE
  }
  useEffect(() => {
    setNewDetails(props.user);
  }, [props.user])

  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number,index) =>
    <li key={index}> {number} </li>
  );
  return (
    <div className={styles.Profile}>
      <ControlPanel/>
      <header><b>Profile</b> <Link to="/"><button>Home</button></Link></header> 
      <p><b>Logged in: {props.user.username}</b></p> 
      <p><b>My playlists</b></p>
      <ul>{listItems}</ul>
      <button onClick={e => {setSettings(!settings)}}>Change account details</button><br></br>
      {settings && <div>
        <p><b>Change account details</b></p>
        <form onSubmit={HandleSubmit}>
          <input type="text" defaultValue={props.user.username} onChange={e => setNewDetails(e.target.value)}/><br></br>
          <input type="submit" value="Change details"/>
        </form>
      </div>}
      <Player/>
      
    </div>
    
  );
};

export default Profile;
//