import React from "react"

interface RadioGroupProps {
  label: string
  name: string
  options: { value: string; label: string }[]
  selectedValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, selectedValue, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="mr-2 text-[var(--primary)]"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  </div>
)

export default RadioGroup
