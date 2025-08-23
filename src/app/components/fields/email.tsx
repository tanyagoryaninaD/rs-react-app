import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function EmailField(props: InputField): JSX.Element {
  const { form } = useFormStore((state) => state);

  const error = props.formState?.errors.email || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <input
        id="email"
        type="text"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={props.onChange}
        autoComplete="email"
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="email"
        type="text"
        placeholder="Email"
        autoComplete="email"
        {...props.register?.('email', {
          required: 'This field is required',
          onChange: props.onChange,
          minLength: 1,
          value: form.email,
          validate: () => !!error,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="email">
        Email<span className="required">*</span>
      </label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
