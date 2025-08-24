import type { JSX } from 'react';
import type { InputField } from '../../../types/common';
import { getError } from '../../../utils/helpers';

export function PasswordField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'password',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor="password">
        Password<span className="required">*</span>
      </label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        data-testid="password"
        {...props.register?.('password', {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid="password-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
