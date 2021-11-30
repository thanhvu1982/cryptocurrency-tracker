import styled from 'styled-components';

export const CurrencyCardWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 16px;
  height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.colors.paper};
  user-select: none;
  overflow: hidden;
  position: relative;

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;

export const CurrencyCardIcon = styled.img<{ show: boolean }>`
  width: 38px;
  margin-right: 16px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.2s;
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
  white-space: nowrap;
`;

export const CurrencyCardSymbol = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const CurrencyCardChart = styled.img<{
  status: 'positive' | 'negative' | 'neutral';
}>`
  height: 38px;
  width: 100px;
  filter: ${(props) =>
    props.status === 'positive'
      ? 'hue-rotate(85deg) saturate(80%) brightness(0.85)'
      : props.status === 'negative'
      ? 'hue-rotate(300deg) saturate(210%) brightness(0.7) contrast(170%)'
      : 'brightness(0) invert(1)'};
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

export const CurrencyCardPriceChange = styled.span<{
  status: 'positive' | 'negative' | 'neutral';
}>`
  font-size: 12px;
  color: ${(props) =>
    props.status === 'positive'
      ? props.theme.colors.positive
      : props.status === 'negative'
      ? props.theme.colors.negative
      : props.theme.colors.text};
`;

export const CurrencyCardLoadingWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 195px;
  padding-right: 16px;
`;

export const CurrencyCardDeleteButton = styled.button<{ show: boolean }>`
  width: 38px;
  height: 38px;
  position: absolute;
  background-color: red;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  left: ${(props) => (props.show ? '16px' : '-16px')};
  z-index: 10;
`;
