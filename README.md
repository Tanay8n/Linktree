# Personal LinkTree

A personal LinkTree-style landing page. The page combines a portrait reveal effect, a technical grid overlay, social links, and a responsive hero layout.

## Features

- Responsive desktop and mobile layout
- Pointer and touch-controlled portrait reveal effect
- Base portrait and alternate reveal portrait layers
- Generated technical grid overlay
- Links for Instagram, Telegram, GitHub, LinkedIn, X, and email
- Reduced-motion-aware animation behavior

## Project Structure

- `index.html` - Page markup and content
- `styles.css` - Layout, typography, responsive styles, and animations
- `main.js` - Social link rendering, grid generation, and reveal interaction
- `images/` - Portrait images used by the page

## Run Locally

Because this is a static site, it can be opened directly in a browser by opening `index.html`.

For a local development server, run one of these commands from this folder:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Customization

Update the `socialLinks` array in `main.js` to change the social destinations. Replace the portrait files in `images/` and update the matching URLs in `styles.css` when using different artwork.
