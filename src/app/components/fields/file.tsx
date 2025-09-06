import { type JSX } from 'react';
import type { InputField } from '../../../types/form';
import { getError } from '../../../utils/helpers';

export function FileField(props: InputField): JSX.Element {
  const errorMessage = getError({
    key: 'file',
    formState: props.formState,
    errors: props.errors,
  });

  return (
    <div className="wrapper-input">
      <label htmlFor="file">
        Choose a profile picture:<span className="required">*</span>
      </label>
      <input
        id="file"
        type="file"
        accept=".jpeg, .png"
        name="file"
        data-testid="file"
        {...props.register?.('file', {})}
      />
      {!!errorMessage && (
        <p className="validation" data-testid="file-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
