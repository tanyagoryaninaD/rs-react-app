import type { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { MyStore } from '../../types/interfaces';
import { removeAll } from '../../utils/store';
import { parseToСsvUrl } from '../../utils/helpers';

export function Flyout(): ReactNode {
  const stateSelectedItems = useSelector(
    (state: MyStore) => state.selectedItems.items
  );
  const stateSize = useSelector((state: MyStore) => state.selectedItems.size);
  const dispatch = useDispatch();

  const handlerUnselect = () => {
    dispatch(removeAll());
  };

  return (
    <div className="flyout">
      <p className="flyout-text">{stateSize} items are selected</p>
      <button
        data-testid="flyout-unselect"
        className="flyout-button unselect"
        type="button"
        onClick={handlerUnselect}
      >
        Unselect all
      </button>
      <a
        data-testid="flyout-download"
        className="flyout-link download"
        download={`${stateSize}_items.csv`}
        href={parseToСsvUrl(stateSelectedItems)}
      >
        Download
      </a>
    </div>
  );
}
