import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../../../models/Currency';
import { Price } from '../../../models/Price';
import { fetchCurrenciesThunk } from './globalThunk';

interface GlobalState {
  currencies: {
    data: Currency[];
    loading: boolean;
    error: boolean;
  };
  trackedCurrencyIds: number[];
  trackedCurrencyPrices: Price[];
  editMode: boolean;
  addMode: boolean;
}

const initialState: GlobalState = {
  currencies: {
    data: [],
    loading: false,
    error: false,
  },
  trackedCurrencyIds: [],
  trackedCurrencyPrices: [],
  editMode: false,
  addMode: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTrackedCurrencyIds: (state) => {
      const storedTrackedCurrencyIds = JSON.parse(
        localStorage.getItem('trackedCurrencyIds') || '[]',
      );
      state.trackedCurrencyIds = storedTrackedCurrencyIds;
    },
    updateTrackedCurrencyIds: (state, action: PayloadAction<number[]>) => {
      state.trackedCurrencyIds = action.payload;
      localStorage.setItem(
        'trackedCurrencyIds',
        JSON.stringify(action.payload),
      );
    },
    removeTrackedCurrencyId: (state, action: PayloadAction<number>) => {
      state.trackedCurrencyIds = state.trackedCurrencyIds.filter(
        (id) => id !== action.payload,
      );
      localStorage.setItem(
        'trackedCurrencyIds',
        JSON.stringify(state.trackedCurrencyIds),
      );
    },
    addTrackedCurrencyId: (state, action: PayloadAction<number>) => {
      state.trackedCurrencyIds.push(action.payload);
      localStorage.setItem(
        'trackedCurrencyIds',
        JSON.stringify(state.trackedCurrencyIds),
      );
    },
    updatePrice: (state, action: PayloadAction<Price>) => {
      const foundPriceIndex = state.trackedCurrencyPrices.findIndex(
        (price) => price.id === action.payload.id,
      );
      if (foundPriceIndex !== -1) {
        state.trackedCurrencyPrices[foundPriceIndex] = action.payload;
      } else {
        state.trackedCurrencyPrices.push(action.payload);
      }
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    toggleAddMode: (state) => {
      state.addMode = !state.addMode;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrenciesThunk.pending, (state) => {
      state.currencies.loading = true;
      state.currencies.error = false;
    });
    builder.addCase(fetchCurrenciesThunk.fulfilled, (state, action) => {
      state.currencies.data = action.payload;
      state.currencies.loading = false;
    });
    builder.addCase(fetchCurrenciesThunk.rejected, (state) => {
      state.currencies.loading = false;
      state.currencies.error = true;
    });
  },
});

export default globalSlice.reducer;
export const globalActions = globalSlice.actions;
