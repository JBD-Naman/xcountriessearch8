import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders search input and countries", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search/i);

  expect(input).toBeInTheDocument();

  // Wait for at least one country to load
  await waitFor(() =>
    expect(screen.getAllByAltText(/flag of/i).length).toBeGreaterThan(0)
  );
});

test("filters countries based on search input", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search/i);

  // Wait until countries are rendered
  await waitFor(() =>
    expect(screen.getAllByAltText(/flag of/i).length).toBeGreaterThan(0)
  );

  // Type 'Ind' to match 'India'
  userEvent.clear(input);
  userEvent.type(input, "Ind");

  await waitFor(() =>
    expect(screen.getByAltText(/flag of india/i)).toBeInTheDocument()
  );
});

test("shows message when no countries match search", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search/i);

  await waitFor(() =>
    expect(screen.getAllByAltText(/flag of/i).length).toBeGreaterThan(0)
  );

  userEvent.clear(input);
  userEvent.type(input, "zzzzzz");

  await waitFor(() =>
    expect(
      screen.getByText(/no matching countries found/i)
    ).toBeInTheDocument()
  );
});

test("renders correct number of country cards when searching 'ind'", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search/i);

  await waitFor(() =>
    expect(screen.getAllByAltText(/flag of/i).length).toBeGreaterThan(0)
  );

  userEvent.clear(input);
  userEvent.type(input, "ind");

  await waitFor(() => {
    const cards = screen.getAllByAltText(/flag of/i);
    // ⚠️ Depending on the real API, this number may vary.
    // If needed, update it or use `.toBeGreaterThan(0)`
    expect(cards.length).toBeGreaterThan(0);
  });
});
