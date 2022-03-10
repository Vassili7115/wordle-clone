import { describe, expect, it } from 'vitest';
import { getRandomWord } from '../getRandomWord';

describe('getRandomWord', () => {
  it('give a random word with a length of 5', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});
