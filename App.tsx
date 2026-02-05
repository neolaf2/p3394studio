import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Assistant from './pages/Assistant';
import Resources from './pages/Resources';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="resources" element={<Resources />} />
            <Route path="forum" element={<Forum />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;