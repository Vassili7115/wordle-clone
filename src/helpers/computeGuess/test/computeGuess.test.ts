import { LetterState } from './../computeGuess';
import { describe, expect, it } from 'vitest'
import { computeGuess } from '../computeGuess'

describe('computeGuess', () => {
  it('works with match ,miss and present', () => {
    expect(computeGuess('boost', 'basic')).toEqual([LetterState.Match, LetterState.Miss, LetterState.Miss, LetterState.Present, LetterState.Miss])
  });

  it('works with all matches', () => {
    expect(computeGuess('boost', 'boost')).toEqual([LetterState.Match, LetterState.Match, LetterState.Match, LetterState.Match, LetterState.Match])
  });

  it('works with all miss', () => {
    expect(computeGuess('boost', 'guard')).toEqual([LetterState.Miss, LetterState.Miss, LetterState.Miss, LetterState.Miss, LetterState.Miss])
  });

  it('works with all present', () => {
    expect(computeGuess('echos', 'soche')).toEqual([LetterState.Present, LetterState.Present, LetterState.Present, LetterState.Present, LetterState.Present])
  });

  it('only does one match when two letters are present', () => {
    expect(computeGuess('solid', 'boost')).toEqual([LetterState.Present, LetterState.Match, LetterState.Miss, LetterState.Miss, LetterState.Miss])
  });
});
