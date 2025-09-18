import React, { useState } from 'react';
import { BirthData } from '../types/chart';

interface NatalChartFormProps {
  onSubmit: (birthData: BirthData) => void;
  loading: boolean;
}

const NatalChartForm: React.FC<NatalChartFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<BirthData>({
    date: '',
    time: '',
    location: '',
    latitude: undefined,
    longitude: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-semibold mb-6">Birth Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Birth Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-2">
            Birth Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Birth Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="City, Country"
            required
            className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium mb-2">
              Latitude (optional)
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                latitude: e.target.value ? parseFloat(e.target.value) : undefined
              }))}
              step="0.0001"
              min="-90"
              max="90"
              placeholder="40.7128"
              className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block text-sm font-medium mb-2">
              Longitude (optional)
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                longitude: e.target.value ? parseFloat(e.target.value) : undefined
              }))}
              step="0.0001"
              min="-180"
              max="180"
              placeholder="-74.0060"
              className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating Chart...' : 'Generate Natal Chart'}
        </button>
      </form>
    </div>
  );
};

export default NatalChartForm;