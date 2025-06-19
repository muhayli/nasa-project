import { Request, Response, NextFunction } from 'express';
import nasaService from '../services/nasaService.js';
import { APIResponse, MarsPhotosQuery } from '../types/index.js';
import logger from '../utils/logger.js';

export class NASAController {
  async getAPOD(req: Request, res: Response<APIResponse<unknown>>, next: NextFunction): Promise<void> {
    try {
      logger.info('APOD request received', { query: req.query, requestId: res.locals.requestId });
      
      const data = await nasaService.getAPOD(req.query);
      
      res.status(200).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMarsPhotos(req: Request, res: Response<APIResponse<unknown>>, next: NextFunction): Promise<void> {
    try {
      logger.info('Mars photos request received', { query: req.query, requestId: res.locals.requestId });
      
      const data = await nasaService.getMarsPhotos(req.query as unknown as MarsPhotosQuery);
      
      res.status(200).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async getNearEarthObjects(req: Request, res: Response<APIResponse<unknown>>, next: NextFunction): Promise<void> {
    try {
      logger.info('NEO request received', { query: req.query, requestId: res.locals.requestId });
      
      const data = await nasaService.getNearEarthObjects(req.query);
      
      res.status(200).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEPICImages(req: Request, res: Response<APIResponse<unknown>>, next: NextFunction): Promise<void> {
    try {
      logger.info('EPIC request received', { query: req.query, requestId: res.locals.requestId });
      
      const data = await nasaService.getEPICImages(req.query);
      
      res.status(200).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      });
    } catch (error) {
      next(error);
    }
  }

  async getHealthStatus(_req: Request, res: Response<APIResponse<unknown>>, next: NextFunction): Promise<void> {
    try {
      logger.info('Health check request received', { requestId: res.locals.requestId });
      
      const data = await nasaService.getHealthStatus();
      
      res.status(200).json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NASAController();