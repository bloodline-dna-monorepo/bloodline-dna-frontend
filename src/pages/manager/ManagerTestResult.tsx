import React, { useState, useEffect } from "react";
import { FiEye, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axios from "axios";
import ManaSidebar from "components/ManagerSidebar/ManaSidebar";

const statusColor = (status: string) => {
  switch (status) {
    case "Chờ duyệt":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "Đã duyệt":
      return "bg-green-100 text-green-700 border border-green-300";
    case "Từ chối":
      return "bg-red-100 text-red-700 border border-red-300";
    default:
      return "bg-gray-100 text-gray-700 border";
  }
};

export default function ManagerTestResult() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tất cả trạng thái");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selected, setSelected] = useState<any | null>(null);

  // Lấy dữ liệu từ database qua API
  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/manager/test-results");
      setResults(res.data);
      setLastUpdate(new Date());
    } catch (e) {
      console.error("Lỗi khi lấy dữ liệu test result:", e);
      setResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  // Lọc kết quả theo search và filter
  const filteredResults = results.filter((r) => {
    const matchSearch =
      r.patient?.toLowerCase().includes(search.toLowerCase()) ||
      r.code?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "Tất cả trạng thái" || r.status === filter;
    return matchSearch && matchFilter;
  });

  // Xử lý phê duyệt hoặc từ chối
  const handleUpdateStatus = async (code: string, status: string) => {
    try {
      await axios.post(`/api/manager/test-results/${code}/status`, { status });
      setResults((prev) =>
        prev.map((item) =>
          item.code === code ? { ...item, status } : item
        )
      );
      if (selected && selected.code === code) {
        setSelected({ ...selected, status });
      }
    } catch (e) {
      console.error("Lỗi khi cập nhật trạng thái:", e);
        alert("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <ManaSidebar />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý kết quả xét nghiệm</h1>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          Last updated: {lastUpdate.toLocaleTimeString()} {lastUpdate.toLocaleDateString()}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="font-semibold text-lg mb-4">Danh sách kết quả xét nghiệm</div>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã xét nghiệm..."
            className="border rounded px-3 py-2 flex-1 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 text-sm w-48"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option>Tất cả trạng thái</option>
            <option>Chờ duyệt</option>
            <option>Đã duyệt</option>
            <option>Từ chối</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center text-gray-400">Đang tải dữ liệu...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2 text-left font-semibold">Mã XN</th>
                  <th className="py-2 px-2 text-left font-semibold">Bệnh nhân</th>
                  <th className="py-2 px-2 text-left font-semibold">Loại xét nghiệm</th>
                  <th className="py-2 px-2 text-left font-semibold">Ngày lấy mẫu</th>
                  <th className="py-2 px-2 text-left font-semibold">Trạng thái</th>
                  <th className="py-2 px-2 text-left font-semibold">Kỹ thuật viên</th>
                  <th className="py-2 px-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((r, idx) => (
                  <tr key={r.code || idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{r.code}</td>
                    <td className="py-2 px-2">{r.patient}</td>
                    <td className="py-2 px-2">{r.type}</td>
                    <td className="py-2 px-2">{r.date}</td>
                    <td className="py-2 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">{r.technician}</td>
                    <td className="py-2 px-2 flex gap-2">
                      <button
                        title="Xem chi tiết"
                        className="border rounded p-1 hover:bg-gray-100"
                        onClick={() => setSelected(r)}><FiEye size={18} />
                      </button>
                      <button
                        title="Phê duyệt"
                        className="border rounded p-1 text-green-500 border-green-300 hover:bg-green-50"
                        onClick={() => handleUpdateStatus(r.code, "Đã duyệt")}
                        disabled={r.status === "Đã duyệt"}><FiCheckCircle size={18} />
                      </button>
                      <button
                        title="Từ chối"
                        className="border rounded p-1 text-red-500 border-red-300 hover:bg-red-50"
                        onClick={() => handleUpdateStatus(r.code, "Từ chối")}
                        disabled={r.status === "Từ chối"}><FiXCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredResults.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-400">
                      Không có kết quả phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal chi tiết */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white rounded-xl shadow-xl border p-8 w-full max-w-2xl relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
              onClick={() => setSelected(null)}
              aria-label="Đóng">×
            </button>
            <div className="font-bold text-xl mb-2">Chi tiết kết quả xét nghiệm</div>
            <div className="text-gray-500 text-sm mb-4">
              Thông tin chi tiết về kết quả xét nghiệm {selected.code}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-semibold">Mã xét nghiệm</div>
                <div>{selected.code}</div>
              </div>
              <div>
                <div className="font-semibold">Bệnh nhân</div>
                <div>{selected.patient}</div>
              </div>
              <div>
                <div className="font-semibold">Loại xét nghiệm</div>
                <div>{selected.type}</div>
              </div>
              <div>
                <div className="font-semibold">Ngày lấy mẫu</div>
                <div>{selected.date}</div>
              </div>
              <div>
                <div className="font-semibold">Kỹ thuật viên</div>
                <div>{selected.technician}</div>
              </div>
              <div>
                <div className="font-semibold">Trạng thái</div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(selected.status)}`}>
                  {selected.status}
                </span>
              </div>
            </div>
            <div className="mb-2 font-semibold">Kết quả</div>
            <input
              className="border rounded px-3 py-2 w-full"
              value={selected.result || ""}
              readOnly
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="border px-5 py-2 rounded font-semibold hover:bg-gray-100"
                onClick={() => setSelected(null)}> Đóng
              </button>
              {selected.status === "Chờ duyệt" ? (
                <>
                  <button
                    className="bg-green-600 text-white px-5 py-2 rounded font-semibold hover:bg-green-700 flex items-center gap-2"
                    onClick={() => handleUpdateStatus(selected.code, "Đã duyệt")}><FiCheckCircle /> Đồng ý
                  </button>
                  <button
                    className="bg-red-600 text-white px-5 py-2 rounded font-semibold hover:bg-red-700 flex items-center gap-2"
                    onClick={() => handleUpdateStatus(selected.code, "Từ chối")}><FiXCircle /> Từ chối
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-green-600 text-white px-5 py-2 rounded font-semibold opacity-50 cursor-not-allowed flex items-center gap-2"
                    disabled><FiCheckCircle /> Đồng ý
                  </button>
                  <button
                    className="bg-red-600 text-white px-5 py-2 rounded font-semibold opacity-50 cursor-not-allowed flex items-center gap-2"
                    disabled><FiXCircle /> Từ chối
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}