import React, { createContext, useContext, useState, useEffect } from 'react';

const PharmacyContext = createContext(null);

const INITIAL_INVENTORY = [
    { id: 1, name: 'Paracetamol 500mg', stock: 120, minStock: 20, price: 20, status: 'In Stock' },
    { id: 2, name: 'Amoxicillin 250mg', stock: 45, minStock: 50, price: 45, status: 'Low Stock' },
    { id: 3, name: 'Cetirizine 10mg', stock: 80, minStock: 20, price: 15, status: 'In Stock' },
    { id: 4, name: 'Metformin 500mg', stock: 200, minStock: 100, price: 18, status: 'In Stock' },
    { id: 5, name: 'Ibuprofen 400mg', stock: 0, minStock: 50, price: 25, status: 'Out of Stock' },
    { id: 6, name: 'Vitamin C', stock: 12, minStock: 20, price: 30, status: 'Low Stock' },
    { id: 7, name: 'Cough Syrup', stock: 8, minStock: 10, price: 90, status: 'Low Stock' },
    { id: 8, name: 'Azithromycin 250mg', stock: 3, minStock: 30, price: 120, status: 'Critical' },
];

const INITIAL_MISSED = [
    { id: 1, medicine: 'Insulin Glargine', reason: 'Out of Stock', time: '10:30 AM' },
    { id: 2, medicine: 'Dolo 650', reason: 'Out of Stock', time: '12:15 PM' },
    { id: 3, medicine: 'Morphine', reason: 'Not Authorized', time: '02:45 PM' },
];

export const PharmacyProvider = ({ children }) => {
    // State initialization with localStorage fallback
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('pharma_inventory');
        return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    });

    const [todaysActivity, setTodaysActivity] = useState(() => {
        const saved = localStorage.getItem('pharma_activity');
        return saved ? JSON.parse(saved) : { received: 18, fulfilled: 15, pending: 3 };
    });

    const [missedDemand, setMissedDemand] = useState(() => {
        const saved = localStorage.getItem('pharma_missed');
        return saved ? JSON.parse(saved) : INITIAL_MISSED;
    });

    const [sales, setSales] = useState(() => {
        const saved = localStorage.getItem('pharma_sales');
        return saved ? JSON.parse(saved) : { total: 12450, count: 173 };
    });

    // Persistence Effects
    useEffect(() => localStorage.setItem('pharma_inventory', JSON.stringify(inventory)), [inventory]);
    useEffect(() => localStorage.setItem('pharma_activity', JSON.stringify(todaysActivity)), [todaysActivity]);
    useEffect(() => localStorage.setItem('pharma_missed', JSON.stringify(missedDemand)), [missedDemand]);
    useEffect(() => localStorage.setItem('pharma_sales', JSON.stringify(sales)), [sales]);

    // Actions
    const addInventoryItem = (item) => {
        const newItem = { ...item, id: Date.now(), status: getItemStatus(item.stock, item.minStock) };
        setInventory(prev => [...prev, newItem]);
    };

    const updateStock = (id, newStock) => {
        setInventory(prev => prev.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    stock: newStock,
                    status: getItemStatus(newStock, item.minStock)
                };
            }
            return item;
        }));
    };

    const processPrescription = () => {
        // Simulate processing: reduce stock of random items, update stats
        const randomItemId = inventory[Math.floor(Math.random() * inventory.length)].id;

        setInventory(prev => prev.map(item => {
            if (item.id === randomItemId && item.stock > 0) {
                return { ...item, stock: item.stock - 1, status: getItemStatus(item.stock - 1, item.minStock) };
            }
            return item;
        }));

        setTodaysActivity(prev => ({ ...prev, fulfilled: prev.fulfilled + 1 }));
        setSales(prev => ({ ...prev, total: prev.total + Math.floor(Math.random() * 500) + 50, count: prev.count + 1 }));
    };

    const addMissedDemand = (medicine, reason) => {
        const newMissed = {
            id: Date.now(),
            medicine,
            reason,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMissedDemand(prev => [newMissed, ...prev]);
    };

    const getItemStatus = (stock, min) => {
        if (stock === 0) return 'Out of Stock';
        if (stock <= 5) return 'Critical';
        if (stock < min) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <PharmacyContext.Provider value={{
            inventory,
            todaysActivity,
            missedDemand,
            sales,
            addInventoryItem,
            updateStock,
            processPrescription,
            addMissedDemand
        }}>
            {children}
        </PharmacyContext.Provider>
    );
};

export const usePharmacy = () => useContext(PharmacyContext);
