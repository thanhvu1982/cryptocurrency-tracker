import React, { FC } from 'react';
import { HeaderWrapper, HeaderButton } from './HeaderStyled';
import { Edit, Plus } from 'react-feather';

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <HeaderButton>
        <Edit size={18} />
      </HeaderButton>
      <HeaderButton>
        <Plus size={18} />
      </HeaderButton>
    </HeaderWrapper>
  );
};

export default Header;
