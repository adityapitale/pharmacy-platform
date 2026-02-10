import React from "react";
import { Clock, CheckCircle, XCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerificationPending() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const status = user?.verificationStatus || "PENDING";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (status === "APPROVED") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {/* DEMO MODE: Admin approval is simulated for frontend demo. 
              BACKEND INTEGRATION:
              1. Admin will review documents in Admin Panel
              2. Admin updates status to APPROVED or REJECTED
              3. User receives email notification
          */}

          {status === "PENDING" && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Pending
              </h2>
              <p className="text-gray-600 mb-6">
                Thanks for submitting your documents,{" "}
                <strong>{user?.name}</strong>. Our team is currently reviewing
                your pharmacist license. This usually takes 24-48 hours.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-700">
                You will receive an email once verified.
              </div>
            </>
          )}

          {status === "REJECTED" && (
            <>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">
                Unfortunately, we couldn't verify your documents. The license
                image provided was unclear.
              </p>
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Re-upload Documents
              </button>
            </>
          )}

          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full text-gray-500 hover:text-gray-700 text-sm font-medium gap-2"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
