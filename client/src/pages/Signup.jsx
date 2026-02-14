import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isPharmacist: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.isPharmacist) {
      setError("You must confirm you are a pharmacist to register.");
      return;
    }

    const result = await register(formData);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f7fc] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Header Section - Outside Card */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "linear-gradient(90deg, #2e76f1, #2e73f2)",
            }}
          >
            <Activity size={32} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-[#1e2a38]">
          Create Account
        </h2>
        <p className="text-[#64748b] text-base font-medium">
          Join the Pharmacist Network
        </p>
      </div>

      {/* White Card - Form Only */}
      <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] w-full max-w-md p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#354156] mb-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#37a1ed] transition-colors"
                />
              </div>
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-[#f8fafb] text-gray-700 placeholder-gray-400 focus:bg-white hover:border-[#37a1ed] hover:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] focus:border-[#37a1ed] focus:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] transition-all duration-300 ease-in-out outline-none"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#354156] mb-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#37a1ed] transition-colors"
                />
              </div>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-[#f8fafb] text-gray-700 placeholder-gray-400 focus:bg-white hover:border-[#37a1ed] hover:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] focus:border-[#37a1ed] focus:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] transition-all duration-300 ease-in-out outline-none"
                placeholder="pharmacist@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#354156] mb-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#37a1ed] transition-colors"
                />
              </div>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-[#f8fafb] text-gray-700 placeholder-gray-400 focus:bg-white hover:border-[#37a1ed] hover:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] focus:border-[#37a1ed] focus:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] transition-all duration-300 ease-in-out outline-none"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="pharmacist-check"
                type="checkbox"
                required
                className="h-4 w-4 text-[#37a1ed] focus:ring-[#37a1ed] border-gray-300 rounded cursor-pointer"
                checked={formData.isPharmacist}
                onChange={(e) =>
                  setFormData({ ...formData, isPharmacist: e.target.checked })
                }
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="pharmacist-check"
                className="font-medium text-[#354156] cursor-pointer"
              >
                Pharmacist Declaration
              </label>
              <p className="text-gray-500 text-xs">
                I certify that I am a registered pharmacist with a valid
                license.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#37a1ed] to-[#2c61f2] hover:shadow-lg hover:-translate-y-0.5 text-white font-bold py-3 rounded-lg transition-all duration-300 transform active:scale-[0.98] shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} />
            Register Securely
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-[#2982cb] font-semibold hover:text-[#1c5a8f] hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
