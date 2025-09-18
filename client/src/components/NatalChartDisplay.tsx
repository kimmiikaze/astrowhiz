import React, { useRef } from 'react';
import { ChartData } from '../types/chart';
import NatalChartSVG from './NatalChartSVG';
import ChartDetails from './ChartDetails';

interface NatalChartDisplayProps {
  chartData: ChartData;
}

const NatalChartDisplay: React.FC<NatalChartDisplayProps> = ({ chartData }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  const downloadChart = () => {
    if (!chartRef.current) return;

    const svgData = new XMLSerializer().serializeToString(chartRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 600;
    canvas.height = 600;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = 'natal-chart.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  };

  const downloadSVG = () => {
    if (!chartRef.current) return;

    const svgData = new XMLSerializer().serializeToString(chartRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.download = 'natal-chart.svg';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Natal Chart</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadSVG}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
            >
              Download SVG
            </button>
            <button
              onClick={downloadChart}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              Download PNG
            </button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <NatalChartSVG ref={chartRef} chartData={chartData} />
        </div>
      </div>

      <ChartDetails chartData={chartData} />
    </div>
  );
};

export default NatalChartDisplay;