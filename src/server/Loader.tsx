class Loader {
  private static instance: Loader | null = null;
  private readonly server: string;
  private limit: number;
  private offset: number;

  constructor() {
    this.server = 'https://pokeapi.co/api/v2/';
    this.limit = 10;
    this.offset = 0;
  }

  public static getInstance(): Loader {
    if (!this.instance) {
      this.instance = new Loader();
    }

    return this.instance;
  }

  public async getPokemon(pokemon: string): Promise<Response> {
    const response = await fetch(
      `${this.server}/pokemon/${pokemon.trim()}/?limit=${this.limit}&offset=${this.offset}}`
    );

    console.log('🚀 ~ Loader ~ getPokemon ~ response:', response);
    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error('Problems on the server side');
      }

      throw new Error('No results found');
    }

    return response;
  }
}

export default Loader;
