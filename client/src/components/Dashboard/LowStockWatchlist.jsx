import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export default function LowStockWatchlist() {
    const { inventory } = usePharmacy();

    const lowStockItems = inventory.filter(item =>
        item.stock <= item.minStock
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Low Stock Watchlist</h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    View All <ArrowRight size={14} className="ml-1" />
                </button>
            </div>
            <div className="space-y-3">
                {lowStockItems.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No items are low on stock.</p>
                ) : (
                    lowStockItems.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Stock: {item.stock} (Min: {item.minStock})</p>
                            </div>
                            {item.status === 'Critical' || item.status === 'Out of Stock' ? (
                                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                                    <AlertTriangle size={12} className="mr-1" /> {item.status}
                                </span>
                            ) : (
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">Low</span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
