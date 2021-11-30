import styled from 'styled-components';

export const ScreensWrapperWrapper = styled.div`
  height: 100%;
  width: 100%;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
