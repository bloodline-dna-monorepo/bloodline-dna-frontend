import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type AdminCardProps = {
  name?: string;
  email?: string;
  onMenuSelect?: (key: string) => void;
};

const navItems = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "🏠",
  },
  {
    label: "User Management",
    icon: "👥",
    children: [
      { label: "Customers", key: "customers" },
      { label: "Staffs", key: "staffs" },
      { label: "Managers", key: "managers" },
    ],
  },
  {
    label: "Service Management",
    key: "services",
    icon: "🛠️",
  },
  {
    label: "Settings",
    key: "settings",
    icon: "⚙️",
  },
];

const AdminCard: React.FC<AdminCardProps> = ({
  name = "Nguyen Van A",
  email = "nguyenvana@gmail.com",
  onMenuSelect,
}) => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    // localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <div className="h-screen w-[260px] fixed top-0 left-0 bg-[#249387] text-white flex flex-col justify-between shadow-lg">
      <div>
        {/* Logo */}
        <div className="flex flex-col items-center py-8">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-2">
            <span className="text-4xl font-bold text-[#7c3aed]">🧬</span>
          </div>
          <div className="text-2xl font-bold text-[#e0e1dd]">Gen Unity</div>
        </div>
        {/* Menu */}
        <nav className="px-2">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="flex items-center w-full px-4 py-3 rounded hover:bg-[#1e7a6b] transition-colors font-medium"
                  onClick={() => setUserMenuOpen((open) => !open)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="ml-auto">{userMenuOpen ? "▲" : "▼"}</span>
                </button>
                {userMenuOpen && (
                  <div className="ml-8">
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        onClick={() => onMenuSelect && onMenuSelect(child.key)}
                        className="block px-4 py-2 rounded hover:bg-[#1e7a6b] text-sm transition-colors w-full text-left"
                      >
                        • {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.key}
                onClick={() => onMenuSelect && onMenuSelect(item.key)}
                className="flex items-center w-full px-4 py-3 rounded hover:bg-[#1e7a6b] transition-colors font-medium"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            )
          )}
        </nav>
      </div>
      {/* Admin info & logout */}
      <div className="flex flex-col items-center border-t border-[#1e7a6b] pt-6 pb-4 bg-[#249387]">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-[#249387] mb-2">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="font-semibold text-base text-white">{name}</div>
        <div className="text-xs text-gray-200 mb-2">{email}</div>
        <button
          onClick={handleLogout}
          className="mt-2 bg-white hover:bg-red-500 hover:text-white text-[#249387] rounded px-6 py-2 font-medium text-sm transition-colors flex items-center"
        >
          <span className="mr-2">⎋</span> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminCard;