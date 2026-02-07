import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, Activity, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isPharmacist: false
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.isPharmacist) {
            setError("You must confirm you are a pharmacist to register.");
            return;
        }

        const result = register(formData);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden mx-auto">
                <div className="bg-indigo-600 p-8 text-center text-white">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                            <Activity size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-indigo-100">Join the Pharmacist Network</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                                <AlertCircle className="text-red-500 mr-2" size={20} />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="pharmacist@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="pharmacist-check"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    checked={formData.isPharmacist}
                                    onChange={(e) => setFormData({ ...formData, isPharmacist: e.target.checked })}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="pharmacist-check" className="font-medium text-gray-700">Pharmacist Declaration</label>
                                <p className="text-gray-500 text-xs">I certify that I am a registered pharmacist with a valid license.</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={20} />
                            Register Securely
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already registered?{' '}
                        <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
