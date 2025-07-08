import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ManaSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName =
    user && typeof user.name === "string" && user.name.trim()
      ? user.name
      : "Nguyen Van A";
  const displayEmail =
    user && typeof user.email === "string" && user.email.trim()
      ? user.email
      : "NguyenVanA@gmail.com";

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
            className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left gap-3"
            onClick={() => navigate("/manager/dashboard")}
          >
            <span className="text-lg">🏠</span> Dashboard
          </button>
          <button
            className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left gap-3"
            onClick={() => navigate("/manager/results")}
          >
            <span className="text-lg">👥</span> Quản lý kết quả xét nghiệm
          </button>
          <button
            className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left gap-3"
            onClick={() => navigate("/manager/feedback")}
          >
            <span className="text-lg">💬</span> Phản hồi
          </button>
          <button
            className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left gap-3"
            onClick={() => navigate("/manager/reports")}
          >
            <span className="text-lg">📊</span> Báo cáo thống kê
          </button>
          <button
            className="flex items-center px-6 py-3 hover:bg-[#167e67] rounded-l-full w-full text-left gap-3"
            onClick={() => navigate("/manager/settings")}
          >
            <span className="text-lg">⚙️</span> Settings
          </button>
        </nav>
      </div>
      {/* User info & logout */}
      <div className="mb-8 px-6">
        <button className="flex items-center gap-2 mb-6 text-white hover:underline">
          <span>⎋</span> Logout
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-[#b6e5dd] w-9 h-9 rounded-full" />
          <div>
            <div className="font-semibold text-white text-sm">{displayName}</div>
            <div className="text-xs text-[#e6f7f3]">{displayEmail}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ManaSidebar;