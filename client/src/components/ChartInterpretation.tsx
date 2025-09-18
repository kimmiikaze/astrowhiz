import { ChartData } from '@shared/types'

interface ChartInterpretationProps {
  chartData: ChartData
}

export function ChartInterpretation({ chartData }: ChartInterpretationProps) {
  const formatDegree = (longitude: number) => {
    const sign = Math.floor(longitude / 30)
    const degree = Math.floor(longitude % 30)
    const minute = Math.floor((longitude % 1) * 60)
    return `${degree}°${minute}'`
  }

  const getZodiacSign = (longitude: number) => {
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 
      'Leo', 'Virgo', 'Libra', 'Scorpio',
      'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ]
    return signs[Math.floor(longitude / 30)]
  }

  return (
    <div className="space-y-6">
      {/* Birth Information */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Birth Information</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-200">
          <div>
            <span className="font-medium">Date:</span> {chartData.birthData.date}
          </div>
          <div>
            <span className="font-medium">Time:</span> {chartData.birthData.time}
          </div>
          <div>
            <span className="font-medium">Location:</span> {chartData.birthData.latitude.toFixed(4)}, {chartData.birthData.longitude.toFixed(4)}
          </div>
          <div>
            <span className="font-medium">Timezone:</span> {chartData.birthData.timezone}
          </div>
        </div>
      </div>

      {/* Planetary Positions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Planetary Positions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chartData.planets.map((planet) => (
            <div key={planet.name} className="flex justify-between items-center p-3 bg-white/10 rounded">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{planet.symbol}</span>
                <span className="font-medium text-white">{planet.name}</span>
                {planet.retrograde && (
                  <span className="text-red-400 text-sm">R</span>
                )}
              </div>
              <div className="text-right text-gray-300">
                <div>{formatDegree(planet.longitude)} {getZodiacSign(planet.longitude)}</div>
                <div className="text-sm">House {planet.house}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* House Cusps */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">House Cusps</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {chartData.houses.map((house) => (
            <div key={house.number} className="flex justify-between items-center p-3 bg-white/10 rounded">
              <span className="font-medium text-white">House {house.number}</span>
              <div className="text-right text-gray-300">
                <div>{formatDegree(house.cusp)} {getZodiacSign(house.cusp)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major Aspects */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Major Aspects</h3>
        <div className="space-y-2">
          {chartData.aspects.map((aspect, index) => {
            const getAspectColor = (type: string) => {
              switch (type.toLowerCase()) {
                case 'conjunction': return 'text-red-400'
                case 'opposition': return 'text-red-400'
                case 'trine': return 'text-green-400'
                case 'square': return 'text-orange-400'
                case 'sextile': return 'text-blue-400'
                default: return 'text-gray-400'
              }
            }

            const getAspectSymbol = (type: string) => {
              switch (type.toLowerCase()) {
                case 'conjunction': return '☌'
                case 'opposition': return '☍'
                case 'trine': return '△'
                case 'square': return '□'
                case 'sextile': return '⚹'
                case 'quincunx': return '⚻'
                default: return '◯'
              }
            }

            return (
              <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">
                    {chartData.planets.find(p => p.name === aspect.planet1)?.symbol}
                  </span>
                  <span className={`text-lg ${getAspectColor(aspect.type)}`}>
                    {getAspectSymbol(aspect.type)}
                  </span>
                  <span className="text-yellow-400">
                    {chartData.planets.find(p => p.name === aspect.planet2)?.symbol}
                  </span>
                  <span className="text-white font-medium">
                    {aspect.planet1} {aspect.type} {aspect.planet2}
                  </span>
                </div>
                <div className="text-right text-gray-300">
                  <div>{aspect.angle.toFixed(1)}°</div>
                  <div className="text-sm">Orb: {aspect.orb.toFixed(1)}°</div>
                </div>
              </div>
            )
          })}
          {chartData.aspects.length === 0 && (
            <p className="text-gray-400 text-center py-4">No major aspects found</p>
          )}
        </div>
      </div>

      {/* Chart Summary */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Chart Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
          <div>
            <span className="font-medium">Ascendant:</span> {formatDegree(chartData.ascendant)} {getZodiacSign(chartData.ascendant)}
          </div>
          <div>
            <span className="font-medium">Midheaven:</span> {formatDegree(chartData.midheaven)} {getZodiacSign(chartData.midheaven)}
          </div>
          <div>
            <span className="font-medium">Sun Sign:</span> {chartData.planets.find(p => p.name === 'Sun')?.sign || 'Unknown'}
          </div>
          <div>
            <span className="font-medium">Moon Sign:</span> {chartData.planets.find(p => p.name === 'Moon')?.sign || 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  )
}