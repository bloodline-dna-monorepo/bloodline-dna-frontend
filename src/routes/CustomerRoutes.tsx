import React from "react"
import { Routes, Route } from "react-router-dom"
import ProfilePage from "../pages/Customer/ProfilePage"
import HistoryPage from "../pages/Customer/HistoryPage"
import TestProcessPage from "../pages/Customer/TestProcessPage"
import ServicesPage from "../pages/ServicesPage" // Your existing services page

const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/test-process" element={<TestProcessPage />} />
            <Route path="/history" element={<HistoryPage />} />
        </Routes>
    )
}

export default CustomerRoutes