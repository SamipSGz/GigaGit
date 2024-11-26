import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext'; // Adjust the import path
import LoginScreen from './components/LoginScreen';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Achievements from './components/Achievements';
import Rewards from './components/Rewards';
import Learning from './components/Learning';
import Profile from './components/Profile';
import Challenges from './components/Challenges';

// Protected Route Component
const ProtectedRoute = () => {
  const { githubToken } = useAuth();

  // If no GitHub token, redirect to login
  if (!githubToken) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="learn" element={<Learning />} />
              <Route path="profile" element={<Profile />} />
              <Route path="challenges" element={<Challenges />} />
            </Route>
          </Route>

          {/* 404 or Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;