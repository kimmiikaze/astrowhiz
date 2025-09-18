# Overview

This is a 3D solar system visualization web application built with React and Three.js. The application features an interactive 3D representation of our solar system with planets, orbits, asteroid belts, and star fields. Users can click on planets to view detailed information about their astrological properties, mythology, and physical characteristics. The application combines astronomical data with astrological interpretations, making it both educational and engaging.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a modern React-based architecture with several key design decisions:

**Component Structure**: The frontend follows a modular component-based architecture with clear separation of concerns. The main `App.tsx` serves as the root component, orchestrating the 3D canvas and UI overlays. Components are organized by functionality - 3D rendering components (`SolarSystem`, `Planet`, `StarField`, `AsteroidBelt`) handle the visual representation, while UI components (`PlanetInfo`) manage user interaction and information display.

**3D Rendering Framework**: Built on top of React Three Fiber (@react-three/fiber) and Drei (@react-three/drei), which provide React bindings for Three.js. This choice enables declarative 3D scene composition while maintaining React's component model. The architecture includes performance optimizations like memory cleanup and efficient geometry reuse.

**State Management**: Uses custom React hooks for local state management (`usePlanetSelection`) rather than global state libraries, keeping the application lightweight. The planet selection state is managed centrally but scoped appropriately to avoid unnecessary re-renders.

**Styling System**: Implements Tailwind CSS with a comprehensive design system including custom CSS variables for theming. The configuration supports dark mode and includes extensive component variants through shadcn/ui components.

## Backend Architecture

**Server Framework**: Built on Express.js with TypeScript, providing a lightweight REST API foundation. The server implements middleware for JSON parsing, URL encoding, and comprehensive request logging with performance metrics.

**Development Integration**: Features integrated Vite development server for hot module replacement and seamless full-stack development experience. The production build process uses esbuild for efficient server bundling.

**Storage Interface**: Implements an abstraction layer (`IStorage`) with a memory-based storage implementation (`MemStorage`). This design allows for easy migration to database-backed storage without changing the application logic.

**Error Handling**: Centralized error handling middleware captures and formats errors consistently across all API endpoints.

## Data Storage Solutions

**Database Configuration**: Configured for PostgreSQL using Drizzle ORM with connection pooling via Neon Database serverless driver. The schema is defined in TypeScript with automatic type generation for type-safe database operations.

**Schema Management**: Uses Drizzle Kit for database migrations and schema management. The current schema includes a basic user model with username/password authentication structure.

**Data Models**: Implements comprehensive data structures for planetary information, including astrological data, physical properties, and orbital characteristics. All data is strongly typed using TypeScript interfaces.

## External Dependencies

**Database**: PostgreSQL database with Neon serverless driver for connection management and connection pooling.

**3D Graphics**: Three.js ecosystem including React Three Fiber for React integration, Drei for common 3D utilities, and post-processing effects support.

**UI Framework**: Radix UI primitives provide accessible, unstyled UI components. Tailwind CSS handles styling with shadcn/ui providing pre-styled component variants.

**Development Tools**: 
- Vite for fast development server and build tooling
- TypeScript for type safety across the entire stack
- Drizzle Kit for database schema management
- ESBuild for production server bundling

**Font System**: Inter font family loaded via Fontsource for consistent typography across the application.

**Build System**: Vite configuration includes support for GLSL shaders, 3D model formats (GLTF/GLB), and audio files. Custom path mapping enables clean imports with `@/` and `@shared/` aliases.