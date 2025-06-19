import { Router } from 'express';
import nasaController from '../controllers/nasaController.js';
import { validateQuery } from '../middleware/validation.js';
import {
  apodQuerySchema,
  marsPhotosQuerySchema,
  neoQuerySchema,
  epicQuerySchema,
} from '../utils/validators.js';

const router = Router();

/**
 * @route   GET /api/apod
 * @desc    Get Astronomy Picture of the Day
 * @access  Public
 * @param   {string} [date] - YYYY-MM-DD format
 * @param   {string} [start_date] - YYYY-MM-DD format
 * @param   {string} [end_date] - YYYY-MM-DD format
 * @param   {number} [count] - Number of images to return (1-100)
 * @param   {boolean} [thumbs] - Return thumbnail URLs
 */
router.get('/apod', validateQuery(apodQuerySchema), nasaController.getAPOD);

/**
 * @route   GET /api/mars-photos
 * @desc    Get Mars Rover Photos
 * @access  Public
 * @param   {string} rover - Rover name (curiosity, opportunity, spirit, perseverance)
 * @param   {number} [sol] - Martian sol (day)
 * @param   {string} [earth_date] - Earth date in YYYY-MM-DD format
 * @param   {string} [camera] - Camera abbreviation
 * @param   {number} [page] - Page number for pagination
 */
router.get('/mars-photos', validateQuery(marsPhotosQuerySchema), nasaController.getMarsPhotos);

/**
 * @route   GET /api/neo
 * @desc    Get Near Earth Objects
 * @access  Public
 * @param   {string} [start_date] - Start date in YYYY-MM-DD format
 * @param   {string} [end_date] - End date in YYYY-MM-DD format (max 7 days from start_date)
 * @param   {boolean} [detailed] - Return detailed information
 */
router.get('/neo', validateQuery(neoQuerySchema), nasaController.getNearEarthObjects);

/**
 * @route   GET /api/epic
 * @desc    Get Earth Polychromatic Imaging Camera images
 * @access  Public
 * @param   {string} [type] - Image type (natural, enhanced)
 * @param   {string} [date] - Date in YYYY-MM-DD format
 */
router.get('/epic', validateQuery(epicQuerySchema), nasaController.getEPICImages);

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', nasaController.getHealthStatus);

export default router;