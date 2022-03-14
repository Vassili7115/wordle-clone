import wordBanks from '../../words-bank.json';

export function isValidWord(word: string): boolean {
  return wordBanks.includes(word);
}
