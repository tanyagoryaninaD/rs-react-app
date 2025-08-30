import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CountriesCO2Context } from '../../utils/context';
import '../../styles/Widget.scss';
import { COUNTRY_DATA_KEYS } from '../../types/constants';
import { getHeadColumn } from '../../utils/helpers';
import type { ViewFields } from '../../types/types';

export default function Widget() {
  const context = useContext(CountriesCO2Context);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = useCallback(() => {
    if (dialogRef.current) {
      if (!isOpen) {
        setIsOpen(true);
        dialogRef.current.show();
      } else {
        setIsOpen(false);
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = Object.fromEntries(new FormData(form));
      const checkedData = Object.keys(formData) as ViewFields;

      toggleDialog();
      context.setViewColumns(checkedData);
    },
    [context, toggleDialog]
  );

  const Inputs = useMemo(() => {
    return COUNTRY_DATA_KEYS.map((item) => {
      return (
        <li key={item} className="widget-field">
          <input
            type="checkbox"
            id={item}
            name={item}
            defaultChecked={context.menu.viewColumns.includes(item)}
          />
          <label htmlFor={item}>{getHeadColumn(item)}</label>
        </li>
      );
    });
  }, [context.menu.viewColumns]);

  return (
    <div className="widget">
      <button onClick={toggleDialog}>Widget</button>

      <dialog className="widget-dialog" ref={dialogRef}>
        <p>Select additional columns</p>
        <form onSubmit={onSubmit}>
          <ul className="widget-fields">{Inputs}</ul>
          <button type="submit">Submit</button>
        </form>
      </dialog>
    </div>
  );
}
