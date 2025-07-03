import React, { useEffect, useState } from "react";
import axios from "axios";
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { TestResults } from "utils/types";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../../components/Common/Sidebar";

const statusColor = (status: string) => {
  switch (status) {
    case "Chờ duyệt":
      return "bg-yellow-100 text-yellow-800";
    case "Đã duyệt":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TestRq: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState<TestResults[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<TestResults | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<TestResults[]>("/api/test-results")
      .then((res) => {
        setDataSource(res.data || []);
      })
      .catch(() => setDataSource([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = dataSource.filter(
    (item) =>
      item.CustomerName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.TestRequestID.includes(searchText)
  );

  const handleView = (item: TestResults) => {
    setSelected(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-12">
        <div className="w-full max-w-4xl">
          <h1 className="font-bold text-3xl mb-6">Quản lý kết quả xét nghiệm</h1>
          <div className="bg-white rounded-xl shadow p-8">
            <div className="font-semibold text-lg mb-4">Danh sách kết quả xét nghiệm</div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã xét nghiệm..."
              className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-4 border-b">Mã yêu cầu</th>
                    <th className="py-2 px-4 border-b">Người xét nghiệm</th>
                    <th className="py-2 px-4 border-b">Loại xét nghiệm</th>
                    <th className="py-2 px-4 border-b">Trạng thái</th>
                    <th className="py-2 px-4 border-b">Nhân viên</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-400">
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-400">
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.TestRequestID} className="text-center">
                        <td className="py-2 px-4 border-b">{item.TestRequestID}</td>
                        <td className="py-2 px-4 border-b">{item.CustomerName}</td>
                        <td className="py-2 px-4 border-b">{item.ServiceType}</td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(item.Status)}`}>
                            {item.Status}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">{item.StaffName}</td>
                        <td className="py-2 px-4 border-b flex justify-center gap-2">
                          <button
                            className="text-gray-600 hover:text-blue-600"
                            title="Xem"
                            onClick={() => handleView(item)}
                          >
                            <EyeOutlined />
                          </button>
                          <button className="text-green-600 hover:text-green-800" title="Duyệt">
                            <CheckCircleOutlined />
                          </button>
                          <button className="text-red-600 hover:text-red-800" title="Từ chối">
                            <CloseCircleOutlined />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Modal hiển thị chi tiết */}
        {modalOpen && selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
                onClick={handleCloseModal}
                aria-label="Đóng"
              >
                &times;
              </button>
              <div className="mb-2 text-2xl font-bold">Chi tiết kết quả xét nghiệm</div>
              <div className="mb-4 text-gray-500 text-sm">
                Thông tin chi tiết về kết quả xét nghiệm {selected.TestRequestID}
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                  <div className="text-gray-500 text-sm">Mã yêu cầu</div>
                  <div className="font-semibold">{selected.TestRequestID}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Bệnh nhân</div>
                  <div className="font-semibold">{selected.CustomerName}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Loại xét nghiệm</div>
                  <div className="font-semibold">{selected.ServiceType}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Ngày lấy mẫu</div>
                  <div className="font-semibold">{selected.SampleDate || "--"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Kỹ thuật viên</div>
                  <div className="font-semibold">{selected.StaffName}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Trạng thái</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(selected.Status)}`}>
                    {selected.Status}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Kết quả</div>
                <div className="bg-gray-50 border rounded px-4 py-3">
                  {selected.Result || "Chưa có kết quả"}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestRq;