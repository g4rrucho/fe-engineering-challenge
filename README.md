# React Pokedex

A comprehensive Pokémon Pokédex application built with React, TypeScript, and TanStack Query.

## Features

- ✅ Browse all Pokémon with pagination
- ✅ View detailed Pokémon stats and information
- ✅ Catch and release Pokémon
- ✅ Add personal notes to caught Pokémon
- ✅ Filter by name, type, and height
- ✅ Sort by name, height, timestamp, or ID
- ✅ Bulk operations (select and release multiple)
- ✅ CSV export of your Pokédex
- ✅ Share Pokémon via URL
- ✅ Offline support with localStorage
- ✅ Responsive design (mobile & desktop)

## Tech Stack

- **React 19** with TypeScript
- **TanStack Query** for data fetching and caching
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Vitest** for testing

## Installation

```bash
yarn install
```

## Running

```bash
# Development
yarn dev

# Build
yarn build

# Preview build
yarn preview

# Run tests
yarn test

# Lint
yarn lint
```

## Roadmap

### ✅ 1. Setup and Basic API Integration

- Set up project structure (components, hooks, types)
- Create PokéAPI service layer
- Fetch and display basic Pokémon list
- TypeScript interfaces for Pokémon data

### ✅ 2. Core Pokémon Display and Catching

- Pokémon detail view with stats (HP, Attack, Defense, etc.)
- "Catch" functionality with Context API
- Caught/uncaught status tracking
- List and card views with table layout

### ✅ 3. Advanced Features

- Filter by name, height, types
- Sort by multiple criteria
- Add notes to caught Pokémon
- Bulk operations (select and release multiple)
- Pokedex page with filtering/sorting

### ✅ 4. Data Persistence

- LocalStorage for caught Pokémon
- Persistent notes and timestamps
- Query caching with TanStack Query

### ✅ 5. Polish and Export

- Responsive design and mobile optimization
- CSV export functionality
- Share Pokémon feature with URL encoding
- Performance optimizations (React.memo, useMemo)
- Comprehensive test suite (84 tests)
