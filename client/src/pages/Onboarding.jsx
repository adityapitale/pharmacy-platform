import React, { useState } from "react";
import { Upload, FileText, CheckCircle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Onboarding() {
  const navigate = useNavigate();
  const { submitOnboarding } = useAuth();
  const [files, setFiles] = useState({ license: null, idProof: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!files.license || !files.idProof) return;

    try {
      setIsSubmitting(true);
      await submitOnboarding();
      navigate("/verification-pending");
    } catch {
      // you can show toast later
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f7ff] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Shield size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1e2a38]">
          Verify Your Credentials
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          To maintain platform security, we need to verify your pharmacist
          license.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-[24px]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* License Upload */}
            <div>
              <label className="block text-sm font-bold text-[#1e2a38] mb-2">
                Pharmacy License Document
              </label>
              <div className="flex items-center border border-blue-100 rounded-xl p-2 bg-white hover:border-[#37a1ed] hover:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] transition-all duration-300 ease-in-out group">
                <label
                  htmlFor="license-upload"
                  className="cursor-pointer bg-[#e3f1fd] text-[#2167a3] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d0e6ff] transition-colors shrink-0"
                >
                  Choose File
                  <input
                    id="license-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "license")}
                    required
                  />
                </label>
                <span className="ml-3 text-[#2167a3] text-sm font-medium truncate group-hover:text-[#1c5a8f] transition-colors">
                  {files.license ? (
                    <span className="text-green-600 font-bold flex items-center">
                      <CheckCircle size={16} className="mr-1.5" />
                      {files.license.name}
                    </span>
                  ) : (
                    "No file chosen"
                  )}
                </span>
              </div>
            </div>

            {/* ID Proof Upload */}
            <div>
              <label className="block text-sm font-bold text-[#1e2a38] mb-2">
                Government ID Proof
              </label>
              <div className="flex items-center border border-blue-100 rounded-xl p-2 bg-white hover:border-[#37a1ed] hover:shadow-[0_0_0_4px_rgba(55,161,237,0.1)] transition-all duration-300 ease-in-out group">
                <label
                  htmlFor="id-upload"
                  className="cursor-pointer bg-[#e3f1fd] text-[#2167a3] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d0e6ff] transition-colors shrink-0"
                >
                  Choose File
                  <input
                    id="id-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "idProof")}
                    required
                  />
                </label>
                <span className="ml-3 text-[#2167a3] text-sm font-medium truncate group-hover:text-[#1c5a8f] transition-colors">
                  {files.idProof ? (
                    <span className="text-green-600 font-bold flex items-center">
                      <CheckCircle size={16} className="mr-1.5" />
                      {files.idProof.name}
                    </span>
                  ) : (
                    "No file chosen"
                  )}
                </span>
              </div>
            </div>

            <div>
              {/* DEMO MODE: Document upload is mocked.
                                Real file upload will be enabled after backend integration.
                                Validation is temporarily disabled to allow easy testing. */}
              <button
                type="submit"
                disabled={isSubmitting} // DEMO MODE: specific file checks removed
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all transform hover:-translate-y-0.5 
                                ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-gradient-to-r from-[#37a1ed] to-[#2c61f2] hover:shadow-lg"}`}
              >
                {isSubmitting
                  ? "Submitting (Demo)..."
                  : "Submit for Verification (Demo)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
