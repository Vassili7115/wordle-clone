import React, { FC } from 'react';
import { LETTER_LENGTH } from '../../constants/constants';
import { LetterState } from '../../helpers/computeGuess/computeGuess';
import { useStore } from '../../store';
import CharacterBox from '../CharacterBox/CharacterBox';

type WordRowProps = {
  letters: string;
  result?: LetterState[];
};

const WordRow: FC<WordRowProps> = ({
  letters: lettersProps = '',
  result = [],
}) => {
  const answer = useStore((state) => state.answer);
  const letterRemaining = LETTER_LENGTH - lettersProps.length;
  const letters = lettersProps
    .split('')
    .concat(Array(letterRemaining).fill(''));

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((letter, index) => (
        <CharacterBox key={index} value={letter} state={result[index]} />
      ))}
    </div>
  );
};

export default WordRow;
