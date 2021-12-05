/* Projekt: Tvorba uživatelských rozhraní - Music player
 *
 * Súbor: Login.jsx
 * Autori: Ľuboš Martinček (xmarti96)
 *
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

import styles from './Login.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';

const Login = (props) => {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const validateEmail = (e) => {
    if (!validator.isEmail(e.target.value)) setEmailError('Enter valid Email!');
  };

  useEffect(() => {
    if (
      confirmPassword !== password &&
      password !== '' &&
      confirmPassword !== ''
    )
      setEmailError('Passwords do not match');
    else setEmailError('');
  }, [confirmPassword, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword === password || showLogin) {
      //console.log(username + ', ' + password);
      console.log('here');
      if (username === '' || password === '') {
        alert('Please fill in the login form');
      } else {
        var endpoint = showLogin ? '/api/auth/login ' : '/api/auth/register ';

        const response = await axios.post(endpoint, {
          username: username,
          password: password,
          email: email,
        });
        // set the state of the user

        props.setLoggHandler(true);
        if (response.status === 200) {
          console.log('RESPONSE', response.data);
          sessionStorage.setItem('logged_user', JSON.stringify(response.data));
        } else {
          alert('Failed to log in, wrong credentials');
        }
      }
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginFormContainer}>
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
        <span
          style={{
            fontWeight: 'bold',
            color: 'red',
          }}>
          {emailError}
        </span>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label>
              Username{!showLogin && <text style={{ color: 'red' }}>*</text>}
            </label>
            <input
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>
              Password{!showLogin && <text style={{ color: 'red' }}>*</text>}
            </label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {!showLogin && (
            <div className={styles.inputContainer}>
              <label>
                Confirm Password
                {!showLogin && <text style={{ color: 'red' }}>*</text>}
              </label>
              <input
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          )}

          {!showLogin && (
            <div className={styles.inputContainer}>
              <label>
                Email{!showLogin && <text style={{ color: 'red' }}>*</text>}
              </label>
              <input
                type='email'
                onChange={(e) => {
                  validateEmail(e);
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
          )}

          <div className={styles.inputContainer}>
            <input
              className={styles.submitButton}
              type='submit'
              value={showLogin ? 'Log in' : 'Register'}
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
