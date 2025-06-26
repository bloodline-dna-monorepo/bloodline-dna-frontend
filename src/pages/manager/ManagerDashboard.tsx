import React, { useState, useEffect } from "react";
import axios from "axios";
import ManaSidebar from "../../components/ManagerSidebar/ManaSidebar.tsx";
// Giả sử bạn đã có component ManagerSidebar

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    feedback: 0,
    avgRating: 0,
    ratingCount: 0,
  });
  const [testTypeStats, setTestTypeStats] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Hàm fetch dữ liệu từ API
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Thay các đường dẫn API bên dưới bằng API thực tế của bạn
      const [statsRes, testTypeRes, activitiesRes] = await Promise.all([
        axios.get("/api/dashboard/stats"),
        axios.get("/api/dashboard/test-types"),
        axios.get("/api/dashboard/activities"),
      ]);
      setStats(statsRes.data);
      setTestTypeStats(testTypeRes.data);
      setRecentActivities(activitiesRes.data);
      setLastUpdate(new Date());
    } catch (e) {
      console.error("Lỗi khi lấy dữ liệu dashboard:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Tính lại phần trăm cho testTypeStats
  const totalTest = testTypeStats.reduce((sum, t) => sum + t.value, 0);
  const testTypeStatsWithPercent = testTypeStats.map((item: any) => ({
    ...item,
    percent: totalTest ? Math.round((item.value / totalTest) * 10000) / 100 : 0,
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ManaSidebar />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              Last updated: {lastUpdate.toLocaleTimeString()} {lastUpdate.toLocaleDateString()}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow border flex items-center gap-4">
              <div className="bg-orange-100 text-orange-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                <span>⏳</span>
              </div>
              <div>
                <div className="text-xl font-bold">{stats.pending}</div>
                <div className="text-gray-700 text-sm">Kết quả chờ duyệt</div>
                <div className="text-xs text-gray-400">Cần xem xét và phê duyệt</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border flex items-center gap-4">
              <div className="bg-green-100 text-green-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                <span>✅</span>
              </div>
              <div>
                <div className="text-xl font-bold">{stats.completed}</div>
                <div className="text-gray-700 text-sm">Đã hoàn thành</div>
                <div className="text-xs text-gray-400">Kết quả đã được phê duyệt</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                <span>💬</span>
              </div>
              <div>
                <div className="text-xl font-bold">{stats.feedback}</div>
                <div className="text-gray-700 text-sm">Phản hồi</div>
                <div className="text-xs text-gray-400">Phản hồi từ khách hàng</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border flex items-center gap-4">
              <div className="bg-yellow-100 text-yellow-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                <span>⭐</span>
              </div>
              <div>
                <div className="text-xl font-bold">{stats.avgRating}/5</div>
                <div className="text-gray-700 text-sm">Đánh giá trung bình</div>
                <div className="text-xs text-gray-400">Từ {stats.ratingCount} đánh giá</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl border shadow p-5 col-span-2 flex flex-col">
              <div className="font-semibold text-lg mb-3">Hoạt động gần đây</div>
              <div className="text-xs text-gray-500 mb-2">Các hành động được thực hiện trong hôm nay</div>
              <ul className="divide-y">
                {recentActivities.map((act: any, idx: number) => (
                  <li key={idx} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-base ${act.color || "text-gray-400"}`}>●</span>
                      <span className="font-medium">{act.type}</span>
                      <span className="text-gray-500 text-sm ml-2">{act.user}</span>
                    </div>
                    <span className="text-xs text-gray-400">{act.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Test Type Stats */}
            <div className="bg-white rounded-xl border shadow p-5 flex flex-col">
              <div className="font-semibold text-lg mb-3">Phân bố loại xét nghiệm</div>
              <div className="text-xs text-gray-500 mb-2">Thông kê theo loại xét nghiệm trong tháng</div>
              <div className="space-y-3">
                {testTypeStatsWithPercent.map((item: any) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-gray-500">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded h-2 mt-1 mb-1">
                      <div
                        className={`${item.color} h-2 rounded`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400">{item.percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border shadow p-5 col-span-2">
              <div className="font-semibold text-lg mb-3">Cần chú ý</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-orange-50 border border-orange-200 rounded px-3 py-2 text-orange-700 text-sm">
                  <span className="mr-2">⏳</span>
                  {stats.pending} kết quả chờ duyệt
                </div>
                <div className="flex items-center bg-blue-50 border border-blue-200 rounded px-3 py-2 text-blue-700 text-sm">
                  <span className="mr-2">🧪</span>
                  {/* Số mẫu mới, bạn có thể lấy từ API nếu có */}
                  12 mẫu mới
                </div>
                <div className="flex items-center bg-green-50 border border-green-200 rounded px-3 py-2 text-green-700 text-sm">
                  <span className="mr-2">✅</span>
                  {Math.round((stats.completed / (stats.completed + stats.pending)) * 100) || 0}% hoàn thành
                </div>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}