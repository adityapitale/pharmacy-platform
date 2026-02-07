import React from 'react';
import { XCircle } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export default function MissedDemand() {
    const { missedDemand } = usePharmacy();

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Missed Demand</h3>
            <div className="space-y-3">
                {missedDemand.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No missed demands today.</p>
                ) : (
                    missedDemand.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <div className="mt-1">
                                <XCircle className="text-red-500" size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{item.medicine}</p>
                                <p className="text-xs text-gray-500">{item.reason} • {item.time}</p>
                            </div>
                            <button className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100">
                                Restock
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
