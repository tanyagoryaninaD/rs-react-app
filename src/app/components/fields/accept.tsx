import { type JSX } from 'react';
import type { InputField } from '../../../types/common';
import { getError } from '../../../utils/helpers';

export function AcceptField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'accept',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <div>
        <input
          id="accept"
          type="checkbox"
          name="accept"
          {...props.register?.('accept', {})}
        />
        <label htmlFor="accept">
          I Accept the Terms and Conditions<span className="required">*</span>
        </label>
      </div>
      {!!errorMessage && <p className="validation">{errorMessage}</p>}
    </div>
  );
}
