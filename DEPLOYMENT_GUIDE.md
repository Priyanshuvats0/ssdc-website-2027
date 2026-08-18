# Deployment Guide

Use this guide whenever you add a new feature and need to redeploy the app to both Firebase projects.

## Firebase projects

- Project 1: `ssdc-26`
- Project 2: `ssdc-sliet-web`

## Before you deploy

1. Make your code changes.
2. If you add a new page or route, register it in [`src/App.jsx`](./src/App.jsx).
3. If you add or change shared content, update the files in [`src/data/`](./src/data).
4. Test locally with:

```bash
npm run dev
```

## Build

Create the production build:

```bash
npm run build
```

The app is a Vite project, so Firebase should deploy the `dist` folder.

## Deploy to both projects

Deploy to the first Firebase project:

```bash
firebase deploy --only hosting --project ssdc-26
```

Deploy to the second Firebase project:

```bash
firebase deploy --only hosting --project ssdc-sliet-web
```

If you change code again later, repeat the same build and deploy commands.

## Quick redeploy flow

```bash
npm run build
firebase deploy --only hosting --project ssdc-26
firebase deploy --only hosting --project ssdc-sliet-web
```

## If Firebase config changes

If you ever change hosting targets or project aliases, update these files first:

- [`firebase.json`](./firebase.json)
- [`.firebaserc`](./.firebaserc)

Then run the deploy commands again.
