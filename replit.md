# MoneyTree Financial Literacy Application

## Overview

MoneyTree is a gamified financial literacy application built as a full-stack web application. The platform teaches financial concepts through interactive quizzes and educational content, featuring user authentication, progress tracking, achievements, and an AI companion named Auric. The application uses a modern tech stack with React frontend, Express backend, and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Management**: React Hook Form with Zod validation resolvers
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules support
- **Database**: PostgreSQL with Neon serverless driver for cloud deployment
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Session Management**: Express sessions with PostgreSQL store using connect-pg-simple
- **API Design**: RESTful API with JSON responses and structured error handling

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless (@neondatabase/serverless)
- **ORM**: Drizzle ORM with schema-first approach located in shared/schema.ts
- **Migrations**: Drizzle Kit for database schema management and versioning
- **Session Storage**: PostgreSQL table-based session persistence for user authentication

## Key Components

### Game Engine & Learning System
- **Quest System**: Interactive educational quests with multiple-choice questions
- **Progress Tracking**: Individual quest completion, scoring, and time tracking
- **Achievement System**: Badge unlocking based on performance milestones
- **Educational Content**: Structured learning sections with explanations and examples
- **Auric Companion**: AI-powered financial advisor providing tips and motivation

### User Management & Gamification
- **User Profiles**: Display names, avatars, levels, XP, coins, and learning streaks
- **Progress Analytics**: Quest completion status, scores, and time spent learning
- **Achievement Tracking**: User achievements with unlock dates and categories
- **Leaderboard System**: Ranking based on XP and performance metrics

### UI/UX Components
- **Interactive Modals**: Quest modal for learning, achievement celebration modals
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Dark Theme**: Default dark theme with light theme support
- **Component Library**: Comprehensive UI components from shadcn/ui and Radix UI

## Data Flow

### Quest Learning Flow
1. User selects a quest from the dashboard
2. Quest modal displays educational content and questions
3. User progresses through questions with immediate feedback
4. System tracks answers, time spent, and calculates scores
5. Progress is saved via API calls to backend storage
6. Completion triggers XP/coin rewards and potential achievements

### User Progress Synchronization
1. Frontend queries user data, quests, and progress via TanStack Query
2. Backend storage layer (memory-based with planned database integration) manages data
3. Real-time updates through optimistic updates and background refetching
4. Session management maintains user state across browser sessions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@radix-ui/***: Headless UI components for accessibility
- **react-hook-form**: Form state management and validation

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production builds

### Optional Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend (Vite) and backend (Express) servers
- **TypeScript Checking**: `npm run check` validates TypeScript across all modules
- **Database Management**: `npm run db:push` applies schema changes via Drizzle Kit

### Production Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Serving**: Production server serves frontend from built assets
4. **Database Initialization**: Drizzle migrations run automatically on deployment

### Architecture Decisions

**Problem**: Need for type-safe database operations across frontend and backend
**Solution**: Drizzle ORM with shared schema definitions in TypeScript
**Rationale**: Provides end-to-end type safety, easy migrations, and PostgreSQL compatibility

**Problem**: Complex UI components with accessibility requirements
**Solution**: Radix UI primitives with shadcn/ui component system
**Rationale**: Provides accessible, customizable components with consistent design patterns

**Problem**: Efficient client-server communication and state management
**Solution**: TanStack Query with RESTful API design
**Rationale**: Handles caching, background updates, and optimistic updates automatically

**Problem**: Development experience and fast iteration
**Solution**: Vite build tool with TypeScript and hot module replacement
**Rationale**: Fastest development experience with excellent TypeScript integration