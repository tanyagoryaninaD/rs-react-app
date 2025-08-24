import { type JSX } from 'react';
import type { InputField } from '../../../types/common';
import { getError } from '../../../utils/helpers';

export function GenderField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'gender',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <legend>
        Gender<span className="required">*</span>
      </legend>
      <div className="subinput">
        <input
          id="man"
          type="radio"
          name="gender"
          {...props.register?.('gender', {})}
        />
        <label htmlFor="man">Man</label>
      </div>
      <div className="subinput">
        <input
          id="woman"
          type="radio"
          name="gender"
          {...props.register?.('gender', {})}
        />
        <label htmlFor="woman">Woman</label>
      </div>
      {!!errorMessage && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
