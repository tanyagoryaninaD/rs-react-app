import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function EmailField(props: InputField): JSX.Element {
  const { form, isValidEmail } = useFormStore((state) => state);
  const error = props.formState?.errors.email;

  const createInputDefault = () => {
    return (
      <input
        id="email"
        type="text"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={props.onChange}
        required={true}
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
          validate: () => (!isValidEmail() ? 'Invalid email' : true),
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="email">
        Email<span className="required">*</span>
      </label>
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createInputDefault()}
          {!!form.email.length && !isValidEmail() && (
            <p className="validation">Invalid email</p>
          )}
        </>
      )}
    </div>
  );
}
