import { describe, expect, it, vi } from 'vitest';
import { parseToСsvUrl } from '../../utils/helpers';
import { mockResults } from '../mocks/data';

describe('parseToСsvUrl: ', () => {
  it('should return parse data', () => {
    const globalMethod = global.URL.createObjectURL;
    global.URL.createObjectURL = vi.fn();

    parseToСsvUrl(mockResults);

    const headers = 'name,id,image,abilities,moves';
    const rows = [
      `"${mockResults[0].name}","${mockResults[0].id}","${mockResults[0].image}","${mockResults[0].abilities.join(', ')}","${mockResults[0].moves.join(', ')}"`,
      `"${mockResults[1].name}","${mockResults[1].id}","${mockResults[1].image}","${mockResults[1].abilities.join(', ')}","${mockResults[1].moves.join(', ')}"`,
    ].join('\n');

    const blob = new Blob([`${headers}\n${rows}`], {
      type: 'text/csv;charset=utf-8;',
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    global.URL.createObjectURL = globalMethod;
  });

  it('should return empty string', () => {
    const result = parseToСsvUrl([]);

    expect(result).toBe('');
  });
});
