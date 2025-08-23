import { type JSX } from 'react';
import type { InputField } from '../../../types/common';

export function AcceptField(props: InputField): JSX.Element {
  const error = props.formState?.errors.age || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <input
        id="accept"
        type="checkbox"
        name="accept"
        onChange={props.onChange}
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="accept"
        type="checkbox"
        name="accept"
        {...props.register?.('accept', {
          required: 'This field is required',
          onChange: props.onChange,
          validate: () => !!error,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <div>
        {props.formState ? createInputReactHook() : createInputDefault()}
        <label htmlFor="accept">I Accept the Terms and Conditions</label>
      </div>
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
