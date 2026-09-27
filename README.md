# Centre Mart Supermarket — Website (v3)

A hand-built static website for **Centre Mart Supermarket, Palakkal (Thrissur)** — FJ Group.
No frameworks, no build step. Open `index.html` in a browser or drop the folder on any static host.

## Pages
- `index.html` — Home (hero, categories, offers preview, delivery map, testimonials)
- `about.html` — Story (opened 28 Nov 2022), timeline, values
- `products.html` — 8 category aisles, popular items
- `offers.html` — Weekly deals + monthly combos + price ticker
- `team.html` — Founders, store team, counter stats
- `contact.html` — Address, phone, WhatsApp form, hours, map link

## v3 — Distinctive interactions (Sep 2025)
v2 still felt like "smart AI website builder" output. v3 replaces the generic
scroll-fade-up + hover-lift pattern with animations you actually notice:

- **Kinetic text-mask reveal** — H1 words rise from a slit on load
- **Hand-drawn squiggle underline** — SVG stroke behind emphasis phrases
- **Spinning circular sticker** — "SINCE 2022 · PALAKKAL" badge with SVG `textPath`
- **Magnetic buttons** — primary CTAs pull toward the cursor
- **Cursor spotlight + 3D tilt** on hero image
- **Rotating tagline** in the hero eyebrow
- **Odometer counters** on the team-page stats
- **Price ticker tape** at bottom of offers page
- **Sticky-note testimonials** with a slight rotation
- **Founder signature** draws itself in with `stroke-dasharray`
- **Grain overlay** (SVG turbulence) for a printed-paper feel
- **Paper-card shadow** `6px 6px 0 var(--ink)` instead of soft blur
- **Marquee pause-on-hover** in the top announcement bar
- **Radar pulse** on the "Open today" status dot
- **CTA rainbow stripe** in the footer banner
- **Postit-pinned grand-opening flyer** on the About page

### Design tokens changed
- Warm paper background `#FBF7ED` (was pure white)
- Black + yellow primary button (was green)
- **Fraunces** serif for display, **JetBrains Mono** for labels/eyebrows
- Dashed borders on the timeline & contact rows
- Removed almost every generic `translateY(-4px)` hover-lift

## Real content used
- Address: 14/166B, Misha Shopping Complex, KT Francis Memorial, Palakkal Centre,
  P.O. Palissery, Thrissur, Kerala 680027
- Phone: +91 70345 30300 (WhatsApp), +91 75920 30300
- Email: fjcentremart@gmail.com
- Facebook: facebook.com/fj.centre.mart
- Opened: 28 November 2022
- Hours: 8 AM – 10 PM, every day

## Images (real, provided by owner)
- `assets/img/logo.png` — FJ Centre Mart yellow-on-black logo
- `assets/img/storefront-hero.jpg` — storefront photo (with Medical House, RR Dental Care)
- `assets/img/grand-opening-flyer.jpg` — 28 Nov 2022 grand opening flyer
- `assets/img/banners/*.svg` — illustrated category banners

## Deploy (2 minutes)
1. Zip the whole folder (or drop it onto Netlify / Cloudflare Pages).
2. Point `centremartpalakkal.com` (or any domain) at the host.
3. WhatsApp links (`https://wa.me/917034530300`) work immediately.

## SEO ready
- JSON-LD `LocalBusiness` schema on every page
- Descriptive `<title>` and `<meta name="description">` per page
- Open Graph + Twitter cards
- `robots.txt` + `sitemap.xml` (update the domain lines after choosing one)
- Semantic HTML, proper heading order, alt text everywhere

## Accessibility
- Colour contrast checked on all UI text
- `prefers-reduced-motion` disables kinetic reveal, marquee, radar pulse, spinner
- Focus states preserved on all interactive elements
- No animation blocks reading
