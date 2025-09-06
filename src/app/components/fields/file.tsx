import { type JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function FileField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.FILE,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor={FORM_KEYS.FILE}>
        Choose a profile picture:<span className="required">*</span>
      </label>
      <input
        id={FORM_KEYS.FILE}
        type={FORM_KEYS.FILE}
        accept=".jpeg, .png"
        name={FORM_KEYS.FILE}
        data-testid={FORM_KEYS.FILE}
        {...props.register?.(FORM_KEYS.FILE, {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.FILE}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
