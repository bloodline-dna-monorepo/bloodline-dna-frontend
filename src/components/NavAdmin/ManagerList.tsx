import React from 'react'
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';

const managers = [{
        id: "001",
        name: "Nguyen Van A",
        email: "nguyenvana@gmail.com",
        phone: "0123456789",
        status: "Active",
    },
    {
        id: "001",
        name: "Nguyen Van A",
        email: "nguyenvana@gmail.com",
        phone: "0123456789",
        status: "Active",
    },
    {
        id: "001",
        name: "Nguyen Van A",
        email: "nguyenvana@gmail.com",
        phone: "0123456789",
        status: "Active",
    }
]
const statusStyle = (status: string) =>
  status === "Active"
    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
    : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs";
export default function ManagerList() {
    
  return (
    <>
    <div>
        <h1 className='font-bold text-left text-3xl'>Manager List</h1>
        <button className='font-bold text-right text-2xl border-green-800 text-white'>+ Add Manager</button>
    </div>
    <div>
        <div className='bg-white rounded-xl shadow p-6 mt-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='font-bold text-left text-2xl'>Manager List</h2>
                <div className='flex gap-2'>
                    <input 
                        type="text" 
                        placeholder='Search by name, email...'
                        className='border rounded px-3 py-1 text-sm'
                    />
                    <button className='border rounded px-3 pt-1 text-sm flex items-center'>
                        <span className='mr-1'>≡</span> Sort
                    </button>
                </div>
            </div>
            <table className='w-full text-left'>
                <thead>
                    <tr className='border-b'>
                        <th className='py-2'>ID</th>
                        <th className='py-2'>Full Name</th>
                        <th className='py-2'>Email</th>
                        <th className='py-2'>Phone</th>
                        <th className='py-2'>Status</th>
                        <th className='py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((mana) => (
                        <tr key={mana.id} className='border-b hover:bg-gray-50'>
                            <td className='py-2'>{mana.id}</td>
                            <td className='py-2'>{mana.name}</td>
                            <td className='py-2'>{mana.email}</td>
                            <td className='py-2'>{mana.phone}</td>
                            <td className='py-2'>
                                <span className={statusStyle(mana.status)}>{mana.status}</span>
                            </td>
                            <td className='py-2'>
                                <div className='flex gap-3 text-lg'>
                                    <button className="text-gray-700 hover:text-blue-600" title="View"><FiEye /></button>
                                    <button className="text-gray-700 hover:text-yellow-500" title="Edit"><FiEdit2 /></button>
                                    <button className="text-red-400 hover:text-red-600" title="Delete"><FiTrash2 /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}
