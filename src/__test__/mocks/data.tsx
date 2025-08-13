import type {
  MyPokemon,
  PokemonListContextProps,
  PokemonListContextState,
} from '../../types/interfaces';
import { updateContext } from './mocks';

type MockPokemon = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string | null;
      };
    };
  };
  abilities:
    | {
        ability: {
          name: string;
        };
      }[]
    | undefined;
  moves:
    | {
        move: {
          name: string;
        };
      }[]
    | undefined;
};

export const bulbasaurResponse: MockPokemon = {
  name: 'bulbasaur',
  id: 1,
  sprites: {
    front_default: 'front_default.png',
    other: {
      dream_world: {
        front_default: 'dream_world.svg',
      },
    },
  },
  abilities: [
    { ability: { name: 'ability-1' } },
    { ability: { name: 'ability-2' } },
    { ability: { name: 'ability-3' } },
    { ability: { name: 'ability-4' } },
    { ability: { name: 'ability-5' } },
    { ability: { name: 'ability-6' } },
  ],
  moves: [
    { move: { name: 'move-1' } },
    { move: { name: 'move-2' } },
    { move: { name: 'move-3' } },
    { move: { name: 'move-4' } },
    { move: { name: 'move-5' } },
    { move: { name: 'move-6' } },
  ],
};

export const ivysaurResponse: MockPokemon = {
  name: 'ivysaur',
  id: 2,
  sprites: {
    front_default: 'front_default.png',
    other: {
      dream_world: {
        front_default: null,
      },
    },
  },
  abilities: [
    { ability: { name: 'ability-1' } },
    { ability: { name: 'ability-2' } },
    { ability: { name: 'ability-3' } },
    { ability: { name: 'ability-4' } },
    { ability: { name: 'ability-5' } },
    { ability: { name: 'ability-6' } },
  ],
  moves: [
    { move: { name: 'move-1' } },
    { move: { name: 'move-2' } },
    { move: { name: 'move-3' } },
    { move: { name: 'move-4' } },
    { move: { name: 'move-5' } },
    { move: { name: 'move-6' } },
  ],
};

export const bulbasaur = {
  name: 'bulbasaur',
  id: 1,
  image: 'dream_world.svg',
  abilities: ['ability-1', 'ability-2', 'ability-3', 'ability-4', 'ability-5'],
  moves: ['move-1', 'move-2', 'move-3', 'move-4', 'move-5'],
};

export const ivysaur = {
  name: 'ivysaur',
  id: 2,
  image: 'front_default.png',
  abilities: ['ability-1', 'ability-2', 'ability-3', 'ability-4', 'ability-5'],
  moves: ['move-1', 'move-2', 'move-3', 'move-4', 'move-5'],
};

export const mockResults = [bulbasaur, ivysaur];

export const contextStateMock: PokemonListContextState = {
  query: '',
  currentApiRequest: null,
  results: [],
  page: null,
  pageNext: null,
  pagePrev: null,
  details: null,
  loading: false,
  error: null,
};

export const contextMock: PokemonListContextProps = {
  ...contextStateMock,
  updateContext,
};

export const selectedItems: MyPokemon[] = [];
