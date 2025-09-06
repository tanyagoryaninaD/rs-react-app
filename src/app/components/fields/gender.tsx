import { type JSX } from 'react';
import type { InputField } from '../../../types/form';
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
          id="male"
          type="radio"
          name="gender"
          data-testid="gender-man"
          value="male"
          {...props.register?.('gender', {})}
        />
        <label htmlFor="man">Male</label>
      </div>
      <div className="subinput">
        <input
          id="female"
          type="radio"
          name="gender"
          value="female"
          data-testid="gender-woman"
          {...props.register?.('gender', {})}
        />
        <label htmlFor="woman">Female</label>
      </div>
      {!!errorMessage && (
        <p className="validation" data-testid="gender-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
