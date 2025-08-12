import type { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAll, selectItems } from '../../utils/store';
import { parseToСsvUrl } from '../../utils/helpers';

export function Flyout(): ReactNode {
  const stateItems = useSelector(selectItems);
  const dispatch = useDispatch();

  const handlerUnselect = () => {
    dispatch(removeAll());
  };

  return (
    <div className="flyout">
      <p className="flyout-text">{stateItems.length} items are selected</p>
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
        download={`${stateItems.length}_items.csv`}
        href={parseToСsvUrl(stateItems)}
      >
        Download
      </a>
    </div>
  );
}
