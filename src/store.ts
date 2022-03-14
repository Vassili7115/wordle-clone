import { computeGuess, LetterState } from './helpers/computeGuess/computeGuess';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomWord } from './helpers/getRandomWord/getRandomWord';

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  addGuess: (guess: string) => void;
  newGame: () => void;
}

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      rows: [],
      addGuess: (guess: string) => {
        set((state) => ({
          rows: [
            ...state.rows,
            {
              guess,
              result: computeGuess(guess, state.answer),
            },
          ],
        }));
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          rows: [],
        });
      },
    }),
    {
      name: 'Wordle clone',
    }
  )
);
