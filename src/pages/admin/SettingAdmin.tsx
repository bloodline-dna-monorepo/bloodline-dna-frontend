import Sidebar from "components/AdminSidebar/Sidebar";
import React, { useState } from "react";

export default function SettingAdmin() {
  const [facility, setFacility] = useState("Gen Unity");
  const [address, setAddress] = useState("69 Vuong Bau, TP.Thu Duc, TP.Ho Chi Minh");
  const [phone, setPhone] = useState("0123456789");
  const [email, setEmail] = useState("genunity@gmail.com");

  // Thêm state tổng bật/tắt thông báo
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const [emailNoti, setEmailNoti] = useState(true);
  const [smsNoti, setSmsNoti] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  // State cho modal đổi mật khẩu
  const [showChangePw, setShowChangePw] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gọi API đổi mật khẩu ở đây
    setShowChangePw(false);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <Sidebar /> 
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-8">
        <span className="text-2xl">⚙️</span> Settings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* System Settings */}
        <div className="bg-white rounded-xl border shadow p-6">
          <div className="font-semibold text-lg flex items-center gap-2 mb-4">
            <span className="text-xl">⚙️</span> System Settings
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Medical Facility Name</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={facility}
              onChange={e => setFacility(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="border rounded px-3 py-2 w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Notification Settings */}
        <div className="bg-white rounded-xl border shadow p-6">
          <div className="font-semibold text-lg flex items-center gap-2 mb-4">
            <span className="text-xl">🔔</span> Notification Settings
          </div>
          {/* Tổng bật/tắt thông báo */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-medium">Enable Notifications</div>
              <div className="text-xs text-gray-500">Turn all notifications on or off</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationEnabled}
                onChange={() => setNotificationEnabled(v => !v)}
              />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#219177] transition-all relative">
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notificationEnabled ? "translate-x-4" : ""}`}></div>
              </div>
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-xs text-gray-500">Send an email when a new request is received</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={emailNoti}
                  onChange={() => setEmailNoti(v => !v)}
                  disabled={!notificationEnabled}
                />
                <div className={`w-10 h-6 rounded-full transition-all relative ${notificationEnabled ? "bg-gray-200 peer-checked:bg-[#219177]" : "bg-gray-100 opacity-60"}`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all ${emailNoti && notificationEnabled ? "translate-x-4" : ""}`}></div>
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Emergency SMS Alerts</div>
                <div className="text-xs text-gray-500">Send SMS for emergency cases</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={smsNoti}
                  onChange={() => setSmsNoti(v => !v)}
                  disabled={!notificationEnabled}
                />
                <div className={`w-10 h-6 rounded-full transition-all relative ${notificationEnabled ? "bg-gray-200 peer-checked:bg-[#219177]" : "bg-gray-100 opacity-60"}`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all ${smsNoti && notificationEnabled ? "translate-x-4" : ""}`}></div>
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-xs text-gray-500">Send a summary report every week</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={weeklyReport}
                  onChange={() => setWeeklyReport(v => !v)}
                  disabled={!notificationEnabled}
                />
                <div className={`w-10 h-6 rounded-full transition-all relative ${notificationEnabled ? "bg-gray-200 peer-checked:bg-[#219177]" : "bg-gray-100 opacity-60"}`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all ${weeklyReport && notificationEnabled ? "translate-x-4" : ""}`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Account Security */}
      <div className="bg-white rounded-xl border shadow p-6">
        <div className="font-semibold text-lg flex items-center gap-2 mb-2">
          <span className="text-xl">🛡️</span> Bảo mật tài khoản
        </div>
        <div className="text-sm text-gray-600 mb-3">Quản lý mật khẩu và cài đặt bảo mật</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Mật khẩu</div>
            <div className="text-xs text-gray-500">Thay đổi mật khẩu đăng nhập</div>
          </div>
          <button
            className="bg-gray-200 px-4 py-2 rounded font-semibold hover:bg-gray-300 text-gray-700"
            onClick={() => setShowChangePw(true)}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>

      {/* Modal đổi mật khẩu */}
      {showChangePw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white rounded-xl shadow-xl border p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
              onClick={() => setShowChangePw(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-1">Thay đổi mật khẩu</h2>
            <div className="text-sm text-gray-500 mb-4">
              Nhập mật khẩu hiện tại và mật khẩu mới
            </div>
            <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm mb-1">Mật khẩu hiện tại</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    className="border rounded px-3 py-2 w-full pr-10"
                    value={currentPw}
                    onChange={e => setCurrentPw(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowCurrent(v => !v)}
                    tabIndex={-1}
                  >
                    {showCurrent ? (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/></svg>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8"/><path d="M4 10a6 6 0 0 1 12 0" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    className="border rounded px-3 py-2 w-full pr-10"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowNew(v => !v)}
                    tabIndex={-1}
                  >
                    {showNew ? (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/></svg>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8"/><path d="M4 10a6 6 0 0 1 12 0" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="border rounded px-3 py-2 w-full pr-10"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirm(v => !v)}
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/></svg>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8"/><path d="M4 10a6 6 0 0 1 12 0" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="border px-5 py-2 rounded font-semibold hover:bg-gray-100"
                  onClick={() => setShowChangePw(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-5 py-2 rounded font-semibold hover:bg-gray-900"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}