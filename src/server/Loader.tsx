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

  public async getResult(search: string): Promise<Response> {
    const response = await fetch(
      `${this.server}${search.trim()}/?limit=${this.limit}&offset=${this.offset}}`
    );

    if (!response.ok) {
      throw new Error();
    }

    return response;
  }
}

export default Loader;
