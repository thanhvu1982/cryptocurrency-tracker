import React, { FC } from 'react';
import { MainWrapper } from './MainStyled';

const Main: FC = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;
