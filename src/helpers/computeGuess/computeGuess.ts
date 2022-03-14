export enum LetterState {
  Miss = 'Miss',
  Present = 'Present',
  Match = 'Match',
}

/**
 * Function in charge of check if a letter of the guess is present in the answer
 *
 * @returns {LetterState[]} an array of LetterState to know if a letter is present, missing, or match with the answer
 */

export function computeGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = [];

  if (guess.length !== answer.length) {
    return result;
  }

  const answerArray = answer.split('');
  const guessArray = guess.split('');

  const answerLetterCount: Record<string, number> = {};

  guessArray.forEach((letter, index) => {
    const currentAnswerLetter = answerArray[index];

    answerLetterCount[currentAnswerLetter] = answerLetterCount[
      currentAnswerLetter
    ]
      ? answerLetterCount[currentAnswerLetter] + 1
      : 1;

    if (currentAnswerLetter === letter) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  });

  result.forEach((curResult, resultIndex) => {
    if (curResult !== LetterState.Present) {
      return;
    }

    const guessLetter = guessArray[resultIndex];

    answerArray.forEach((currentAnswerLetter, answerIndex) => {
      if (currentAnswerLetter !== guessLetter) {
        return;
      }

      if (result[answerIndex] === LetterState.Match) {
        result[resultIndex] = LetterState.Miss;
      }

      if (answerLetterCount[guessLetter] <= 0) {
        result[resultIndex] = LetterState.Miss;
      }
    });

    answerLetterCount[guessLetter]--;
  });

  return result;
}
