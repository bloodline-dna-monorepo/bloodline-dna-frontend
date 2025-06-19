import type React from "react"
import { Link } from "react-router-dom"
import DashboardSidebar from "../../components/Layout/DashboardSidebar"

const HistoryServices: React.FC = () => {
  const historyData = [
    {
      order: "A001",
      date: "01/01/2024",
      service: "Xét nghiệm ADN Cha - Con",
      status: "Completed",
      results: "Available",
    },
    {
      order: "A002",
      date: "05/01/2024",
      service: "Xét nghiệm ADN Cha - Con",
      status: "In Testing",
      results: "Pending",
    },
    {
      order: "A003",
      date: "15/01/2024",
      service: "Xét nghiệm ADN Cha - Con",
      status: "Completed",
      results: "Available",
    },
    {
      order: "A004",
      date: "18/01/2024",
      service: "Xét nghiệm ADN Cha - Con",
      status: "Completed",
      results: "Available",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">History Services</h1>
            <div className="h-1 w-16 bg-teal-600 mt-2"></div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Results
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {historyData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.order}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.results === "Available" ? (
                          <Link to={`/results/${item.order}`} className="text-blue-600 hover:text-blue-800 font-medium">
                            Detail
                          </Link>
                        ) : (
                          <span className="text-gray-400">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryServices
