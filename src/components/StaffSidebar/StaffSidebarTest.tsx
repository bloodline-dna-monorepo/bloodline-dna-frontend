import React from "react";
import { Link, useLocation } from "react-router-dom";

// Mock user data for testing
const mockUser = {
    profile: {
        fullName: "Nguyễn Văn A"
    },
    email: "staff@genunity.com",
    role: "Nhân viên"
};

const menuItems = [
    { path: "/staff/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/staff/requests", label: "Quản lý yêu cầu", icon: "📋" },
    { path: "/staff/tests", label: "Quy trình xét nghiệm", icon: "🧪" },
    { path: "/staff/profile", label: "Hồ sơ cá nhân", icon: "👤" },
    { path: "/staff/settings", label: "Cài đặt", icon: "⚙️" },
];

const StaffSidebarTest: React.FC = () => {
    const location = useLocation();

    const displayName = mockUser?.profile?.fullName || mockUser?.email || "Staff User";
    const displayAvatar = displayName.charAt(0).toUpperCase();

    const handleLogout = () => {
        alert("Logout clicked! (Demo mode)");
    };

    return (
        <div style={{
            width: 280,
            backgroundColor: "#219177",
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
                borderBottom: "1px solid #2da58a",
                backgroundColor: "#1a7a64"
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
                    color: "#219177"
                }}>
                    G
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>GenUnity</h3>
                <p style={{ margin: "5px 0 0", fontSize: 12, opacity: 0.8 }}>Staff Portal (Demo)</p>
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
                                color: isActive ? "#fff" : "#a7f3d0",
                                backgroundColor: isActive ? "#2da58a" : "transparent",
                                borderRadius: 8,
                                fontSize: 14,
                                fontWeight: isActive ? "600" : "normal",
                                transition: "all 0.2s ease",
                                border: isActive ? "1px solid #34d399" : "1px solid transparent"
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = "#1a7a64";
                                    e.currentTarget.style.color = "#fff";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#a7f3d0";
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
                borderTop: "1px solid #2da58a",
                backgroundColor: "#1a7a64"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 15
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#2da58a",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                        fontSize: 16,
                        fontWeight: "bold"
                    }}>
                        {displayAvatar}
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
                            {displayName}
                        </p>
                        <p style={{
                            margin: 0,
                            fontSize: 12,
                            opacity: 0.7
                        }}>
                            {mockUser?.role || "Nhân viên"}
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
                    Đăng xuất (Demo)
                </button>
            </div>
        </div>
    );
};

export default StaffSidebarTest;