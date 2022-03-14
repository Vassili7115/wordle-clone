import React from 'react';
import WordRow from './components/WordRow/WordRow';
import { NUMBER_OF_GUESSES } from './constants/constants';
import { useGuess } from './hooks/useGuess';
import { useStore } from './store';

function App() {
  const state = useStore();
  const [guess, setGuess] = useGuess();

  let rows = [...state.rows];

  if (rows.length < NUMBER_OF_GUESSES) {
    rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));

  const isGameOver = state.gameState !== 'playing';

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-grey-500 pb-2 mb-2">
        <h1 className="text-6xl text-center">Wordle clone</h1>
      </header>

      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} letters={guess} result={result} />
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
