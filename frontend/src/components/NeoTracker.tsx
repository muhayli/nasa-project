import React from 'react';
import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useNearEarthObjects } from '../hooks/useNasaApi';

const NeoTracker: React.FC = () => {
  const { data: neoData, isLoading: loading, error, refetch } = useNearEarthObjects();

  if (loading) {
    return <LoadingSpinner message="Tracking near-Earth objects..." />;
  }

  if (error) {
    return <ErrorMessage message={error instanceof Error ? error.message : 'An error occurred'} onRetry={() => refetch()} />;
  }

  if (!neoData) {
    return <ErrorMessage message="No data available" onRetry={() => refetch()} />;
  }

  const allObjects: NearEarthObject[] = Object.values(neoData.near_earth_objects).flat();
  const hazardousCount = allObjects.filter(obj => obj.is_potentially_hazardous_asteroid).length;
  
  const chartData = Object.entries(neoData.near_earth_objects).map(([date, objects]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: objects.length,
    hazardous: objects.filter(obj => obj.is_potentially_hazardous_asteroid).length,
  }));

  const sortedObjects = allObjects
    .map(obj => ({
      ...obj,
      closest_approach: obj.close_approach_data[0]
    }))
    .sort((a, b) => 
      parseFloat(a.closest_approach.miss_distance.kilometers) - 
      parseFloat(b.closest_approach.miss_distance.kilometers)
    )
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto animate-slide-up space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-cosmic-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Total Objects</h3>
          </div>
          <p className="text-3xl font-bold text-cosmic-300">{neoData.element_count}</p>
          <p className="text-slate-400 text-sm mt-1">This week</p>
        </div>
        
        <div className="bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-orange-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Potentially Hazardous</h3>
          </div>
          <p className="text-3xl font-bold text-orange-300">{hazardousCount}</p>
          <p className="text-slate-400 text-sm mt-1">Requires monitoring</p>
        </div>
        
        <div className="bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-nebula-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Closest Approach</h3>
          </div>
          <p className="text-2xl font-bold text-nebula-300">
            {sortedObjects[0] ? 
              `${(parseFloat(sortedObjects[0].closest_approach.miss_distance.kilometers) / 1000000).toFixed(1)}M km` : 
              'N/A'
            }
          </p>
          <p className="text-slate-400 text-sm mt-1">Distance to nearest</p>
        </div>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Near-Earth Objects by Date</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }} 
            />
            <Bar dataKey="total" fill="#0EA5E9" name="Total Objects" />
            <Bar dataKey="hazardous" fill="#F97316" name="Potentially Hazardous" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Closest Approaching Objects</h3>
        <div className="space-y-4">
          {sortedObjects.map((obj) => (
            <div
              key={obj.id}
              className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50 hover:border-cosmic-500/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-white">{obj.name}</h4>
                    {obj.is_potentially_hazardous_asteroid && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30">
                        Potentially Hazardous
                      </span>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Diameter: </span>
                      <span className="text-white">
                        {obj.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-slate-400">Velocity: </span>
                      <span className="text-white">
                        {parseFloat(obj.closest_approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-slate-400">Miss Distance: </span>
                      <span className="text-white">
                        {(parseFloat(obj.closest_approach.miss_distance.kilometers) / 1000000).toFixed(2)} million km
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm">
                    <span className="text-slate-400">Closest Approach: </span>
                    <span className="text-cosmic-300">
                      {new Date(obj.closest_approach.close_approach_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeoTracker;
