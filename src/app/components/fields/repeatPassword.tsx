import type { JSX } from 'react';
import type { InputField } from '../../../types/common';
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
        {...props.register?.('repeatPassword', {})}
      />
      {!!errorMessage && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
