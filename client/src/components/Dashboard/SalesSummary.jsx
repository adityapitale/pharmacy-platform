import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export default function SalesSummary() {
    const { sales } = usePharmacy();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Summary</h3>

            <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-sm text-indigo-600 font-medium mb-1">Total Sales Today</p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-gray-900">₹{sales.total.toLocaleString()}</span>
                        <span className="text-green-600 text-xs font-bold flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
                            <TrendingUp size={12} className="mr-1" /> +12%
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Transactions</p>
                        <p className="text-lg font-bold text-gray-800">{sales.count}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Avg. Value</p>
                        <p className="text-lg font-bold text-gray-800">₹{sales.count > 0 ? Math.round(sales.total / sales.count) : 0}</p>
                    </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Top Medicines</p>
                    <ul className="space-y-2">
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-700">Dolo 650</span>
                            <span className="font-medium text-gray-900">120 units</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-gray-700">Cetirizine</span>
                            <span className="font-medium text-gray-900">85 units</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
