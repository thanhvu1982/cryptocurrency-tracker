import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: relative;
  z-index: 30;
  width: 100%;
  background-color: ${(props) => props.theme.colors.paper};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

export const HeaderButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.textSecondary};
  transition: color 0.2s ease-in-out;
  outline: none;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
