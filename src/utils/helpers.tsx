import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
import type { MyPokemon } from '../types/interfaces';

export function parsePokemonPageData(
  data?: NamedApiResourceList<Pokemon>
): MyPokemon[] {
  if (!data) {
    return [] as MyPokemon[];
  }

  return data.results.map((item) => parsePokemonData(item));
}

export function parsePokemonData(data?: Pokemon): MyPokemon {
  if (!data) {
    return {} as MyPokemon;
  }

  return {
    name: data.name,
    id: data.id,
    image:
      data.sprites?.other?.dream_world?.front_default ||
      data.sprites?.front_default,
    abilities: Array.isArray(data.abilities)
      ? data.abilities.map((item) => item.ability.name).slice(0, 5)
      : [],
    moves: Array.isArray(data.moves)
      ? data.moves.map((item) => item.move.name).slice(0, 5)
      : [],
  };
}

export function upperFirstLetter(value?: string): string {
  if (!value) {
    return '';
  }

  return value[0].toUpperCase() + value.slice(1);
}

export function parseToСsvUrl(data: MyPokemon[]): string {
  if (!data.length) {
    return '';
  }

  const headers = Object.keys(data[0]).join(',');

  const rows = Object.values(data)
    .map((item) => {
      const abilities = item.abilities?.join(', ');
      const moves = item.moves?.join(', ');

      return [item.name, item.id, item.image, abilities, moves]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    })
    .join('\n');

  const blob = new Blob([`${headers}\n${rows}`], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  return url;
}

export function isListPokemon(
  data: Pokemon | NamedApiResourceList<Pokemon> | undefined
): data is NamedApiResourceList<Pokemon> {
  if (!data) {
    return false;
  }

  return (data as NamedApiResourceList<Pokemon>).results !== undefined;
}
