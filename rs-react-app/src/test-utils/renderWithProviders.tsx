import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice';
import { ReactElement } from 'react';

export function renderWithProviders(ui: ReactElement) {
  const store = configureStore({
    reducer: { selectedItems: selectedItemsReducer },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}
