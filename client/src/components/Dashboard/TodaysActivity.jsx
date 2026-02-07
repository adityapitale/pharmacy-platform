import React from 'react';
import { ShoppingBag, TrendingUp, Clock, FileText } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export default function TodaysActivity() {
    const { todaysActivity } = usePharmacy();

    const activities = [
        { title: 'Prescriptions Received', value: todaysActivity.received, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Orders Fulfilled', value: todaysActivity.fulfilled, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Pending Actions', value: todaysActivity.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Activity</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activities.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 border border-gray-100 text-center hover:shadow-sm transition-shadow">
                        <div className={`p-3 rounded-full ${item.bg} mb-3`}>
                            <item.icon className={item.color} size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                        <span className="text-xs text-gray-500 font-medium mt-1">{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
