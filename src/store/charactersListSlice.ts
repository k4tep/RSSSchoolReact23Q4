import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  ApiResponse,
  IRequest,
  IStoreCharactersList,
} from '../interfaces/data';
import getCharactersList from '../api/get/get-list';

const initialState: IStoreCharactersList = {
  results: [],
  count: 0,
  searchValue: '',
  viewMode: 1,
  loading: false,
  error: null,
};
export const fetchCharactersList = createAsyncThunk<
  ApiResponse,
  IRequest,
  { rejectValue: string; state: { charactersList: IStoreCharactersList } }
>(
  'charactersList/fetchCharactersList',
  async function (info, { rejectWithValue, getState }) {
    try {
      const state = getState().charactersList.viewMode;
      if (state !== 1 && state !== undefined) {
        const data: ApiResponse = await getCharactersList(info.search, 1);
        for (let i = 2; i <= 9; i++) {
          const response = await getCharactersList(info.search, i);
          data.results.push(...response.results);
        }
        data.count = 0;
        return data;
      } else {
        const response = await getCharactersList(info.search, info.page);
        return response;
      }
    } catch (error) {
      return rejectWithValue(`Ops, ${error}`);
    }
  }
);

const charactersListSlice = createSlice({
  name: 'charactersList',
  initialState,
  reducers: {
    changeViewMode(state, action: PayloadAction<number>) {
      state.viewMode = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharactersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharactersList.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.count = action.payload.count;
      });
  },
});

export const { changeViewMode, setSearchValue } = charactersListSlice.actions;
export default charactersListSlice.reducer;
