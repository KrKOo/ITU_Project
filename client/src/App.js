import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home/Home.jsx'
import Login from './screens/Login/Login.jsx'
import Profile from './screens/Profile/Profile.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
