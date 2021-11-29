import axios from 'axios';
import { COINMARKETCAP_CURRENCIES_URL } from '../constants/configs';
import { Currency } from '../models/Currency';

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const [firstResponse, secondResponse] = await Promise.all([
    axios.get(`${COINMARKETCAP_CURRENCIES_URL}&start=1&limit=10000`),
    axios.get(`${COINMARKETCAP_CURRENCIES_URL}&start=10001&limit=10000`),
  ]);
  const currencies = [
    ...firstResponse.data.data.cryptoCurrencyMap,
    ...secondResponse.data.data.cryptoCurrencyMap,
  ];
  return currencies;
};
