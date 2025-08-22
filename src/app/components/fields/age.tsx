import type { JSX } from 'react';
import type { InputField } from '../../../types/common';
import { useFormStore } from '../../store/useFormStore';

export function AgeField(props: InputField): JSX.Element {
  const { form, isValidAge } = useFormStore((state) => state);
  const error = props.formState?.errors.age;

  const createInputDefault = () => {
    return (
      <input
        id="age"
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={props.onChange}
        required={true}
        min={0}
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
          validate: () =>
            !isValidAge() ? 'Should be number, no negative values' : true,
        })}
      />
    );
  };

  return (
    <div className="wrapper-input">
      <label htmlFor="age">
        Age<span className="required">*</span>
      </label>
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>
          {createInputDefault()}
          {!isValidAge() && (
            <p className="validation">Should be number, no negative values</p>
          )}
        </>
      )}
    </div>
  );
}
