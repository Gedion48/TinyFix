# TinyFix — Creative Everyday Problem Solver

> **TinyFix** helps people solve small everyday problems quickly through practical, actionable 2-to-10 minute micro-solutions.

---

## 1. Project Overview & Purpose

Many times during our day, we get paralyzed by everyday friction:
- *"I have 10 minutes and a messy room. What should I do first?"*
- *"I don't know what to cook with the odds and ends in my pantry."*
- *"I keep procrastinating on a report. What is one tiny physical action I can take right now?"*
- *"I have a busy day and can't decide which task to do next."*

Inspirational quotes and abstract productivity advice don't fix these moments — **concrete physical micro-actions do**. TinyFix provides immediate, realistic, step-by-step solutions categorized by time (2, 5, or 10 minutes) with an interactive step-by-step checklist, built-in timer, and personal completion tracker.

---

## 2. Key Features

- **Categorized Problem Zones**:
  - ⚡ **Productivity**: Overcoming procrastination, browser tab overloads, email zero triage.
  - 🏠 **Home & Organization**: 10-minute floor scramble, one-drawer triage, entryway launchpad reset.
  - 🍳 **Food & Cooking**: 5-minute skillet scrambles, pantry garlic butter noodles, veggie revivers.
  - 📚 **Study & Learning**: The 2-minute blurting recall sprint, Feynman translation, practice question triage.
  - 🧭 **Daily Decisions**: The coin-flip gut check, the 10/10/10 perspective rule, dinner 5-2-1 veto system.
- **Rule-Based Recommendation Engine**:
  - Transparent keyword and time-constraint matching against a curated local dataset.
  - Tokenizes queries, strips English stopwords, scores tags, titles, and problem descriptions.
  - If no keyword match is found, provides a high-utility fallback micro-fix rather than a blank screen.
- **Interactive Solution Cards**:
  - Sequential step checklist with checkable boxes and tactile sounds.
  - Built-in countdown timer (2, 5, or 10 minutes) with audio chime upon completion.
  - "Why it works" behavioral psychology insights.
  - "Save for later" bookmarking and "Mark as done" log.
  - Single-click step copying for sharing or pasting into to-do apps.
- **"Surprise Me" Random Fix**:
  - Instant discovery button with non-repeating memory so you don't get the same fix twice in a row.
- **"My Fixes" Hub & Progress Tracker**:
  - Displays bookmarked solutions and completed fixes log with timestamps.
  - Tracks total minutes of action taken.
  - Safe reset option with confirmation modal.
  - Persists across browser refreshes via resilient `localStorage` wrappers.

---

## 3. Technologies Used

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + ESNext
- **Styling**: Tailwind CSS v4 (Warm cream `#FAF7F2` canvas, deep navy `#0F1E36`, vibrant orange `#FF5C28` accents)
- **Icons**: Lucide React
- **Audio Feedback**: Native Web Audio API synthesizer (no external audio files or network latency)
- **Persistence**: Safe `localStorage` utility layer with defensive error boundaries

---

## 4. Project Structure

```text
/
├── index.html                  # HTML entry point with metadata and fonts
├── metadata.json               # Applet descriptor
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind configuration
├── README.md                   # Documentation, setup guide, and learning notes
└── src/
    ├── main.tsx                # React DOM root entry
    ├── App.tsx                 # Core application controller and layout
    ├── index.css               # Tailwind CSS v4 directives and typography
    ├── types/
    │   └── index.ts            # Domain models (FixSolution, Category, CompletedFix)
    ├── data/
    │   ├── categories.ts       # Category metadata, icons, and general fallback
    │   └── solutions.ts        # Curated library of 30 actionable everyday fixes
    ├── utils/
    │   ├── matcher.ts          # Explainable rule-based scoring algorithm
    │   ├── storage.ts          # Safe localStorage serialization & persistence
    │   └── sound.ts            # Web Audio API chime and tick feedback
    └── components/
        ├── Header.tsx          # Top bar with counters and quick triggers
        ├── FixFinder.tsx       # Search bar, quick prompt pills, and time filters
        ├── CategoryCard.tsx    # Interactive category filter card
        ├── SolutionCard.tsx    # Card with checklist, countdown timer, and actions
        ├── MyFixesModal.tsx    # Saved & Completed drawer/modal
        ├── ResetConfirmModal.tsx # Confirmation dialog for history clearing
        └── Toast.tsx           # Temporary action notification
```

---

## 5. Installation & Run Instructions (Windows CMD)

To run the application locally on Windows:

```cmd
:: 1. Navigate to the project directory
cd \path\to\tinyfix

:: 2. Install dependencies
npm install

:: 3. Start the local development server
npm run dev

:: 4. Open your browser to the URL shown in CMD (typically http://localhost:3000)
```

To test the build for production:

```cmd
npm run build
```

---

## 6. How the Recommendation Algorithm Works

The recommendation system in `src/utils/matcher.ts` is an **explainable, deterministic rule-based engine**:

1. **Tokenization & Stopword Elimination**:
   The user's query is converted to lowercase, special punctuation is stripped, and common filler words (`"i"`, `"have"`, `"what"`, `"should"`, `"a"`, `"my"`, `"the"`, etc.) are eliminated.
2. **Category Hard Filtering**:
   If the user clicked a category (e.g. *Food* or *Home*), candidates are pre-filtered to that domain.
3. **Multi-Field Weighted Scoring**:
   For each candidate solution in the pool:
   - **Tag match**: +20 points for each matching keyword found in tags.
   - **Title match**: +15 points for title word hits.
   - **Problem statement match**: +12 points for words matching the problem description.
   - **Step details match**: +5 points for step text hits.
4. **Time Window Scoring**:
   - Exact time match (e.g., requested 5 min, solution is 5 min): +15 bonus points.
   - Fits comfortably under target time: +5 bonus points.
   - Exceeds target time: -10 penalty points.
5. **Fallback Safety**:
   If the maximum score is 0 (no keywords matched), rather than showing a disheartening empty screen, the app returns a **General Reset Solution** or the top quick fix for that category, alongside a clear message explaining that a helpful fallback is displayed.

---

## 7. How to Initialize Git & Push to GitHub

To push this repository to GitHub from your terminal or Windows CMD:

```cmd
:: 1. Initialize a new local Git repository
git init

:: 2. Stage all project files
git add .

:: 3. Create your initial commit
git commit -m "feat: complete TinyFix everyday problem solver"

:: 4. Rename the default branch to main
git branch -M main

:: 5. Add your remote GitHub repository (replace with your actual GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/tinyfix.git

:: 6. Push your code to GitHub
git push -u origin main
```

---

## 8. What I Learned

- **Micro-Action Product Design**: Overcoming human resistance requires drastically lowering the friction of step #1. By structuring every solution as a 2–10 minute physical action with checkable steps and a timer, users shift from passive browsing to active execution.
- **Rule-Based Systems vs. AI Overhead**: Not every app needs an LLM or an API key. A fast, local, rule-based keyword scoring system provides sub-millisecond response times, zero token costs, complete privacy, and works 100% offline.
- **Defensive Local Storage**: Wrapping `localStorage` reads and writes in `try/catch` blocks prevents crashes when third-party cookies or storage are restricted in private browsing modes.
- **Web Audio API Feedback**: Creating sound effects dynamically using `AudioContext` oscillators avoids the asset loading overhead and latency of external `.mp3` files.

---

## 9. Future Improvements

- Custom user-created fixes: Allow users to add their own custom routine fixes to localStorage.
- Daily streak tracker with local notification reminders.
- Export/Import fixes as JSON for backup across devices.
- Keyboard shortcuts (e.g. pressing `Space` to start/pause the active timer, `S` for surprise me).
