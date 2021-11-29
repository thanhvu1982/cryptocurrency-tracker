import React, { FC } from 'react';
import {
  CurrencyCardWrapper,
  CurrencyCardIcon,
  CurrencyCardInfo,
  CurrencyCardTitle,
  CurrencyCardSymbol,
  CurrencyCardChart,
  CurrencyCardPrice,
  CurrencyCardPriceValue,
  CurrencyCardPriceChange,
} from './CurrencyCardStyled';

interface CurrencyCardProps {
  id: number;
}

const CurrencyCard: FC<CurrencyCardProps> = () => {
  return (
    <CurrencyCardWrapper>
      <CurrencyCardIcon src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" />
      <CurrencyCardInfo>
        <CurrencyCardTitle>Bitcoin</CurrencyCardTitle>
        <CurrencyCardSymbol>BTC</CurrencyCardSymbol>
      </CurrencyCardInfo>
      <CurrencyCardChart
        status="dec"
        src="https://s3.coinmarketcap.com/generated/sparklines/web/1d/2781/1.svg"
      />
      <CurrencyCardPrice>
        <CurrencyCardPriceValue>$58,327.18</CurrencyCardPriceValue>
        <CurrencyCardPriceChange>-0.15%</CurrencyCardPriceChange>
      </CurrencyCardPrice>
    </CurrencyCardWrapper>
  );
};

export default CurrencyCard;
