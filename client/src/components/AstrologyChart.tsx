import React, { useState, useEffect, useRef } from 'react';
import { ChartData, ChartOptions, ExportOptions } from '../types/chart';
import { AstrologicalChartSVG } from '../lib/chartRenderer';
import { ChartExporter } from '../utils/chartExporter';

interface AstrologyChartProps {
  chartData: ChartData;
  options?: Partial<ChartOptions>;
  className?: string;
}

const AstrologyChart: React.FC<AstrologyChartProps> = ({ 
  chartData, 
  options = {}, 
  className = '' 
}) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  const chartOptions: ChartOptions = {
    size: 600,
    showAspects: true,
    showHouses: true,
    backgroundColor: 'transparent',
    strokeColor: '#2c3e50',
    fillColor: 'none',
    fontSize: 16,
    aspectColors: {
      'conjunction': '#e74c3c',
      'opposition': '#e74c3c',
      'trine': '#3498db',
      'square': '#e74c3c',
      'sextile': '#27ae60',
      'quincunx': '#7f8c8d',
      'semisextile': '#7f8c8d',
      'semisquare': '#f39c12',
      'sesquiquadrate': '#f39c12'
    },
    ...options
  };

  useEffect(() => {
    const renderer = new AstrologicalChartSVG(chartData, chartOptions);
    const svg = renderer.generateSVG();
    setSvgContent(svg);
  }, [chartData, chartOptions]);

  const handleExportSVG = () => {
    if (svgContent) {
      ChartExporter.exportSVG(svgContent, 'astrology-chart.svg');
    }
  };

  const handleExportPNG = async (exportOptions: Partial<ExportOptions> = {}) => {
    if (!svgContent) return;
    
    setIsExporting(true);
    try {
      const options = ChartExporter.validateExportOptions({
        format: 'png',
        width: 1200,
        height: 1200,
        transparent: true,
        quality: 0.95,
        ...exportOptions
      });
      
      await ChartExporter.exportPNG(svgContent, options, 'astrology-chart.png');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHighRes = async () => {
    await handleExportPNG({
      width: 2400,
      height: 2400,
      quality: 1.0
    });
  };

  return (
    <div className={`astrology-chart ${className}`}>
      <div className="chart-container mb-4">
        <div 
          ref={svgRef}
          className="chart-display"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            margin: '0 auto',
            display: 'block'
          }}
        />
      </div>
      
      <div className="export-controls flex flex-wrap gap-2 justify-center">
        <button
          onClick={handleExportSVG}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={!svgContent}
        >
          Export SVG
        </button>
        
        <button
          onClick={() => handleExportPNG()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          disabled={!svgContent || isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export PNG (Standard)'}
        </button>
        
        <button
          onClick={handleExportHighRes}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          disabled={!svgContent || isExporting}
        >
          Export High-Res PNG
        </button>
      </div>

      {chartData.aspects.length > 0 && (
        <div className="aspects-info mt-4 p-4 bg-gray-50 rounded">
          <h3 className="text-lg font-semibold mb-2">Aspects Found:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {chartData.aspects.map((aspect, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-medium">{aspect.planet1}</span>
                <span 
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: chartOptions.aspectColors[aspect.type] }}
                />
                <span className="capitalize">{aspect.type}</span>
                <span className="font-medium">{aspect.planet2}</span>
                <span className="text-gray-500">({aspect.orb.toFixed(1)}°)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologyChart;