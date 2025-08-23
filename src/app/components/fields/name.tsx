import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function NameField(props: InputField): JSX.Element {
  const { form } = useFormStore((state) => state);

  const error = props.formState?.errors.name || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={props.onChange}
        autoComplete="name"
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="name"
        type="text"
        placeholder="Name"
        autoComplete="name"
        {...props.register?.('name', {
          required: 'This field is required',
          onChange: props.onChange,
          value: form.name,
          validate: () => !!error,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="name">
        Name<span className="required">*</span>
      </label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
