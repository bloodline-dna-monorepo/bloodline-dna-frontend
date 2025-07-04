import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffSidebarTest from './StaffSidebarTest';
import StaffDashboard from '../../pages/staff/StaffDashboard';
import TestRequests from '../../pages/staff/TestRequests';
import TestProcess from '../../pages/staff/TestProcess';
import StaffProfile from '../../pages/staff/StaffProfile';
import StaffSettings from '../../pages/staff/StaffSettings';
import ProcessDetail from '../../pages/staff/ProcessDetail';

const StaffTestRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/staff/dashboard" replace />} />
            <Route path="/dashboard" element={
                <div className="flex h-screen bg-gray-50">
                    <StaffSidebarTest />
                    <div className="flex-1 overflow-auto">
                        <StaffDashboard />
                    </div>
                </div>
            } />
            <Route path="/requests" element={
                <div className="flex h-screen bg-gray-50">
                    <StaffSidebarTest />
                    <div className="flex-1 overflow-auto">
                        <TestRequests />
                    </div>
                </div>
            } />
            <Route path="/tests" element={
                <div className="flex h-screen bg-gray-50">
                    <StaffSidebarTest />
                    <div className="flex-1 overflow-auto">
                        <TestProcess />
                    </div>
                </div>
            } />
            <Route path="/profile" element={
                <div className="flex h-screen bg-gray-50">
                    <StaffSidebarTest />
                    <div className="flex-1 overflow-auto">
                        <StaffProfile />
                    </div>
                </div>
            } />
            <Route path="/settings" element={
                <div className="flex h-screen bg-gray-50">
                    <StaffSidebarTest />
                    <div className="flex-1 overflow-auto">
                        <StaffSettings />
                    </div>
                </div>
            } />
            <Route path="/process/:id" element={
                <div className="flex h-screen bg-gray-50">
                    <StaffSidebarTest />
                    <div className="flex-1 overflow-auto">
                        <ProcessDetail />
                    </div>
                </div>
            } />
        </Routes>
    );
};

export default StaffTestRoutes;