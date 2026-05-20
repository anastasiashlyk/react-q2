import { CardInfo } from '../../types/pokeapi_types';
import { useNavigate } from 'react-router-dom';
import './index.css';

type CardProps = {
  info: CardInfo;
  currentPage: number;
};

function Card(props: CardProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/details/${props.info.name}?page=${props.currentPage}`);
  }
  return (
    <div className="card" onClick={handleClick}>
      {props.info.image && <img src={props.info.image} alt={props.info.name} />}
      <h3>Name: {props.info.name}</h3>
      <p>Height: {props.info.height}</p>
      <p>Weight: {props.info.weight}</p>
    </div>
  );
}

export default Card;
