Här är en **uppdaterad, genomförbar plan + systemdesign** för

## **Felingo**

– optimerad för: *snabb start, noll-friktion, Netflix/Spotify-känsla, låg kostnad, och ändå “proffsig demo”*.

---

# 🎯 Produktpositionering (vad detta *är*)

**Felingo** är en **one-off, personlig träningsupplevelse** för en artist inför Eurovision – byggd som en snabb, snygg, mobil-first webbapp.

**Kärna:**

* *Pick → Play → Speak*
* Inga konton krävs
* Allt känns som “korta sessioner backstage”

---

# 🧠 Produktstrategi (kritiska val)

## 1. Guest-first (ingen inloggning)

👉 Ja, kör **100% guest mode** i v1.

**Hur vi sparar progress:**

* `localStorage` (primärt)
* fallback: inget sparande (funkar ändå)

**Vad som sparas:**

```json
{
  "seenCards": ["phrase_1", "dialogue_3"],
  "favorites": ["phrase_7"],
  "lastSection": "fan_talk",
  "streak": 3
}
```

👉 Detta räcker för:

* “continue where you left off”
* undvika upprepning (till viss grad)

---

## 2. Struktur: Sektioner + shuffle (bästa kompromissen)

Du föreslog två alternativ – här är optimal hybrid:

### ❌ strikt progression

* känns som skola
* dålig UX

### ❌ helt random

* tappar struktur

### ✅ Lösning:

**Sektioner + semi-random innehåll**

Ex:

* “Talk to fans”
* “Interview mode”
* “Backstage”
* “Panic mode”

När man går in:
👉 systemet visar **3–5 kort slumpade från poolen**
👉 filtrerar bort “nyss sedda”

**Resultat:**

* känns dynamiskt
* låg risk för repetition
* ingen tung progress-logik

---

# 🎨 Branding & Vibe

## 🎬 Känsla

* Netflix: tydliga “rows”
* Spotify: mörk UI + accentfärg
* Backstage/artist: spotlight, gradients

---

## 🎨 Färgpalett (förslag)

* Bakgrund: `#0B0B0F` (nästan svart)
* Cards: `#1A1A22`
* Accent:

  * 🇸🇪 blå: `#0057FF`
  * gul: `#FFD500`
* Secondary: neon-lila `#7B5CFF`

---

## ✨ UI-känsla

* soft glow
* subtle gradients
* rounded cards
* stora touch targets

---

## 😄 Humor (viktigt men subtilt)

Små inslag:

* “Sweden is definitely winning, right? 😉”
* “Careful… this answer might start a fan debate”
* “You just handled a chaotic interview. Nice.”

👉 aldrig överdrivet, alltid kort

---

# 🧭 Appstruktur (UX flow)

## 1. Start / Home

### Innehåll:

* Hero:

  > “Felingo”
  > “Built for the stage. Built for right now.”

* CTA:

  * ▶ Start session
  * ⚡ Quick phrases
  * 🆘 Panic mode

* Sections (scroll):

  * Talk to fans
  * Interview mode
  * Backstage English
  * Sweden hype 🇸🇪

---

## 2. Session flow (core UX)

### Steg:

1. användare klickar sektion
2. app hämtar 3–5 items
3. visar ett i taget

---

## 3. Card-typer

### A. Phrase Card

* text (stor)
* svensk hint (liten)
* 🔊 play
* ⭐ save
* ➡ next

---

### B. Dialogue Card

* scenario
* rad för rad
* user väljer svar

---

### C. Choice Card (intervju)

> “How do you feel about tonight?”

Val:

* “I’m really excited…”
* “I don’t know”

→ feedback

---

### D. Fun Card (branding)

* “Sweden will win because…”
* svarsmallar 😄

---

## 4. Panic Mode

Fullskärm, stora knappar:

* “Can you repeat that?”
* “Please speak slower”
* “I understand a little”

👉 detta ska vara **snabbaste vägen i appen**

---

## 5. Continue system

Home visar:

> “Continue where you left off”

baserat på:

```js
lastSection
```

---

# ⚙️ Systemdesign

## Arkitektur

```id="2q4r7n"
[SPA Frontend]
   |
   |-- JSON content
   |-- LocalStorage
   |-- Speech API
```

---

## Stack

### Frontend

* React (eller Vue)
* Vite
* Tailwind (snabb styling)

### State

* enkel global state (Context / Pinia / Zustand)

### Storage

* localStorage wrapper

---

## Viktiga moduler

### 1. Content Loader

* laddar JSON
* filtrerar per sektion

---

### 2. Session Engine

```js
getSession(section) {
  return shuffle(
    filterNotRecentlySeen(section)
  ).slice(0, 5)
}
```

---

### 3. Seen Tracker

```js
markSeen(id)
```

---

### 4. Speech

* wrapper runt `speechSynthesis`

---

### 5. Favorites

* add/remove
* lista

---

# 📁 Filstruktur

```id="7ag4pa"
/src
  /components
    Card.jsx
    PhraseCard.jsx
    DialogueCard.jsx
    QuizCard.jsx
  /pages
    Home.jsx
    Session.jsx
    Panic.jsx
  /data
    fan.json
    interview.json
    backstage.json
  /utils
    session.js
    storage.js
    speech.js
```

---

# 📊 Innehållsstrategi (viktig!)

## Mängd (MVP)

* 80–120 fraser
* 30 dialoger
* 30 choice scenarios

👉 detta räcker för att undvika repetition

---

# 🧠 UX-beslut (kritiska)

## 1. Ingen inloggning

✔ snabb start
✔ mindre friktion

---

## 2. Progress = “soft”

✔ känns inte som skola
✔ mer Netflix än Duolingo

---

## 3. Shuffle

✔ variation
✔ replayability

---

## 4. Kort session (3–5 cards)

✔ perfekt för mobilen
✔ känns “snabbt”

---

# 🔒 Säkerhet / framtid

Förbered men implementera inte nu:

* `/private` route
* feature flag

---

# 🚀 Deployment

* Vercel / Netlify
* statisk build

---

# 💬 Vad jag tycker om ditt val (kritisk analys)

Det du föreslog:

> guest + ev slump

👉 är faktiskt **helt rätt för detta use-case**

Varför:

* detta är inte en “kurs”
* det är ett **mentalt stödverktyg**
* repetition är OK
* variation är viktigare än progression

---

# 🏁 Definition of Done

Appen är klar när:

* [ ] öppnar direkt utan login
* [ ] session startar på 1 klick
* [ ] cards fungerar
* [ ] TTS fungerar
* [ ] shuffle fungerar
* [ ] känns snabb och snygg på mobil
* [ ] har tydlig vibe

---
 