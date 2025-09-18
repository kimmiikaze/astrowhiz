import { useState } from 'react'
import { BirthData, ChartData } from '@shared/types'

interface NatalChartFormProps {
  onSubmit: (data: ChartData) => void
}

export function NatalChartForm({ onSubmit }: NatalChartFormProps) {
  const [formData, setFormData] = useState<BirthData>({
    date: '',
    time: '',
    latitude: 0,
    longitude: 0,
    timezone: 'UTC',
    name: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/generate-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate chart')
      }
      
      const chartData = await response.json()
      onSubmit(chartData)
    } catch (error) {
      console.error('Error generating chart:', error)
      alert('Failed to generate chart. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: keyof BirthData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Birth Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Birth Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              required
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Birth Time *
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => updateField('time', e.target.value)}
              required
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Latitude *
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.latitude}
              onChange={(e) => updateField('latitude', parseFloat(e.target.value) || 0)}
              required
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 40.7128"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Longitude *
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.longitude}
              onChange={(e) => updateField('longitude', parseFloat(e.target.value) || 0)}
              required
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., -74.0060"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Timezone
          </label>
          <select
            value={formData.timezone}
            onChange={(e) => updateField('timezone', e.target.value)}
            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">GMT</option>
            <option value="Europe/Paris">Central European Time</option>
            <option value="Asia/Tokyo">Japan Time</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {loading ? 'Generating Chart...' : 'Generate Natal Chart'}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-300">
        <p>* Required fields</p>
        <p className="mt-1">
          Tip: You can find your exact coordinates using tools like Google Maps
        </p>
      </div>
    </div>
  )
}