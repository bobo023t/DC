const BASE = 10000;
const GROWTH = 2500;

/* Constants to generate the total amount of XP to complete a level */
const HALF_GROWTH = 0.5 * GROWTH;

/* Constants to look up the level from the total amount of XP */
const REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
const REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
const GROWTH_DIVIDES_2 = 2 / GROWTH;
function getLevel(exp) {
  const EXP_NEEDED = [
    100000,
    150000,
    250000,
    500000,
    750000,
    1000000,
    1250000,
    1500000,
    2000000,
    2500000,
    2500000,
    2500000,
    2500000,
    2500000,
    3000000,
  ];

  let level = 0;

  // Increments by one from zero to the level cap
  for (let i = 0; i <= 100; i += 1) {
    // need is the required exp to get to the next level
    let need = 0;
    if (i >= EXP_NEEDED.length) {
      need = EXP_NEEDED[EXP_NEEDED.length - 1];
    } else { need = EXP_NEEDED[i]; }

    // If the required exp to get to the next level isn't met returns
    // the current level plus progress towards the next (unused exp/need)
    // Otherwise increments the level and substracts the used exp from exp var
    if ((exp - need) < 0) {
      return Math.round((level + (exp / need)) * 100) / 100;
    }
    level += 1;
    exp -= need;
  }

  // Returns the level cap - currently 100
  // If changed here, also change in for loop above
  return 100;
}
/**
 * This method returns the level of a player calculated by the current experience gathered. The result is
 * a precise level of the player The value is not zero-indexed and represents the absolute visible level
 * for the player.
 * The result can't be smaller than 1 and negative experience results in level 1.
 * <p>
 * Examples:
 * -        0 XP = 1.0
 * -     5000 XP = 1.0
 * -    10000 XP = 2.0
 * -    50000 XP = 4.0
 * - 79342431 XP = 249.0
 *
 * @param exp Total experience gathered by the player.
 * @return number level of player (Smallest value is 1.0)
 */
function getLevel2(exp) {
  return exp <= 1 ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * exp));
}

/**
 * This method returns the level of a player calculated by the current experience gathered. The result is
 * a precise level of the player The value is not zero-indexed and represents the visible level
 * for the player.
 * The result can't be smaller than 1 and negative experience results in level 1.
 * <p>
 * Examples:
 * -        0 XP = 1.0
 * -     5000 XP = 1.5
 * -    10000 XP = 2.0
 * -    50000 XP = 4.71...
 * - 79342431 XP = 249.46...
 *
 * @param exp Total experience gathered by the player.
 * @return Exact level of player (Smallest value is 1.0)
 */
function getExactLevel(exp) {
  return getLevel(exp) + getPercentageToNextLevel(exp);
}

/**
 * This method returns the amount of experience that is needed to progress from level to level + 1. (5 to 6)
 * The levels passed must absolute levels with the smallest level being 1. Smaller values always return
 * the BASE constant. The calculation is precise and if a decimal is passed it returns the XP from the
 * progress of this level to the next level with the same progress. (5.5 to 6.5)
 * <p>
 * Examples:
 * -   1 (to 2)   =  10000.0 XP
 * -   2 (to 3)   =  12500.0 XP
 * -   3 (to 4)   =  15000.0 XP
 * -   5 (to 6)   =  20000.0 XP
 * - 5.5 (to 6.5) =  21250.0 XP
 * - 130 (to 131) = 332500.0 XP
 * - 250 (to 251) = 632500.0 XP
 *
 * @param level Level from which you want to get the next level with the same level progress
 * @return number to reach the next level with same progress
 */
function getExpFromLevelToNext(level) {
  return level < 1 ? BASE : GROWTH * (level - 1) + BASE;
}
function getPercentageToNextLevel(exp) {
  const lv = getLevel(exp);
  const x0 = getTotalExpToLevel(lv);
  return (exp - x0) / (getTotalExpToLevel(lv + 1) - x0);
}
function getTotalExpToFullLevel(level) {
  return (HALF_GROWTH * (level - 2) + BASE) * (level - 1);
}
function getTotalExpToLevel(level) {
  const lv = Math.floor(level); const
    x0 = getTotalExpToFullLevel(lv);
  if (level === lv) return x0;
  return (getTotalExpToFullLevel(lv + 1) - x0) * (level % 1) + x0;
}
module.exports = {
  getLevel,
  getLevel2,
  getExactLevel,
  getTotalExpToFullLevel,
  getPercentageToNextLevel,
  getExpFromLevelToNext,
  getTotalExpToLevel,
};