import React, { FC } from 'react';

type CharacterBoxProps = {
  value: string
};

const CharacterBox: FC<CharacterBoxProps> = ({ value = '' }) => {
  return (
    <div className="inline-block border border-gray-500 p-4 uppercase text-2xl text-center">
      {value}
    </div>
  )
}

export default CharacterBox;