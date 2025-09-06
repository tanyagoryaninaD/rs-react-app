import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';

export function AgeField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'age',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor="age">
        Age<span className="required">*</span>
      </label>
      <input
        id="age"
        type="number"
        placeholder="Age"
        name="age"
        data-testid="age"
        {...props.register?.('age', {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid="age-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
