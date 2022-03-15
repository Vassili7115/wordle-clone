import create from 'zustand';
import { persist } from 'zustand/middleware';
import { NUMBER_OF_GUESSES } from '../constants/constants';
import {
  computeGuess,
  LetterState,
} from '../helpers/computeGuess/computeGuess';
import { getRandomWord } from '../helpers/getRandomWord/getRandomWord';

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  gameState: 'playing' | 'won' | 'lost';
  keyboardLetterState: { [letter: string]: LetterState };
  rows: GuessRow[];
  addGuess: (guess: string) => void;
  newGame: (initialGuess?: string[]) => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => {
      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answer);

        const rows = get().rows.concat({
          guess,
          result,
        });

        const hasWin = result.every((res) => res === LetterState.Match);

        const keyboardLetterState = get().keyboardLetterState;
        result.forEach((res, index) => {
          const resultGuessLetter = guess[index];
          const curentLetterState = keyboardLetterState[resultGuessLetter];

          switch (curentLetterState) {
            case LetterState.Match:
              break;
            case LetterState.Present:
              if (res === LetterState.Miss) {
                break;
              }
            default:
              keyboardLetterState[resultGuessLetter] = res;
              break;
          }
        });

        set(() => ({
          rows,
          gameState: hasWin
            ? 'won'
            : rows.length === NUMBER_OF_GUESSES
            ? 'lost'
            : 'playing',
        }));
      };

      return {
        answer: getRandomWord(),
        gameState: 'playing',
        keyboardLetterState: {},
        rows: [],
        addGuess,
        newGame(initialRows = []) {
          set({
            answer: getRandomWord(),
            gameState: 'playing',
            keyboardLetterState: {},
            rows: [],
          });

          initialRows.forEach(addGuess);
        },
      };
    },
    {
      name: 'Wordle',
    }
  )
);
