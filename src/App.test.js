/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import "@testing-library/jest-dom";
import App from "./App";

describe('Tic-Tac-Toe Game', () => {
    test('renders game status correctly', () => {
        const { getByText } = render(<App />);
        const statusElement = getByText(/Next player:/i);
        expect(statusElement).toBeInTheDocument();
    });

    // test('allows players to make moves and updates game status', () => {
    //     const { getByText } = render(<App />);
    //     const statusElement = getByText(/Next player:/i);
    //     const squareElement = getByText(/X/i);

    //     expect(statusElement).toHaveTextContent('Next player: X');
    //     fireEvent.click(squareElement);
    //     expect(statusElement).toHaveTextContent('Next player: O');
    // });

    test('declares a winner when a player wins the game', () => {
        const { getByText } = render(<App />);
        const statusElement = getByText(/Next player:/i);
        const squareElements = Array.from(document.querySelectorAll('.square'));

        fireEvent.click(squareElements[0]); // X
        fireEvent.click(squareElements[3]); // O
        fireEvent.click(squareElements[1]); // X
        fireEvent.click(squareElements[4]); // O
        fireEvent.click(squareElements[2]); // X

        expect(statusElement).toHaveTextContent('Winner: X');
    });

    test('prevents further moves after a player wins the game', () => {
        const { getByText } = render(<App />);
        const statusElement = getByText(/Next player:/i);
        const squareElements = Array.from(document.querySelectorAll('.square'));

        fireEvent.click(squareElements[0]); // X
        fireEvent.click(squareElements[3]); // O
        fireEvent.click(squareElements[1]); // X
        fireEvent.click(squareElements[4]); // O
        fireEvent.click(squareElements[2]); // X
        fireEvent.click(squareElements[5]);

        expect(statusElement).toHaveTextContent('Winner: X');
        expect(squareElements[5]).toHaveTextContent('');
    });
});
