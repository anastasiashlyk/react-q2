import type {
  CardInfo,
  PokemonListResponse,
  PokemonDetailsResponse,
} from '../types/pokeapi_types';

export async function getPokemonList(
  limit: number,
  offset: number, 
  signal: AbortSignal
): Promise<{ items: CardInfo[]; total: number }> {
  const aux = await fetchJson<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, signal
  );
  const results: CardInfo[] = await Promise.all(
    aux.results.map((item) => getPokemonByNameAux(item.name, signal))
  );
  return { items: results, total: aux.count };
}

async function getPokemonByNameAux(name: string, signal: AbortSignal): Promise<CardInfo> {
  const pokemon: PokemonDetailsResponse =
    await fetchJson<PokemonDetailsResponse>(
      `https://pokeapi.co/api/v2/pokemon/${name}`, signal
    );
  return toCard(pokemon);
}

export async function getPokemonByName(
  name: string, signal: AbortSignal 
): Promise<{ items: CardInfo[]; total: number }> {
  const data = await getPokemonByNameAux(name, signal);
  return { items: [data], total: 1 };
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  console.log('Fetching:', url);
  const response = await fetch(url, {signal});

  if (!response.ok) {
    let message: string;
    switch (response.status) {
      case 400:
        message = 'Bad request. The URL is malformed.';
        break;
      case 404:
        message = 'Not found. The Pokémon you searched for does not exist.';
        break;
      case 429:
        message = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      case 504:
        message = 'Server is temporarily unavailable. Try again later.';
        break;
      default:
        message = `Unexpected error: ${response.status} ${response.statusText}`;
    }
    throw new Error(message);
  }

  return response.json();
}

function toCard(info: PokemonDetailsResponse): CardInfo {
  const details: CardInfo = {
    id: info.id,
    name: info.name,
    height: info.height,
    weight: info.weight,
    image: info.sprites.front_default,
  };

  return details;
}
