import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { ImpulseSpinner } from 'react-spinners-kit';
import { useAppSelector, useAppDispatch } from '../../app/hooks/redux';
import { formatPrice } from '../../utils/formatPrice';
import {
  CurrencyCardChart,
  CurrencyCardIcon,
  CurrencyCardInfo,
  CurrencyCardLoadingWrapper,
  CurrencyCardPrice,
  CurrencyCardPriceChange,
  CurrencyCardPriceValue,
  CurrencyCardSymbol,
  CurrencyCardTitle,
  CurrencyCardWrapper,
  CurrencyCardDeleteButton,
} from './CurrencyCardStyled';
import { Trash2 } from 'react-feather';
import { globalActions } from '../../app/store/global/globalSlice';

interface CurrencyCardProps {
  id: number;
}

const CurrencyCard: FC<CurrencyCardProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [imageKey, setImageKey] = useState(new Date().getTime());

  const currency = useAppSelector((state) => {
    return state.global.currencies.data.find((c) => c.id === id);
  });

  const price = useAppSelector((state) => {
    const cP = state.global.trackedCurrencyPrices.find((c) => c.id === id);
    return cP;
  });

  const editMode = useAppSelector((state) => state.global.editMode);

  const status = useMemo(() => {
    if (!price?.p24h) {
      return 'neutral';
    } else {
      if (price?.p24h < 0) {
        return 'negative';
      } else if (price?.p24h === 0) {
        return 'neutral';
      } else {
        return 'positive';
      }
    }
  }, [price?.p1h]);

  useEffect(() => {
    setImageKey(new Date().getTime());
  }, [price?.p]);

  const onDeleteCurrency = () => {
    dispatch(globalActions.removeTrackedCurrencyId(id));
  };

  return (
    <CurrencyCardWrapper>
      <CurrencyCardDeleteButton onClick={onDeleteCurrency} show={editMode}>
        <Trash2 size={18} />
      </CurrencyCardDeleteButton>
      <CurrencyCardIcon
        show={!editMode}
        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
      />
      <CurrencyCardInfo>
        <CurrencyCardTitle>{currency?.name}</CurrencyCardTitle>
        <CurrencyCardSymbol>{currency?.symbol}</CurrencyCardSymbol>
      </CurrencyCardInfo>
      {price ? (
        <>
          <CurrencyCardChart
            key={imageKey}
            status={status}
            src={`https://s3.coinmarketcap.com/generated/sparklines/web/1d/2781/${id}.${'svg'}`}
          />
          <CurrencyCardPrice>
            <CurrencyCardPriceValue>
              {formatPrice(price?.p || 0)}
            </CurrencyCardPriceValue>
            <CurrencyCardPriceChange status={status}>
              {price?.p24h.toFixed(2) || 0}%
            </CurrencyCardPriceChange>
          </CurrencyCardPrice>
        </>
      ) : (
        <CurrencyCardLoadingWrapper>
          <ImpulseSpinner size={26} frontColor="rgb(16, 140, 189)" />
        </CurrencyCardLoadingWrapper>
      )}
    </CurrencyCardWrapper>
  );
};

export default memo(CurrencyCard);
