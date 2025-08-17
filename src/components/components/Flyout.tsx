import { useSelector, useDispatch } from 'react-redux';
import { removeAll, selectItems } from '../../store/reducers/selectedItems';
import { useTranslations } from 'next-intl';
import { downloadCsv } from '../../utils/helpers';

export function Flyout(): React.ReactNode {
  const t = useTranslations('flyout');
  const stateItems = useSelector(selectItems);
  const dispatch = useDispatch();

  const handlerUnselect = () => {
    dispatch(removeAll());
  };

  const handlerDownload = () => {
    downloadCsv(stateItems);
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
      <button
        data-testid="flyout-download"
        className="flyout-link download"
        onClick={handlerDownload}
      >
        {t('download')}
      </button>
    </div>
  );
}
