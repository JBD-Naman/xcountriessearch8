import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mocking fetch to avoid actual API calls
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { name: 'India', flag: 'https://flagcdn.com/in.svg' },
          { name: 'Canada', flag: 'https://flagcdn.com/ca.svg' },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the search input field', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/search/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders country cards after fetching', async () => {
  render(<App />);
  const indiaFlag = await screen.findByAltText(/flag of india/i);
  expect(indiaFlag).toBeInTheDocument();
});

test('filters countries based on search input', async () => {
  render(<App />);
  await screen.findByAltText(/flag of india/i);

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.type(input, 'Can');

  await waitFor(() => {
    expect(screen.getByAltText(/flag of canada/i)).toBeInTheDocument();
  });

  expect(screen.queryByAltText(/flag of india/i)).not.toBeInTheDocument();
});

test('shows nothing when search does not match any country', async () => {
  render(<App />);
  await screen.findByAltText(/flag of india/i);

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.clear(input);
  userEvent.type(input, 'xyz');

  await waitFor(() => {
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });
});
