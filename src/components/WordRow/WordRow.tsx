import React, { FC } from 'react';
import CharacterBox from '../CharacterBox/CharacterBox';

const LETTER_LENGTH = 5

type WordRowProps = {
  letters: string
};

const WordRow: FC<WordRowProps> = ({ letters: lettersProps = '' }) => {
  const letterRemaining = LETTER_LENGTH - lettersProps.length;
  const letters = lettersProps.split('').concat(Array(letterRemaining).fill(''));

  return (
    <div className='grid grid-cols-5 gap-4'>
      {letters.map((letter) =>
        <CharacterBox key={letter} value={letter} />
      )}
    </div>
  );
}

export default WordRow;