# Rank Engine

A small competitive rating engine I built to separate ranking logic from the rest of a game platform. It handles Elo updates, placement volatility, inactivity decay, tier mapping, seasons and deterministic leaderboard ordering.

## Why I built it

I have worked around Minecraft ranking systems before, and I wanted the ranking logic itself to be reusable instead of buried inside one specific app. This repo is deliberately independent from my other ranking projects.

## What is in it

- Elo expected-score and rating updates
- higher K-factor during placements
- configurable inactivity decay with a rating floor
- Bronze → Master tier mapping
- season state with match recording
- leaderboard tie-breaking
- Node test suite

```bash
npm test
```

Requires Node 20+.

## Example

```js
import { Season } from './src/index.js';

const season = new Season('Season One', [
  { id: 'yuki', name: 'Yuki', rating: 1500 },
  { id: 'astral', name: 'Astral', rating: 1500 }
]);

season.recordMatch('yuki', 'astral', 'yuki');
console.table(season.leaderboard());
```

Built by **YukiShinobi** as a focused algorithms/domain-model project.
