# SSDC Website

SSDC Website is a React + Vite web app for the Software Development Club.
It includes a dark, modern landing page and separate pages for the team, events, and projects.

## What is in the app

- Home page with the main SSDC landing experience
- Dedicated team page with club members and advisors
- Dedicated events page with a full events listing
- Dedicated projects page with dummy project cards for now
- Shared navigation, footer, and interactive UI pieces

## Current routes

- `/` Home
- `/team` Team page
- `/events` Events page
- `/projects` Projects page

## Tech stack

- React 19
- Vite
- React Router
- Framer Motion
- Tailwind CSS
- Lottie

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure

```text
src/
  Pages/         Route-level pages
  components/    Reusable UI sections and cards
  data/          Shared content for team, events, and projects
public/          Static assets like images, icons, animations, and sounds
```

## Current status

- Homepage is working
- Team page is working
- Events page is working
- Projects page exists with dummy content
- Favicon is configured
- Shared data files are in place for team, events, and projects

## Notes

- The projects page is intentionally using placeholder data for now.
- The team and events pages reuse shared data so they are easy to expand later.
- If you add more real projects or events, update the files in `src/data/`.

## Deployment Guide

See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for the step-by-step flow to redeploy this app to both Firebase projects.
