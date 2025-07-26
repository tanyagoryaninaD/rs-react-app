import { describe, it, expect } from 'vitest';
import { upperFirstLetter } from '../../utils/helpers';

describe('upperFirstLetter:', () => {
  it('raise up the first letter', () => {
    const result = upperFirstLetter('name');

    expect(result).toBe('Name');
  });
});
