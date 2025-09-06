import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function EmailField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.EMAIL,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor={FORM_KEYS.EMAIL}>
        Email<span className="required">*</span>
      </label>
      <input
        id={FORM_KEYS.EMAIL}
        type="text"
        placeholder="Email"
        autoComplete={FORM_KEYS.EMAIL}
        name={FORM_KEYS.EMAIL}
        data-testid={FORM_KEYS.EMAIL}
        {...props.register?.(FORM_KEYS.EMAIL, {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.EMAIL}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
