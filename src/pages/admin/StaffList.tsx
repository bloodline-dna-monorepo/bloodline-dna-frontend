import React, { useState, useEffect } from "react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

// Giả lập fetch dữ liệu staff từ database (API)
const fetchStaffs = async () => {
  // TODO: Thay bằng gọi API thực tế để lấy dữ liệu từ database
  return [
    {
      id: "001",
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
    },
    {
      id: "002",
      name: "Nguyen Van B",
      email: "nguyenvanb@gmail.com",
      phone: "0123456789",
    },
    {
      id: "003",
      name: "Nguyen Van C",
      email: "nguyenvanc@gmail.com",
      phone: "0123456789",
    },
  ];
};

export default function StaffList() {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStaffs().then(setStaffs);
  }, []);

  const sta = staffs.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <button className="bg-[#219177] text-white px-5 py-2 rounded font-semibold hover:bg-[#167e67]">
          + Add Staff
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold border-l-4 border-blue-400 pl-2">Staff List</span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
              style={{ minWidth: 220 }}
            />
            <button className="border px-3 py-1 rounded text-gray-600 flex items-center gap-1 text-sm">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h12M6 9h6M9 12h0"/></svg>
              Sort
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-2 text-left font-semibold">ID</th>
                <th className="py-2 px-2 text-left font-semibold">Full Name</th>
                <th className="py-2 px-2 text-left font-semibold">Email</th>
                <th className="py-2 px-2 text-left font-semibold">Phone</th>
                <th className="py-2 px-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sta.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2">{s.id}</td>
                  <td className="py-2 px-2">{s.name}</td>
                  <td className="py-2 px-2">{s.email}</td>
                  <td className="py-2 px-2">{s.phone}</td>
                  <td className="py-2 px-2 flex gap-3">
                    <div className="flex gap-3 text-lg">
                      <button className="text-gray-700 hover:text-blue-600" title="View"><FiEye /></button>
                      <button className="text-gray-700 hover:text-yellow-500" title="Edit"><FiEdit2 /></button>
                      <button className="text-red-400 hover:text-red-600" title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {sta.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">No staffs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}