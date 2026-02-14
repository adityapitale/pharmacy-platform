import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  Shield,
} from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <Shield size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your Credentials
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          To maintain platform security, we need to verify your pharmacist
          license.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* License */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pharmacy License Document
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors cursor-pointer relative">
                <div className="space-y-1 text-center">
                  {files.license ? (
                    <div className="flex flex-col items-center text-green-600">
                      <CheckCircle size={32} />
                      <p className="text-sm font-medium">
                        {files.license.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="license-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="license-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleFileChange(e, "license")}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Government ID Proof
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors cursor-pointer relative">
                <div className="space-y-1 text-center">
                  {files.idProof ? (
                    <div className="flex flex-col items-center text-green-600">
                      <CheckCircle size={32} />
                      <p className="text-sm font-medium">
                        {files.idProof.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="id-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="id-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleFileChange(e, "idProof")}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit for Verification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
