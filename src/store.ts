import { computeGuess, LetterState } from './helpers/computeGuess/computeGuess';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomWord } from './helpers/getRandomWord/getRandomWord';
import { GUESS_LENGTH } from './constants/constants';

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  gameState: 'playing' | 'won' | 'lost';
  rows: GuessRow[];
  addGuess: (guess: string) => void;
  newGame: (initialGuess?: string[]) => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => {
      function addGuess(guess: string) {
        const result = computeGuess(guess, get().answer);
        const hasWin = result.every((letter) => letter === LetterState.Match);
        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];

        set(() => ({
          rows,
          gameState: hasWin
            ? 'won'
            : rows.length === GUESS_LENGTH
            ? 'lost'
            : 'playing',
        }));
      }

      return {
        answer: getRandomWord(),
        gameState: 'playing',
        rows: [],
        addGuess,
        newGame: (initialRows = []) => {
          set({
            answer: getRandomWord(),
            gameState: 'playing',
            rows: [],
          });

          initialRows.forEach(addGuess);
        },
      };
    },
    {
      name: 'Wordle clone',
    }
  )
);
