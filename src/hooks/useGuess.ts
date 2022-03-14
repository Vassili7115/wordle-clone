import { useEffect, useState } from 'react';
import { WORD_LENGTH } from './../constants/constants';
import { useStore } from './../store';
import { usePrevious } from './usePrevious';

export function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const addGuess = useStore((x) => x.addGuess);
  const [guess, setGuess] = useState('');
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    setGuess((curGuess: string): string => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === WORD_LENGTH) {
            addGuess(newGuess);
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }
      return newGuess;
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH)
      addGuess(previousGuess);
  }, [guess]);

  return [guess, setGuess];
}
