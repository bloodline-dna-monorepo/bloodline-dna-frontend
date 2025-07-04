import React, { useEffect, useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import DashboardSidebar from "../../components/Common/Sidebar";
import type { User } from "utils/types";

type UserRole = "Customer" | "Staff" | "Manager";

const ROLE_COLORS: Record<UserRole, string> = {
  Customer: "bg-green-100 text-green-700",
  Staff: "bg-blue-100 text-blue-700",
  Manager: "bg-purple-100 text-purple-700",
};

const AdminRole: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data || []));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 py-10 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Quản lý người dùng</h1>
          <div className="bg-white rounded-xl shadow p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">Quản lý tài khoản người dùng</div>
              <div className="flex gap-2">
                <input
                  className="border rounded px-4 py-2"
                  placeholder="Search by name, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="border rounded px-4 py-2 flex items-center gap-2">
                  <span className="hidden md:inline">Sort</span>
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                    <rect x="3" y="5" width="14" height="2" rx="1" fill="#222" />
                    <rect x="5" y="9" width="10" height="2" rx="1" fill="#222" />
                    <rect x="7" y="13" width="6" height="2" rx="1" fill="#222" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">Họ và tên</th>
                    <th className="py-2 px-4 text-left">Liên hệ</th>
                    <th className="py-2 px-4 text-left">Vai trò</th>
                    <th className="py-2 px-4 text-left">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                    {filtered.map((u) => (
                        <tr key={u.accountId} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{u.accountId}</td>
                            <td className="py-2 px-4">{u.name}</td>
                            <td className="py-2 px-4">
                            <div>{u.email}</div>
                            <div className="text-xs text-gray-500">{u.phone}</div>
                            </td>
                            <td className="py-2 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[u.role as UserRole]}`}>
                                {u.role}
                            </span>
                            </td>
                            <td className="py-2 px-4 flex items-center gap-2">
                            <button className="text-gray-700 hover:text-black" title="Xem">
                                <EyeOutlined />
                            </button>
                            <button className="text-gray-700 hover:text-blue-600" title="Chỉnh sửa">
                                <EditOutlined />
                            </button>
                            <select
                                className="border rounded px-2 py-1 text-xs bg-gray-50"
                                value={u.role}
                                onChange={async (e) => {
                                const newRole = e.target.value as UserRole;
                                // Gọi API cập nhật vai trò
                                await axios.put(`/api/users/${u.accountId}/role`, { role: newRole });
                                // Cập nhật lại state
                                setUsers((prev) =>
                                    prev.map((user) =>
                                    user.accountId === u.accountId ? { ...user, role: newRole } : user
                                    )
                                );
                                }}
                            >
                                <option value="Customer">Customer</option>
                                <option value="Staff">Staff</option>
                                <option value="Manager">Manager</option>
                            </select>
                            <button className="text-red-500 hover:text-red-700" title="Xóa">
                                <DeleteOutlined />
                            </button>
                            </td>
                        </tr>
                        ))}
                    {filtered.length === 0 && (
                        <tr>
                        <td colSpan={5} className="text-center text-gray-400 py-8">
                            Không có người dùng nào.
                        </td>
                        </tr>
                    )}
                    </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRole;