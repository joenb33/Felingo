# Felingo

**Practice English for real situations — and help others do the same.**

Felingo is an open source, mobile-first web app for practicing English phrases, dialogues, and interview-style answers. It is useful for performers and teams, or anyone who wants calmer, more natural English when it matters.

The scenarios lean toward live events (fans, press, backstage), but **content and code are for everyone**. Bugfixes, copy, translations, a11y, and small features are all welcome.

**Live site:** [felingo.se](https://felingo.se)

## What is this?

**Felingo** walks you through themed sessions: phrases, multiple-choice interview practice, backstage vocabulary, and a full-screen “panic” mode for quick phrases.

**Core concept:** _Pick → Play → Speak_

## Features

- **Talk to Fans** — Common phrases and responses for fan interactions
- **Interview Mode** — Press-style Q&A with multiple-choice responses
- **Backstage English** — Technical and logistical vocabulary behind the scenes
- **Panic Mode** — Full-screen emergency phrases when you need help _right now_
- **Audio & pronunciation** — **Pre-generated MP3** where deployed (optional [ElevenLabs](https://elevenlabs.io/) pipeline in `scripts/`), plus **Web Speech API** fallback in supported browsers
- **Favorites** — Save phrases for quick review
- **Offline support** — Installable PWA; works without a network after first load
- **No accounts** — Open the site and start

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS 4**
- **Zustand**
- **Framer Motion**
- **Vitest** + **React Testing Library**
- **PWA** (service worker + manifest)

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Optional: pre-generate MP3s in public/audio/ (needs .env — see .env.example)
# npm run generate:tts
# MP3s are gitignored; copy them to your host when you deploy.

# Tests
npm test

# Lint & type-check
npm run lint
npm run typecheck

# Format (CI runs format:check — run this before pushing)
npm run format
npm run format:check
```

## Deploying to your server

Typical flow: **build on GitHub, upload `dist/`** — no manual FTP on every release.

1. **VPS / Linux with SSH** (recommended): [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `npm run build` and **rsync** over SSH to your web root. Add secrets under **Settings → Secrets and variables → Actions** (listed at the top of the workflow file). On the server: install `rsync`, point Nginx/Apache **document root** at `DEPLOY_PATH`.

2. **FTP/SFTP-only hosting:** use an action such as [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) with the same build step, then upload `dist/`.

3. **Fully managed hosting:** [Netlify](https://www.netlify.com/), [Cloudflare Pages](https://pages.cloudflare.com/), or [Vercel](https://vercel.com/) connect to GitHub in a few clicks and build + host on every push — no server to maintain.

**Audio:** `public/audio/*.mp3` is not in Git. Copy them once (`rsync`/`scp`) to the same paths on the server, or run `npm run generate:tts` there with API keys.

## Project structure

```
src/
├── components/
│   ├── ui/          # Reusable primitives (Button, Badge)
│   ├── cards/       # PhraseCard, DialogueCard, ChoiceCard, FunCard
│   ├── layout/      # Header, Navigation
│   └── session/     # SessionPlayer, ProgressIndicator
├── pages/           # HomePage, SessionPage, PanicPage, FavoritesPage
├── data/            # JSON content + TypeScript schemas
├── hooks/           # useSession, useSpeech, useLocalStorage
├── store/           # Zustand store
└── lib/             # Utilities (shuffle, content-loader)
```

## Contributing

This repo is **public on purpose**: we want issues, pull requests, and discussion.

1. **Fork** the repository and create a branch (`feature/…` or `fix/…`).
2. **Keep CI green:** `npm run lint`, `npm run typecheck`, `npm test`, and `npm run format:check` (Prettier is enforced in GitHub Actions).
3. **Open a pull request** with a short description of the change. For larger work, an issue first helps align direction.
4. Be **constructive and respectful** — thank you for helping improve Felingo.

## License

[MIT](LICENSE)
