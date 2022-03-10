import React, { FC } from 'react';
import { LetterState } from '../../helpers/computeGuess/computeGuess';

type CharacterBoxProps = {
  value: string;
  state: LetterState;
};


const CharacterBox: FC<CharacterBoxProps> = ({ value, state }) => {

  const characterStateStyles = {
    [LetterState.Miss]: 'bg-gray-500 border-gray-500',
    [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
    [LetterState.Match]: 'bg-green-500 border-green-500',
  }

  return (
    <div className={`inline-block border border-gray-500 p-4 uppercase font-bold text-2xl text-center ${characterStateStyles[state]}`}>
      {value}
    </div>
  )
}

export default CharacterBox;