import React, { FC } from 'react';
import { Edit, Plus, Check } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { globalActions } from '../../app/store/global/globalSlice';
import { HeaderButton, HeaderWrapper } from './HeaderStyled';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state) => state.global.editMode);

  const toggleEditMode = () => {
    dispatch(globalActions.toggleEditMode());
  };

  return (
    <HeaderWrapper>
      <HeaderButton onClick={toggleEditMode}>
        {editMode ? <Check size={16} /> : <Edit size={16} />}
      </HeaderButton>
      <HeaderButton>
        <Plus size={18} />
      </HeaderButton>
    </HeaderWrapper>
  );
};

export default Header;
