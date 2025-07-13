import type { NamedApiResource, Pokemon } from 'pokeapi-typescript';
import type { ParsedPokemon } from '../types/types';

export function parsePokemonData(
  data: NamedApiResource<Pokemon>[]
): ParsedPokemon[] {
  if (!data) {
    return [];
  }
  return data.map((item) => ({
    name: item.name,
    id: getIdFromUrl(item.url),
  }));
}

function getIdFromUrl(url: string): string {
  const parts = url.split('/').filter((part) => part !== '');
  return parts[parts.length - 1];
}
