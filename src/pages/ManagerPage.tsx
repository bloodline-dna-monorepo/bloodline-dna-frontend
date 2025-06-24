import React, { useEffect, useState } from 'react';

// Giả lập lấy thông tin manager từ localStorage hoặc API
function getManagerInfo() {
  // Ví dụ: lấy từ localStorage hoặc API thực tế
  const stored = localStorage.getItem('manager');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback nếu lỗi parse
    }
  }
  // Dữ liệu mẫu mặc định
  return {
    name: 'Nguyen Van A',
    email: 'NguyenVanA@gmail.com',
    avatar: 'N',
  };
}

export default function ManagerPage() {
  // State cho thông tin manager
  const [manager, setManager] = useState(() => getManagerInfo());

  // State cho các thông số dashboard
  const [stats, setStats] = useState({
    pending: 24,
    completed: 156,
    feedback: 87,
    rating: 4.2,
    ratingCount: 89,
    newSamples: 12,
    percentComplete: 89,
    blood: 456,
    bloodPercent: 36.6,
    paternity: 389,
    paternityPercent: 31.2,
    genetic: 234,
    geneticPercent: 18.8,
    other: 168,
    otherPercent: 13.4,
  });

  // State cho thời gian cập nhật
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-GB', { hour12: false }) + ' ' + now.toLocaleDateString('en-GB');
  });

  // Lắng nghe thay đổi thông tin manager trong localStorage (nếu có)
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === 'manager') {
        setManager(getManagerInfo());
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Ví dụ cập nhật manager từ API khi mount (nếu có API)
  // useEffect(() => {
  //   fetch('/api/manager/me').then(res => res.json()).then(data => setManager(data));
  // }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        pending: Math.max(0, prev.pending + getRandomInt(-2, 2)),
        completed: prev.completed + getRandomInt(0, 2),
        feedback: prev.feedback + getRandomInt(-1, 2),
        rating: Math.max(3.5, Math.min(5, +(prev.rating + getRandomInt(-2, 2) * 0.01).toFixed(2))),
        ratingCount: prev.ratingCount + getRandomInt(0, 1),
        newSamples: Math.max(0, prev.newSamples + getRandomInt(-2, 2)),
        percentComplete: Math.max(0, Math.min(100, prev.percentComplete + getRandomInt(-1, 1))),
        blood: prev.blood + getRandomInt(-2, 2),
        paternity: prev.paternity + getRandomInt(-2, 2),
        genetic: prev.genetic + getRandomInt(-2, 2),
        other: prev.other + getRandomInt(-2, 2),
      }));
      setCurrentTime(() => {
        const now = new Date();
        return now.toLocaleTimeString('en-GB', { hour12: false }) + ' ' + now.toLocaleDateString('en-GB');
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Tính lại phần trăm phân bố loại xét nghiệm
  const totalType = stats.blood + stats.paternity + stats.genetic + stats.other;
  const bloodPercent = totalType ? ((stats.blood / totalType) * 100).toFixed(1) : 0;
  const paternityPercent = totalType ? ((stats.paternity / totalType) * 100).toFixed(1) : 0;
  const geneticPercent = totalType ? ((stats.genetic / totalType) * 100).toFixed(1) : 0;
  const otherPercent = totalType ? ((stats.other / totalType) * 100).toFixed(1) : 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-green-700 font-bold text-2xl">🧬</span>
            </div>
            <div>
              <div className="font-bold text-2xl leading-5">Gen</div>
              <div className="font-bold text-2xl leading-5 text-purple-300">Unity</div>
            </div>
          </div>
          {/* Menu */}
          <nav className="mt-8 flex flex-col gap-2">
            <a href="#" className="flex items-center px-6 py-3 bg-green-800 rounded-l-full font-semibold">
              <span className="mr-3">🏠</span> Dashboard
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-green-800 rounded-l-full">
              <span className="mr-3">👥</span> User Management
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-green-800 rounded-l-full">
              <span className="mr-3">📊</span> Reports & Statistics
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-green-800 rounded-l-full">
              <span className="mr-3">🛠️</span> Service Management
            </a>
            <a href="#" className="flex items-center px-6 py-3 hover:bg-green-800 rounded-l-full">
              <span className="mr-3">⚙️</span> Settings
            </a>
          </nav>
        </div>
        {/* User info & logout */}
        <div className="mb-6 px-6">
          <button className="flex items-center gap-2 mb-4 hover:underline">
            <span>🚪</span> Logout
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-green-700 font-bold">
              {manager.avatar || manager.name?.[0] || 'M'}
            </div>
            <div>
              <div className="font-semibold">{manager.name}</div>
              <div className="text-xs text-green-100">{manager.email}</div>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-4 py-2 w-1/3"
          />
          <div className="flex items-center gap-6">
            <span className="text-gray-500">Last updated: {currentTime}</span>
            <div className="relative">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </div>
          </div>
        </div>
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <div className="text-orange-500 text-2xl font-bold">{stats.pending}</div>
            <div className="text-sm font-semibold mb-1">Kết quả chờ duyệt</div>
            <div className="text-xs text-gray-500">Cần xem xét và phê duyệt</div>
            <span className="absolute top-4 right-4 text-orange-500">⏳</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <div className="text-green-600 text-2xl font-bold">{stats.completed}</div>
            <div className="text-sm font-semibold mb-1">Đã hoàn thành</div>
            <div className="text-xs text-gray-500">Kết quả đã được phê duyệt</div>
            <span className="absolute top-4 right-4 text-green-600">✅</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <div className="text-blue-500 text-2xl font-bold">{stats.feedback}</div>
            <div className="text-sm font-semibold mb-1">Phản hồi</div>
            <div className="text-xs text-gray-500">Phản hồi từ khách hàng</div>
            <span className="absolute top-4 right-4 text-blue-500">💬</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <div className="text-yellow-600 text-2xl font-bold">{stats.rating}/5</div>
            <div className="text-sm font-semibold mb-1">Đánh giá trung bình</div>
            <div className="text-xs text-gray-500">Từ {stats.ratingCount} đánh giá</div>
            <span className="absolute top-4 right-4 text-yellow-600">⭐</span>
          </div>
        </div>
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow p-4 col-span-1">
            <div className="font-bold mb-2">Hoạt động gần đây</div>
            <div className="text-xs text-gray-500 mb-2">Các hành động được thực hiện trong hôm nay</div>
            <ul className="text-sm">
              <li className="flex items-center mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Phê duyệt kết quả <span className="ml-1 font-semibold">{manager.name}</span>
                <span className="ml-auto text-gray-400 text-xs">{getRandomAgo()}</span>
              </li>
              <li className="flex items-center mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Từ chối kết quả <span className="ml-1 font-semibold">Trần Thị B</span>
                <span className="ml-auto text-gray-400 text-xs">{getRandomAgo()}</span>
              </li>
              <li className="flex items-center mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Xem kết quả <span className="ml-1 font-semibold">Lê Văn C</span>
                <span className="ml-auto text-gray-400 text-xs">{getRandomAgo()}</span>
              </li>
              <li className="flex items-center mb-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                Phản hồi khách hàng <span className="ml-1 font-semibold">Phạm Thị D</span>
                <span className="ml-auto text-gray-400 text-xs">{getRandomAgo()}</span>
              </li>
            </ul>
          </div>
          {/* Test Type Distribution */}
          <div className="bg-white rounded-xl shadow p-4 col-span-1">
            <div className="font-bold mb-2">Phân bố loại xét nghiệm</div>
            <div className="text-xs text-gray-500 mb-2">Thông kê theo loại xét nghiệm trong tháng</div>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span>Xét nghiệm huyết thống</span>
                <span>{stats.blood}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-1 mb-1">
                <div className="h-2 bg-green-600 rounded" style={{ width: `${bloodPercent}%` }}></div>
              </div>
              <div className="text-xs text-gray-400">{bloodPercent}%</div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span>Xét nghiệm ADN cha con</span>
                <span>{stats.paternity}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-1 mb-1">
                <div className="h-2 bg-blue-600 rounded" style={{ width: `${paternityPercent}%` }}></div>
              </div>
              <div className="text-xs text-gray-400">{paternityPercent}%</div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span>Xét nghiệm di truyền</span>
                <span>{stats.genetic}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-1 mb-1">
                <div className="h-2 bg-yellow-500 rounded" style={{ width: `${geneticPercent}%` }}></div>
              </div>
              <div className="text-xs text-gray-400">{geneticPercent}%</div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span>Xét nghiệm khác</span>
                <span>{stats.other}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded mt-1 mb-1">
                <div className="h-2 bg-gray-500 rounded" style={{ width: `${otherPercent}%` }}></div>
              </div>
              <div className="text-xs text-gray-400">{otherPercent}%</div>
            </div>
          </div>
          {/* Notice */}
          <div className="bg-white rounded-xl shadow p-4 col-span-1 flex flex-col justify-between">
            <div>
              <div className="font-bold mb-2">Cần chú ý</div>
              <div className="text-xs text-gray-500 mb-2">Các vấn đề cần xử lý ưu tiên</div>
              <div className="flex items-center bg-orange-100 text-orange-700 rounded p-2 mb-2">
                <span className="mr-2">⚠️</span>
                {stats.pending} kết quả chờ duyệt
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center bg-orange-100 text-orange-700 rounded px-2 py-1 text-xs">
                <span className="mr-1">⏳</span> {stats.pending} kết quả chờ duyệt
              </div>
              <div className="flex items-center bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs">
                <span className="mr-1">🧪</span> {stats.newSamples} mẫu mới
              </div>
              <div className="flex items-center bg-green-100 text-green-700 rounded px-2 py-1 text-xs">
                <span className="mr-1">✅</span> {stats.percentComplete}% hoàn thành
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Hàm random cho số nguyên
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hàm random thời gian gần đây
function getRandomAgo() {
  const options = [
    '2 phút trước',
    '15 phút trước',
    '1 giờ trước',
    '2 giờ trước',
    '5 phút trước',
    '30 giây trước',
    '10 phút trước',
  ];
  return options[getRandomInt(0, options.length - 1)];
}