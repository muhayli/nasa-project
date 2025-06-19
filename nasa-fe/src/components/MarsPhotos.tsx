import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Filter, Calendar } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  rover: {
    name: string;
    status: string;
  };
  camera: {
    name: string;
    full_name: string;
  };
}


const MarsPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRover, setSelectedRover] = useState('curiosity');
  const [selectedCamera, setSelectedCamera] = useState('');
  const [sol, setSol] = useState('1000');

  const rovers = [
    { id: 'curiosity', name: 'Curiosity' },
    { id: 'opportunity', name: 'Opportunity' },
    { id: 'spirit', name: 'Spirit' },
    { id: 'perseverance', name: 'Perseverance' },
  ];

  const cameras = [
    { id: '', name: 'All Cameras' },
    { id: 'fhaz', name: 'Front Hazard Avoidance Camera' },
    { id: 'rhaz', name: 'Rear Hazard Avoidance Camera' },
    { id: 'mast', name: 'Mast Camera' },
    { id: 'chemcam', name: 'Chemistry and Camera Complex' },
    { id: 'mahli', name: 'Mars Hand Lens Imager' },
    { id: 'mardi', name: 'Mars Descent Imager' },
    { id: 'navcam', name: 'Navigation Camera' },
  ];

  const fetchMarsPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `/api/mars-photos?rover=${selectedRover}&sol=${sol}`;
      if (selectedCamera) {
        url += `&camera=${selectedCamera}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Mars photos');
      }
      
      const result = await response.json();
      if (result.success && result.data) {
        setPhotos(result.data.photos.slice(0, 12)); // Limit to 12 photos for better performance
      } else {
        throw new Error(result.error?.message || 'Failed to fetch Mars photos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [selectedRover, selectedCamera, sol]);

  useEffect(() => {
    fetchMarsPhotos();
  }, [selectedRover, selectedCamera, sol, fetchMarsPhotos]);

  if (loading) {
    return <LoadingSpinner message="Loading Mars photos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchMarsPhotos} />;
  }

  return (
    <div className="max-w-7xl mx-auto animate-slide-up space-y-6">
      {/* Controls */}
      <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Camera size={16} className="inline mr-1" />
              Rover
            </label>
            <select
              value={selectedRover}
              onChange={(e) => setSelectedRover(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-nebula-500 focus:border-transparent"
            >
              {rovers.map((rover) => (
                <option key={rover.id} value={rover.id}>
                  {rover.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Filter size={16} className="inline mr-1" />
              Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-nebula-500 focus:border-transparent"
            >
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Sol (Martian Day)
            </label>
            <input
              type="number"
              value={sol}
              onChange={(e) => setSol(e.target.value)}
              min="1"
              max="3000"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-nebula-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={fetchMarsPhotos}
              className="w-full px-4 py-2 bg-nebula-600 hover:bg-nebula-700 text-white rounded-lg transition-colors font-medium"
            >
              Search Photos
            </button>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-square">
                <img
                  src={photo.img_src}
                  alt={`Mars photo by ${photo.rover.name}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-white text-sm">
                  {photo.camera.full_name}
                </h3>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{photo.rover.name}</span>
                  <span>{new Date(photo.earth_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Camera className="mx-auto text-slate-500 mb-4" size={48} />
          <p className="text-slate-400 text-lg">No photos found for the selected criteria.</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting the rover, camera, or sol date.</p>
        </div>
      )}
    </div>
  );
};

export default MarsPhotos;