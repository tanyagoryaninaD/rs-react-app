import { type JSX } from 'react';
import type { InputField } from '../../../types/common';

export function GenderField(props: InputField): JSX.Element {
  const error = props.formState?.errors.gender || props.error;
  const errorMessage =
    typeof error === 'boolean' ? props.errorMessage : error?.message;

  const createInputDefault = () => {
    return (
      <>
        <div>
          <input
            id="man"
            type="radio"
            name="gender"
            onChange={props.onChange}
          />
          <label htmlFor="man">Man</label>
        </div>
        <div>
          <input
            id="woman"
            type="radio"
            name="gender"
            onChange={props.onChange}
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
            {...props.register?.('gender', {
              required: 'This field is required',
              onChange: props.onChange,
              validate: () => !!error,
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
      {props.formState ? createInputReactHook() : createInputDefault()}
      {error && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
