import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
      return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const status = user.verificationStatus || 'APPROVED'; // Default to approved for older users

  // If status is NEW, force onboarding (unless we are already there)
  if (status === 'NEW' && location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
  }

  // If status is PENDING/REJECTED, force verification page (unless we are already there)
  if ((status === 'PENDING' || status === 'REJECTED') && location.pathname !== '/verification-pending') {
      return <Navigate to="/verification-pending" replace />;
  }

  // If status is APPROVED, prevent access to onboarding/verification
  if (status === 'APPROVED' && (location.pathname === '/onboarding' || location.pathname === '/verification-pending')) {
      return <Navigate to="/dashboard" replace />;
  }

  return children;
}