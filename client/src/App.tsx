import { useState } from 'react'
import { NatalChartForm } from './components/NatalChartForm'
import { NatalChartDisplay } from './components/NatalChartDisplay'
import { ChartData } from '@shared/types'

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            AstroWhiz Natal Chart Generator
          </h1>
          <p className="text-gray-300">
            Generate personalized natal charts based on your birth information
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NatalChartForm onSubmit={setChartData} />
          </div>
          
          <div className="space-y-6">
            {chartData ? (
              <NatalChartDisplay chartData={chartData} />
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center text-white">
                <p className="text-lg">
                  Enter your birth information to generate your natal chart
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App