import React, { FC } from 'react';
import AddCurrency from '../components/common/AddCurrency';
import CurrencyCardList from '../components/common/CurrencyCardList';
import { HomeScreen } from './HomeStyled';

const Home: FC = () => {
  return (
    <HomeScreen>
      <CurrencyCardList />
      <AddCurrency />
    </HomeScreen>
  );
};

export default Home;
