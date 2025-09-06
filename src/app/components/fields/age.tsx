import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function AgeField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.AGE,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor={FORM_KEYS.AGE}>
        Age<span className="required">*</span>
      </label>
      <input
        id={FORM_KEYS.AGE}
        type="number"
        placeholder="Age"
        name={FORM_KEYS.AGE}
        data-testid={FORM_KEYS.AGE}
        {...props.register?.(FORM_KEYS.AGE, {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.AGE}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
