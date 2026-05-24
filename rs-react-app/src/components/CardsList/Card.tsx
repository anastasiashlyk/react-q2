import { CardInfo } from '../../types/pokeapi_types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import './index.css';

type CardProps = {
  info: CardInfo;
  currentPage: number;
};

function Card(props: CardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selectedItems.some((item: CardInfo) => item.id === props.info.id)
  );

  function handleClick() {
    navigate(`/details/${props.info.name}?page=${props.currentPage}`);
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    if (e.target.checked) {
      dispatch(addItem(props.info));
    } else {
      dispatch(removeItem(props.info.id));
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
      />
      {props.info.image && <img src={props.info.image} alt={props.info.name} />}
      <h3>Name: {props.info.name}</h3>
      <p>Height: {props.info.height}</p>
      <p>Weight: {props.info.weight}</p>
    </div>
  );
}

export default Card;
