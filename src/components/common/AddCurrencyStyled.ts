import styled from 'styled-components';

export const AddCurrencyWrapper = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  padding: 16px;
  top: 43px;
  left: 0;
  z-index: 20;
  background: ${(props) => props.theme.colors.background};
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateY(${(props) => (props.show ? '0' : '-100%')});
`;

export const AddCurrencyTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
`;

export const AddCurrencyTextField = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.paper};
  width: 100%;
  font-size: 16px;
  outline: none;
  padding: 8px 4px;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.colors.text};
  text-align: center;

  ::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.5;
    text-align: center;
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

export const CurrencyResultCardList = styled.div`
  width: 100%;
  height: 273px;
  overflow-y: auto;
  margin-top: 16px;
  padding-bottom: 16px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CurrencyResultCard = styled.div`
  width: 100%;
  padding: 16px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.paper};
  }
`;

export const CurrencyResultCardImage = styled.img`
  width: 34px;
  margin-right: 16px;
`;

export const CurrencyResultCardInfo = styled.div`
  overflow: hidden;
  width: 281px;
`;

export const CurrencyResultCardName = styled.h5`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CurrencyResultCardSymbol = styled.h6`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
