import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from './SearchBar';
import issueReducer from '../../redux/issues/slice';

const mockStore = configureStore({
  reducer: {
    issues: issueReducer,
  },
});

describe('SearchBar Component', () => {
  it('renders input field and search button', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/Enter GitHub repo URL/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Enter GitHub repo URL/i);
    fireEvent.change(input, {
      target: { value: 'https://github.com/facebook/react' },
    });

    expect(input).toHaveValue('https://github.com/facebook/react');
  });

  it('shows repository links after search', () => {
    render(
      <Provider store={mockStore}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Enter GitHub repo URL/i);
    fireEvent.change(input, {
      target: { value: 'https://github.com/facebook/react' },
    });
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('facebook')).toBeInTheDocument();
    expect(screen.getByText('repository')).toBeInTheDocument();
  });
});
