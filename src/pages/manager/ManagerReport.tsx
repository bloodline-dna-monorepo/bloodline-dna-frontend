import React, { useEffect, useState } from "react";
import axios from "axios";
import ManaSidebar from "components/ManagerSidebar/ManaSidebar";

export default function ManagerReport() {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [stats, setStats] = useState<any>({
    totalTest: 0,
    totalTestChange: 0,
    revenue: 0,
    revenueChange: 0,
    avgProcessTime: 0,
    avgProcessTimeChange: 0,
    avgRating: 0,
    avgRatingChange: 0,
    testTypeStats: [],
    customerStats: {
      new: 0,
      newChange: 0,
      repeat: 0,
      repeatStatus: "",
      avgOrder: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Thay thế API thực tế của bạn ở đây
        const res = await axios.get("/api/manager/report");
        setStats(res.data);
        setLastUpdate(new Date());
      } catch (e) {
        // fallback demo data
        setStats({
          totalTest: 1247,
          totalTestChange: 12.5,
          revenue: 2450000000,
          revenueChange: 8.2,
          avgProcessTime: 3.2,
          avgProcessTimeChange: -0.3,
          avgRating: 4.3,
          avgRatingChange: 0.2,
          testTypeStats: [
            {
              label: "Xét nghiệm ADN cha con",
              percent: 36.8,
              value: 456,
              revenue: 912000000,
            },
            {
              label: "Xét nghiệm huyết thống",
              percent: 31.2,
              value: 389,
              revenue: 778000000,
            },
            {
              label: "Xét nghiệm ADN cha con",
              percent: 18.8,
              value: 234,
              revenue: 468000000,
            },
            {
              label: "Xét nghiệm ADN cha con",
              percent: 13.4,
              value: 168,
              revenue: 292000000,
            },
          ],
          customerStats: {
            new: 234,
            newChange: 15.8,
            repeat: 456,
            repeatStatus: "Ổn định",
            avgOrder: 1965000,
          },
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Báo cáo thống kê</h1>
            <div className="text-sm text-gray-500 mt-2 sm:mt-0">
              Last updated: {lastUpdate.toLocaleTimeString()} {lastUpdate.toLocaleDateString()}
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
              <div className="text-gray-500 text-xs">Tổng xét nghiệm</div>
              <div className="text-2xl font-bold">{stats.totalTest.toLocaleString()}</div>
              <div className={`text-xs ${stats.totalTestChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stats.totalTestChange >= 0 ? "+" : ""}
                {stats.totalTestChange}% so với tháng trước
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
              <div className="text-gray-500 text-xs">Doanh thu</div>
              <div className="text-2xl font-bold">{stats.revenue.toLocaleString()} ₫</div>
              <div className={`text-xs ${stats.revenueChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stats.revenueChange >= 0 ? "+" : ""}
                {stats.revenueChange}% so với tháng trước
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
              <div className="text-gray-500 text-xs">Thời gian xử lý TB</div>
              <div className="text-2xl font-bold">{stats.avgProcessTime} ngày</div>
              <div className={`text-xs ${stats.avgProcessTimeChange <= 0 ? "text-green-600" : "text-red-600"}`}>
                {stats.avgProcessTimeChange <= 0 ? "Giảm" : "Tăng"} {Math.abs(stats.avgProcessTimeChange)} ngày
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
              <div className="text-gray-500 text-xs">Hài lòng KH</div>
              <div className="text-2xl font-bold">{stats.avgRating}/5</div>
              <div className={`text-xs ${stats.avgRatingChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stats.avgRatingChange >= 0 ? "+" : ""}
                {stats.avgRatingChange} điểm so với tháng trước
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phân bố theo loại xét nghiệm */}
            <div className="bg-white rounded-xl border shadow p-6">
              <div className="font-bold text-lg mb-2">Phân bố theo loại xét nghiệm</div>
              <div className="text-gray-500 text-sm mb-4">
                Thống kê số lượng và doanh thu theo từng loại
              </div>
              <div className="space-y-3">
                {stats.testTypeStats.map((item: any, idx: number) => (
                  <div key={item.label} className="border-b pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.percent}% tổng số</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{item.revenue.toLocaleString()} ₫</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Phân tích khách hàng */}
            <div className="bg-white rounded-xl border shadow p-6">
              <div className="font-bold text-lg mb-2">Phân tích khách hàng</div>
              <div className="text-gray-500 text-sm mb-4">
                Thống kê về khách hàng mới và cũ
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-blue-50 rounded px-4 py-2">
                  <div>
                    <div className="text-sm">Khách hàng mới</div>
                    <div className="text-2xl font-bold">{stats.customerStats.new}</div>
                  </div>
                  <div className="text-blue-600 font-semibold text-sm">
                    +{stats.customerStats.newChange}%
                  </div>
                </div>
                <div className="flex justify-between items-center bg-green-50 rounded px-4 py-2">
                  <div>
                    <div className="text-sm">Khách hàng quay lại</div>
                    <div className="text-2xl font-bold">{stats.customerStats.repeat}</div>
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    {stats.customerStats.repeatStatus}
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-50 rounded px-4 py-2">
                  <div className="text-sm">Giá trị đơn hàng TB</div>
                  <div className="text-xl font-bold">{stats.customerStats.avgOrder.toLocaleString()} ₫</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}