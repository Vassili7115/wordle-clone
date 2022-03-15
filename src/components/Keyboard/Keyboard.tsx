import React, { FC } from 'react';
import { LetterState } from '../../helpers/computeGuess/computeGuess';
import { useStore } from '../../store/store';

export type KeyboardProps = {
  onClick: (letter: string) => void;
};

const Keyboard: FC<KeyboardProps> = ({ onClick: onClickProp }) => {
  const keyboardLetterState = useStore((state) => state.keyboardLetterState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent || '';

    onClickProp(letter);
  };

  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyboradRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-2 space-x-1">
            {keyboradRow.map((key, keyIndex) => {
              let styles = 'rounded font-bold uppercase py-2 flex-1';
              const letterState = keyStateStyles[keyboardLetterState[key]];

              if (key === '') {
                styles += ' pointers-event-none cursor-default';
              }

              if (letterState) {
                styles += ` ${letterState}`;
              } else if (key !== '') {
                styles += ' bg-gray-400';
              }

              return (
                <button key={keyIndex} className={styles} onClick={onClick}>
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const keyStateStyles = {
  [LetterState.Miss]: 'bg-gray-500',
  [LetterState.Present]: 'bg-yellow-500',
  [LetterState.Match]: 'bg-green-500',
};
