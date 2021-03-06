import React, { FC } from 'react';
import { LetterState } from '../../helpers/computeGuess/computeGuess';

type CharacterBoxProps = {
  value?: string;
  letterState?: LetterState;
};

const CharacterBox: FC<CharacterBoxProps> = ({ value, letterState }) => {
  const characterStateStyles = {
    [LetterState.Miss]: 'bg-gray-500 border-gray-500',
    [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
    [LetterState.Match]: 'bg-green-500 border-green-500',
  };

  const stateStyles =
    letterState == null
      ? 'border-gray-500 text-black'
      : `${characterStateStyles[letterState]} text-white`;

  return (
    <span
      className={`inline-block border border-gray-500 p-4 before:inline-block uppercase font-bold text-2xl text-center ${stateStyles}`}
    >
      {value}
    </span>
  );
};

export default CharacterBox;
