import wordsBank from "./words-bank.json";

/**
 * Simple function for return a random word of a list
 *
 * @returns {string} a random word of the words bank
 */

export function getRandomWord(){
  const randomIndex= Math.floor(Math.random() * wordsBank.length)
  return wordsBank[randomIndex];
}