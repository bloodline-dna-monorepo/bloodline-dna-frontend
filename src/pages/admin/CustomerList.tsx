import React, { useState, useEffect } from "react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

// Giả lập fetch dữ liệu khách hàng từ database (API)
const fetchCustomers = async () => {
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

export default function CustomerList() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  const cus = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button className="bg-[#219177] text-white px-5 py-2 rounded font-semibold hover:bg-[#167e67]">
          + Add Customer
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold border-l-4 border-blue-400 pl-2">Customer List</span>
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
              {cus.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2">{c.id}</td>
                  <td className="py-2 px-2">{c.name}</td>
                  <td className="py-2 px-2">{c.email}</td>
                  <td className="py-2 px-2">{c.phone}</td>
                  <td className="py-2 px-2 flex gap-3">
                    <div className="flex gap-3 text-lg">
                      <button className="text-gray-700 hover:text-blue-600" title="View"><FiEye /></button>
                      <button className="text-gray-700 hover:text-yellow-500" title="Edit"><FiEdit2 /></button>
                      <button className="text-red-400 hover:text-red-600" title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {cus.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}