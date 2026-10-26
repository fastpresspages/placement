# Placement Kit — free placement prep hub

FastPress Labs maintains a free, honest placement preparation hub: https://fastpresspages.github.io/placement/

## What it contains
- A 4-phase 90-day plan (foundations, DSA core, flagship + mocks, apply & loop) with milestones.
- 51 free links across 8 areas: learn-to-code, DSA & practice, Git/GitHub, projects & open source, interview prep, jobs boards, English/communication, AI skills. Every link is free; zero paid courses promoted.
- A mindset section (pay it forward, never fake it) and a suggestion form feeding meetcode99@gmail.com (request_type: "Placement hub suggestion").

## Link policy
- Only genuinely free resources. No affiliate links, no referral codes, no paywalled courses.
- All external links were verified with automated checks on 26 Oct 2026; a monthly re-run is planned (script: scripts/check-external.js, warn-only).
- Known bot-blocked links (403 to scripts, fine in browsers): leetcode.com, codeforces.com, weworkremotely.com.

## Editing rules for agents
- Never add paid resources or affiliate links. If a resource goes paid, replace it.
- Keep the "verified <date>" claims in sync with the last real check run.
- No fake testimonials, success stats or placement numbers. The page's numbers are: 51 links, 0 paid promos, that's it.
- Keep the two-field form (email + message) with the `hp` honeypot class.
- Re-run LaunchGrade after edits: local A+ 98-99 expected (`--ignore tech.https`), live A+ 100 with only the intentional `tech.analytics` warning. Commit new samples to samples/placement/.

## Verify locally
1. `node scripts/serve.js 8124` or `python -m http.server 8124`.
2. `node scripts/check-links.js` (internal), `node scripts/check-external.js` (outbound, warn-only).
3. `node ../launchgrade/bin/launchgrade.js http://127.0.0.1:8124/ --ignore tech.https`
