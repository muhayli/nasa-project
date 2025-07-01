import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nasaApiKey: string;
  nodeEnv: string;
  corsOrigin: string[];
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  logLevel: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nasaApiKey: process.env.NASA_API_KEY || 'DEMO_KEY',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'https://nasa-theta-lilac.vercel.app'],
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // approx 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
