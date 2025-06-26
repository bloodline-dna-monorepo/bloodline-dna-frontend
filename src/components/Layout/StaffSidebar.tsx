import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
    { path: "/staff/dashboard", label: "📊 Dashboard", icon: "🏠" },
    { path: "/staff/requests", label: "📋 Quản lý yêu cầu", icon: "📝" },
    { path: "/staff/tests", label: "🧪 Quy trình xét nghiệm", icon: "⚗️" },
    { path: "/staff/settings", label: "⚙️ Settings", icon: "🔧" },
];

const StaffSidebar: React.FC = () => {
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div style={{
            width: 280,
            backgroundColor: "#1e3a8a",
            color: "white",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
        }}>
            {/* Logo */}
            <div style={{
                padding: "30px 20px",
                textAlign: "center",
                borderBottom: "1px solid #3b82f6",
                backgroundColor: "#1e40af"
            }}>
                <div style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    margin: "0 auto 15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#1e3a8a"
                }}>
                    G
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>GenUnity</h3>
                <p style={{ margin: "5px 0 0", fontSize: 12, opacity: 0.8 }}>Staff Portal</p>
            </div>

            {/* Menu */}
            <nav style={{ flex: 1, padding: "20px 0" }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "15px 25px",
                                margin: "5px 15px",
                                textDecoration: "none",
                                color: isActive ? "#fff" : "#cbd5e1",
                                backgroundColor: isActive ? "#3b82f6" : "transparent",
                                borderRadius: 8,
                                fontSize: 14,
                                fontWeight: isActive ? "600" : "normal",
                                transition: "all 0.2s ease",
                                border: isActive ? "1px solid #60a5fa" : "1px solid transparent"
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = "#1e40af";
                                    e.currentTarget.style.color = "#fff";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#cbd5e1";
                                }
                            }}
                        >
                            <span style={{ marginRight: 12, fontSize: 16 }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Info */}
            <div style={{
                padding: 20,
                borderTop: "1px solid #3b82f6",
                backgroundColor: "#1e40af"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 15
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#3b82f6",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                        fontSize: 16,
                        fontWeight: "bold"
                    }}>
                        {user?.profile?.fullName
                            ? user.profile.fullName.charAt(0).toUpperCase()
                            : user?.email?.charAt(0).toUpperCase() || "S"}
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: "600",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}>
                            {user?.profile?.fullName || user?.email || "Staff User"}
                        </p>
                        <p style={{
                            margin: 0,
                            fontSize: 12,
                            opacity: 0.7
                        }}>
                            {user?.role || "Nhân viên"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%",
                        padding: "10px 15px",
                        backgroundColor: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "background-color 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#b91c1c";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                    }}
                >
                    <span>🚪</span>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default StaffSidebar;