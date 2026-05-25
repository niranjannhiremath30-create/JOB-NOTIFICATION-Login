import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Settings from './pages/Settings';
import Digest from './pages/Digest';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './AuthContext';

function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-center">
        <div className="login-card card">
          <p>Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/jt/07-test" element={<TestChecklist />} />
            <Route path="/jt/08-ship" element={<Ship />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
