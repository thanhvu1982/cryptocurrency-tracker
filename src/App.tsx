import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks/redux';
import { globalActions } from './app/store/global/globalSlice';
import { fetchCurrenciesThunk } from './app/store/global/globalThunk';
import { COINMARKETCAP_SOCKET } from './constants/configs';
import './index.css';
import { PriceResponse } from './models/Price';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const currenciesState = useAppSelector((state) => state.global.currencies);
  const [ws, setWs] = React.useState<WebSocket | null>(null);
  const trackedCurrencyIds = useAppSelector(
    (state) => state.global.trackedCurrencyIds,
  );

  useEffect(() => {
    dispatch(fetchCurrenciesThunk());
    dispatch(globalActions.setTrackedCurrencyIds());
  }, [dispatch]);

  useEffect(() => {
    if (currenciesState.data.length > 0) {
      ws?.close();
      setWs(new WebSocket(COINMARKETCAP_SOCKET));
    }
  }, [trackedCurrencyIds, currenciesState.data.length, trackedCurrencyIds]);

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

  return <div>Hello World</div>;
};

export default App;
