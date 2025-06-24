import React, { useState } from 'react';

export default function SettingAdmin() {
  const [facility, setFacility] = useState({
    name: "Gen Unity",
    address: "69 Vuong Bau, TP.Thu Duc, TP.Ho Chi Minh",
    phone: "0123456789",
    email: "genunity@gmail.com",
  });
  const [notification, setNotification] = useState({
    email: true,
    sms: true,
    weekly: false,
  });
  const [emergency, setEmergency] = useState({
    doctor: { name: "Dr. PePe", phone: "0123456789" },
    kit: { name: "Ms. Mi Mi, M.Sc.", phone: "0123456789" },
    logistics: { name: "Mr. Siu", phone: "0123456789" },
  });
  const [admin, setAdmin] = useState({
    name: "Nguyen Van A",
    email: "NguyenVanA@gmail.com",
    phone: "0987654321",
    password: "",
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span>⚙️</span> Settings
      </h1>
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* System Settings */}
        <div className="bg-white rounded-xl shadow p-6 col-span-1">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🖥️</span> System Settings
          </h2>
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-1">Medical Facility Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={facility.name}
              onChange={e => setFacility(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={facility.address}
              onChange={e => setFacility(f => ({ ...f, address: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Phone Number</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={facility.phone}
                onChange={e => setFacility(f => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={facility.email}
                onChange={e => setFacility(f => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>
        </div>
        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow p-6 col-span-1">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🔔</span> Notification Settings
          </h2>
          <div className="flex flex-col gap-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Email Notifications</div>
                <div className="text-xs text-gray-500">Send an email when a new request is received</div>
              </div>
              <button
                type="button"
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${notification.email ? 'bg-green-600' : 'bg-gray-200'}`}
                onClick={() => setNotification(n => ({ ...n, email: !n.email }))}
                aria-pressed={notification.email}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${notification.email ? 'translate-x-5' : ''}`}
                />
              </button>
            </div>
            {/* SMS Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Emergency SMS Alerts</div>
                <div className="text-xs text-gray-500">Send SMS for emergency cases</div>
              </div>
              <button
                type="button"
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${notification.sms ? 'bg-green-600' : 'bg-gray-200'}`}
                onClick={() => setNotification(n => ({ ...n, sms: !n.sms }))}
                aria-pressed={notification.sms}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${notification.sms ? 'translate-x-5' : ''}`}
                />
              </button>
            </div>
            {/* Weekly Reports */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Weekly Reports</div>
                <div className="text-xs text-gray-500">Send a summary report every week</div>
              </div>
              <button
                type="button"
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${notification.weekly ? 'bg-green-600' : 'bg-gray-200'}`}
                onClick={() => setNotification(n => ({ ...n, weekly: !n.weekly }))}
                aria-pressed={notification.weekly}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${notification.weekly ? 'translate-x-5' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Admin Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>👤</span> Admin Information
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={admin.name}
              onChange={e => setAdmin(a => ({ ...a, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={admin.email}
              onChange={e => setAdmin(a => ({ ...a, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={admin.phone}
              onChange={e => setAdmin(a => ({ ...a, phone: e.target.value }))}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={admin.password}
              onChange={e => setAdmin(a => ({ ...a, password: e.target.value }))}
              placeholder="Enter new password"
            />
          </div>
        </div>
      </div>
      {/* Emergency Contact Information */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>📞</span> Emergency Contact Information
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Doctor */}
          <div>
            <div className="font-semibold mb-1">24/7 On-Call Doctor</div>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              value={emergency.doctor.name}
              onChange={e => setEmergency(em => ({ ...em, doctor: { ...em.doctor, name: e.target.value } }))}
            />
            <input
              className="w-full border rounded px-3 py-2"
              value={emergency.doctor.phone}
              onChange={e => setEmergency(em => ({ ...em, doctor: { ...em.doctor, phone: e.target.value } }))}
            />
          </div>
          {/* Kit Inventory */}
          <div>
            <div className="font-semibold mb-1">Kit Inventory Manager</div>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              value={emergency.kit.name}
              onChange={e => setEmergency(em => ({ ...em, kit: { ...em.kit, name: e.target.value } }))}
            />
            <input
              className="w-full border rounded px-3 py-2"
              value={emergency.kit.phone}
              onChange={e => setEmergency(em => ({ ...em, kit: { ...em.kit, phone: e.target.value } }))}
            />
          </div>
          {/* Logistics */}
          <div>
            <div className="font-semibold mb-1">Logistics Coordinator</div>
            <input
              className="w-full border rounded px-3 py-2 mb-2"
              value={emergency.logistics.name}
              onChange={e => setEmergency(em => ({ ...em, logistics: { ...em.logistics, name: e.target.value } }))}
            />
            <input
              className="w-full border rounded px-3 py-2"
              value={emergency.logistics.phone}
              onChange={e => setEmergency(em => ({ ...em, logistics: { ...em.logistics, phone: e.target.value } }))}
            />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 rounded bg-white border font-semibold hover:bg-gray-100">Cancel Changes</button>
        <button className="px-6 py-2 rounded bg-green-700 text-white font-semibold hover:bg-green-800">Save Settings</button>
      </div>
    </div>
  );
}