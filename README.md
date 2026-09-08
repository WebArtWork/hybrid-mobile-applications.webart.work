# Course presentations

An interactive Ukrainian lecture at `/`: **1-hybrid-mobile-apps**.
20 views cover native, web, PWA, hybrid architecture, WebView, Capacitor,
Cordova, frontend frameworks, and the complete delivery pipeline.

## Development

- `npm start`: development server.
- `npm run build`: production build.
- `npm test -- --watch=false`: navigation, routing and demonstration tests.

## Presenting

Use left/right arrow keys, the on-screen buttons, or horizontal swipes.
Navigation stops at the ends and never changes the route. The shared controls
save the current view in localStorage and restore it after refresh. Each lecture
can set its own `storageKey` on `<app-presentation>` (defaults to the URL path).
The shared controls
announce progress, preserve editing keys, and respect reduced-motion settings.
Slides automatically scale to the available viewport, with space reserved for
navigation. The shared layout refits after resizing, loading images or changing
interactive content, without page scrolling.

Interactive views include offline/cache simulation (8), selectable architecture
layers (9), GPS bridge and permission simulation (12), device capabilities (13),
framework selection (16), and build pipeline exploration (19). These are teaching
simulations; they do not request actual device permissions or install a service worker.

## Adding lectures or views

The lecture is in `src/app/pages/1-hybrid-mobile-apps/`. Its metadata and demo state
are in the TypeScript file; the template contains the 20 visual layouts.
Add a metadata entry and its matching template case to add another view.

Other lecture pages can import `Presentation` and `PresentationView` from
`src/app/shared/presentation`. Put ordered `<ng-template presentationView>`
blocks inside `<app-presentation>`. Only the active template is rendered.

The per-component CSS budget accommodates this lecture's 20 layouts and
responsive diagrams; the application bundle budget remains unchanged.

## Illustrations and references

The generated hero is `public/images/hybrid-hero.png`.
It was generated with the built-in image generation tool. The exact prompt is
recorded in `docs/hero-image-prompt.md`. Technical diagrams use HTML/CSS for crisp,
selectable labels. Official Capacitor, Cordova and MDN documentation links are
included in view 20.
