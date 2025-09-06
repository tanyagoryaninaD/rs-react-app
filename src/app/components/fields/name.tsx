import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function NameField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.NAME,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor={FORM_KEYS.NAME}>
        Name<span className="required">*</span>
      </label>
      <input
        id={FORM_KEYS.NAME}
        type="text"
        placeholder="Name"
        autoComplete={FORM_KEYS.NAME}
        name={FORM_KEYS.NAME}
        data-testid={FORM_KEYS.NAME}
        {...props.register?.(FORM_KEYS.NAME, {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.NAME}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
