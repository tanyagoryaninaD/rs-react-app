import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { App } from '../App';

describe('store', () => {
  it('renders without error', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen);
  });
});
