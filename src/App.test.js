import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders search input and countries", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search/i);

  // Wait until countries are fetched and rendered
  await waitFor(() => {
    const flag = screen.getByAltText(/flag of/i);
    expect(flag).toBeInTheDocument();
  });

  expect(input).toBeInTheDocument();
});

test("filters countries based on search input", async () => {
  render(<App />);

  // Wait for the list to load
  await waitFor(() => {
    expect(screen.getByAltText(/flag of/i)).toBeInTheDocument();
  });

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.clear(input);
  userEvent.type(input, "ind");

  await waitFor(() => {
    const filtered = screen.getAllByAltText(/flag of/i);
    expect(filtered.length).toBeGreaterThan(0);
    expect(screen.getByAltText(/flag of india/i)).toBeInTheDocument();
  });
});

test("shows message when no countries match search", async () => {
  render(<App />);

  // Wait for countries to load
  await waitFor(() => {
    expect(screen.getByAltText(/flag of/i)).toBeInTheDocument();
  });

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.clear(input);
  userEvent.type(input, "zzzzzz");

  await waitFor(() => {
    expect(screen.getByText(/no matching countries found/i)).toBeInTheDocument();
  });
});

test("renders correct number of country cards when searching 'ind'", async () => {
  render(<App />);

  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByAltText(/flag of/i)).toBeInTheDocument();
  });

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.clear(input);
  userEvent.type(input, "ind");

  await waitFor(() => {
    const cards = screen.getAllByRole("img", { name: /flag of/i });
    // You may adjust this number if exact match count changes in API
    expect(cards.length).toBe(3);
  });
});
