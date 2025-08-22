import { type JSX } from 'react';
import { useFormStore } from '../../store/useFormStore';
import type { InputField } from '../../../types/common';

export function GenderField(props: InputField): JSX.Element {
  const { setFormData } = useFormStore((state) => state);
  const error = props.formState?.errors.gender;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setFormData('gender', value);
  };

  const createInputDefault = () => {
    return (
      <>
        <div>
          <input
            id="man"
            type="radio"
            name="gender"
            onChange={onChange}
            required={true}
          />
          <label htmlFor="man">Man</label>
        </div>
        <div>
          <input
            id="woman"
            type="radio"
            name="gender"
            onChange={onChange}
            required={true}
          />
          <label htmlFor="woman">Woman</label>
        </div>
      </>
    );
  };

  const createInputReactHook = () => {
    return (
      <>
        <div>
          <input
            id="man"
            type="radio"
            name="gender"
            {...props.register?.('gender', {
              required: 'This field is required',
              onChange: props.onChange,
            })}
          />
          <label htmlFor="man">Man</label>
        </div>
        <div>
          <input
            id="woman"
            type="radio"
            name="gender"
            {...props.register?.('gender', {
              required: 'This field is required',
              onChange: props.onChange,
            })}
          />
          <label htmlFor="woman">Woman</label>
        </div>
      </>
    );
  };

  return (
    <div className="wrapper-input">
      <legend>
        Gender<span className="required">*</span>
      </legend>
      {props.formState ? (
        <>
          {createInputReactHook()}
          {error && <p className="validation">{error.message}</p>}
        </>
      ) : (
        <>{createInputDefault()}</>
      )}
    </div>
  );
}
