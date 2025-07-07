import { useState } from 'react'
import type { TestProcess } from '../../utils/types'

interface SampleInfo {
  fullName: string
  birthYear: string
  gender: string
  relation: string
  sampleType: string
  idNumber: string
  file: File | null
  note: string
}

const TestInfoForm: React.FC<{
  sampleCount: number
  onClose: () => void
  request: TestProcess
}> = ({ sampleCount, onClose }) => {
  const [samples, setSamples] = useState<SampleInfo[]>(
    Array.from({ length: sampleCount }, () => ({
      fullName: '',
      birthYear: '',
      gender: '',
      relation: '',
      sampleType: '',
      idNumber: '',
      file: null,
      note: ''
    }))
  )

  const handleChange = (index: number, field: keyof SampleInfo, value: any) => {
    const updated = [...samples]
    updated[index][field] = value
    setSamples(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(samples)
    // Gửi samples lên server hoặc xử lý tại đây
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center'>
      <div className='bg-white w-full max-w-4xl rounded-lg p-6 shadow-lg max-h-[90vh] overflow-y-auto'>
        <h2 className='text-xl font-bold mb-4'>Điền thông tin xét nghiệm - Dân sự</h2>
        <form onSubmit={handleSubmit}>
          {samples.map((sample, i) => (
            <div key={i} className='mb-6 border p-4 rounded'>
              <h4 className='font-semibold mb-4'>Mẫu {i + 1}</h4>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <input
                  className='border p-2 rounded'
                  placeholder='Họ tên *'
                  value={sample.fullName}
                  onChange={(e) => handleChange(i, 'fullName', e.target.value)}
                  required
                />
                <input
                  className='border p-2 rounded'
                  placeholder='Năm sinh *'
                  value={sample.birthYear}
                  onChange={(e) => handleChange(i, 'birthYear', e.target.value)}
                  required
                />
                <select
                  className='border p-2 rounded'
                  value={sample.gender}
                  onChange={(e) => handleChange(i, 'gender', e.target.value)}
                  required
                >
                  <option value=''>Giới tính *</option>
                  <option value='Nam'>Nam</option>
                  <option value='Nữ'>Nữ</option>
                  <option value='Khác'>Khác</option>
                </select>

                <input
                  className='border p-2 rounded'
                  placeholder='Mối quan hệ'
                  value={sample.relation}
                  onChange={(e) => handleChange(i, 'relation', e.target.value)}
                />
                <select
                  className='border p-2 rounded'
                  value={sample.sampleType}
                  onChange={(e) => handleChange(i, 'sampleType', e.target.value)}
                  required
                >
                  <option value=''>Chọn loại mẫu *</option>
                  <option value='Máu'>Máu</option>
                  <option value='Nước bọt'>Nước bọt</option>
                  <option value='Tóc'>Tóc</option>
                </select>
                <input
                  className='border p-2 rounded'
                  placeholder='CMND/CCCD/Passport *'
                  value={sample.idNumber}
                  onChange={(e) => handleChange(i, 'idNumber', e.target.value)}
                  required
                />

                <input
                  type='file'
                  className='border p-2 rounded col-span-1'
                  onChange={(e) => handleChange(i, 'file', e.target.files?.[0] || null)}
                />
                <input
                  className='border p-2 rounded col-span-2'
                  placeholder='Ghi chú'
                  value={sample.note}
                  onChange={(e) => handleChange(i, 'note', e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className='mt-6 flex justify-end gap-2'>
            <button type='button' onClick={onClose} className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'>
              Hủy
            </button>
            <button type='submit' className='px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'>
              Xác nhận thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TestInfoForm
