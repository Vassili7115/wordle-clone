export enum LetterState {
  Miss = 'Miss',
  Present = 'Present',
  Match = 'Match'
}

/**
 * Function in charge of check if a letter of the guess is present in the answer 
 *
 * @returns {LetterState[]} an array of LetterState to know if a letter is present, missing, or match with the answer
 */

export function computeGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = [];

  const guessArray = guess.split('');
  const answerArray = answer.split('');

  guessArray.forEach((letter, index)=>{
    if(letter === answerArray[index]) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  })
  return result;
};