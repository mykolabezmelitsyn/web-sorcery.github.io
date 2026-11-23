# Folio

Folio is a standalone, full-viewport reel of nine sample creative projects. Titles and portraits travel in opposite directions and stay paired as the reel wraps. Selecting a project brings it to the center and animates its portrait and title into a detail view.

## Technology

Vite builds the standalone page from `src/pages/folio.njk`. React and TypeScript render the archive and detail view. GSAP handles entrance, click navigation and the shared-element transitions, while one on-demand animation frame loop updates the two strips from a shared position.

## Inputs used

| Input                                                       | Parameters                                                                     | Where used                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [folio.md](../../folio.md)                                  | Layout, loop math, timings, easing, copy and interaction requirements          | `config.ts`, `reel.ts`, `folio.css`, `index.tsx`                                |
| Nine Unsplash JPEGs                                         | 900×1125 portrait crops. Canonical IDs and original URLs are in `inputs.json`. | `items.ts` pairs every image to a project. Both renditions load the same asset. |
| [Geist variable font](https://github.com/vercel/geist-font) | Local WOFF2 with a variable weight axis                                        | `folio.css` and the reel’s 420–700 weight range                                 |

## Assumptions

- Project names, copy, client quotes and ratings are fictional examples. The photos are real Unsplash assets matched to each example.
- The contact link opens an email draft with a subject and an empty recipient. Set `CONFIG.contact` to the actual destination.
- The page uses the system light or dark appearance with warm neutral defaults. The title and media widths are capped near the desktop breakpoint to preserve the two columns on portrait tablets.
- The mobile counter sits slightly higher to clear the first title row. No sample video was supplied, so all nine entries use photos.
- Enter or Space opens the active item. Arrow keys and Page Up or Page Down move through the reel. Escape and the detail controls return to the same project.

## Run

From the repository root:

```sh
npm ci
npm run build
python3 -m http.server 8080
```

Open `http://localhost:8080/folio.html`.

## Customise

| CONFIG key              | Default                                     | Effect                                    |
| ----------------------- | ------------------------------------------- | ----------------------------------------- |
| `desktop.pixelsPerItem` | `600`                                       | Desktop wheel travel per project          |
| `mobile.pixelsPerItem`  | `120`                                       | Touch travel per project                  |
| `smoothing`             | `0.14`                                      | How quickly the reel follows input        |
| `snapMs`                | `90`                                        | Wheel idle time before a snap             |
| `entranceSeconds`       | `1.7`                                       | Opening auto-scroll duration              |
| `openSeconds`           | `0.95`                                      | Shared image and title flight into detail |
| `closeSeconds`          | `0.85`                                      | Shared image and title flight back        |
| `contact`               | `mailto:?subject=Folio%20project%20enquiry` | Project enquiry destination               |

Project content lives in `items.ts`. Place local portraits in `assets/` and retain the `photo-<imageId>.jpg` filename convention. When changing the breakpoint, update both `config.ts` and the CSS media queries.

## Embed

The standalone entry mounts automatically into `#animation-root`. To mount it explicitly elsewhere, provide a different container.

```tsx
import { mountAnimation } from "./animations/folio/index";

const reel = mountAnimation(container, {
  contact: "mailto:studio@example.com",
});
reel.pause();
reel.play();
reel.destroy();
```

## Accessibility and browsers

Folio uses keyboard-accessible controls with focus restoration on close. The detail view traps focus and keeps page scroll locked while letting the mobile panel scroll. Reduced motion skips the entrance and uses immediate selection and detail changes. The reel stops requesting frames at rest and when hidden. Mobile layout uses dynamic viewport units.
