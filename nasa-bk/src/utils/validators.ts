import Joi from 'joi';
import { APODQuery, MarsPhotosQuery, NeoQuery, EPICQuery } from '../types/index.js';

export const apodQuerySchema = Joi.object<APODQuery>({
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  end_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  count: Joi.number().integer().min(1).max(100).optional(),
  thumbs: Joi.boolean().optional(),
}).custom((value, helpers) => {
  if (value.date && (value.start_date || value.end_date)) {
    return helpers.error('any.invalid', { 
      message: 'Cannot use date parameter with start_date or end_date' 
    });
  }
  if (value.count && (value.date || value.start_date || value.end_date)) {
    return helpers.error('any.invalid', { 
      message: 'Cannot use count parameter with date parameters' 
    });
  }
  return value;
});

export const marsPhotosQuerySchema = Joi.object<MarsPhotosQuery>({
  rover: Joi.string().valid('curiosity', 'opportunity', 'spirit', 'perseverance').required(),
  sol: Joi.number().integer().min(0).optional(),
  earth_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  camera: Joi.string().valid('fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam', 'pancam', 'minites').optional(),
  page: Joi.number().integer().min(1).optional(),
}).custom((value, helpers) => {
  if (value.sol && value.earth_date) {
    return helpers.error('any.invalid', { 
      message: 'Cannot use both sol and earth_date parameters' 
    });
  }
  return value;
});

export const neoQuerySchema = Joi.object<NeoQuery>({
  start_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  end_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
  detailed: Joi.boolean().optional(),
}).custom((value, helpers) => {
  if (value.start_date && value.end_date) {
    const startDate = new Date(value.start_date);
    const endDate = new Date(value.end_date);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 7) {
      return helpers.error('any.invalid', { 
        message: 'Date range cannot exceed 7 days' 
      });
    }
  }
  return value;
});

export const epicQuerySchema = Joi.object<EPICQuery>({
  type: Joi.string().valid('natural', 'enhanced').optional(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
});