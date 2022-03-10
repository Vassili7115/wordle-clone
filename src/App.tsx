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

    setGuess(newGuess)
  }


  let rows = [...state.guesses];

  if (rows.length < GUESS_LENGTH) {
    rows.push(guess)
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - state.guesses.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''))

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-grey-500 pb-2 mb-2">
        <h1 className="text-6xl text-center">Wordle clone</h1>
        <input className='w-1/2 p-2 border-2 border-gray-500' type="text" value={guess} onChange={onChange} />
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map((row, index) => (
          <WordRow key={index} letters={row} />
        ))}
      </main>
    </div>
  )
}

export default App
