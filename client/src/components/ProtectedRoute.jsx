import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const status = user.verificationStatus || "not_submitted";
  const path = location.pathname;

  // ================= NOT SUBMITTED =================
  if (status === "not_submitted" && path !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // ================= PENDING / REJECTED =================
  if (
    (status === "pending" || status === "rejected") &&
    path !== "/verification-pending"
  ) {
    return <Navigate to="/verification-pending" replace />;
  }

  // ================= APPROVED =================
  if (
    status === "approved" &&
    (path === "/onboarding" || path === "/verification-pending")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
