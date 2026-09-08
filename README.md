# Course presentations

The lecture index is at `/`; the first interactive lecture is at `/hybrid-mobile-apps`.
20 views cover native, web, PWA, hybrid architecture, WebView, Capacitor,
Cordova, frontend frameworks, and the complete delivery pipeline.

## Development

- `npm start`: development server.
- `npm run build`: production build.
- `npm run check:seo`: verify metadata and social images in the production build.

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

## Social sharing images

Each of the seven routes has a unique generated PNG in `public/images/seo/`.
`src/app/shared/seo/seo-images.ts` records image paths, dimensions and Ukrainian alt text;
`app.routes.ts` assigns the image to the corresponding page. The shared SEO service
updates Open Graph and Twitter large-image metadata on navigation and during prerendering.
Absolute image and canonical URLs use `https://hybrid-mobile-applications.webart.work`.

Run `npm run build` and `npm run check:seo` before publishing. Deploy the complete
`dist/course/browser` directory, including route HTML and image assets, so crawlers
receive page-specific metadata without JavaScript. Generation prompts are saved in
`docs/seo-image-prompts.md`.
