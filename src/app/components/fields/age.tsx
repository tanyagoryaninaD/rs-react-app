import type { JSX } from 'react';
import type { InputField } from '../../../types/common';
import { useFormStore } from '../../store/useFormStore';

export function AgeField(props: InputField): JSX.Element {
  const { form } = useFormStore((state) => state);

  const error = props.formState?.errors.age || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <input
        id="age"
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={props.onChange}
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="age"
        type="number"
        placeholder="Age"
        {...props.register?.('age', {
          required: 'This field is required',
          onChange: props.onChange,
          value: form.age,
          validate: () => !!error,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="age">
        Age<span className="required">*</span>
      </label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
