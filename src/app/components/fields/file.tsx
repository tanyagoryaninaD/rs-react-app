import { type JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function FileField(props: InputField): JSX.Element {
  const { setFormData } = useFormStore((state) => state);
  const error = props.formState?.errors.file;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files?.[0] ?? null;
    setFormData('file', value);
  };

  const createInputDefault = () => {
    return (
      <input
        id="file"
        type="file"
        name="file"
        onChange={onChange}
        accept=".jpeg, .png"
      />
    );
  };

  const createInputReactHook = () => {
    return (
      <input
        id="file"
        type="file"
        accept=".jpeg, .png"
        {...props.register?.('file', {
          onChange: props.onChange,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="file">Choose a profile picture:</label>
      {props.formState ? createInputReactHook() : createInputDefault()}
      {props.formState && error && (
        <p className="validation">{error.message}</p>
      )}
    </div>
  );
}
