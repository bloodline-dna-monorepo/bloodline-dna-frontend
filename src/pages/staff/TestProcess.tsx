import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Common/Sidebar';
import { FiEye, FiPlay, FiCheckCircle } from "react-icons/fi";

const TABS = [
    { key: "center", label: "Xử lý tại trung tâm" },
    { key: "home", label: "Lấy mẫu tại nhà" },
];

const TestProcess: React.FC = () => {
    const [activeTab, setActiveTab] = useState("center");
    const [processes, setProcesses] = useState<any[]>([]);

    useEffect(() => {
        // Lấy các đơn đã đảm nhận từ localStorage
        const data = JSON.parse(localStorage.getItem("testProcesses") || "[]");
        setProcesses(data);
    }, []);

    // Phân loại theo loại xét nghiệm (giả sử testType có chứa "tại nhà")
    const centerProcesses = processes.filter(
        (p) => !p.testType?.toLowerCase().includes("tại nhà")
    );
    const homeProcesses = processes.filter(
        (p) => p.testType?.toLowerCase().includes("tại nhà")
    );

    const renderStatus = (status: string) => {
        if (status === "processing")
            return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium ml-2">Đang xử lý</span>;
        if (status === "completed")
            return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium ml-2">Hoàn thành</span>;
        return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium ml-2">Chờ xử lý</span>;
    };

    const handleStart = (id: string) => {
        setProcesses((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: "processing" } : p
            )
        );
    };

    const handleComplete = (id: string) => {
        setProcesses((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, status: "completed" } : p
            )
        );
    };

    // Lưu lại trạng thái khi thay đổi
    useEffect(() => {
        localStorage.setItem("testProcesses", JSON.stringify(processes));
    }, [processes]);

    const list = activeTab === "center" ? centerProcesses : homeProcesses;

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Quy trình xét nghiệm</h1>
                            <p className="text-gray-600 text-sm">Theo dõi và quản lý tiến độ xét nghiệm</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
                            <span className="text-blue-700 text-sm">🟦 Chỉ hiển thị các yêu cầu đã được đảm nhận</span>
                        </div>
                    </div>
                </header>

                {/* Tabs */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-sm border mb-6">
                        <nav className="flex space-x-8 px-6 border-b">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.key
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {tab.label} <span className="ml-1 text-xs">({tab.key === "center" ? centerProcesses.length : homeProcesses.length})</span>
                                </button>
                            ))}
                        </nav>
                        {/* Danh sách quy trình */}
                        <div className="p-6">
                            {list.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">Chưa có quy trình nào</div>
                            ) : (
                                list.map((process) => (
                                    <div
                                        key={process.id}
                                        className="flex flex-col md:flex-row md:items-center justify-between bg-white border rounded-lg p-4 mb-4 shadow-sm"
                                    >
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <span className="font-bold text-base text-gray-800 mr-2">#{process.requestId}</span>
                                                {renderStatus(process.status)}
                                            </div>
                                            <div className="text-gray-700 text-sm mb-1">
                                                <span className="font-medium">Khách hàng:</span> {process.customerName}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                <span className="font-medium">Ngày yêu cầu:</span> {process.requestDate || "N/A"}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                <span className="font-medium">Loại xét nghiệm:</span> {process.testType}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                            <button className="text-blue-600 hover:text-blue-800 p-2 rounded" title="Xem chi tiết">
                                                <FiEye size={18} />
                                            </button>
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex items-center"
                                                onClick={() => handleStart(process.id)}
                                                disabled={process.status === "processing" || process.status === "completed"}
                                            >
                                                <FiPlay className="mr-1" /> Bắt đầu
                                            </button>
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium flex items-center"
                                                onClick={() => handleComplete(process.id)}
                                                disabled={process.status === "completed"}
                                            >
                                                <FiCheckCircle className="mr-1" /> Hoàn thành
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TestProcess;