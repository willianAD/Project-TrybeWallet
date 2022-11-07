import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes iniciando página principal', () => {
  test('Verifica se existe um input com login e senha e um botão', () => {
    renderWithRouterAndRedux(<App />);

    const getEmail = screen.getByTestId('email-input');
    expect(getEmail).toBeInTheDocument();

    const getPassword = screen.getByTestId('password-input');
    expect(getPassword).toBeInTheDocument();

    const getButton = screen.getByRole('button');
    expect(getButton).toBeInTheDocument();
    expect(getButton.disabled).toBe(true);
  });

  test('Verifica se oa prencher os campos corretamente renderiza a pagina /carteira', () => {
    renderWithRouterAndRedux(<App />);

    const getEmail = screen.getByTestId('email-input');
    const getPassword = screen.getByTestId('password-input');
    const getButton = screen.getByRole('button');

    userEvent.type(getEmail, 'teste@trybe.com');
    userEvent.type(getPassword, '012345678');
    userEvent.click(getButton);

    const getUser = screen.getByTestId('email-field');
    expect(getUser).toBeInTheDocument();

    const getTotal = screen.getByTestId('total-field');
    expect(getTotal).toBeInTheDocument();

    const getCurrency = screen.getByTestId('header-currency-field');
    expect(getCurrency).toHaveTextContent('BRL');
  });
});
