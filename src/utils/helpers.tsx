import type { Pokemon } from 'pokeapi-typescript';
import type { MyPokemon } from '../types/interfaces';

export function parsePokemonData(data: Pokemon): MyPokemon {
  return {
    name: data.name,
    id: data.id,
    image:
      data.sprites.other.dream_world.front_default ||
      data.sprites.front_default,
    abilities:
      data.abilities.map((item) => item.ability.name).slice(0, 5) || [],
    moves: data.moves.map((item) => item.move.name).slice(0, 5) || [],
  };
}

export function upperFirstLetter(value: string): string {
  return value[0].toUpperCase() + value.slice(1);
}
