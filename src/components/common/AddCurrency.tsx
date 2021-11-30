import React, { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { globalActions } from '../../app/store/global/globalSlice';
import { Currency } from '../../models/Currency';
import {
  AddCurrencyTextField,
  AddCurrencyTitle,
  AddCurrencyWrapper,
  CurrencyResultCard,
  CurrencyResultCardImage,
  CurrencyResultCardInfo,
  CurrencyResultCardList,
  CurrencyResultCardName,
  CurrencyResultCardSymbol,
} from './AddCurrencyStyled';

const AddCurrency: FC = () => {
  const dispatch = useAppDispatch();
  const addMode = useAppSelector((state) => state.global.addMode);
  const currencies = useAppSelector((state) => state.global.currencies);
  const trackedCurrencyIds = useAppSelector(
    (state) => state.global.trackedCurrencyIds,
  );
  const [foundCurrencies, setFoundCurrencies] = useState([]);

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    const _currencies = JSON.parse(
      JSON.stringify(currencies.data),
    ) as Currency[];
    const result = _currencies.filter(
      (currency) =>
        (currency.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          currency.symbol
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) &&
        trackedCurrencyIds.indexOf(currency.id) === -1 &&
        currency.is_active === 1,
    );
    setFoundCurrencies(result.slice(0, 10));
  }

  function onAddTrackedCurrency(id: number) {
    dispatch(globalActions.addTrackedCurrencyId(id));
    setFoundCurrencies([]);
    dispatch(globalActions.toggleAddMode());
  }

  return (
    <AddCurrencyWrapper show={addMode}>
      <AddCurrencyTitle>New Currency</AddCurrencyTitle>
      <AddCurrencyTextField
        placeholder="Bitcoin, BTC,..."
        onChange={onTextChange}
      />
      <CurrencyResultCardList>
        {foundCurrencies.map((currency, index) => (
          <CurrencyResultCard
            key={index}
            onClick={() => {
              onAddTrackedCurrency(currency.id);
            }}
          >
            <CurrencyResultCardImage
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
            />
            <CurrencyResultCardInfo>
              <CurrencyResultCardName>{currency.name}</CurrencyResultCardName>
              <CurrencyResultCardSymbol>
                {currency.symbol}
              </CurrencyResultCardSymbol>
            </CurrencyResultCardInfo>
          </CurrencyResultCard>
        ))}
      </CurrencyResultCardList>
    </AddCurrencyWrapper>
  );
};

export default AddCurrency;
