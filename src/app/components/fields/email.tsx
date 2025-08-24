import type { JSX } from 'react';
import type { InputField } from '../../../types/common';
import { getError } from '../../../utils/helpers';

export function EmailField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'email',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor="email">
        Email<span className="required">*</span>
      </label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        autoComplete="email"
        name="email"
        data-testid="email"
        {...props.register?.('email', {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
