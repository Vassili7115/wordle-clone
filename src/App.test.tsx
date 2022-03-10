import React from 'react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { useStore } from './store';
import { render, screen, userEvent } from './utils/test-utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);

    expect(screen.getByText(/Wordle clone/i)).toBeInTheDocument();
  });

  it('shows empty state', () => {
    useStore.setState({ guesses: [] });
    render(<App />);

    expect(screen.queryByText('GAME OVER !')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  });

  it('shows one rows of guesses', () => {
    useStore.setState({ guesses: ['hello'] });
    render(<App />);

    expect(document.querySelector('main')?.textContent).toEqual('hello');
  });

  it('shows game over', () => {
    useStore.setState({ guesses: Array(6).fill('hello') });
    render(<App />);

    expect(screen.getByText('GAME OVER !')).toBeInTheDocument();
  });

  it('can start a new game', () => {
    useStore.setState({ guesses: Array(6).fill('hello') });
    render(<App />);

    expect(screen.getByText('GAME OVER !')).toBeInTheDocument();
    userEvent.click(screen.getByText('NEW GAME'));
    expect(document.querySelector('main')?.textContent).toEqual('');
  });
});
