import React, { FC } from 'react';
import { DefaultLayoutWrapper } from './DefaultLayoutStyled';
import Header from './Header';
import Main from './Main';

const DefaultLayout: FC = ({ children }) => {
  return (
    <DefaultLayoutWrapper>
      <Header />
      <Main>{children}</Main>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
