
function generateFormattedRank(rank, prefix,) {
  if (prefix) {
    return prefix;
  }
  switch (rank) {
    case 'VIP':
      return 'VIP';
    case 'VIP_PLUS':
      return 'VIP+';
    case 'MVP':
      return 'MVP';
    case 'MVP_PLUS':
      return `MVP+`;
    case 'MVP_PLUS_PLUS':
      return `MVP++`;
    case 'HELPER':
      return 'Hypixel Helper';
    case 'MODERATOR':
      return 'Hypixel Mod';
    case 'ADMIN':
      return 'Hypixel Admin';
    case 'YOUTUBER':
      return 'Youtuber';
    default:
      return 'None';
  }
}
function generateFormattedRank2(rank, prefix,) {
  if (prefix) {
    return prefix;
  }
  switch (rank) {
    case 'VIP':
      return '[VIP]';
    case 'VIP_PLUS':
      return '[VIP+]';
    case 'MVP':
      return '[MVP]';
    case 'MVP_PLUS':
      return `[MVP+]`;
    case 'MVP_PLUS_PLUS':
      return `[MVP++]`;
    case 'HELPER':
      return '[HELPER]';
    case 'MODERATOR':
      return '[MOD]';
    case 'ADMIN':
      return '[ADMIN]';
    case 'YOUTUBER':
      return '[YOUTUBER]';
    default:
      return '';
  }
}
module.exports = {
    generateFormattedRank,
    generateFormattedRank2,
};
