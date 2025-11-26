# ditto-automation

## Prerequisites

- Node.js 18+ and npm
- Browsers installed via Playwright (`npx playwright install`) — run once after cloning

## Install Dependencies

```bash
npm install
```

## Run the Automation Suite

Execute every spec (currently `tests/premium-calculation.spec.ts`) via npm scripts:

```bash
npm test                # full matrix (Chromium by default, others optional)
npm run test --headed    # watch the Chromium run
```

Enable Firefox/WebKit runs by exporting `CROSS_BROWSER=true` before invoking any test script.

## View the HTML Report in Chrome

```bash
npm run test:report    # run & then open report server (random free port)
npm run report         # only open the last report (random free port)
npm run report:chrome  # force open the static report in Chrome/XDG browser
```

When the server command prints a local URL, copy it into Chrome if it does not launch automatically.

## Test Data

Reusable personas live under `tests/data/premium-cases.ts`. Add or tweak entries there to run the same flow for multiple users without touching the spec.

## Artifacts

- Playwright stores screenshots, traces, and videos in `playwright-report/` and `test-results/`
- `npm run clean:artifacts` removes those folders if you need a fresh slate

Clean these folders as needed before committing to keep the repository lightweight.
