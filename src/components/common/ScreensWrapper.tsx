import React, { FC } from 'react';
import { ScreensWrapperWrapper } from './ScreensWrapperStyled';

const ScreensWrapper: FC = ({ children }) => {
  return <ScreensWrapperWrapper>{children}</ScreensWrapperWrapper>;
};

export default ScreensWrapper;
