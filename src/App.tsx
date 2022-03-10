import React, { useState } from 'react';
import WordRow from './components/WordRow/WordRow';
import { GUESS_LENGTH, LETTER_LENGTH } from './constants/constants';
import { useStore } from './store';

function App() {
  const state = useStore();
  const [guess, setGuess] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value;

    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess('');
      return;
    }

    setGuess(newGuess);
  };

  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - state.guesses.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));

  const isGameOver = state.guesses.length === GUESS_LENGTH;

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-grey-500 pb-2 mb-2">
        <h1 className="text-6xl text-center">Wordle clone</h1>
        <input
          className="w-1/2 p-2 border-2 border-gray-500"
          type="text"
          value={guess}
          onChange={onChange}
          disabled={isGameOver}
        />
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map((row, index) => (
          <WordRow key={index} letters={row} />
        ))}
      </main>

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white rounded text-center border border-gray-500 left-0 right-0 top-1/4 p-6 w-3/4 mx-auto"
        >
          GAME OVER !
          <button
            type="button"
            className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow"
            onClick={() => {
              state.newGame();
              setGuess('');
            }}
          >
            NEW GAME
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
