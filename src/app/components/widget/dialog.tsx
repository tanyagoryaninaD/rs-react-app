import { COUNTRY_DATA_KEYS } from '../../../types/constants';
import { getHeadColumn } from '../../../utils/helpers';
import type { ViewFields } from '../../../types/types';
import React, { useMemo } from 'react';
import type { WidgetDialogProps } from '../../../types/interface';

export default React.memo(function WidgetDialog(props: WidgetDialogProps) {
  const { setViewColumns, viewColumns, toggleDialog, dialogRef } = props;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    const checkedData = Object.keys(formData) as ViewFields;

    toggleDialog();
    setViewColumns(checkedData);
  };

  const createInputs = useMemo(() => {
    return COUNTRY_DATA_KEYS.map((item) => {
      return (
        <li key={item} className="widget-field">
          <input
            type="checkbox"
            id={item}
            name={item}
            defaultChecked={viewColumns.includes(item)}
          />
          <label htmlFor={item}>{getHeadColumn(item)}</label>
        </li>
      );
    });
  }, [viewColumns]);

  return (
    <dialog className="widget-dialog" ref={dialogRef}>
      <p>Select additional columns</p>
      <form onSubmit={handleSubmit}>
        <ul className="widget-fields">{createInputs}</ul>
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
});
