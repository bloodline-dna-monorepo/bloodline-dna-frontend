"use client"

import React from "react"
import CustomerLayout from "../../components/Layout/CustomerLayout"

interface HistoryItem {
    order: string
    date: string
    services: string
    results: string
    status: 'Done' | 'Pending' | 'Processing'
}

const historyData: HistoryItem[] = [
    {
        order: "A001",
        date: "01/01/2024",
        services: "Xét nghiệm ADN Cha - Con",
        results: "Detail",
        status: "Done"
    },
    {
        order: "A002",
        date: "05/01/2024",
        services: "Xét nghiệm ADN Cha - Con",
        results: "Detail",
        status: "Done"
    },
    {
        order: "A003",
        date: "15/01/2024",
        services: "Xét nghiệm ADN Cha - Con",
        results: "Detail",
        status: "Done"
    },
    {
        order: "A004",
        date: "18/01/2024",
        services: "Xét nghiệm ADN Cha - Con",
        results: "Detail",
        status: "Done"
    }
]

const HistoryPage = () => {
    const handleViewDetail = (order: string) => {
        console.log("View detail for order:", order)
    }

    return (
        <CustomerLayout title="History Services">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-teal-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Order</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Services</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Results</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {historyData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">{item.order}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{item.services}</td>
                                <td className="px-6 py-4 text-sm">
                                    <button
                                        onClick={() => handleViewDetail(item.order)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {item.results}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CustomerLayout>
    )
}

export default HistoryPage