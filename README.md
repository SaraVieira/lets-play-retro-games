# Let's play retro games

[![Netlify Status](https://api.netlify.com/api/v1/badges/56f43d7d-4980-4fe0-88d5-b2856967c7f9/deploy-status)](https://app.netlify.com/sites/dazzling-syrniki-9c7ab4/deploys)
![build](https://github.com/SaraVieira/lets-play-retro-games/actions/workflows/build.yml/badge.svg)
![lint](https://github.com/SaraVieira/lets-play-retro-games/actions/workflows/lint.yml/badge.svg)

![Let's play retro games](./public/meta.png)

Website to hold all the magic that is retro games.

### Features

- 🎲 Select a random game from a console
- 🎮 Search in all consoles
- 🕹 See all games in consoles
- 🔐 Create account and mark games as:
  - 🕹 Playing
  - ✅ Finished
  - ❤️ Favorite

### Current Systems

- [x] NES
- [x] Super Nintendo
- [x] Nintendo 64
- [x] Game Boy
- [x] Game Boy Color
- [x] Game Boy Advance
- [x] Sega Genesis/Megadrive
- [x] Sega Master System
- [x] Game Gear
- [x] TurboGrafx-16
- [x] Playstation 1
- [x] Sega 32X
- [x] Virtual Boy
- [x] Sega Saturn

### Running locally

```bash
git clone git@github.com:SaraVieira/lets-play-retro-games.git
cd lets-play-retro-games
yarn
yarn prisma migrate dev
## this will be slow
yarn prisma db seed
yarn dev
```

Needed envs:

- `DATABASE_URL`: Postgres DB
- `GITHUB_ID` & `GITHUB_SECRET`: If you need to test login. The callback URL is `http://localhost:3000/api/auth/callback/github`

### Can I have your data?

All the data that's on the DB is stored on GitHub and feel free to download it

https://github.com/SaraVieira/lets-play-retro-games/tree/main/data/games

### License

Apache License 2.0
