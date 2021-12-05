import { useState ,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  
import Home from './screens/Home/Home.jsx'
import Login from './screens/Login/Login.jsx'

import styles from './App.module.scss'

function App() {
  




  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/> } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
