# NASA Space Explorer Backend

A professional-grade TypeScript backend API for the NASA Space Explorer application, built with Express.js and following enterprise-level best practices.

## 🏗️ Architecture

### Project Structure
```
backend/
├── src/
│   ├── config/           # Configuration management
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and helpers
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── logs/                # Application logs
├── dist/                # Compiled JavaScript (generated)
└── package.json
```

### Key Features

#### 🔒 Security
- **Helmet.js**: Security headers and XSS protection
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents API abuse with configurable limits
- **Input Validation**: Comprehensive request validation with Joi
- **Request ID Tracking**: Unique request identification for debugging

#### 📊 Monitoring & Logging
- **Winston Logger**: Structured logging with multiple transports
- **Morgan**: HTTP request logging
- **Error Tracking**: Comprehensive error handling and reporting
- **Health Checks**: API status monitoring endpoint

#### 🚀 Performance
- **Compression**: Gzip compression for responses
- **Request Parsing**: Optimized JSON and URL-encoded parsing
- **Async/Await**: Modern asynchronous programming patterns
- **Connection Pooling**: Efficient HTTP client configuration

#### 🛡️ Error Handling
- **Custom Error Classes**: Structured error hierarchy
- **Global Error Handler**: Centralized error processing
- **Validation Errors**: Detailed validation feedback
- **NASA API Error Mapping**: Proper external API error handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- NASA API Key (get one at https://api.nasa.gov/)

### Installation
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your NASA API key
nano .env
```

### Development
```bash
# Start development server with hot reload
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Base URL
- Development: `http://localhost:5000`
- All endpoints return standardized JSON responses with the following structure:

```typescript
{
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code?: string;
    status: number;
    details?: any;
  };
  timestamp: string;
  requestId: string;
}
```

### Endpoints

#### 🌟 Astronomy Picture of the Day
```
GET /api/apod
```

**Query Parameters:**
- `date` (optional): YYYY-MM-DD format
- `start_date` (optional): YYYY-MM-DD format
- `end_date` (optional): YYYY-MM-DD format
- `count` (optional): Number of images (1-100)
- `thumbs` (optional): Include thumbnail URLs

**Example:**
```bash
curl "http://localhost:5000/api/apod?date=2023-12-01"
```

#### 🔴 Mars Rover Photos
```
GET /api/mars-photos
```

**Query Parameters:**
- `rover` (required): curiosity, opportunity, spirit, perseverance
- `sol` (optional): Martian day number
- `earth_date` (optional): YYYY-MM-DD format
- `camera` (optional): Camera abbreviation
- `page` (optional): Page number for pagination

**Example:**
```bash
curl "http://localhost:5000/api/mars-photos?rover=curiosity&sol=1000&camera=mast"
```

#### 🌍 Near Earth Objects
```
GET /api/neo
```

**Query Parameters:**
- `start_date` (optional): YYYY-MM-DD format
- `end_date` (optional): YYYY-MM-DD format (max 7 days from start_date)
- `detailed` (optional): Return detailed information

**Example:**
```bash
curl "http://localhost:5000/api/neo?start_date=2023-12-01&end_date=2023-12-07"
```

#### 🌎 Earth Polychromatic Imaging Camera
```
GET /api/epic
```

**Query Parameters:**
- `type` (optional): natural, enhanced
- `date` (optional): YYYY-MM-DD format

**Example:**
```bash
curl "http://localhost:5000/api/epic?type=natural"
```

#### ❤️ Health Check
```
GET /api/health
```

Returns API status and configuration information.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NASA_API_KEY` | Your NASA API key | `DEMO_KEY` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `LOG_LEVEL` | Logging level | `info` |

### Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables
- Returns 429 status code when exceeded

### CORS Configuration
- Configurable allowed origins
- Supports credentials
- Proper preflight handling

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Logging

The application uses Winston for structured logging:

- **Console**: Development environment
- **File**: Production logs stored in `logs/` directory
- **Error Log**: `logs/error.log`
- **Combined Log**: `logs/combined.log`

### Log Levels
- `error`: Error conditions
- `warn`: Warning conditions
- `info`: Informational messages
- `debug`: Debug-level messages

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup
1. Set all required environment variables
2. Ensure NASA API key is configured
3. Configure CORS origins for your domain
4. Set appropriate rate limits
5. Configure logging level

## 🔍 Monitoring

### Health Checks
- Endpoint: `GET /api/health`
- Returns API status and configuration
- Use for load balancer health checks

### Request Tracking
- Every request gets a unique `X-Request-ID` header
- Logged for debugging and tracing
- Included in all API responses

### Error Monitoring
- Structured error logging
- Request context preservation
- Stack trace capture in development

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper type definitions
3. Include comprehensive error handling
4. Write tests for new features
5. Update documentation

## 📄 License

MIT License - see LICENSE file for details.