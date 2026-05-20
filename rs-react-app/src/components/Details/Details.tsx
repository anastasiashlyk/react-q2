import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import usePokemon from '../../hooks/usePokemon';
import Loader from '../Loader/Loader';
import './index.css';

function Details() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { results, isLoading, error } = usePokemon(name ?? '', 1);

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
      <img
        className="details-image"
        src={results[0].image}
        alt={results[0].name}
      />
      <h3 className="details-name">{results[0].name}</h3>
      <div className="details-stats">
        <div className="details-stat">
          <span className="details-stat-label">Height</span>
          <span className="details-stat-value">{results[0].height}</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-label">Weight</span>
          <span className="details-stat-value">{results[0].weight}</span>
        </div>
        <div className="details-stat">
          <span className="details-stat-label">ID</span>
          <span className="details-stat-value">#{results[0].id}</span>
        </div>
      </div>
    </div>
  );
}

export default Details;
