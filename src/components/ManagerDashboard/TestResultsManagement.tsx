import React, { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi';

type Test = {
    id: string
    cus: string
    testType: string
    date: string
    status: string
    staff: string
};

const statusStyle = (status: string) =>
  status === "Active"
    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
    : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs";

export default function TestResultsManagement() {
    const [testResult, setTestResult] = useState<Test[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/managers")
          .then((res) => res.json())
          .then((data) => {
            setTestResult(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }, []);

  return (
    <div>
        <h1 className='text-left font-bold text-3xl'>Test Results Management</h1>
        <div className='bg-white rounded-xl shadow p-6 mt-6'>
            <h2 className='text-left text-2xl font-bold'>List of test results</h2>
            <input 
            type="text" 
            placeholder='Search patient'
            className='border rounded px-3 py-1 text-sm'
            />
            <button className='border rounded px-3 py-1 text-sm flex items-center'>
                <span className="mr-1">≡</span> Status
            </button>
        </div>
        {loading ? (
            <div>Loading...</div>
        ):(
            <table className='w-full text-left'>
            <thead>
                <tr className='border-b'>
                    <th className='py-2'>Code</th>
                    <th className='py-2'>Customer</th>
                    <th className='py-2'>Test type</th>
                    <th className='py-2'>Sample date</th>
                    <th className='py-2'>Status</th>
                    <th className='py-2'>Staff</th>
                    <th className='py-2'>Action</th>
                </tr>
            </thead>
            <tbody>
                {testResult.map((tre) => (
                    <tr key={tre.id} className='border-b hover:bg-gray-50'>
                        <td className='py-2'>{tre.id}</td>
                        <td className='py-2'>{tre.cus}</td>
                        <td className='py-2'>{tre.testType}</td>
                        <td className='py-2'>{tre.date}</td>
                        <td className='py-2'>
                            <span className={statusStyle(tre.status)}>{tre.status}</span>
                        </td>
                        <td className='py-2'>
                            <div className='flex gap-3 text-lg'>
                                <button><FiEye /></button>
                            </div>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>{}</td>
                </tr>
            </tbody>
        </table>
        )}
    </div>

  )
}
