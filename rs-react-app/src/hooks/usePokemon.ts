import { useEffect, useState } from 'react';
import { CardInfo } from '../types/pokeapi_types';
import { getPokemonByName, getPokemonList } from '../api/requests';
import { PAGE_SIZE } from '../constants/consts';

interface UsePokemonResult {
  results: CardInfo[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

function usePokemon(searchTerm: string, page: number): UsePokemonResult {
  const [results, setResults] = useState<CardInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData(term: string, page: number) {
      setIsLoading(true);
      setError(null);
      try {
        const data = term
          ? await getPokemonByName(term)
          : await getPokemonList(PAGE_SIZE, (page - 1) * PAGE_SIZE);
        setResults(data.items);
        setIsLoading(false);
        setTotal(data.total);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';

        setResults([]);
        setIsLoading(false);
        setError(message);
      }
    }
    loadData(searchTerm, page);
  }, [searchTerm, page]);

  return {results, total, isLoading, error};
}

export default usePokemon;