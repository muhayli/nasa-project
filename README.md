# 🚀 NASA Space Explorer

A full-stack web application that explores the cosmos using real NASA APIs. Built with React, Node.js, and Express, this application provides an immersive experience for discovering space-related data including astronomy pictures, Mars rover photos, and near-Earth object tracking.

## ✨ Features

### 🌟 Astronomy Picture of the Day (APOD)
- Daily stunning space imagery with detailed explanations
- Date picker to explore historical images
- HD image viewing capabilities
- Responsive image and video support

### 🔴 Mars Rover Photos
- Browse photos from multiple Mars rovers (Curiosity, Perseverance, Opportunity, Spirit)
- Filter by rover, camera type, and Martian day (Sol)
- High-quality image gallery with hover effects
- Detailed photo metadata

### 🌍 Near-Earth Objects Tracker
- Real-time tracking of asteroids and comets approaching Earth
- Interactive data visualization with charts
- Potentially hazardous object identification
- Detailed object information including size, velocity, and distance

### 🎨 Design Features
- Beautiful space-themed UI with cosmic color palette
- Animated background with moving stars
- Smooth transitions and micro-interactions
- Fully responsive design for all device sizes
- Modern glassmorphism effects

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **Axios** for HTTP requests
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhayli/nasa-project.git
   cd nasa-project
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your NASA API key:
   ```
   NASA_API_KEY=your_nasa_api_key_here
   PORT=5000
   ```
   
   Get your free NASA API key at: https://api.nasa.gov/

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers concurrently.

### Individual Server Commands

- **Frontend only**: `npm run dev:frontend`
- **Backend only**: `npm run dev:backend`

## 📁 Project Structure

```
nasa-space-explorer/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── APODSection.tsx
│   │   │   ├── MarsPhotos.tsx
│   │   │   ├── NeoTracker.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── App.tsx          # Main application component
│   │   ├── main.tsx         # Application entry point
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Node.js/Express backend
│   ├── server.js            # Express server and API routes
│   ├── package.json
│   └── .env                 # Environment variables
├── package.json             # Root package.json for scripts
└── README.md
```

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/apod` - Astronomy Picture of the Day
- `GET /api/mars-photos` - Mars Rover Photos
- `GET /api/neo` - Near Earth Objects
- `GET /api/epic` - Earth Polychromatic Imaging Camera
- `GET /api/health` - Health check endpoint

## 🌐 NASA APIs Used

This application integrates with the following NASA APIs:

1. **Astronomy Picture of the Day (APOD)**: Daily astronomical images and explanations
2. **Mars Rover Photos**: Images from NASA's Mars rovers
3. **Near Earth Object Web Service (NeoWs)**: Data about near-Earth asteroids
4. **EPIC**: Earth imagery from the DSCOVR satellite

## 🎯 Key Features Implementation

### Error Handling
- Comprehensive error boundaries and user-friendly error messages
- Graceful fallbacks for API failures
- Loading states for better user experience

### Performance Optimization
- Image lazy loading
- Component-based architecture for better code splitting
- Optimized API calls with proper caching headers
- Responsive images for different screen sizes

### User Experience
- Intuitive navigation between different sections
- Interactive filters and search functionality
- Smooth animations and transitions
- Mobile-first responsive design

## 🔧 Configuration

### Environment Variables (Backend)
- `NASA_API_KEY`: Your NASA API key (required)
- `PORT`: Server port (default: 5000)

### Vite Configuration (Frontend)
The frontend is configured to proxy API requests to the backend server during development.

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `dist` folder to your preferred hosting service

### Backend Deployment (Heroku/Railway/Render)
1. Ensure environment variables are set on your hosting platform
2. The backend will automatically start with `npm start`

### Environment Variables for Production
Make sure to set the `NASA_API_KEY` environment variable on your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA for providing free access to their amazing APIs
- The React and Node.js communities for excellent documentation
- Space enthusiasts and developers who inspire exploration

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/nasa-space-explorer/issues) on GitHub.

---

**Happy Space Exploring! 🌌**
