import type { JSX } from 'react';
import type { InputField } from '../../../types/common';
import { getError } from '../../../utils/helpers';

export function NameField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'name',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor="name">
        Name<span className="required">*</span>
      </label>
      <input
        id="name"
        type="text"
        placeholder="Name"
        autoComplete="name"
        name="name"
        data-testid="name"
        {...props.register?.('name', {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid="name-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
