import { useParams } from 'react-router-dom';
import { getPokemonByName } from '../../api/requests';
import { useState, useEffect } from 'react';
import type { CardInfo } from '../../types/pokeapi_types';
import Loader from '../Loader/Loader';

function Details() {
  const { name } = useParams<{ name: string }>();

  const [data, setData] = useState<CardInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(name: string) {
      setIsLoading(true);
      try {
        const result = await getPokemonByName(name);
        setData(result.items[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error');
      } finally {
        setIsLoading(false);
      }
    }
    if (name) fetchData(name);
  }, [name]);

  if (isLoading) return <Loader />;
  if (error) throw new Error('Can not load pokemon data.');
  return (
    <div className="details">
      <div className="details-main">
        <img src="" />
        <h3>Name: {data?.name}</h3>
        <p>Height: {data?.height} </p>
        <p>Weight: {data?.weight}</p>
      </div>
    </div>
  );
}

export default Details;
