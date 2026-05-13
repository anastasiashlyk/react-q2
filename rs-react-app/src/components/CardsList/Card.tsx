import React from 'react';
import { CardInfo } from '../../types/pokeapi_types';
import './index.css';

type CardProps = {
  info: CardInfo;
};

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="card">
        {this.props.info.image && (
          <img src={this.props.info.image} alt={this.props.info.name} />
        )}
        <h3>Name: {this.props.info.name}</h3>
        <p>Height: {this.props.info.height}</p>
        <p>Weight: {this.props.info.weight}</p>
      </div>
    );
  }
}

export default Card;
