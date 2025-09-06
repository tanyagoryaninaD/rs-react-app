import { describe, it, expect } from 'vitest';
import { convertToBase64 } from '../../utils/helpers';

describe('convertToBase64: ', () => {
  it('should convert text file', async () => {
    const file = new File(['content'], 'test.png', {
      type: 'image/png',
    });

    const result = await convertToBase64(file);

    expect(result).toContain('data:image/png;base64');
  });
});
