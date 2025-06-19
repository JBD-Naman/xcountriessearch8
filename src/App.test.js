import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders search input and countries", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search/i);

  // Wait for any country flag to appear (indicating API loaded)
  await waitFor(() => expect(screen.getByAltText(/flag of/i)).toBeInTheDocument());

  expect(input).toBeInTheDocument();
});

test("filters countries based on search input", async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByAltText(/flag of/i)).toBeInTheDocument());

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.type(input, "Ind");

  await waitFor(() => {
    expect(screen.getByAltText(/flag of india/i)).toBeInTheDocument();
  });
});

test("shows message when no countries match search", async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByAltText(/flag of/i)).toBeInTheDocument());

  const input = screen.getByPlaceholderText(/search/i);
  userEvent.clear(input);
  userEvent.type(input, "zzzzzz");

  await waitFor(() => {
    expect(screen.getByText(/no matching countries found/i)).toBeInTheDocument();
  });
});
