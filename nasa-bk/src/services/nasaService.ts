import axios, { AxiosResponse, AxiosError } from 'axios';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { NASAAPIError } from '../utils/errors.js';
import {
  APODResponse,
  MarsPhotosResponse,
  NeoResponse,
  EPICImage,
  APODQuery,
  MarsPhotosQuery,
  NeoQuery,
  EPICQuery,
} from '../types/index.js';

class NASAService {
  private readonly baseURL = 'https://api.nasa.gov';
  private readonly apiKey = config.nasaApiKey;

  private async makeRequest<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const requestParams = {
        api_key: this.apiKey,
        ...params,
      };

      logger.info(`Making NASA API request to ${endpoint}`, { params: requestParams });

      const response: AxiosResponse<T> = await axios.get(url, {
        params: requestParams,
        timeout: 30000,
        headers: {
          'User-Agent': 'NASA-Space-Explorer/1.0.0',
        },
      });

      logger.info(`NASA API request successful`, { 
        endpoint, 
        status: response.status,
        dataSize: JSON.stringify(response.data).length 
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status || 500;
        const message = axiosError.response?.data || axiosError.message;
        
        logger.error(`NASA API request failed`, {
          endpoint,
          status,
          message,
          error: axiosError.message,
        });

        throw new NASAAPIError(
          `NASA API request failed: ${message}`,
          status,
          { endpoint, originalError: axiosError.message }
        );
      }

      logger.error(`Unexpected error in NASA API request`, { endpoint, error });
      throw new NASAAPIError('Unexpected error occurred while fetching NASA data');
    }
  }

  async getAPOD(query: APODQuery): Promise<APODResponse | APODResponse[]> {
    const endpoint = '/planetary/apod';
    const params: Record<string, unknown> = {};

    if (query.date) params.date = query.date;
    if (query.start_date) params.start_date = query.start_date;
    if (query.end_date) params.end_date = query.end_date;
    if (query.count) params.count = query.count;
    if (query.thumbs) params.thumbs = query.thumbs;

    return this.makeRequest<APODResponse | APODResponse[]>(endpoint, params);
  }

  async getMarsPhotos(query: MarsPhotosQuery): Promise<MarsPhotosResponse> {
    const endpoint = `/mars-photos/api/v1/rovers/${query.rover}/photos`;
    const params: Record<string, unknown> = {};

    if (query.sol !== undefined) params.sol = query.sol;
    if (query.earth_date) params.earth_date = query.earth_date;
    if (query.camera) params.camera = query.camera;
    if (query.page) params.page = query.page;

    // Default to sol 1000 if no date parameters provided
    if (!query.sol && !query.earth_date) {
      params.sol = 1000;
    }

    return this.makeRequest<MarsPhotosResponse>(endpoint, params);
  }

  async getNearEarthObjects(query: NeoQuery): Promise<NeoResponse> {
    const endpoint = '/neo/rest/v1/feed';
    const params: Record<string, unknown> = {};

    if (query.start_date && query.end_date) {
      params.start_date = query.start_date;
      params.end_date = query.end_date;
    } else {
      // Default to current week
      const today = new Date();
      const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      params.start_date = today.toISOString().split('T')[0];
      params.end_date = weekLater.toISOString().split('T')[0];
    }

    if (query.detailed) params.detailed = query.detailed;

    return this.makeRequest<NeoResponse>(endpoint, params);
  }

  async getEPICImages(query: EPICQuery): Promise<EPICImage[]> {
    const type = query.type || 'natural';
    const endpoint = `/EPIC/api/${type}`;
    const params: Record<string, unknown> = {};

    if (query.date) params.date = query.date;

    return this.makeRequest<EPICImage[]>(endpoint, params);
  }

  async getHealthStatus(): Promise<{ status: string; timestamp: string; apiKey: string }> {
    return {
      status: 'NASA Space Explorer API is running!',
      timestamp: new Date().toISOString(),
      apiKey: this.apiKey === 'DEMO_KEY' ? 'Using DEMO_KEY' : 'Custom key configured',
    };
  }
}

export default new NASAService();