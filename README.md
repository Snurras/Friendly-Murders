# Bobby vs Bots

A browser party game inspired by The Traitors, played at the dinner table without a game master. A few players are secretly Bots hiding among the humans (the Bobbies). Everyone plays on their own phone; the app runs the phases, hands out roles (Bobby or Bot), collects eliminations and votes, and reveals results.

## Stack

- Vite + React + TypeScript, built to static files
- Firebase Authentication (accounts for hosts, anonymous sign-in for guests) and Cloud Firestore for realtime game state
- Hosted on GitHub Pages, deployed by GitHub Actions on every push to `main`

## Local development

```sh
npm install
cp .env.example .env.local   # fill in your Firebase web app config
npm run dev
```

## Firebase setup (one time)

1. Create a project at https://console.firebase.google.com.
2. Add a Web app and copy its config values into `.env.local`.
3. Authentication > Sign-in method: enable **Anonymous** and **Email/Password** (and Google if wanted).
4. Authentication > Settings > Authorized domains: add `snurras.github.io`.
5. Firestore Database: create a database. Deploy rules with `npx firebase-tools deploy --only firestore:rules`.

## Deploying to GitHub Pages (one time)

1. Repo Settings > Pages > Source: **GitHub Actions**.
2. Repo Settings > Secrets and variables > Actions > **Variables**: add each `VITE_FIREBASE_*` value from `.env.example`. (Firebase web config is not secret; access is controlled by Firestore rules.)
3. Push to `main`. The site appears at https://snurras.github.io/friendly-murders/.
