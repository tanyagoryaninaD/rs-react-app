import { useSelector, useDispatch } from 'react-redux';
import { parseToСsvUrl } from '../../utils/helpers';
import { removeAll, selectItems } from '../../store/reducers/selectedItems';
import { useTranslations } from 'next-intl';

export function Flyout(): React.ReactNode {
  const t = useTranslations('flyout');
  const stateItems = useSelector(selectItems);
  const dispatch = useDispatch();

  const handlerUnselect = () => {
    dispatch(removeAll());
  };

  return (
    <div className="flyout">
      <p className="flyout-text">{`${stateItems.length} ${stateItems.length === 1 ? t('selectedOne') : t('selectedSome')}`}</p>
      <button
        data-testid="flyout-unselect"
        className="flyout-button unselect"
        type="button"
        onClick={handlerUnselect}
      >
        {t('unselect')}
      </button>
      <a
        data-testid="flyout-download"
        className="flyout-link download"
        download={`${stateItems.length}_items.csv`}
        href={parseToСsvUrl(stateItems)}
      >
        {t('download')}
      </a>
    </div>
  );
}
