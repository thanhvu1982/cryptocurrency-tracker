import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../../../models/Currency';
import { Price } from '../../../models/Price';

interface GlobalState {
  currencies: Currency[];
  trackedCurrencyIds: number[];
  trackedCurrencyPrices: Price[];
  editMode: boolean;
  addMode: boolean;
}

const initialState: GlobalState = {
  currencies: [],
  trackedCurrencyIds: [],
  trackedCurrencyPrices: [],
  editMode: false,
  addMode: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;
    },
    setTrackedCurrencyIds: (state, action: PayloadAction<number[]>) => {
      state.trackedCurrencyIds = action.payload;
    },
    setTrackedCurrencyPrices: (state, action: PayloadAction<Price[]>) => {
      state.trackedCurrencyPrices = action.payload;
    },
    updateTrackedCurrencyIds: (state, action: PayloadAction<number[]>) => {
      const newValue = action.payload;
      state.trackedCurrencyIds = newValue;
      window.Main.send('updateTrackedCurrencyIds', newValue);
    },
    removeTrackedCurrencyId: (state, action: PayloadAction<number>) => {
      const newValue = state.trackedCurrencyIds.filter(
        (id) => id !== action.payload,
      );
      state.trackedCurrencyIds = newValue;
      window.Main.send('updateTrackedCurrencyIds', newValue);
    },
    addTrackedCurrencyId: (state, action: PayloadAction<number>) => {
      const newValue = [...state.trackedCurrencyIds, action.payload];
      state.trackedCurrencyIds = newValue;
      window.Main.send('updateTrackedCurrencyIds', newValue);
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    toggleAddMode: (state) => {
      state.addMode = !state.addMode;
    },
  },
});

export default globalSlice.reducer;
export const globalActions = globalSlice.actions;
