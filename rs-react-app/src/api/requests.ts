import type {
  CardInfo,
  PokemonListResponse,
  PokemonDetailsResponse,
} from "../types/pokeapi_types";

export async function getPokemonList(
  limit: number,
  offset: number,
): Promise<{ items: CardInfo[]; total: number }> {
  const aux = await fetchJson<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const results: CardInfo[] = await Promise.all(
    aux.results.map((item) => getPokemonByNameAux(item.name)),
  );
  return { items: results, total: aux.count };
}

async function getPokemonByNameAux(name: string): Promise<CardInfo> {
  const pokemon: PokemonDetailsResponse =
    await fetchJson<PokemonDetailsResponse>(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
  return toCard(pokemon);
}

export async function getPokemonByName(
  name: string,
): Promise<{ items: CardInfo[]; total: number }> {
  const data = await getPokemonByNameAux(name);
  return { items: [data], total: 1 };
}

async function fetchJson<T>(url: string): Promise<T> {
  console.log("Fetching:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ooops fallo`);
  }
  return await response.json();
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
