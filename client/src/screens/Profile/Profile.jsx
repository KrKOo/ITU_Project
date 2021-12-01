import { useState, useEffect } from 'react';
import styles from './Profile.module.scss';

const Profile = (props) => {
  const [newDetails, setNewDetails] = useState("");
  const HandleSubmit = async e=> {
    alert("Changing username to: " + newDetails.username)
    //request na BE
  }
  useEffect(() => {
    setNewDetails(props.user.username);
  }, [props.user])
  return (
    <div className={styles.Profile}>
      <header><b>Profile</b></header>
      <p>Logged in: {props.user.username}</p>
      <p><b>Change account details</b></p>
      <form onSubmit={HandleSubmit}>
        <input type="text" defaultValue={props.user.username} onChange={e => setNewDetails(e.target.value)}/>
        <input type="submit" value="Change name"/>
      </form>
    </div>
  );
};

export default Profile;
//