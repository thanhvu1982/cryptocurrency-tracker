import React, { FC } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { globalActions } from '../../app/store/global/globalSlice';
import CurrencyCard from './CurrencyCard';
import CurrencyEmptyList from './CurrencyEmptyList';

const CurrencyCardList: FC = () => {
  const dispatch = useAppDispatch();
  const trackedCurrencyIds = useAppSelector(
    (state) => state.global.trackedCurrencyIds,
  );

  const reorder = (list: number[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      trackedCurrencyIds,
      result.source.index,
      result.destination.index,
    );
    dispatch(globalActions.updateTrackedCurrencyIds(items));
  };

  if (trackedCurrencyIds.length === 0) return <CurrencyEmptyList />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {trackedCurrencyIds.map((trackedCurrencyId, index) => (
              <Draggable
                key={trackedCurrencyId}
                draggableId={trackedCurrencyId.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CurrencyCard id={trackedCurrencyId} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CurrencyCardList;
