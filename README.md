# Pharmacy Platform - Pharmacist Module

This is the frontend implementation for the Pharmacist Module of the Pharmacy Platform.

## Features

- **Authentication**: Pharmacist Login and Signup (Mock with LocalStorage).
- **Dashboard**:
    - Attention Required Alerts.
    - Compliance Status Tracking.
    - Today's Activity Metrics.
    - Low Stock Watchlist.
    - Missed Demand Logging.
    - Sales Summary.
- **Inventory Management**: View, Search, and Add medicines.
- **Quick Actions**: Process prescriptions, update stock, upload documents.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React.
- **State Management**: React Context API.
- **Persistence**: LocalStorage (Mock Backend).

## Getting Started

1.  Navigate to the client directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open the application in your browser (usually `http://localhost:5173`).

## Mock Credentials

You can register a new user or use the demo credentials (if configured in code, otherwise just sign up):
- **Email**: `demo@pharmacy.com`
- **Password**: `demo123`
