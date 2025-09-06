import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
import type { MyPokemon } from '../types/pokemon-components';

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

export async function downloadCsv(data: MyPokemon[]): Promise<void> {
  if (!data.length) {
    return;
  }

  const response = await fetch('/api', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.length}_items.csv`;
  link.click();
}

export function isListPokemon(
  data: Pokemon | NamedApiResourceList<Pokemon> | undefined
): data is NamedApiResourceList<Pokemon> {
  if (!data) {
    return false;
  }

  return (data as NamedApiResourceList<Pokemon>).results !== undefined;
}
