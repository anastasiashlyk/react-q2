import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getPokemonByName } from '../../api/requests';
import { useState, useEffect } from 'react';
import type { CardInfo } from '../../types/pokeapi_types';
import Loader from '../Loader/Loader';
import './index.css';

function Details() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  function handleClose() {
    navigate(`/?${searchParams.toString()}`);
  }

  if (isLoading) return <Loader />;
  if (error) throw new Error('Can not load pokemon data.');

  return (
    <div className="details">
      <button className="details-close" onClick={handleClose}>
        ✕
      </button>
      <img className="details-image" src={data?.image} alt={data?.name} />
      <h3 className="details-name">{data?.name}</h3>
      <div className="details-stats">
        <div className="details-stat">
          <span className="details-stat-label">Height</span>
          <span className="details-stat-value">{data?.height}</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-label">Weight</span>
          <span className="details-stat-value">{data?.weight}</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-label">ID</span>
          <span className="details-stat-value">#{data?.id}</span>
        </div>
      </div>
    </div>
  );
}

export default Details;
