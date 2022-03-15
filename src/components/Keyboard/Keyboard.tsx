import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, { FC } from 'react';

type KeyboardProps = {};

const keyboardKeys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const Keyboard: FC<KeyboardProps> = (props) => {
  return (
    <div className="flex flex-col">
      {keyboardKeys.map((keyboradRow, rowIndex) => {
        return (
          <div key={rowIndex} className="flex justify-center my-2 space-x-1">
            {keyboradRow.map((key, keyIndex) => {
              let styles = 'rounded font-bold uppercase py-2 flex-1';

              if (key !== '') {
                styles += ' bg-gray-400';
              }

              return (
                <button key={keyIndex} className={styles}>
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
