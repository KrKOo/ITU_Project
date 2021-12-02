import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faTwitter,
  faGoogle,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

import styles from './Login.module.scss';
import { useState } from 'react';

const Login = (props) => {
  const [details, setDetails] = useState({ username: '', password: '' });

  const [showLogin, setShowLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details.username + ', ' + details.password);
    if (details.username === '' || details.password === '')
      alert('Please fill in the login form');
    props.setUserHandler(details.username);
    /*else{
        const response = await axios.post('/loginUser', {
          username: details.username,
          password: details.password,
        });
        // set the state of the user
        props.stateHandler(response.data);
        console.log(response.data);
          if(response.data['result']==="Success"){
            sessionStorage.setItem("logged_user", JSON.stringify(response.data));
          }
          else{
            alert("Failed to log in, wrong credentials")
          }*/
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginFormContainer}>
      <Link to="/"><h1>Home</h1></Link>
        <div className={styles.screenSelect}>
          <button
            onClick={() => setShowLogin(true)}
            className={showLogin ? styles.activeButton : ''}>
            Login
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className={showLogin ? '' : styles.activeButton}>
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label>Username</label>
            <input
              type='text'
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Password</label>
            <input
              type='password'
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.submitButton}
              type='submit'
              value='Log in'
            />
          </div>
        </form>
        <div className={styles.alternativeLoginContainer}>
          <FontAwesomeIcon
            icon={faFacebook}
            size='2x'
            className={styles.facebookButton}
          />
          <FontAwesomeIcon
            icon={faGoogle}
            size='2x'
            className={styles.googleButton}
          />
          <FontAwesomeIcon
            icon={faTwitter}
            size='2x'
            className={styles.twitterButton}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
