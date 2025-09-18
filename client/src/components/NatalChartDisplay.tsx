import { ChartData } from '@shared/types'
import { NatalChartWheel } from './NatalChartWheel'
import { ChartInterpretation } from './ChartInterpretation'

interface NatalChartDisplayProps {
  chartData: ChartData
}

export function NatalChartDisplay({ chartData }: NatalChartDisplayProps) {
  const downloadChart = () => {
    const svg = document.querySelector('#natal-chart-svg')
    if (!svg) return

    // Create a canvas to convert SVG to PNG
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    // For SVG download
    const link = document.createElement('a')
    link.href = url
    link.download = `natal-chart-${chartData.birthData.name || 'chart'}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">
            {chartData.birthData.name ? `${chartData.birthData.name}'s Natal Chart` : 'Natal Chart'}
          </h2>
          <button
            onClick={downloadChart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Download Chart
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <NatalChartWheel chartData={chartData} />
        </div>
      </div>

      <ChartInterpretation chartData={chartData} />
    </div>
  )
}