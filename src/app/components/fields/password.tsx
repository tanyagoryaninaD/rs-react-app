import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function PasswordField(props: InputField): JSX.Element {
  const { form, isValidPassword } = useFormStore((state) => state);
  const error = props.formState?.errors.password;

  const createInputDefault = () => {
    return (
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={props.onChange}
        required={true}
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
          validate: () =>
            !isValidPassword()
              ? 'Use one digit, one uppercase letter, one lowercase letter, and one special character'
              : true,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="password">
        Password<span className="required">*</span>
      </label>
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createInputDefault()}
          {!!form.password.length && !isValidPassword() && (
            <p className="validation">
              Use one digit, one uppercase letter, one lowercase letter, and one
              special character
            </p>
          )}
        </>
      )}
    </div>
  );
}
