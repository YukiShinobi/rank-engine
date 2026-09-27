export function expectedScore(a, b) {
  return 1 / (1 + 10 ** ((b - a) / 400));
}

export function updateElo({ ratingA, ratingB, scoreA, k = 32 }) {
  const expectedA = expectedScore(ratingA, ratingB);
  const expectedB = 1 - expectedA;
  const scoreB = 1 - scoreA;
  return {
    ratingA: Math.round(ratingA + k * (scoreA - expectedA)),
    ratingB: Math.round(ratingB + k * (scoreB - expectedB))
  };
}

export function placementK(gamesPlayed) {
  if (gamesPlayed < 5) return 56;
  if (gamesPlayed < 20) return 40;
  return 28;
}

export function applyDecay(rating, daysInactive, { graceDays = 14, daily = 2, floor = 1000 } = {}) {
  if (daysInactive <= graceDays) return rating;
  return Math.max(floor, rating - (daysInactive - graceDays) * daily);
}

export function rankTier(rating) {
  if (rating >= 2200) return 'Master';
  if (rating >= 1900) return 'Diamond';
  if (rating >= 1650) return 'Platinum';
  if (rating >= 1400) return 'Gold';
  if (rating >= 1200) return 'Silver';
  return 'Bronze';
}

export function sortLeaderboard(players) {
  return [...players].sort((a, b) => b.rating - a.rating || b.wins - a.wins || a.losses - b.losses);
}

export class Season {
  constructor(name, players = []) {
    this.name = name;
    this.players = new Map(players.map(p => [p.id, { wins: 0, losses: 0, games: 0, ...p }]));
  }

  recordMatch(aId, bId, winnerId) {
    const a = this.players.get(aId);
    const b = this.players.get(bId);
    if (!a || !b) throw new Error('Both players must exist');
    const scoreA = winnerId === aId ? 1 : winnerId === bId ? 0 : 0.5;
    const { ratingA, ratingB } = updateElo({
      ratingA: a.rating,
      ratingB: b.rating,
      scoreA,
      k: Math.max(placementK(a.games), placementK(b.games))
    });
    a.rating = ratingA;
    b.rating = ratingB;
    a.games += 1;
    b.games += 1;
    if (scoreA === 1) { a.wins += 1; b.losses += 1; }
    if (scoreA === 0) { b.wins += 1; a.losses += 1; }
    return { a: { ...a }, b: { ...b } };
  }

  leaderboard() {
    return sortLeaderboard([...this.players.values()]);
  }
}
