import { describe, expect, it } from 'vitest'
import { getRandomWord } from './words-utils'

describe('words-utils', () => {
  it('give a random word with a length of 5', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});
