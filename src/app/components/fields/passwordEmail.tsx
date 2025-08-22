import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function RepeatPasswordField(props: InputField): JSX.Element {
  const { form, isValidRepeatPassword } = useFormStore((state) => state);
  const error = props.formState?.errors.repeatPassword;

  const createInputDefault = () => {
    return (
      <input
        id="repeat-password"
        type="password"
        placeholder="Repeat password"
        value={form.repeatPassword}
        onChange={props.onChange}
        required={true}
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="repeat-password"
        type="password"
        placeholder="Repeat password"
        {...props.register?.('repeatPassword', {
          required: 'This field is required',
          onChange: props.onChange,
          value: form.repeatPassword,
          validate: () =>
            !isValidRepeatPassword() ? `The password doesn't match` : true,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="repeat-password">
        Repeat password<span className="required">*</span>
      </label>
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createInputDefault()}
          {!!form.repeatPassword.length && !isValidRepeatPassword() && (
            <p className="validation">The password doesn&apos;t match</p>
          )}
        </>
      )}
    </div>
  );
}
