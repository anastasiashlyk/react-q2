import type { CardInfo, PokemonListResponse, PokemonDetailsResponse } from "../types/pokeapi_types";

export async function getPokemonList (limit: number, offset: number) : Promise<CardInfo[]>{
  const aux = await fetchJson<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const results: CardInfo[] = await Promise.all(aux.results.map(item => getPokemonByName(item.name)));
  return results;
}


export async function getPokemonByName (name : string) : Promise<CardInfo>{
  const pokemon: PokemonDetailsResponse = await fetchJson<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/${name}`);
  return toCard(pokemon);
}

async function fetchJson<T>(url: string) : Promise<T>{
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}`);
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