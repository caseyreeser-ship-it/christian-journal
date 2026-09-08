# Daily Grace Journal

A mobile-first Christian daily journal built with React + Vite.

## Features
- One journal entry per calendar day
- Daily Bible verse chosen deterministically by date
- Six reflection prompts
- Three separate gratitude fields
- Yes / No / Not applicable kind-action check-in
- Automatic saving to browser localStorage
- Journal history for previous entries
- Responsive mobile layout

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Upload the project to GitHub, then import the repository into Vercel. Vercel should detect Vite automatically.

## Important storage note
Version 1 saves journal entries only in the browser/device using localStorage. Clearing browser data or using another device will not carry entries over. Cloud sync can be added later.
