import { ChartData, ZODIAC_SIGNS } from '@shared/types'

interface NatalChartWheelProps {
  chartData: ChartData
}

export function NatalChartWheel({ chartData }: NatalChartWheelProps) {
  const size = 500
  const center = size / 2
  const outerRadius = 220
  const innerRadius = 160
  const houseRadius = 140
  const planetRadius = 180

  // Convert degrees to radians
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180

  // Position for a point on a circle
  const getPosition = (angle: number, radius: number) => {
    const radian = toRadians(angle - 90) // -90 to start from top
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian)
    }
  }

  // Generate zodiac wheel
  const generateZodiacWheel = () => {
    const segments = []
    const signSize = 360 / 12 // 30 degrees per sign

    for (let i = 0; i < 12; i++) {
      const startAngle = i * signSize
      const endAngle = (i + 1) * signSize
      const midAngle = startAngle + signSize / 2

      const startPos = getPosition(startAngle, outerRadius)
      const endPos = getPosition(endAngle, outerRadius)
      const innerStartPos = getPosition(startAngle, innerRadius)
      const innerEndPos = getPosition(endAngle, innerRadius)

      // Create path for zodiac segment
      const largeArcFlag = 0 // Always 0 for 30-degree segments
      const pathData = [
        `M ${startPos.x} ${startPos.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endPos.x} ${endPos.y}`,
        `L ${innerEndPos.x} ${innerEndPos.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartPos.x} ${innerStartPos.y}`,
        'Z'
      ].join(' ')

      // Alternating colors for visibility
      const fillColor = i % 2 === 0 ? '#f8fafc' : '#e2e8f0'

      segments.push(
        <g key={`zodiac-${i}`}>
          <path
            d={pathData}
            fill={fillColor}
            stroke="#64748b"
            strokeWidth="1"
          />
          <text
            x={getPosition(midAngle, (outerRadius + innerRadius) / 2).x}
            y={getPosition(midAngle, (outerRadius + innerRadius) / 2).y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-semibold"
            fill="#334155"
          >
            {ZODIAC_SIGNS[i]}
          </text>
        </g>
      )
    }

    return segments
  }

  // Generate house divisions
  const generateHouses = () => {
    const houses = []
    
    for (let i = 0; i < 12; i++) {
      const house = chartData.houses[i]
      if (!house) continue

      const angle = house.cusp
      const nextHouse = chartData.houses[(i + 1) % 12]
      const nextAngle = nextHouse ? nextHouse.cusp : house.cusp + 30

      const startPos = getPosition(angle, houseRadius)
      const endPos = getPosition(nextAngle, houseRadius)
      
      // House line
      houses.push(
        <line
          key={`house-line-${i}`}
          x1={center}
          y1={center}
          x2={startPos.x}
          y2={startPos.y}
          stroke="#7c3aed"
          strokeWidth="2"
        />
      )

      // House number
      const midAngle = angle + (nextAngle - angle) / 2
      const textPos = getPosition(midAngle, houseRadius - 20)
      houses.push(
        <text
          key={`house-text-${i}`}
          x={textPos.x}
          y={textPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-bold"
          fill="#7c3aed"
        >
          {house.number}
        </text>
      )
    }

    return houses
  }

  // Generate planet positions
  const generatePlanets = () => {
    const planets = []
    
    chartData.planets.forEach((planet, index) => {
      const angle = planet.longitude
      const pos = getPosition(angle, planetRadius)
      
      planets.push(
        <g key={`planet-${planet.name}`}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r="12"
            fill="#fbbf24"
            stroke="#92400e"
            strokeWidth="2"
          />
          <text
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-bold"
            fill="#92400e"
          >
            {planet.symbol}
          </text>
          {planet.retrograde && (
            <text
              x={pos.x + 15}
              y={pos.y - 10}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs"
              fill="#dc2626"
            >
              R
            </text>
          )}
        </g>
      )
    })

    return planets
  }

  // Generate aspect lines
  const generateAspects = () => {
    const aspects = []
    
    chartData.aspects.forEach((aspect, index) => {
      const planet1 = chartData.planets.find(p => p.name === aspect.planet1)
      const planet2 = chartData.planets.find(p => p.name === aspect.planet2)
      
      if (!planet1 || !planet2) return

      const pos1 = getPosition(planet1.longitude, planetRadius)
      const pos2 = getPosition(planet2.longitude, planetRadius)
      
      // Color based on aspect type
      let strokeColor = '#64748b'
      let strokeWidth = 1
      
      switch (aspect.type.toLowerCase()) {
        case 'conjunction':
          strokeColor = '#dc2626'
          strokeWidth = 2
          break
        case 'opposition':
          strokeColor = '#dc2626'
          strokeWidth = 2
          break
        case 'trine':
          strokeColor = '#059669'
          strokeWidth = 2
          break
        case 'square':
          strokeColor = '#dc2626'
          strokeWidth = 1.5
          break
        case 'sextile':
          strokeColor = '#0891b2'
          strokeWidth = 1.5
          break
      }

      aspects.push(
        <line
          key={`aspect-${index}`}
          x1={pos1.x}
          y1={pos1.y}
          x2={pos2.x}
          y2={pos2.y}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          opacity="0.7"
        />
      )
    })

    return aspects
  }

  return (
    <div className="flex justify-center">
      <svg
        id="natal-chart-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="border border-gray-300 rounded-lg"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="white"
          stroke="#64748b"
          strokeWidth="2"
        />
        
        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="#64748b"
          strokeWidth="1"
        />

        {/* House circle */}
        <circle
          cx={center}
          cy={center}
          r={houseRadius}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="1"
        />

        {/* Zodiac wheel */}
        {generateZodiacWheel()}
        
        {/* Aspect lines (drawn first, behind planets) */}
        {generateAspects()}
        
        {/* Houses */}
        {generateHouses()}
        
        {/* Planets */}
        {generatePlanets()}

        {/* Ascendant marker */}
        <g>
          <line
            x1={center}
            y1={center}
            x2={getPosition(chartData.ascendant, outerRadius).x}
            y2={getPosition(chartData.ascendant, outerRadius).y}
            stroke="#ef4444"
            strokeWidth="3"
          />
          <text
            x={getPosition(chartData.ascendant, outerRadius + 15).x}
            y={getPosition(chartData.ascendant, outerRadius + 15).y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-bold"
            fill="#ef4444"
          >
            ASC
          </text>
        </g>

        {/* Midheaven marker */}
        <g>
          <line
            x1={center}
            y1={center}
            x2={getPosition(chartData.midheaven, outerRadius).x}
            y2={getPosition(chartData.midheaven, outerRadius).y}
            stroke="#8b5cf6"
            strokeWidth="3"
          />
          <text
            x={getPosition(chartData.midheaven, outerRadius + 15).x}
            y={getPosition(chartData.midheaven, outerRadius + 15).y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-bold"
            fill="#8b5cf6"
          >
            MC
          </text>
        </g>
      </svg>
    </div>
  )
}