import React, { FC } from 'react';
import { LoadingScreenWrapper } from './LoadingStyled';
import { CubeSpinner } from 'react-spinners-kit';

const LoadingScreen: FC = () => {
  return (
    <LoadingScreenWrapper>
      <CubeSpinner frontColor="rgb(16, 140, 189)" />
    </LoadingScreenWrapper>
  );
};

export default LoadingScreen;
