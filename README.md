# Stopwatch and Timer

A clean React + Vite app for tracking time with a stopwatch and a simple timer view. The project uses a small component structure, fast refresh during development, and a minimal UI that is easy to extend.

## Features

- Stopwatch with start, pause, and reset controls
- Timer screen placeholder for future expansion
- React functional components
- Vite-powered development server and build pipeline
- ESLint configuration for code quality

## Tech Stack

- React 19
- Vite 8
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Preview the production build:

```bash
bun run preview
```

## Project Structure

```text
src/
	App.jsx
	main.jsx
	components/
		Stopwatch.jsx
		TimerApp.jsx
```

## Notes

The stopwatch logic lives in `src/components/Stopwatch.jsx`. The timer view currently acts as a starter component and can be expanded with countdown logic later.
