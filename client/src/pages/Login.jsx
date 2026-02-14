import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Lock, Mail, Activity, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const result = await login(email, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f7ff] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full max-w-[460px] overflow-hidden mx-auto transition-all duration-300">
        <div className="p-10 pb-8 text-center bg-white">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <Activity size={32} className="text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-[#1e2a38] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Pharmacist Portal Access
          </p>
        </div>

        <div className="px-10 pb-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-center space-x-2 animate-fade-in-down">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1e2a38] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    size={20}
                    className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] rounded-xl border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-700 font-medium placeholder-gray-400"
                  placeholder="name@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-bold text-[#1e2a38]">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    size={20}
                    className="text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-[#f8fafc] rounded-xl border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-700 font-medium placeholder-gray-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#37a1ed] to-[#2c61f2] hover:shadow-lg hover:-translate-y-0.5 text-white font-bold py-4 rounded-xl transition-all duration-300 transform shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              Sign In securely
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#2982cb] font-bold hover:text-[#1c5a8f] transition-colors hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
