import styled from 'styled-components';

export const CurrencyEmptyListWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CurrencyEmptyListAddButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
