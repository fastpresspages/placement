# Placement Kit — free placement prep hub

A free, honest placement preparation hub maintained by [FastPress Labs](https://github.com/fastpresspages). Live at **https://fastpresspages.github.io/placement/**.

Badges: [CI](https://github.com/fastpresspages/placement/actions/workflows/ci.yml) · [Live audit](https://fastpresspages.github.io/placement/samples/placement/report.html) · zero build · zero trackers.

## What's inside
- A 4-phase **90-day plan** (foundations → DSA core → flagship + mocks → apply & loop) with honest milestones.
- **51 free links** across learn-to-code, DSA & practice, Git/GitHub, projects & open source, interview prep, job boards, communication, and AI skills. All verified 26 Oct 2026 (monthly re-check via `scripts/check-external.js`).
- A **mindset section** (help one junior a week, never fake it) — because placement culture doesn't need more pressure.
- Suggestion form → meetcode99@gmail.com + [Discussions](https://github.com/fastpresspages/placement/discussions) for public suggestions.

## Link policy (enforced in AGENTS.md too)
- Genuine free resources only — no affiliate links, no referral codes, no paid courses, ever.
- Monthly re-verify; drop or replace anything that turns paid.
- No fake testimonials or invented success stats. The honest numbers are the page's chips: `51 free links · 0 paid courses`
- Some sites bot-block our checker (leetcode, codeforces, weworkremotely return 403 to scripts) — fine in browsers, marked `BOT` by the script.

## Structure
- `index.html` — the single-page hub (hero, plan, 8 resource sections, mindset, FAQ, form, about).
- `scripts/check-external.js` — outbound link verifier (warn-only; 403s = bot blocks, not dead links).
- `samples/placement/` — fresh LaunchGrade audit of the live site (report.html/md/json, badge, fix plan).
- `.github/workflows/` — CI (link checks, syntax, required files) + Pages deploy.

## Fork / reuse
Apache-2.0. Fork it, localize it, swap links for your region. Keep two rules: every link truly free, and every success claim honest.
