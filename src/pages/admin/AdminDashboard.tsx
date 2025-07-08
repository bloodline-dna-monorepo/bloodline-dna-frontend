import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardSidebar from "../../components/Common/Sidebar";
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = [
  "#2196f3",
  "#00bcd4",
  "#ffeb3b",
  "#ab47bc",
  "#f44336",
];

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalTests: 0,
    totalServices: 0,
    monthRevenue: 0,
    bar: [0, 0, 0, 0, 0, 0],
    barTests: [0, 0, 0, 0, 0, 0],
    doughnut: [0, 0, 0, 0, 0],
    doughnutLabels: [
      "ADN cha con",
      "ADN 2",
      "ADN 3",
      "ADN 4",
      "Khác",
    ],
  });

  useEffect(() => {
    axios.get("/api/dashboard/admin").then((res) => {
      setData({
        ...data,
        ...res.data,
      });
    });
    // eslint-disable-next-line
  }, []);

  const barData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    datasets: [
      {
        label: "Doanh thu",
        data: data.bar,
        backgroundColor: "#2196f3",
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const doughnutData = {
    labels: data.doughnutLabels,
    datasets: [
      {
        data: data.doughnut,
        backgroundColor: COLORS,
        borderWidth: 2,
      },
    ],
  };

  const totalDoughnut = data.doughnut.reduce((a, b) => a + b, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <span className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div>
              <div className="text-gray-500 text-sm">Tổng người dùng</div>
              <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Tổng số tài khoản</div>
            </div>
            <span className="bg-blue-100 text-blue-600 rounded-full p-3 text-xl">
              <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div>
              <div className="text-gray-500 text-sm">Tổng xét nghiệm</div>
              <div className="text-2xl font-bold">{data.totalTests.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Tổng số xét nghiệm</div>
            </div>
            <span className="bg-purple-100 text-purple-600 rounded-full p-3 text-xl">
              <svg width="24" height="24" fill="currentColor"><rect x="4" y="8" width="16" height="8" rx="2" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div>
              <div className="text-gray-500 text-sm">Dịch vụ</div>
              <div className="text-2xl font-bold">{data.totalServices}</div>
              <div className="text-xs text-gray-400">Dịch vụ sẵn có</div>
            </div>
            <span className="bg-red-100 text-red-600 rounded-full p-3 text-xl">
              <svg width="24" height="24" fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="8" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
            <div>
              <div className="text-gray-500 text-sm">Doanh thu tháng</div>
              <div className="text-2xl font-bold">{data.monthRevenue.toLocaleString()} ₫</div>
              <div className="text-xs text-gray-400">Doanh thu tháng này</div>
            </div>
            <span className="bg-green-100 text-green-600 rounded-full p-3 text-xl">
              <svg width="24" height="24" fill="currentColor"><rect x="6" y="10" width="12" height="8" rx="2" /></svg>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar chart */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="font-semibold text-xl mb-2">Doanh thu 6 tháng gần nhất</div>
            <Bar
              data={barData}
              options={{
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { display: false }, ticks: { display: false } },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={260}
            />
            <div className="flex justify-between mt-2 px-2">
              {["T1", "T2", "T3", "T4", "T5", "T6"].map((label, idx) => (
                <div key={label} className="text-center">
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-xs text-gray-400">{data.barTests[idx] || 0} test</div>
                </div>
              ))}
            </div>
          </div>
          {/* Doughnut chart */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="font-semibold text-xl mb-2">Phân bổ dịch vụ</div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-48 h-48">
                <Doughnut
                  data={doughnutData}
                  options={{
                    plugins: { legend: { display: false } },
                    cutout: "75%",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="font-bold text-2xl">{data.totalTests.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Tổng xét nghiệm</div>
                </div>
              </div>
              <div className="ml-6 mt-4 md:mt-0">
                {data.doughnutLabels.map((label, idx) => (
                  <div key={label} className="flex items-center mb-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[idx] }}
                    ></span>
                    <span className="text-sm">
                      {label}{" "}
                      <b>{data.doughnut[idx]}</b>
                      {totalDoughnut > 0 && (
                        <> ({Math.round((data.doughnut[idx] / totalDoughnut) * 100)}%)</>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;