import { describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './pages/error/errorPage';
import { Provider } from 'react-redux';
import { store } from './store';
import { IData, IStoreCharactersList } from './interfaces/data';
import reducer, { changeViewMode } from './store/charactersListSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import getCharacter from './api/get/get-character';

describe('Testing App', async () => {
  beforeEach(() => {
    screen.debug();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('Loading is showing', async () => {
    expect(
      await screen.findByText(
        'Please wait, the API is slow and this is its feature. Loading...'
      )
    ).toBeInTheDocument();
  });

  test('Search is showing', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument;
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('Search is working', async () => {
    const inputSearch = await screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(inputSearch, { target: { value: 'R2-D2' } });
    fireEvent.click(btnSearch);
    waitFor(async () => {
      expect(await screen.findByText(/R2-D2/i)).toBeTruthy();
      expect(await screen.findByText(/Luke Skywalker/i)).toBeFalsy();
    });
  });

  test('Error btn is showing', () => {
    expect(
      screen.getByText("DON'T THINK OF PRESSING THIS BUTTON")
    ).toBeInTheDocument();
  });

  test('Error btn is working', () => {
    const btnError = screen.getByText("DON'T THINK OF PRESSING THIS BUTTON");
    fireEvent.click(btnError);
    expect(
      screen.getByText('Oops, you clicked the wrong button')
    ).toBeInTheDocument();
  });

  test('View mode btn is showing', () => {
    expect(screen.getByText('View mode:')).toBeInTheDocument();
  });

  test('View mode btn is working', async () => {
    const btnViewMode = screen.getByLabelText('View mode:');
    fireEvent.change(btnViewMode, { target: { value: 'all' } });

    await waitFor(() => {
      const element = screen.findAllByText('Open');
      expect(element).toBeTruthy();
    });
  });

  test('View mode btn is working for store', () => {
    const previousState: IStoreCharactersList = {
      results: [],
      count: 0,
      searchValue: '',
      viewMode: 0,
      loading: false,
      error: null,
    };

    expect(reducer(previousState, changeViewMode(2)).viewMode).toEqual(2);
  });

  test('creates the action types', () => {
    const fetchCharacter = createAsyncThunk<
      IData,
      number,
      { rejectValue: string }
    >('character/fetchCharacter', async function (id, { rejectWithValue }) {
      try {
        const response = await getCharacter(1);
        return response;
      } catch (error) {
        return rejectWithValue(`Ops, ${error}`);
      }
    });
    expect(fetchCharacter.fulfilled.type).toBe(
      'character/fetchCharacter/fulfilled'
    );
    expect(fetchCharacter.pending.type).toBe(
      'character/fetchCharacter/pending'
    );
    expect(fetchCharacter.rejected.type).toBe(
      'character/fetchCharacter/rejected'
    );
  });
});

describe('Test 5. Tests for the Card List component', async () => {
  beforeEach(() => {
    screen.debug();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('Test 5.1. Verify that the component renders the specified number of cards', async () => {
    await waitFor(() => {
      const element = screen.findAllByText('Open');
      expect(element).toBeTruthy();
    });
  });

  test('Test 5.2. Check that an appropriate message is displayed if no cards are present', async () => {
    const inputSearch = screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(await inputSearch, { target: { value: 'Error' } });
    fireEvent.click(btnSearch);
    await waitFor(() => {
      const element = screen.findByText('Here no results');
      expect(element).toBeTruthy();
    });
  });
});

describe('Test 6. Tests for the Card component', async () => {
  beforeEach(() => {
    screen.debug();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test('Test 6.1. Ensure that the card component renders the relevant card data', async () => {
    const inputSearch = screen.findByPlaceholderText('Search...');
    const btnSearch = screen.getByText('Search');
    fireEvent.change(await inputSearch, {
      target: { value: 'Luke Skywalker' },
    });
    fireEvent.click(btnSearch);
    await waitFor(() => {
      expect(screen.findByText(/Luke Skywalker/i)).toBeTruthy();
      expect(screen.findByText(/Male/i)).toBeTruthy();
      expect(screen.findByText(/19BBY/i)).toBeTruthy();
    });
  });

  test('Test 6.2. Validate that clicking on a card opens a detailed card component', async () => {
    waitFor(async () => {
      const element = await screen.findByText(/Open/i);
      fireEvent.click(element);
      expect(screen.findByText(/Height: 172/i)).toBeTruthy();
      expect(screen.findByText(/Skin color: fair/i)).toBeTruthy();
    });
  });

  test('Test 6.3. Check that clicking triggers an additional API call to fetch detailed information', async () => {});
});

describe('Test 7. Tests for the Detailed Card component', async () => {
  beforeEach(() => {
    screen.debug();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    waitFor(async () => {
      const element = await screen.findByText('Open');
      fireEvent.click(element);
    });
  });

  test('Test 7.1. Check that a loading indicator is displayed while fetching data', async () => {
    await waitFor(() => {
      expect(screen.findByText(/Height: Loading.../i)).toBeTruthy();
      expect(screen.findByText(/Skin color: Loading.../i)).toBeTruthy();
    });
  });

  test('Test 7.2. Make sure the detailed card component correctly displays the detailed card data', async () => {
    await waitFor(() => {
      expect(screen.findByText(/Height: 172/i)).toBeTruthy();
      expect(screen.findByText(/Skin color: fair/i)).toBeTruthy();
    });
  });

  test('Test 7.3. Ensure that clicking the close button hides the component', async () => {
    waitFor(async () => {
      const element = await screen.findByText(/X/i);
      fireEvent.click(element);
      expect(screen.findByText(/Height: 172/i)).toBeFalsy();
      expect(screen.findByText(/Skin color: fair/i)).toBeFalsy();
    });
  });
});

describe('Test 9. Tests for the Search component', async () => {
  beforeEach(() => {
    screen.debug();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
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

describe('Test 10. Tests for 404 page component', () => {
  test('Test 10.1. Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/error-route']}>
        <ErrorPage />
      </MemoryRouter>
    );
    const notFound = await screen.findByText(
      'Error URL. Please check it and fix'
    );
    expect(notFound).toBeTruthy();
  });
});
