import { type JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function AcceptField(props: InputField): JSX.Element {
  const { setFormData } = useFormStore((state) => state);
  const error = props.formState?.errors.accept;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = !!event.target.checked;
    setFormData('accept', value);
  };

  const createInputDefault = () => {
    return (
      <input
        id="accept"
        type="checkbox"
        name="accept"
        onChange={onChange}
        required={true}
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
      {props.formState && error && (
        <p className="validation">{error.message}</p>
      )}
    </div>
  );
}
