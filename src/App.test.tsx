import React from 'react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { LetterState } from './helpers/computeGuess/computeGuess';
import { useStore } from './store/store';
import { render, screen, userEvent } from './utils/test-utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);

    expect(screen.getByText(/Wordle clone/i)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    useStore.getState().newGame([]);
    render(<App />);

    expect(screen.queryByText('❌ You lost ❌')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  });

  it('shows one rows of guesses', () => {
    useStore.getState().newGame(['hello']);
    render(<App />);

    expect(document.querySelector('main')?.textContent).toEqual('hello');
  });

  it('shows lost game over state', () => {
    useStore.getState().newGame(Array(6).fill('hello'));
    render(<App />);

    expect(screen.getByText('You lost')).toBeInTheDocument();
  });

  it('shows won game over state', () => {
    useStore.getState().newGame(Array(2).fill('hello'));
    const answer = useStore.getState().answer;
    useStore.getState().addGuess(answer);
    render(<App />);

    expect(screen.getByText('You won')).toBeInTheDocument();
  });

  it('can start a new game', () => {
    useStore.getState().newGame(Array(6).fill('hello'));
    render(<App />);

    expect(screen.getByText('You lost')).toBeInTheDocument();
    userEvent.click(screen.getByText('NEW GAME'));
    expect(document.querySelector('main')?.textContent).toEqual('');
  });
});
