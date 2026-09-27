import test from 'node:test';
import assert from 'node:assert/strict';
import { updateElo, applyDecay, rankTier, Season } from '../src/index.js';

test('winner gains rating and loser drops', () => {
  const r = updateElo({ ratingA: 1500, ratingB: 1500, scoreA: 1 });
  assert.equal(r.ratingA, 1516);
  assert.equal(r.ratingB, 1484);
});

test('decay respects grace period and floor', () => {
  assert.equal(applyDecay(1800, 10), 1800);
  assert.equal(applyDecay(1010, 100), 1000);
});

test('tiers map ratings correctly', () => {
  assert.equal(rankTier(2250), 'Master');
  assert.equal(rankTier(1450), 'Gold');
});

test('season records matches and ranks players', () => {
  const season = new Season('S1', [
    { id: 'yuki', name: 'Yuki', rating: 1500 },
    { id: 'astral', name: 'Astral', rating: 1500 }
  ]);
  season.recordMatch('yuki', 'astral', 'yuki');
  assert.equal(season.leaderboard()[0].id, 'yuki');
});
