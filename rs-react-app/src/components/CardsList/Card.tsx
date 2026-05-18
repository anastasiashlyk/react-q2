import { CardInfo } from '../../types/pokeapi_types';
import './index.css';

type CardProps = {
  info: CardInfo;
};

function Card (props: CardProps){
  return (
      <div className="card">
        {props.info.image && (
          <img src={props.info.image} alt={props.info.name} />
        )}
        <h3>Name: {props.info.name}</h3>
        <p>Height: {props.info.height}</p>
        <p>Weight: {props.info.weight}</p>
      </div>
    );
}

export default Card;
