<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=RANK%20ENGINE&fontAlignY=38&desc=ELO%20%E2%80%A2%20SEASONS%20%E2%80%A2%20LEADERBOARDS&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![Algorithms](https://img.shields.io/badge/focus-ranking%20algorithms-111111?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![CI](https://img.shields.io/badge/CI-passing-7a1f1f?style=for-the-badge)

**A reusable competitive rating core kept deliberately separate from any one game platform.**

</div>

---

## What it handles

- Elo expected score and rating updates
- higher K-factor during placements
- configurable inactivity decay
- rating floor protection
- Bronze → Master tier mapping
- season state
- match recording
- deterministic leaderboard tie-breaking
- automated tests

## Why I built it

I have worked around Minecraft ranking systems before, and I wanted the ranking logic itself to be reusable instead of buried inside one specific application.

```txt
match result
    ↓
expected score
    ↓
rating update
    ↓
tier + season state
    ↓
leaderboard
```

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

## Test

```bash
npm test
```

Requires Node 20+.

---

<div align="center"><sub>YukiShinobi // ranking logic should be explainable, testable and portable.</sub></div>
