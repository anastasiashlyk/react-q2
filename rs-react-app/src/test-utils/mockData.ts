import { CardInfo } from '../types/pokeapi_types';

export const MOCK_CARD: CardInfo = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  image: 'https://example.com/bulbasaur.png',
};

export const MOCK_CARD_2: CardInfo = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  image: 'https://example.com/charmander.png',
};

export const MOCK_CARDS: CardInfo[] = [MOCK_CARD, MOCK_CARD_2];

export const MOCK_LIST_RESPONSE = { items: MOCK_CARDS, total: 1302 };

export const MOCK_SINGLE_RESPONSE = { items: [MOCK_CARD], total: 1 };
