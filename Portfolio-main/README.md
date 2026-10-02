# Shivratna Kumavat — Portfolio

A dark, glassmorphism-style portfolio built with React 19 + Vite + Tailwind CSS v4 + GSAP
(ScrollTrigger), in the same visual language as the reference project
(leeshark21/modern-portfolio): black background, glowing blue/purple/pink accents,
scroll-driven animation.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    Navbar.jsx      -- fixed glass navbar
    Hero.jsx         -- scroll-scrubbed hero (see below)
    About.jsx        -- summary + key stats
    Expertise.jsx     -- pinned 3D card stack of skill categories
    Experience.jsx    -- work + education timeline
    Works.jsx          -- project grid (Movie Agent, Voice Assistant, Ambulance Detection)
    Contact.jsx        -- contact info + form (see below)
    Footer.jsx
  App.jsx
  index.css
```

## Adding your own scroll image sequence to the Hero

The original reference project scrubs through 240 frames of custom footage as
you scroll. This project ships with the same mechanism, but falls back to a
procedural animated gradient until you provide real frames (so it looks
intentional either way).

To use your own sequence:

1. Export frames from a video/animation (e.g. `ffmpeg -i input.mp4 -vf fps=24 frame-%03d.jpg`).
2. Name them `frame-001.jpg`, `frame-002.jpg`, ... sequentially.
3. Put them in `public/frameimage/`.
4. Open `src/components/Hero.jsx` and set `FRAME_COUNT` to your total frame count.

The component automatically detects real frames and switches out of fallback mode.

## Wiring up the contact form

`Contact.jsx` currently just shows a local "sent" confirmation on submit. To
actually receive messages, connect it to a form backend, for example:

- [Formspree](https://formspree.io) — point the `onSubmit` handler's fetch at your form endpoint.
- [EmailJS](https://www.emailjs.com) — send straight from the client.
- Your own API route, if you add a backend.

## Things to personalize

- Replace the `#` hrefs in `Contact.jsx` with your real LinkedIn and GitHub URLs.
- Swap the favicon at `public/favicon.svg`.
- Update `index.html` meta tags (title/description) if needed.
