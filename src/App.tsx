import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './app/hooks/redux';
import { globalActions } from './app/store/global/globalSlice';
import DefaultLayout from './components/layouts/DefaultLayout';
import HomeScreen from './screens/Home';
import ScreensWrapper from './components/common/ScreensWrapper';
import GlobalStyles from './styles/GlobalStyles';
import theme from './themes/defaultTheme';
import LoadingScreen from './screens/Loading';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.global.currencies);

  useEffect(() => {
    window.Main.send('ready');
  }, []);

  useEffect(() => {
    window.Main.on('ready', (data) => {
      dispatch(globalActions.setCurrencies(data.currencies));
      dispatch(globalActions.setTrackedCurrencyIds(data.trackedCurrencyIds));
      dispatch(
        globalActions.setTrackedCurrencyPrices(data.trackedCurrencyPrices),
      );
    });
  }, [dispatch]);

  useEffect(() => {
    window.Main.send('updatePrice');
  }, [dispatch]);

  useEffect(() => {
    window.Main.on('updatePrice', (data) => {
      dispatch(globalActions.setTrackedCurrencyPrices(data));
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {currencies.length === 0 ? (
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
