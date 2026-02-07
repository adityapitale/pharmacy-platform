import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ComplianceStatus() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                Compliance Status
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-600" size={20} />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Pharmacist Registration</p>
                            <p className="text-xs text-green-700">Valid</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-3">
                        <Clock className="text-yellow-600" size={20} />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Form 20 Expiry</p>
                            <p className="text-xs text-yellow-700">Expires in 42 days</p>
                        </div>
                    </div>
                    <button className="text-xs bg-white px-2 py-1 rounded border border-yellow-200 text-yellow-800 hover:bg-yellow-100">Renew</button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-75">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-gray-500" size={20} />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Form 21</p>
                            <p className="text-xs text-gray-500">Missing (Non-urgent)</p>
                        </div>
                    </div>
                    <button className="text-xs bg-white px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Upload</button>
                </div>
            </div>
        </div>
    );
}
