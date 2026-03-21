# Anderson Timana - Digital Infrastructure & External CTO Portfolio

This repository houses the digital headquarters of Anderson Timana, a Digital Infrastructure Strategist and Fractional CMO/CTO. Built with a focus on high-performance engineering, "best-of-breed" architecture, and enterprise-grade security, this site serves as both a professional portfolio and a live demonstration of modern web standards.

**[Live Website](https://andersontimana.me)**

---

## Technical Philosophy: The "Best-of-Breed" Stack

This project is built on an **AI-First, Strategic-First** methodology. Every line of code and architectural choice was evaluated for its impact on performance, scalability, and technical independence.

### The Stack
- **Core Framework:** **Astro 5.0** (Hybrid Mode). Selected for its zero-JS-by-default philosophy and superior routing capabilities.
- **Styling:** **Vanilla CSS** + Native CSS Variables. Chosen for extreme performance and to avoid the build-time overhead of utility frameworks, ensuring a lean styling payload.
- **Backend Logic:** **Astro Actions**. Implements type-safe server-side functions for newsletter subscriptions and contact synchronization.
- **Deployment:** **Cloudflare Pages (Direct Upload)**. Deployed via GitHub Actions to ensure a clean build environment and bypass dashboard-side configuration conflicts.
- **Integrations:** 
    - **Brevo API:** For automated executive mailing list synchronization and GDPR compliant infrastructure.
    - **Cloudflare Turnstile:** Frictionless, high-trust bot protection.
    - **Tally Forms:** For deeply integrated, no-code, GDPR compliant qualification workflows.

---

## Architectural Deep-Dive

### 1. Dual-Audience Routing Logic
The site features a unique decoupled routing architecture to serve two distinct business personas:
- **Main Audience (`/`)**: Tailored for high-level decision-makers and business owners seeking Fractional CMO/CTO services.
- **Web-Dev Audience (`/web-development`)**: A dedicated "freelancer" version focused on technical rescues and asset-level engineering.
- **Dynamic Case Studies**: Case studies are automatically routed to either the `/case-studies/` or `/web-development/case-studies/` branch based on content metadata, ensuring consistent brand context for every user.

### 2. The "Pro Way" Validation Engine
We implemented a shared validation architecture that eliminates logic duplication:
- **Single Source of Truth**: Zod schemas are defined in `src/actions/index.ts` and exported.
- **Dynamic Client-Side Import**: To maintain a near-perfect Lighthouse score, we use **dynamic `import()`** to load Zod and the validation schemas only when a user interacts with a form. This shaves ~12KB off the initial page weight.
- **Type-Safety**: End-to-end TypeScript ensures that form data on the client perfectly matches the expectations of the server-side Action.

### 3. Generative Engine Optimization (GEO)
In the era of AI-driven search, "Classic SEO" is insufficient. This site implements:
- **Rich JSON-LD**: Automated schema injection for `ProfessionalService`, `Person`, and `Article` (Case Studies) to provide high-signal context to LLMs like Gemini, ChatGPT, and Perplexity.
- **Semantic HTML5**: A strictly hierarchical document structure ensures accessibility and easy ingestion by machine readers.
- **Canonical Authority**: Automatic canonical URL generation to prevent content dilution across multiple route branches.

---

## Security & Reliability Hardening

### 1. Defense-in-Depth Security
- **Strict CSP**: A custom Content Security Policy implemented via `public/_headers` restricts script execution to trusted domains (Cloudflare, Tally).
- **Security Headers**: Includes `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and a restrictive `Permissions-Policy`.
- **Honeypot & Turnstile**: Multi-layer bot protection using silent honeypot fields and server-side Turnstile token verification.

### 2. Performance Engineering
- **Performance**: Near-perfect scores across all metrics.
- **Optimized Image Pipeline**: Uses Astro's built-in asset processing with `imageService: "compile"` to ensure maximum optimization during the build phase, bypassing runtime constraints on Cloudflare.
- **Noindex Measures**: Sensitive utility pages (like redirect and thank-you pages) are protected with a dynamic `noindex` property in the Layout component.

---

## Development & Deployment

### Local Setup
1.  **Clone & Install:**
    ```bash
    git clone https://github.com/anderson-timana/portfolio-website.git
    npm install
    ```
2.  **Environment Variables:**
    Create a `.env` file with:
    - `WP_GRAPHQL_URL`
    - `PUBLIC_TURNSTILE_SITE_KEY`
    - `PUBLIC_BREVO_LIST_ID`
3.  **Run Development:**
    ```bash
    npm run dev
    ```

### Deployment Strategy
This project follows a **Direct Upload** strategy via GitHub Actions.
- **Build-Time Secrets**: Handled via GitHub Repository Secrets.
- **Runtime Secrets**: Managed directly in the Cloudflare Pages Dashboard (for Astro Actions).
- **Direct Upload**: `wrangler pages deploy dist` ensures that the `_routes.json` file is correctly handled, preventing common Astro/Cloudflare routing loops.

---

## Technical Standards
- **Strict TypeScript**: No `any` allowed; all props and data fetches are explicitly typed using Astro's `CollectionEntry`.
- **Component-Based Architecture**: UI is decoupled into reusable, independent components.
- **Documentation First**: All architectural pivots and secret classifications are detailed in the `context/` directory.

---
*Created by Anderson Timana — 2026*
