import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import config from "./config/index.js";
import logger from "./utils/logger.js";
import { requestIdMiddleware } from "./middleware/requestId.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import nasaRoutes from "./routes/nasa.js";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware

    // CORS configuration
    this.app.use(
      cors({
        origin: config.corsOrigin,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
      }),
    );

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.rateLimitWindowMs,
      max: config.rateLimitMaxRequests,
      message: {
        success: false,
        error: {
          message: "Too many requests from this IP, please try again later",
          status: 429,
        },
        timestamp: new Date().toISOString(),
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use("/api/", limiter);

    // Compression
    this.app.use(compression());

    // Request parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Request ID middleware
    this.app.use(requestIdMiddleware);

    // Logging middleware
    this.app.use(
      morgan("combined", {
        stream: {
          write: (message: string) => {
            logger.info(message.trim());
          },
        },
      }),
    );

    // Request logging
    this.app.use((req, res, next) => {
      logger.info("Incoming request", {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        requestId: res.locals.requestId,
      });
      next();
    });
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use("/api", nasaRoutes);

    // Root endpoint
    this.app.get("/", (_req, res) => {
      res.json({
        success: true,
        data: {
          message: "NASA Space Explorer API",
          version: "1.0.0",
          documentation: "/api/health",
          endpoints: [
            "GET /api/apod - Astronomy Picture of the Day",
            "GET /api/mars-photos - Mars Rover Photos",
            "GET /api/neo - Near Earth Objects",
            "GET /api/epic - Earth Polychromatic Imaging Camera",
            "GET /api/health - Health Check",
          ],
        },
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      });
    });
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(config.port, () => {
      logger.info(`🚀 NASA Space Explorer API is running!`, {
        port: config.port,
        environment: config.nodeEnv,
        nasaApiKey:
          config.nasaApiKey === "DEMO_KEY"
            ? "Using DEMO_KEY"
            : "Custom key configured",
      });
    });
  }
}

export default App;
