# Felingo 🇸🇪🎤

**Built for the stage. Built for right now.**

A personal English training app for Sweden's Eurovision Song Contest representative — designed as a fast, beautiful, mobile-first web experience with a Netflix/Spotify-inspired dark UI.

## What is this?

**Felingo** helps an artist practice English phrases, dialogues, and interview responses they'll encounter at Eurovision — from fan interactions to press conferences to backstage communication.

**Core concept:** *Pick → Play → Speak*

## Features

- **Talk to Fans** — Common phrases and responses for fan interactions
- **Interview Mode** — Practice press conference Q&A with multiple-choice responses
- **Backstage English** — Technical and logistical vocabulary for behind the scenes
- **Panic Mode** — Full-screen emergency phrases for when you need help *right now*
- **Text-to-Speech** — Hear correct pronunciation via the Web Speech API
- **Favorites** — Save phrases for quick review
- **Offline Support** — Works without internet (PWA)
- **Zero Friction** — No login, no accounts, instant start

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — fast builds
- **Tailwind CSS 4** — utility-first styling
- **Zustand** — lightweight state management
- **Framer Motion** — smooth animations
- **Vitest** + **React Testing Library** — testing
- **PWA** — installable, works offline

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# ElevenLabs TTS (optional, for pre-generated MP3s in `public/audio/`)
# cp .env.example .env  # then add keys; run: npm run generate:tts
# MP3 files are gitignored — copy them to the server when you deploy.

# Run tests
npm test

# Lint & type-check
npm run lint
npm run typecheck
```

## Project Structure

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

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)
