const getSuccessRate = (stats) => {
  const { gamesPlayed, gamesWon } = stats;

  return Math.round(100 * (gamesWon / gamesPlayed));
};

export const addStatsForCompletedGame = (gameStats, count, LIMIT) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats };

  stats.gamesPlayed += 1;
  console.log(stats.guesses[count], count,LIMIT);
  if (count > LIMIT) {
    // A fail situation
    console.log("Failed game!");
    stats.currentStreak = 0;
    // stats.gamesFailed += 1;
  } else {
    stats.guesses[count] += 1;
    stats.currentStreak += 1;
    stats.gamesWon += 1;

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  }

  stats.winPercentage = `${getSuccessRate(stats)}%`;

  return stats;
};
