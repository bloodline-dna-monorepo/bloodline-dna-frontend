import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardSidebar from "../../components/Common/Sidebar";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ManagerDashboard: React.FC = () => {
  const [data, setData] = useState({
    totalTests: 0,
    revenue: 0,
    avgRating: "0.0",
    completed: 0,
    pending: 0,
    feedback: 0,
    bar: [0, 0, 0, 0, 0, 0],
    doughnut: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/dashboard/manager");
        setData(res.data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu dashboard:", error);
      }
    };
    fetchData();
  }, []);

  const barData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    datasets: [
      {
        label: "Doanh thu",
        data: data.bar,
        backgroundColor: "#42a5f5",
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const doughnutData = {
    labels: ["ADN Cha con", "ADN 2", "ADN 3", "ADN 4", "Khác"],
    datasets: [
      {
        data: data.doughnut,
        backgroundColor: [
          "#42a5f5",
          "#66bb6a",
          "#ffa726",
          "#ab47bc",
          "#bdbdbd",
        ],
        borderWidth: 2,
      },
    ],
  };

  const totalDoughnut = data.doughnut.reduce((a, b) => a + b, 0);
  const serviceDetails = [
    { color: "#42a5f5", label: "ADN Cha con", value: data.doughnut[0], percent: totalDoughnut ? `${Math.round((data.doughnut[0] / totalDoughnut) * 100)}%` : "0%" },
    { color: "#66bb6a", label: "ADN 2", value: data.doughnut[1], percent: totalDoughnut ? `${Math.round((data.doughnut[1] / totalDoughnut) * 100)}%` : "0%" },
    { color: "#ffa726", label: "ADN 3", value: data.doughnut[2], percent: totalDoughnut ? `${Math.round((data.doughnut[2] / totalDoughnut) * 100)}%` : "0%" },
    { color: "#ab47bc", label: "ADN 4", value: data.doughnut[3], percent: totalDoughnut ? `${Math.round((data.doughnut[3] / totalDoughnut) * 100)}%` : "0%" },
    { color: "#bdbdbd", label: "Khác", value: data.doughnut[4], percent: totalDoughnut ? `${Math.round((data.doughnut[4] / totalDoughnut) * 100)}%` : "0%" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <span className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm">Tổng xét nghiệm</span>
            <span className="text-2xl font-bold mt-2">{data.totalTests.toLocaleString()}</span>
            <span className="mt-2 text-blue-500">
              <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm">Doanh thu</span>
            <span className="text-2xl font-bold mt-2">{data.revenue.toLocaleString()} ₫</span>
            <span className="mt-2 text-green-600">
              <svg width="24" height="24" fill="currentColor"><rect x="4" y="8" width="16" height="8" rx="2" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm">Đánh giá trung bình</span>
            <span className="text-2xl font-bold mt-2 text-orange-400">{data.avgRating}/5</span>
            <span className="mt-2 text-orange-400">
              <svg width="24" height="24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm">Đã hoàn thành</span>
            <span className="text-2xl font-bold mt-2 text-green-600">{data.completed}</span>
            <span className="mt-2 text-green-600">
              <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm">Kết quả chờ duyệt</span>
            <span className="text-2xl font-bold mt-2 text-yellow-600">{data.pending}</span>
            <span className="mt-2 text-yellow-500">
              <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10" /><rect x="11" y="6" width="2" height="6" /><rect x="11" y="14" width="2" height="2" /></svg>
            </span>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <span className="text-gray-500 text-sm">Tổng phản hồi từ khách hàng</span>
            <span className="text-2xl font-bold mt-2 text-blue-700">{data.feedback}</span>
            <span className="mt-2 text-blue-700">
              <svg width="24" height="24" fill="currentColor"><ellipse cx="12" cy="12" rx="10" ry="8" /></svg>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow col-span-1 md:col-span-4 flex flex-col">
            <span className="font-semibold mb-2">Doanh thu 6 tháng gần nhất</span>
            <div className="flex-1">
              <Bar
                data={barData}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { grid: { display: false }, ticks: { display: false } },
                  },
                }}
              />
            </div>
            <div className="flex justify-between mt-2 px-2">
              {["T1", "T2", "T3", "T4", "T5", "T6"].map((label, idx) => (
                <div key={label} className="text-center">
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-xs text-gray-400">{18 + idx * 4} test</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow col-span-1 md:col-span-3 flex flex-col">
            <span className="font-semibold mb-2">Phân bổ dịch vụ</span>
            <div className="flex items-center h-52">
              <div className="relative w-40 h-40">
                <Doughnut
                  data={doughnutData}
                  options={{
                    plugins: { legend: { display: false } },
                    cutout: "75%",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="font-bold text-xl">{totalDoughnut.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Tổng xét nghiệm</div>
                </div>
              </div>
              <div className="ml-4">
                {serviceDetails.map((item) => (
                  <div key={item.label} className="flex items-center mb-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-sm">
                      {item.label} <b>{item.value}</b> ({item.percent})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;