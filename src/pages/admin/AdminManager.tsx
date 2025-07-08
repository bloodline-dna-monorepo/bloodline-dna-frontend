import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import type { Service } from "utils/types";
import DashboardSidebar from "../../components/Common/Sidebar";

const CATEGORY_OPTIONS = [
  { value: "Hành chính", label: "Hành chính" },
  { value: "Dân sự", label: "Dân sự" },
  { value: "Hình sự", label: "Hình sự" }, // Thêm nếu cần
];

const AdminManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addForm, setAddForm] = useState({
    ServiceName: "",
    ServiceType: CATEGORY_OPTIONS[0].value,
    Price: "",
    Description: "",
    SampleCount: "",
  });
  const [editForm, setEditForm] = useState({
    ServiceId: "",
    ServiceName: "",
    ServiceType: CATEGORY_OPTIONS[0].value,
    Price: "",
    Description: "",
    SampleCount: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/services").then((res) => {
      setServices(res.data || []);
    });
  }, []);

  const handleEdit = (id: string) => {
    const service = services.find((s) => s.ServiceId === id);
    if (service) {
      setEditForm({
        ServiceId: service.ServiceId,
        ServiceName: service.ServiceName,
        ServiceType: service.ServiceType,
        Price: service.Price.toString(),
        Description: service.Description,
        SampleCount: service.SampleCount.toString(),
      });
      setShowEditModal(true);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedService = {
        ...editForm,
        Price: Number(editForm.Price),
        SampleCount: Number(editForm.SampleCount),
      };
      await axios.put(`/api/services/${editForm.ServiceId}`, updatedService);
      setServices((prev) =>
        prev.map((s) =>
          s.ServiceId === editForm.ServiceId
            ? { ...s, ...updatedService } as Service
            : s
        )
      );
      setShowEditModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      axios.delete(`/api/services/${id}`).then(() => {
        setServices((prev) => prev.filter((s) => s.ServiceId !== id));
      });
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newService = {
        ...addForm,
        Price: Number(addForm.Price),
        SampleCount: Number(addForm.SampleCount),
      };
      const res = await axios.post("/api/services", newService);
      setServices((prev) => [...prev, res.data]);
      setShowAddModal(false);
      setAddForm({
        ServiceName: "",
        ServiceType: CATEGORY_OPTIONS[0].value,
        Price: "",
        Description: "",
        SampleCount: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 py-10 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Quản lý dịch vụ</h1>
          <div className="bg-white rounded-xl shadow p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">Quản lý dịch vụ xét nghiệm</div>
              <button
                className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
                onClick={handleAdd}
              >
                <PlusOutlined /> Thêm dịch vụ mới
              </button>
            </div>
            <div className="overflow-x-auto border border-blue-400 rounded">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Dịch vụ</th>
                    <th className="py-2 px-4 text-left">Loại dịch vụ</th>
                    <th className="py-2 px-4 text-left">Giá</th>
                    <th className="py-2 px-4 text-left">Số mẫu</th>
                    <th className="py-2 px-4 text-left">Mô tả</th>
                    <th className="py-2 px-4 text-left">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.ServiceId} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{s.ServiceName}</td>
                      <td className="py-2 px-4">{s.ServiceType}</td>
                      <td className="py-2 px-4">{s.Price.toLocaleString()} ₫</td>
                      <td className="py-2 px-4">{s.SampleCount}</td>
                      <td className="py-2 px-4 max-w-xs truncate" title={s.Description}>
                        {s.Description.length > 30
                          ? s.Description.slice(0, 30) + "..."
                          : s.Description}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          className="mr-3 text-blue-600 hover:text-blue-800"
                          onClick={() => handleEdit(s.ServiceId)}
                          title="Chỉnh sửa"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(s.ServiceId)}
                          title="Xóa"
                        >
                          <DeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-8">
                        Không có dịch vụ nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Modal thêm dịch vụ mới */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <form
              className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative"
              onSubmit={handleAddSubmit}
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-xl text-gray-400 hover:text-black"
                onClick={() => setShowAddModal(false)}
                aria-label="Đóng"
              >
                &times;
              </button>
              <div className="text-2xl font-bold mb-6">Thêm dịch vụ mới</div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Tên dịch vụ</label>
                <input
                  name="ServiceName"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Nhập tên dịch vụ"
                  value={addForm.ServiceName}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Danh mục</label>
                <select
                  name="ServiceType"
                  className="w-full border rounded px-3 py-2"
                  value={addForm.ServiceType}
                  onChange={handleAddChange}
                  required
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Giá (VNĐ)</label>
                <input
                  name="Price"
                  type="number"
                  min={0}
                  className="w-full border rounded px-3 py-2"
                  placeholder="5.000.000"
                  value={addForm.Price}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Số mẫu</label>
                <input
                  name="SampleCount"
                  type="number"
                  min={1}
                  className="w-full border rounded px-3 py-2"
                  placeholder="2"
                  value={addForm.SampleCount}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Mô tả</label>
                <textarea
                  name="Description"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Mô tả dịch vụ..."
                  value={addForm.Description}
                  onChange={handleAddChange}
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2 rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowAddModal(false)}
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-black text-white hover:bg-gray-900"
                  disabled={loading}
                >
                  {loading ? "Đang tạo..." : "Tạo dịch vụ"}
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Modal chỉnh sửa dịch vụ */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <form
              className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative"
              onSubmit={handleEditSubmit}
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-xl text-gray-400 hover:text-black"
                onClick={() => setShowEditModal(false)}
                aria-label="Đóng"
              >
                &times;
              </button>
              <div className="text-2xl font-bold mb-6">Chi tiết & Chỉnh sửa dịch vụ</div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Tên dịch vụ</label>
                <input
                  name="ServiceName"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Nhập tên dịch vụ"
                  value={editForm.ServiceName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Danh mục</label>
                <select
                  name="ServiceType"
                  className="w-full border rounded px-3 py-2"
                  value={editForm.ServiceType}
                  onChange={handleEditChange}
                  required
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Giá (VNĐ)</label>
                <input
                  name="Price"
                  type="number"
                  min={0}
                  className="w-full border rounded px-3 py-2"
                  placeholder="5.000.000"
                  value={editForm.Price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Số mẫu</label>
                <input
                  name="SampleCount"
                  type="number"
                  min={1}
                  className="w-full border rounded px-3 py-2"
                  placeholder="2"
                  value={editForm.SampleCount}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Mô tả</label>
                <textarea
                  name="Description"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Mô tả dịch vụ..."
                  value={editForm.Description}
                  onChange={handleEditChange}
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2 rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowEditModal(false)}
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-black text-white hover:bg-gray-900"
                  disabled={loading}
                >
                  {loading ? "Đang cập nhật..." : "Cập nhập dịch vụ"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminManager;