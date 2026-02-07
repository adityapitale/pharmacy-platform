import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    Settings,
    Plus,
    FileText,
    RefreshCw,
    Upload,
    Menu,
    Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePharmacy } from '../context/PharmacyContext';

import AttentionRequired from '../components/Dashboard/AttentionRequired';
import ComplianceStatus from '../components/Dashboard/ComplianceStatus';
import TodaysActivity from '../components/Dashboard/TodaysActivity';
import LowStockWatchlist from '../components/Dashboard/LowStockWatchlist';
import MissedDemand from '../components/Dashboard/MissedDemand';
import InventoryManagement from '../components/Dashboard/InventoryManagement';
import SalesSummary from '../components/Dashboard/SalesSummary';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { processPrescription } = usePharmacy();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProcessPrescription = () => {
        setIsProcessing(true);
        processPrescription();
        setTimeout(() => setIsProcessing(false), 500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-lg">
                                <Menu size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Pharma<span className="text-indigo-600">Care</span></span>
                        </div>

                        {/* Mobile Actions (Visible only on small screens) */}
                        <div className="flex md:hidden items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold ml-1">
                                {user?.name?.charAt(0) || 'P'}
                            </div>
                            <button onClick={handleLogout} className="p-2 text-gray-500">
                                <LogOut size={20} />
                            </button>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{user?.name || 'Pharmacist'}</p>
                                    <p className="text-xs text-gray-500">License: {user?.role || 'PHARMACIST'}</p>
                                </div>
                                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                    {user?.name?.charAt(0) || 'P'}
                                </div>

                                <div className="relative group">
                                    <button className="p-2 text-gray-500 hover:text-gray-700">
                                        <Settings size={20} />
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 hidden group-hover:block group-focus-within:block">
                                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left gap-2">
                                            <LogOut size={16} /> Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 px-2 md:px-0">Dashboard</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:translate-y-[-2px] hover:shadow-xl transition-all font-semibold active:scale-95">
                            <Plus size={20} /> Add Inventory
                        </button>
                        <button
                            onClick={handleProcessPrescription}
                            disabled={isProcessing}
                            className="flex items-center justify-center gap-2 p-4 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all font-medium shadow-sm active:scale-95"
                        >
                            <FileText size={20} className={isProcessing ? "text-gray-400" : "text-blue-500"} />
                            {isProcessing ? 'Processing...' : 'Process Prescription'}
                        </button>
                        <button className="flex items-center justify-center gap-2 p-4 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all font-medium shadow-sm active:scale-95">
                            <RefreshCw size={20} className="text-green-500" /> Update Stock
                        </button>
                        <button className="flex items-center justify-center gap-2 p-4 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all font-medium shadow-sm active:scale-95">
                            <Upload size={20} className="text-orange-500" /> Upload Document
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">

                    {/* Row 1: Attention & Compliance */}
                    <div className="md:col-span-8">
                        <AttentionRequired />
                    </div>
                    <div className="md:col-span-4">
                        <ComplianceStatus />
                    </div>

                    {/* Row 2: Activity & Stats */}
                    <div className="md:col-span-12">
                        <TodaysActivity />
                    </div>

                    {/* Row 3: Watchlist & Missed Demand & Sales */}
                    <div className="md:col-span-4">
                        <LowStockWatchlist />
                    </div>
                    <div className="md:col-span-4">
                        <MissedDemand />
                    </div>
                    <div className="md:col-span-4">
                        <SalesSummary />
                    </div>

                    {/* Row 4: Inventory Table */}
                    <div className="md:col-span-12">
                        <InventoryManagement />
                    </div>

                </div>
            </main>
        </div>
    );
}
