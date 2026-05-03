type Pokemon = {
  name: string;
  url: string;
}

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Pokemon>;
}

export type PokemonDetailsResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

export type CardInfo = {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}