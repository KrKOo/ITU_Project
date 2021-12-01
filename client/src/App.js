import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home/Home.jsx'
import Login from './screens/Login/Login.jsx'
import Profile from './screens/Profile/Profile.jsx'

import styles from './App.module.scss'

function App() {
  const [user, setUser] = useState({ username: "pes" });

  const setUserHandler = (foo) => {
    setUser(foo);
  }
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} setUserHandler={setUserHandler} />} />
          <Route path="/login" element={<Login setUserHandler={setUserHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
