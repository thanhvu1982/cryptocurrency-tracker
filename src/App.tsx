import React, { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './app/hooks/redux';
import { globalActions } from './app/store/global/globalSlice';
import { fetchCurrenciesThunk } from './app/store/global/globalThunk';
import DefaultLayout from './components/layouts/DefaultLayout';
import { COINMARKETCAP_SOCKET } from './constants/configs';
import { PriceResponse } from './models/Price';
import HomeScreen from './screens/Home';
import ScreensWrapper from './components/common/ScreensWrapper';
import GlobalStyles from './styles/GlobalStyles';
import theme from './themes/defaultTheme';
import LoadingScreen from './screens/Loading';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const trackedCurrencyIds = useAppSelector(
    (state) => state.global.trackedCurrencyIds,
  );
  const currencies = useAppSelector((state) => state.global.currencies);

  useEffect(() => {
    dispatch(fetchCurrenciesThunk());
    dispatch(globalActions.setTrackedCurrencyIds());
  }, [dispatch]);

  useEffect(() => {
    ws?.close();
    setWs(new WebSocket(COINMARKETCAP_SOCKET));
  }, [trackedCurrencyIds.length]);

  useEffect(() => {
    if (ws && trackedCurrencyIds.length > 0) {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            method: 'subscribe',
            id: 'price',
            data: {
              cryptoIds: trackedCurrencyIds,
              index: null,
            },
          }),
        );
      };
    }
  }, [ws, trackedCurrencyIds.length]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const price = JSON.parse(event.data) as PriceResponse;
        dispatch(globalActions.updatePrice(price.d.cr));
      };
    }
  }, [ws, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {currencies.loading ? (
        <LoadingScreen />
      ) : (
        <DefaultLayout>
          <ScreensWrapper>
            <HomeScreen />
          </ScreensWrapper>
        </DefaultLayout>
      )}
    </ThemeProvider>
  );
};

export default App;
