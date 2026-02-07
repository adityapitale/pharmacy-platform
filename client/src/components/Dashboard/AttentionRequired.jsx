import React from 'react';
import { AlertTriangle, FileText, Pill } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export default function AttentionRequired() {
    const { inventory } = usePharmacy();

    const criticalItems = inventory.filter(item => item.status === 'Critical' || item.status === 'Out of Stock');
    const criticalCount = criticalItems.length;
    const firstCriticalName = criticalItems.length > 0 ? criticalItems[0].name : '';

    // Mock logical alerts derived from state + static compliance
    const items = [
        { id: 1, type: 'urgent', text: '2 prescriptions pending approval', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
        // Dynamic Critical Alert
        ...(criticalCount > 0 ? [{
            id: 2,
            type: 'warning',
            text: `Low stock: ${firstCriticalName} ${criticalCount > 1 ? `(+${criticalCount - 1} others)` : ''}`,
            icon: Pill,
            color: 'text-red-600',
            bg: 'bg-red-50'
        }] : []),
        { id: 3, type: 'action', text: 'Upload Form 21 to unlock biologicals', icon: AlertTriangle, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-red-500 rounded-full"></span>
                Attention Required
            </h3>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.id} className={`flex items-start gap-3 p-3 rounded-lg ${item.bg} border border-transparent hover:border-gray-200 transition-colors cursor-pointer`}>
                        <div className={`p-2 rounded-full bg-white ${item.color}`}>
                            <item.icon size={18} />
                        </div>
                        <div>
                            <p className="font-medium text-gray-800 text-sm">{item.text}</p>
                            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{item.type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
