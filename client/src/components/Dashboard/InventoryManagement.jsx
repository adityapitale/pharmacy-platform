import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export default function InventoryManagement() {
    const { inventory } = usePharmacy();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-gray-800">Inventory Management</h3>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 sm:flex-none p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 flex justify-center">
                            <Filter size={18} />
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Medicine Name</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3 rounded-r-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                                <td className="px-4 py-3 text-gray-600">{item.stock}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                ${item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">₹{item.price}</td>
                                <td className="px-4 py-3">
                                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
