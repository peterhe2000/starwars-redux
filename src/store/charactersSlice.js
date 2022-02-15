import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// eg:https://star-wars-characters.glitch.me/api/search/da
const ENDPOINT = 'https://star-wars-characters.glitch.me/api/search/';

const initialState = {
  data: [],
  loading: false,
};

export const fetchCharactersFromAPI = createAsyncThunk(
  'characters/fetchCharacters', // give name of the action
  async (searchTerm) => {
    const response = await fetch(ENDPOINT + searchTerm.toLowerCase()).then(
      (response) => response.json(),
    );
    return response.results;
  },
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    add: (state, action) => {
      state.characters = action.payload;
    },
  },
  extraReducers: {
    //handle action from fetchCharactersFromAPI
    [fetchCharactersFromAPI.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchCharactersFromAPI.pending]: (state, action) => {
      state.loading = true;
    },
  },
});
