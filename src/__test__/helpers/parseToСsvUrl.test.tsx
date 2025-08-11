import { describe, expect, it, vi } from 'vitest';
import { parseToСsvUrl } from '../../utils/helpers';
import { mockPokemons } from '../mocks/data';

describe('parseToСsvUrl: ', () => {
  it('should return parse data', () => {
    const globalMethod = global.URL.createObjectURL;
    global.URL.createObjectURL = vi.fn();

    parseToСsvUrl(mockPokemons);

    const headers = 'name,id,image,abilities,moves';
    const rows = [
      `"${mockPokemons.bulbasaur.name}","${mockPokemons.bulbasaur.id}","${mockPokemons.bulbasaur.image}","${mockPokemons.bulbasaur.abilities.join(', ')}","${mockPokemons.bulbasaur.moves.join(', ')}"`,
      `"${mockPokemons.ivysaur.name}","${mockPokemons.ivysaur.id}","${mockPokemons.ivysaur.image}","${mockPokemons.ivysaur.abilities.join(', ')}","${mockPokemons.ivysaur.moves.join(', ')}"`,
    ].join('\n');

    const blob = new Blob([`${headers}\n${rows}`], {
      type: 'text/csv;charset=utf-8;',
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    global.URL.createObjectURL = globalMethod;
  });

  it('should return empty string', () => {
    const result = parseToСsvUrl(null);

    expect(result).toBe('');
  });
});
