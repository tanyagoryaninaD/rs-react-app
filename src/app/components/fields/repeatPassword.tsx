import type { JSX } from 'react';
import type { InputField } from '../../../types/common';

export function RepeatPasswordField(props: InputField): JSX.Element {
  const error = props.formState?.errors.isCorrectRepeatPassword ?? props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <input
        id="repeat-password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        onChange={props.onChange}
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="repeat-password"
        type="password"
        placeholder="Repeat password"
        name="repeatPassword"
        {...props.register?.('repeatPassword', {
          required: 'This field is required',
          onChange: props.onChange,
          validate: () => !!error,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="repeat-password">
        Repeat password<span className="required">*</span>
      </label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
