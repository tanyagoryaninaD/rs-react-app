import { type JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';
import { FORM_KEYS } from '../../../constants/constants';

export function GenderField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: FORM_KEYS.GENDER,
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
          id="male"
          type="radio"
          name={FORM_KEYS.GENDER}
          data-testid={`${FORM_KEYS.GENDER}-man`}
          value="male"
          {...props.register?.(FORM_KEYS.GENDER, {})}
        />
        <label htmlFor="man">Male</label>
      </div>
      <div className="subinput">
        <input
          id="female"
          type="radio"
          name={FORM_KEYS.GENDER}
          value="female"
          data-testid={`${FORM_KEYS.GENDER}-woman`}
          {...props.register?.(FORM_KEYS.GENDER, {})}
        />
        <label htmlFor="woman">Female</label>
      </div>
      {!!errorMessage && (
        <p className="validation" data-testid={`${FORM_KEYS.GENDER}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
