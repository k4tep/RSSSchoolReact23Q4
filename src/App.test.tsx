import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Renders main page correctly', async () => {
  render(<App />);

  it('Loading is shoving', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('Search input is showing', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument;
  });

  it('Search btn is showing', () => {
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
