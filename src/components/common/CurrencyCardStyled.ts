import styled from 'styled-components';

export const CurrencyCardWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.colors.paper};
  user-select: none;

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;

export const CurrencyCardIcon = styled.img`
  width: 38px;
  margin-right: 16px;
`;

export const CurrencyCardInfo = styled.div`
  width: 95px;
  height: 100%;
  overflow: hidden;
`;

export const CurrencyCardTitle = styled.h4`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
`;

export const CurrencyCardSymbol = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const CurrencyCardChart = styled.img<{ status: 'inc' | 'dec' }>`
  height: 38px;
  width: 100px;
  filter: ${(props) =>
    props.status === 'inc'
      ? 'hue-rotate(85deg) saturate(80%) brightness(0.85)'
      : 'hue-rotate(300deg) saturate(210%) brightness(0.7) contrast(170%)'};
`;

export const CurrencyCardPrice = styled.div`
  width: 95px;
  height: 100%;
  text-align: right;
`;

export const CurrencyCardPriceValue = styled.h4`
  margin-bottom: 1px;
  font-size: 14px;
`;

export const CurrencyCardPriceChange = styled.span`
  font-size: 12px;
`;
