CricketMind AI — Ultra-premium 3D Landing Prototype

Overview

This workspace contains a cinematic, futuristic landing page prototype for "CricketMind AI" built with React + Vite, using React Three Fiber for 3D, Framer Motion and GSAP for UI animations.

Quick start

1. Install dependencies (already done):

```bash
npm install
```

2. Run development server:

```bash
npm run dev
# open http://localhost:5173
```

Build and preview

```bash
npm run build
npm run preview
```

What I added in this iteration

- 3D holographic sphere with rings, particles and stadium rim (`src/components/HolographicSphere.jsx`)
- Performance-friendly `Canvas` options (`dpr`, `antialias`) and fog for depth
- Magnetic cursor and neon trail (`src/components/MagneticCursor.jsx`) with CSS fallback for reduced motion
- Mock live data feed for predictions (randomized updates) and animated bars (`src/components/CricketMindAI3D.jsx`)
- Voice input support for the Akinator section using the Web Speech API (graceful fallback)
- Leaderboard persisted to `localStorage`
- Accessibility improvements: ARIA labels, keyboard-friendly buttons, `prefers-reduced-motion` support

Next recommended steps

- Add @react-three/postprocessing for bloom and motion blur
- Add a small backend or WebSocket mock server for realistic live updates
- Add CI (Vercel/GitHub Actions) for automated deploy previews

If you want, I can implement the above next (postprocessing + deploy pipeline).