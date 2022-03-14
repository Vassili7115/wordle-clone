import { computeGuess, LetterState } from './helpers/computeGuess/computeGuess';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomWord } from './helpers/getRandomWord/getRandomWord';
import { NUMBER_OF_GUESSES } from './constants/constants';

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
      const addGuess = (guess: string) => {
        const result = computeGuess(guess, get().answer);

        const rows = get().rows.concat({
          guess,
          result,
        });

        const hasWin = result.every((res) => res === LetterState.Match);

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
        rows: [],
        addGuess,
        newGame(initialRows = []) {
          set({
            gameState: 'playing',
            answer: getRandomWord(),
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
