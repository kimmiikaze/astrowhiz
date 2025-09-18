# AstroWhiz - 3D Solar System Visualization

AstroWhiz is a 3D solar system visualization web application built with React, Three.js, TypeScript, Express.js, and PostgreSQL. The application features an interactive 3D representation of our solar system with planets, orbits, asteroid belts, and star fields. Users can click on planets to view detailed information about their astrological properties, mythology, and physical characteristics.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup and Dependencies
- Install dependencies: `npm install` -- takes ~9 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- Create required directory structure if it doesn't exist:
  ```bash
  mkdir -p client/src server shared
  ```

### Development Workflow
- **CRITICAL**: This project requires both client and server directory structures to be created before development can begin.
- Development server: `npx vite` -- starts Vite dev server on port 5173. Takes ~1 second to start.
- Alternative development: `npm run dev` -- starts Express server on port 5000 (requires server/index.ts to exist).
- TypeScript checking: `npm run check` -- takes ~2 seconds. NEVER CANCEL.
- Build process: `npm run build` -- takes ~3 seconds. NEVER CANCEL. Set timeout to 60+ seconds for safety.
- Production server: `npm run start` -- starts production server on port 5000.

### Database Operations
- Database schema management: `npm run db:push` -- requires DATABASE_URL environment variable.
- Database schema is defined in `shared/schema.ts` using Drizzle ORM.
- Uses PostgreSQL with Neon serverless driver for production.

## Project Structure

### Required Directory Structure
The repository contains configuration files but requires these directories to be created:

```
astrowhiz/
├── client/                 # Frontend React application
│   ├── index.html         # Entry HTML file
│   └── src/              # React components and assets
│       ├── main.tsx      # React app entry point
│       ├── App.tsx       # Main app component
│       └── index.css     # Tailwind CSS imports
├── server/               # Backend Express server
│   └── index.ts         # Express server entry point
├── shared/              # Shared types and utilities
│   ├── types.ts        # TypeScript interfaces
│   └── schema.ts       # Database schema (Drizzle ORM)
└── dist/               # Build output (generated)
    ├── index.js        # Built server
    └── public/         # Built client assets
```

### Configuration Files (Pre-existing)
- `package.json` -- Dependencies and scripts
- `vite.config.ts` -- Vite configuration with React, Three.js support
- `tailwind.config.ts` -- Tailwind CSS configuration with custom theme
- `tsconfig.json` -- TypeScript configuration with path mapping
- `drizzle.config.ts` -- Database ORM configuration
- `postcss.config.js` -- PostCSS configuration for Tailwind
- `.replit` -- Replit deployment configuration

## Technology Stack

### Frontend Dependencies
- **React 18** with TypeScript for UI framework
- **Three.js ecosystem**: @react-three/fiber, @react-three/drei, @react-three/postprocessing
- **Tailwind CSS** with shadcn/ui components for styling
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **GSAP** for advanced animations
- **Vite** for development server and building

### Backend Dependencies
- **Express.js** with TypeScript for REST API
- **Drizzle ORM** with PostgreSQL support
- **Neon Database** serverless driver
- **ESBuild** for server bundling

### Development Tools
- **tsx** for running TypeScript in development
- **Vite** with HMR and GLSL shader support
- **TypeScript 5.6** for type safety

## Validation

### Manual Testing Scenarios
After making changes, ALWAYS test these scenarios:

1. **Development Server Test**:
   ```bash
   npx vite
   # Should start on http://localhost:5173/
   # Verify 3D scene renders with Three.js Canvas
   ```

2. **Build and Production Test**:
   ```bash
   npm run build
   npm run start
   # Should start production server on port 5000
   # Test API endpoint: curl http://localhost:5000/api/health
   ```

3. **TypeScript Validation**:
   ```bash
   npm run check
   # Should pass without errors
   ```

### Performance Expectations
- **npm install**: ~9 seconds (set timeout: 30+ seconds)
- **npm run check**: ~2 seconds (set timeout: 30+ seconds)
- **npm run build**: ~3 seconds (set timeout: 60+ seconds)
- **npx vite**: ~1 second to start dev server
- **Bundle size**: ~967 KB (warning expected for Three.js dependencies)

## Common Tasks

### Creating New Components
- Place React components in `client/src/components/`
- Use path alias `@/` for client imports: `import { Component } from '@/components'`
- Use path alias `@shared/` for shared imports: `import { types } from '@shared/types'`

### Working with 3D Graphics
- GLSL shaders are supported via vite-plugin-glsl
- 3D model formats supported: .gltf, .glb
- Audio file formats supported: .mp3, .ogg, .wav
- All assets should be placed in `client/src/assets/` or appropriate subdirectories

### Database Schema Changes
- Modify `shared/schema.ts` for database schema changes
- Use Drizzle ORM syntax for table definitions
- Run `npm run db:push` to apply changes (requires DATABASE_URL)

### Environment Variables
- **DATABASE_URL**: Required for database operations
- **NODE_ENV**: Set to 'production' for production builds
- **PORT**: Server port (defaults to 5000)

## Troubleshooting

### Common Issues
- **"No inputs were found in config file"**: Create the required directory structure (client/, server/, shared/)
- **"Cannot find module server/index.ts"**: Create server/index.ts with Express server setup
- **Build warnings about chunk size**: Normal for Three.js applications (large 3D libraries)
- **Database connection errors**: Ensure DATABASE_URL environment variable is set

### Dependencies Warnings (Expected)
- `three-mesh-bvh` deprecation warning (Three.js version compatibility)
- `react-use-gesture` deprecation warning (use @use-gesture/react instead)
- Security vulnerabilities in dependencies (mostly low/moderate risk from development tools)

### Port Configuration
- **5173**: Vite development server (frontend)
- **5000**: Express server (backend/production)
- **3000**: Alternative frontend port (mentioned in .replit config)

## Replit Integration
This project is configured for Replit deployment:
- Run command: `npm run dev`
- Build command: `npm run build`
- Start command: `npm run start`
- Autoscale deployment target configured