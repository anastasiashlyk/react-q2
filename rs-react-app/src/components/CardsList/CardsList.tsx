import { CardInfo } from '../../types/pokeapi_types';
import Card from './Card';
import Loader from '../Loader/Loader';

interface Props {
  results: CardInfo[];
  isLoading: boolean;
  error: string | null;
}

function CardsList(props: Props) {
  if (props.isLoading) return <Loader />;
  if (props.error)
    return <p className="cardList-message error">{props.error}</p>;
  if (props.results.length === 0)
    return <p className="cardList-message">No matches</p>;
  return (
    <ul className="cardList">
      {props.results.map((item) => (
        <li key={item.id}>
          <Card info={item}></Card>
        </li>
      ))}
    </ul>
  );
}

export default CardsList;
