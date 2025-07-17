// components/ConfirmModal.tsx
import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-4 whitespace-pre-line" >{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Hủy
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
