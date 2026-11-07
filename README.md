# orionlw.me

Personal site for Orion Leidl Wilson. Eleventy (11ty) → static HTML, deployed on Netlify from `main`.

## Local development

```sh
npm install
npm run build   # writes _site/
npm run serve   # live-reloading dev server
```

The `Now` page pulls listening / watching / reading from ListenBrainz, Letterboxd, and Storygraph at build time, so builds need network access. A GitHub Action pings a Netlify build hook daily to refresh it.

## Where content lives

| Content | File |
| --- | --- |
| Home intro line + bio paragraphs | `src/_data/home.json` |
| Now — "working on" list | `src/_data/now.json` |
| Shows (recent / past) | `src/_data/shows.json` |
| Projects | `src/_data/projects.json` |
| Compositions | `src/_data/compositions.json` |
| Site metadata, social links | `src/_data/site.json` |
| CV | `src/cv.md` |
| Page prose (Music, Shows intro, Projects notes, Contact) | the `.md` files in `src/` |

Pages loop over the JSON data with Nunjucks, so the CMS can never write template
code — only the values those templates render.

## Editing via the CMS

`/admin/` runs [Sveltia CMS](https://sveltiacms.app) (bundle vendored from
`node_modules/@sveltia/cms`, config in `src/admin/config.yml`). Saves commit to
`main` and Netlify redeploys.

**Current sign-in: access token only.** Create a fine-grained GitHub token for
`orionlw/orionlw.me` with *Contents: Read and write*, then paste it into the
sign-in dialog. It is stored in that browser's local storage.

### Re-enabling the "Sign in with GitHub" button

The OAuth button goes through Netlify's broker at `https://api.netlify.com/auth`,
which needs a GitHub OAuth app registered against the Netlify site:

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
   Homepage: `https://orionlw.me`. Authorization callback URL:
   `https://api.netlify.com/auth/done`.
2. Netlify → Project configuration → Security → OAuth → Install provider →
   GitHub, with the Client ID and Client Secret from step 1.
3. In `src/admin/config.yml`, delete `auth_methods: [token]` and uncomment
   `site_domain: orionlw.me` (needed to sign in from the preview host, whose
   domain is not the Netlify site's).

No other changes needed — `netlify.toml` already has a `/admin/*` CSP allowing
`api.github.com`, `api.netlify.com`, `unpkg.com`, and `cdn.jsdelivr.net`.

## Deploy notes

- `netlify.toml` holds the build command, security headers, and the
  `/currently/` → `/now/` redirects.
- `preview.orionrealm.xyz` serves `_site/` from the home server through a
  `@preview` handle in the Caddy wildcard block (`~/compose/caddy/Caddyfile`),
  mounted read-only into the Caddy container.
- The site-wide CSP is locked to `'self'`; the only relaxed policy is `/admin/*`.
