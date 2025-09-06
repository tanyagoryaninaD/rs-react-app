import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function RepeatPasswordField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.REPEAT_PASSWORD,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor={FORM_KEYS.REPEAT_PASSWORD}>
        Repeat password<span className="required">*</span>
      </label>
      <input
        id={FORM_KEYS.REPEAT_PASSWORD}
        type="password"
        placeholder="Repeat password"
        name={FORM_KEYS.REPEAT_PASSWORD}
        autoComplete="new-password"
        data-testid={FORM_KEYS.REPEAT_PASSWORD}
        {...props.register?.(FORM_KEYS.REPEAT_PASSWORD, {})}
      />
      {!!errorMessage && (
        <p
          className="validation"
          data-testid={`${FORM_KEYS.REPEAT_PASSWORD}-error`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
