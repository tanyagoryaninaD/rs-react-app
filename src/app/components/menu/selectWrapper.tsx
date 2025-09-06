import React from 'react';
import type { SelectWrapperProps } from '../../../types/interface';

export default React.memo(function SelectWrapper(props: SelectWrapperProps) {
  const { value, children, onChange, name, id, label } = props;

  return (
    <div className="menu-field-wrapper">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={id} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
});
