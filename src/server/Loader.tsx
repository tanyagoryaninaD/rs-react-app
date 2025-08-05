import type { NamedApiResource, Pokemon } from 'pokeapi-typescript';
import type { GetPokemon, MyPokemon } from '../types/interfaces';
import { parsePokemonData } from '../utils/helpers';

export async function getPokemon(data: GetPokemon): Promise<MyPokemon[]> {
  let response: Response;

  if (data.query) {
    response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${data.query.trim()}`
    );
  } else {
    response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${data.page ? Math.max(0, (data.page - 1) * 10) : 0}`
    );
  }

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error('Problems on the server side');
    }

    throw new Error('No results found');
  }

  return parseResponse(response);
}

async function parseResponse(response: Response): Promise<MyPokemon[]> {
  const json = await response.json();

  let results: MyPokemon[] = [];

  if (json.results) {
    results = await Promise.all(
      json.results.map(async (item: NamedApiResource<Pokemon>) => {
        const result = await getPokemon({ query: item.name });
        return result[0];
      })
    );
  } else {
    results = [parsePokemonData(json)];
  }

  const uniqueResults = results.filter(
    (item, index, array) => index === array.findIndex((i) => i.id === item.id)
  );

  return uniqueResults;
}
