import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Board from './Board';
import issueReducer from '../../redux/issues/slice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      issues: issueReducer,
    },
    preloadedState: initialState,
  });
};

describe('Board Component', () => {
  it('renders all three columns', () => {
    const store = createMockStore({
      issues: {
        loading: false,
        error: null,
        currentRepo: 'Repo1',
        repositories: {
          Repo1: {
            issues: [], // Гарантуємо, що issues є масивом
            issueStates: {},
            columns: ['ToDo', 'InProgress', 'Done'],
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    // Перевіряємо наявність назв колонок
    expect(screen.getByText('ToDo')).toBeInTheDocument();
    expect(screen.getByText('InProgress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
