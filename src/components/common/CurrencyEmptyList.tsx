import React, { FC } from 'react';
import { useAppDispatch } from '../../app/hooks/redux';
import { globalActions } from '../../app/store/global/globalSlice';
import {
  CurrencyEmptyListAddButton,
  CurrencyEmptyListWrapper,
} from './CurrencyEmptyListStyled';

const CurrencyEmptyList: FC = () => {
  const dispatch = useAppDispatch();

  const onAddCurrency = () => {
    dispatch(globalActions.toggleAddMode());
  };

  return (
    <CurrencyEmptyListWrapper>
      <CurrencyEmptyListAddButton onClick={onAddCurrency}>
        Add Currency
      </CurrencyEmptyListAddButton>
    </CurrencyEmptyListWrapper>
  );
};

export default CurrencyEmptyList;
