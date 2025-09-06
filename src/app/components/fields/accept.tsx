import { type JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function AcceptField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.ACCEPT,
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <div className="subinput">
        <input
          id={FORM_KEYS.ACCEPT}
          type="checkbox"
          name={FORM_KEYS.ACCEPT}
          data-testid={FORM_KEYS.ACCEPT}
          {...props.register?.(FORM_KEYS.ACCEPT, {})}
        />
        <label htmlFor={FORM_KEYS.ACCEPT}>
          I Accept the Terms and Conditions<span className="required">*</span>
        </label>
      </div>
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.ACCEPT}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
