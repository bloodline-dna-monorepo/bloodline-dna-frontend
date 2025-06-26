import ManaSidebar from 'components/ManagerSidebar/ManaSidebar';
import React, { useEffect, useState } from 'react'
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';

type Staff = {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
}
const statusStyle = (status: string) =>
    status === "Active"
    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
    : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs";
export default function StaffList() {
    const [staffs, setStaffs] = useState<Staff[]> ([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("")
        .then((res) => res.json())
        .then((data) => {
            setStaffs(data)
            setLoading(false)
        })
        .catch(() => setLoading(false))
    })
  return (
    <>
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <ManaSidebar />
          <div>
            <h1 className='font-bold text-left text-3xl'>Staff Management</h1>
            <button className='font-bold text-right border-green-800 text-white'>+ Add Staff</button>
        </div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Staff List</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search by name, email..."
                        />

                    <button>
                        <span className="mr-1">≡</span> Sort
                    </button>
                </div>
            </div>
        </div>
        {loading} ? (
            <div>Loading...</div>
        )
        <table className='w-full text-left'>
            <thead>
                <tr className='border-b'>
                    <th className='py-2'>ID</th>
                    <th className='py-2'>Full Name</th>
                    <th className='py-2'>Email</th>
                    <th className='py-2'>Phone</th>
                    <th className='py-2'>Status</th>
                    <th className='py-2'>Action</th>
                </tr>
            </thead>
            <tbody>
                {staffs.map((st) => (
                    <tr key={st.id} className='border-b hover:bg-gray-50' >
                        <td className='py-2'>{st.id}</td>
                        <td className='py-2'>{st.name}</td>
                        <td className='py-2'>{st.email}</td>
                        <td className='py-2'>{st.phone}</td>
                        <td className='py-2'>
                            <span className={statusStyle(st.status)}>{st.status}</span>
                        </td>
                        <td>
                            <div className='flex gap-3 text-lg'> 
                            <button className='text-gray-700 hover:text-blue-600' title="View"><FiEye /></button>
                            <button className='text-gray-700 hover:text-yellow-500' title="Edit"><FiEdit2/></button>
                            <button className='text-red-500 hover:text-orange-600' title="Delete"><FiTrash2 /></button>
                            </div>
                        </td>
                    </tr> 
                ))}
            </tbody>
        </table>
    </>
  )
}
