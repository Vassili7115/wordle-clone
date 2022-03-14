import { describe, expect, test } from 'vitest';
import { isValidWord } from '../isValidWord';

describe('isValidWord', () => {
  test('with valid word', () => {
    expect(isValidWord('clear')).toBe(true);
  });

  test('with invalid word', () => {
    expect(isValidWord('clera')).toBe(false);
  });
});
