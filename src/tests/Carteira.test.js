import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes na página /carteira todas as funcionalidades são renderizadas corretamente', () => {
  const inputValue = 'value-input';
  const inputDescription = 'description-input';
  test('Verifica se contém uma tabela com os textos corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const getValue = screen.getByTestId(inputValue);
    expect(getValue).toBeInTheDocument();

    const getDescription = screen.getByTestId(inputDescription);
    expect(getDescription).toBeInTheDocument();

    const getTable = screen.getByText('Descrição');
    expect(getTable).toBeInTheDocument();
    const getTable2 = screen.getByText('Tag');
    expect(getTable2).toBeInTheDocument();
    const getTable3 = screen.getByText('Método de pagamento');
    expect(getTable3).toBeInTheDocument();
    const getTable4 = screen.getByText('Valor');
    expect(getTable4).toBeInTheDocument();
    const getTable5 = screen.getByText('Moeda');
    expect(getTable5).toBeInTheDocument();
    const getTable6 = screen.getByText('Câmbio utilizado');
    expect(getTable6).toBeInTheDocument();
    const getTable7 = screen.getByText('Valor convertido');
    expect(getTable7).toBeInTheDocument();
    const getTable8 = screen.getByText('Moeda de conversão');
    expect(getTable8).toBeInTheDocument();
    const getTable9 = screen.getByText('Editar/Excluir');
    expect(getTable9).toBeInTheDocument();
  });

  test('Verifica se ao prencher os inputs corretamente é renderizado uma nova despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const getValue = screen.getByTestId(inputValue);
    const getDescription = screen.getByTestId(inputDescription);
    const getButton = screen.getByRole('button');
    expect(getButton).toBeInTheDocument();

    const getSelect = screen.getByTestId('currency-input');
    expect(getSelect).toBeInTheDocument();

    const getSelect2 = screen.getByTestId('method-input');
    expect(getSelect2).toBeInTheDocument();

    const getSelect3 = screen.getByTestId('tag-input');
    expect(getSelect3).toBeInTheDocument();

    await waitFor(() => {
      userEvent.selectOptions(getSelect3, 'Alimentação');
      userEvent.selectOptions(getSelect2, 'Dinheiro');
      userEvent.selectOptions(getSelect, 'USD');
      userEvent.type(getValue, '1000');
      userEvent.type(getDescription, 'Viagem');
      userEvent.click(getButton);

      userEvent.type(getValue, '500');
      userEvent.type(getDescription, 'Dívida');
      userEvent.click(getButton);
    });

    const getTag = await screen.findByText('Alimentação');
    expect(getTag).toBeInTheDocument();
    const getDescription1 = await screen.findByText('Viagem');
    expect(getDescription1).toBeInTheDocument();
    const getCurrency = await screen.findAllByText('Dólar Americano/Real Brasileiro');
    expect(getCurrency[0]).toBeInTheDocument();
    const getConversion = await screen.findAllByText('Real');
    expect(getConversion[0]).toBeInTheDocument();
    const getValue1 = await screen.findByText('1000.00');
    expect(getValue1).toBeInTheDocument();
  });

  test('Verifica se ao prencher os inputs corretamente é renderizado uma nova despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const getValue = screen.getByTestId(inputValue);
    const getDescription = screen.getByTestId(inputDescription);
    const getButton = screen.getByRole('button');

    const getSelect = screen.getByTestId('currency-input');

    await waitFor(() => {
      userEvent.selectOptions(getSelect, 'USD');
      userEvent.type(getValue, '1000');
      userEvent.type(getDescription, 'Viagem');
      userEvent.click(getButton);
    });

    const getValue1 = await screen.findByText('1000.00');
    expect(getValue1).toBeInTheDocument();

    const buttonEdit = await screen.findByTestId('edit-btn');
    expect(buttonEdit).toBeInTheDocument();
    userEvent.click(buttonEdit);
    userEvent.type(getValue, '5');
    userEvent.click(getButton);
    expect(screen.queryByText('1000.00')).not.toBeInTheDocument();
    const getValueEdited = await screen.findByText('10005.00');
    expect(getValueEdited).toBeInTheDocument();

    const buttonDelete = screen.getByTestId('delete-btn');
    expect(buttonDelete).toBeInTheDocument();
    userEvent.click(buttonDelete);
    expect(buttonDelete).not.toBeInTheDocument();
  });
});
