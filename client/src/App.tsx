import React, { useState } from 'react';
import NatalChartForm from './components/NatalChartForm';
import NatalChartDisplay from './components/NatalChartDisplay';
import { ChartData } from './types/chart';

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateChart = async (birthData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/natal-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ birthData }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setChartData(result.data);
      } else {
        setError(result.error || 'Failed to generate chart');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AstroWhiz Natal Chart Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate your personalized natal chart with detailed astrological analysis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NatalChartForm 
              onSubmit={handleGenerateChart} 
              loading={loading}
            />
            
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                <p className="text-destructive">{error}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {chartData && (
              <NatalChartDisplay chartData={chartData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;