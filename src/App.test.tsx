import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('App', async () => {
  beforeEach(() => {
    screen.debug();
    render(<App />);
  });

  test('Test 7.1. Check that a loading indicator is displayed while fetching data', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  test('Search is showing', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument;
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('Error btn is showing', () => {
    expect(
      screen.getByText("DON'T THINK OF PRESSING THIS BUTTON")
    ).toBeInTheDocument();
  });

  test('Test 5.2. Check that an appropriate message is displayed if no cards are present.', async () => {
    const inputSearch = screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(await inputSearch, { target: { value: 'Error' } });
    fireEvent.click(btnSearch);
    expect(await screen.findByText('Here no results')).toBeInTheDocument();
  });

  test('Test 9.1. Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const inputSearch = screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(await inputSearch, { target: { value: 'SomeText' } });
    fireEvent.click(btnSearch);
    expect('SomeText').toStrictEqual(localStorage.getItem('searchItem'));
  });

  test('Test 9.2. Check that the component retrieves the value from the local storage upon mounting', async () => {
    const inputSearch = (await screen.findByPlaceholderText(
      'Search...'
    )) as HTMLInputElement;
    expect(inputSearch.value).toStrictEqual(localStorage.getItem('searchItem'));
  });
});
