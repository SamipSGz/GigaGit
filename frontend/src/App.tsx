import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Achievements from './components/Achievements';
import Rewards from './components/Rewards';
import Learning from './components/Learning';
import Profile from './components/Profile';
import Challenges from './components/Challenges';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="learn" element={<Learning />} />
          <Route path="profile" element={<Profile />} />
          <Route path="challenges" element={<Challenges />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;