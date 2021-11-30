import React, { FC } from 'react';
import { Check, Edit, Plus, ChevronUp } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { globalActions } from '../../app/store/global/globalSlice';
import { HeaderButton, HeaderWrapper } from './HeaderStyled';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector((state) => state.global.editMode);
  const addMode = useAppSelector((state) => state.global.addMode);
  const trackedCurrencyIds = useAppSelector(
    (state) => state.global.trackedCurrencyIds,
  );

  const toggleEditMode = () => {
    dispatch(globalActions.toggleEditMode());
  };

  const toggleAddMode = () => {
    dispatch(globalActions.toggleAddMode());
  };

  return (
    <HeaderWrapper>
      {!addMode && (
        <>
          {trackedCurrencyIds.length > 0 ? (
            <HeaderButton onClick={toggleEditMode}>
              {editMode ? <Check size={16} /> : <Edit size={16} />}
            </HeaderButton>
          ) : (
            <div style={{ width: '16px' }}></div>
          )}
        </>
      )}
      {!editMode && (
        <HeaderButton onClick={toggleAddMode}>
          {addMode ? <ChevronUp size={16} /> : <Plus size={16} />}
        </HeaderButton>
      )}
    </HeaderWrapper>
  );
};

export default Header;
