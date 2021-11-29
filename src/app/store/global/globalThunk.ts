import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrencies } from '../../../apis/coinmarketcapApis';

export const fetchCurrenciesThunk = createAsyncThunk(
  'global/fetchCurrencies',
  async () => {
    const currencies = await fetchCurrencies();
    return currencies;
  },
);
