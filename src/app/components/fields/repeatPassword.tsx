import type { JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';

export function RepeatPasswordField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'repeatPassword',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor="repeat-password">
        Repeat password<span className="required">*</span>
      </label>
      <input
        id="repeat-password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        autoComplete="new-password"
        data-testid="repeatPassword"
        {...props.register?.('repeatPassword', {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid="repeatPassword-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
