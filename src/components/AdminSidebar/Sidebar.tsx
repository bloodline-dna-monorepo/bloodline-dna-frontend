import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName =
    user && typeof user.name === "string" && user.name.trim()
      ? user.name
      : "Nguyen Van A";
  const displayEmail =
    user && typeof user.email === "string" && user.email.trim()
      ? user.email
      : "NguyenVanA@gmail.com";
  const displayAvatar =
    user && typeof user.name === "string" && user.name.trim()
      ? user.name[0]
      : "N";

  return (
    <aside className="w-64 bg-[#219177] text-white flex flex-col justify-between min-h-screen">
      <div>
        {/* Logo */}
        <div className="flex flex-col items-center py-8">
          <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center mb-2">
            <img src="/logo-genunity.png" alt="Gen Unity" className="w-20 h-20" />
          </div>
          <div className="text-center mt-2">
            <div className="font-bold text-3xl text-[#219177] leading-6">Gen</div>
            <div className="font-bold text-3xl text-purple-400 leading-6">Unity</div>
          </div>
        </div>
        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-1">
          <button
            className="flex items-center px-6 py-3 bg-[#167e67] rounded-l-full font-semibold w-full text-left"
            onClick={() => navigate("/admin/dashboard")}
          >
            <span className="mr-3 text-lg">🏠</span> Dashboard
          </button>
          <div>
            <button
              className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left"
              onClick={() => setUserMenuOpen((v) => !v)}
            >
              <span className="mr-3 text-lg">👥</span> User Management
              <span className="ml-auto">{userMenuOpen ? "▾" : "▸"}</span>
            </button>
            {userMenuOpen && (
              <div className="ml-12 flex flex-col gap-1 text-sm">
                <button
                  className="py-1 text-left hover:underline"
                  onClick={() => navigate("/admin/users/customers")}
                >
                  • Customers
                </button>
                <button
                  className="py-1 text-left hover:underline"
                  onClick={() => navigate("/admin/users/staffs")}
                >
                  • Staffs
                </button>
                <button
                  className="py-1 text-left hover:underline"
                  onClick={() => navigate("/admin/users/managers")}
                >
                  • Managers
                </button>
              </div>
            )}
            </div>
            <button
            className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left"
            onClick={() => navigate("/admin/settings")}
            >
            <span className="mr-3 text-lg">⚙️</span> Settings
            </button>
        </nav>
      </div>
      {/* User info & logout */}
      <div className="mb-8 px-6">
        <button className="flex items-center gap-2 mb-6 text-white hover:underline">
          <span>🚪</span> Logout
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-[#6fd1b3] rounded-full w-10 h-10 flex items-center justify-center text-[#219177] font-bold">
            {displayAvatar}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{displayName}</div>
            <div className="text-xs text-[#b6f2e0]">{displayEmail}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;