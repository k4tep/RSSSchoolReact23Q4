import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IData, IStoreCharacter } from '../interfaces/data';
import getCharacter from '../api/get/get-character';

const initialState: IStoreCharacter = {
  results: null,
  loading: false,
  error: null,
};

export const fetchCharacter = createAsyncThunk<
  IData,
  number,
  { rejectValue: string }
>('character/fetchCharacter', async function (id, { rejectWithValue }) {
  try {
    const response = await getCharacter(id);
    return response;
  } catch (error) {
    return rejectWithValue(`Ops, ${error}`);
  }
});

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCharacter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.results = null;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      });
  },
});

export default characterSlice.reducer;
