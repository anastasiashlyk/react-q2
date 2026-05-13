import React from 'react';

import { CardInfo } from '../../types/pokeapi_types';
import Card from './Card';
import Loader from '../Loader/Loader';

interface Props {
  results: CardInfo[];
  isLoading: boolean;
  error: string | null;
}

class CardsList extends React.Component<Props> {
  render() {
    const { results, isLoading, error } = this.props;
    if (isLoading) return <Loader />;
    if (error) return <p className="cardList-message error">{error}</p>;
    if (results.length === 0)
      return <p className="cardList-message">No matches</p>;

    return (
      <ul className="cardList">
        {results.map((item) => (
          <li key={item.id}>
            <Card info={item}></Card>
          </li>
        ))}
      </ul>
    );
  }
}

export default CardsList;
