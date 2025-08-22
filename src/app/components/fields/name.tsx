import type { JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function NameField(props: InputField): JSX.Element {
  const { form, isValidName } = useFormStore((state) => state);

  const error = props.formState?.errors.name;

  const createInputDefault = () => {
    return (
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={props.onChange}
        required={true}
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
          validate: () =>
            !isValidName() ? 'The first letter must be uppercase' : true,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="name">
        Name<span className="required">*</span>
      </label>
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createInputDefault()}
          {!!form.name.length && !isValidName() && (
            <p className="validation">The first letter must be uppercase</p>
          )}
        </>
      )}
    </div>
  );
}
