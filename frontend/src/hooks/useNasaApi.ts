import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.PROD ? 'https://nasa-project-cggf.onrender.com/api' : '/api';

interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
  };
  timestamp: string;
  requestId: string;
}

const fetchFromAPI = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const result: APIResponse<T> = await response.json();
  
  if (!result.success) {
    throw new Error(result.error?.message || 'API request failed');
  }
  
  return result.data;
};

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
  copyright?: string;
}

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

interface MarsPhotosResponse {
  photos: MarsPhoto[];
}

interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

interface NeoData {
  near_earth_objects: Record<string, NearEarthObject[]>;
  element_count: number;
}

export const useAPOD = (date?: string) => {
  const endpoint = date ? `/apod?date=${date}` : '/apod';
  
  return useQuery({
    queryKey: ['apod', date],
    queryFn: () => fetchFromAPI<APODData>(endpoint),
    staleTime: 30 * 60 * 1000,
  });
};

export const useMarsPhotos = (rover: string, sol: string, camera?: string) => {
  let endpoint = `/mars-photos?rover=${rover}&sol=${sol}`;
  if (camera) {
    endpoint += `&camera=${camera}`;
  }
  
  return useQuery({
    queryKey: ['mars-photos', rover, sol, camera],
    queryFn: () => fetchFromAPI<MarsPhotosResponse>(endpoint),
    enabled: !!rover && !!sol,
    staleTime: 60 * 60 * 1000,
  });
};

export const useNearEarthObjects = () => {
  return useQuery({
    queryKey: ['neo'],
    queryFn: () => fetchFromAPI<NeoData>('/neo'),
    staleTime: 60 * 60 * 1000,
  });
};