import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function PasswordField(props: InputField): JSX.Element {
  const { form } = useFormStore((state) => state);

  const error = props.formState?.errors.password || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={props.onChange}
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="password"
        type="password"
        placeholder="Password"
        {...props.register?.('password', {
          required: 'This field is required',
          onChange: props.onChange,
          value: form.password,
          validate: () => !!error,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="password">
        Password<span className="required">*</span>
      </label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
