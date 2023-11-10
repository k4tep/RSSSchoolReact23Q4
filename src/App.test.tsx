import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import response from './response.json';
import getCharactersList from './api/get/get-list';
import { IData } from './interfaces/data';

describe('App', async () => {
  beforeEach(() => {
    // global.fetch.mockReset();
    render(<App />);
  });

  it('Test 7.1. Check that a loading indicator is displayed while fetching data', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('Search is showing', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument;
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('Test 5.2. Check that an appropriate message is displayed if no cards are present.', async () => {
    const inputSearch = screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(await inputSearch, { target: { value: 'Error' } });
    fireEvent.click(btnSearch);
    expect(await screen.findByText('Here no results')).toBeInTheDocument();
  });

  it("Searched posts isn't showing", async () => {
    const inputSearch = screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(await inputSearch, { target: { value: '' } });
    fireEvent.click(btnSearch);
    expect(await screen.findAllByText('Open')).toBeInTheDocument();
  });

  // it('makes a GET request to fetch list and returns the result', async () => {
  //   vi.spyOn(window, 'fetch').mockImplementationOnce(() => {
  //     return Promise.resolve({
  //       json: () => Promise.resolve(response),
  //     } as Response);
  //   });
  //   expect(await screen.findAllByText('Open')).toBeInTheDocument();
  // });
});
