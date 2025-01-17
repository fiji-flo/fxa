/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import 'mutationobserver-shim';
import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { mockAppContext, renderWithRouter } from '../../models/mocks';
import { Account, AppContext } from '../../models';
import { PageRecoveryKeyAdd } from '.';

jest.mock('base32-encode', () =>
  jest.fn().mockReturnValue('00000000000000000000000000000000')
);

const account = {
  primaryEmail: {
    email: 'johndope@example.com',
  },
  createRecoveryKey: jest.fn().mockResolvedValue(new Uint8Array(20)),
} as unknown as Account;

window.URL.createObjectURL = jest.fn();

describe('PageRecoveryKeyAdd', () => {
  it('renders as expected', () => {
    renderWithRouter(
      <AppContext.Provider value={mockAppContext({ account })}>
        <PageRecoveryKeyAdd />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('recovery-key-input').textContent).toContain(
      'Enter password'
    );
    expect(screen.getByTestId('cancel-button').textContent).toContain('Cancel');
    expect(screen.getByTestId('continue-button').textContent).toContain(
      'Continue'
    );
  });

  it('Enables "continue" button once input is valid', async () => {
    renderWithRouter(
      <AppContext.Provider value={mockAppContext({ account })}>
        <PageRecoveryKeyAdd />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('continue-button')).toBeDisabled();

    await act(async () => {
      const input = screen.getByTestId('input-field');
      await fireEvent.input(input, { target: { value: 'myFavPassword' } });
    });

    expect(screen.getByTestId('continue-button')).toBeEnabled();
  });

  it('Does not Enable "continue" button if validation fails', async () => {
    renderWithRouter(
      <AppContext.Provider value={mockAppContext({ account })}>
        <PageRecoveryKeyAdd />
      </AppContext.Provider>
    );

    await act(async () => {
      const input = screen.getByTestId('input-field');
      await fireEvent.input(input, { target: { value: '2short' } });
    });

    expect(screen.getByTestId('continue-button')).toBeDisabled();
  });

  it('Generates a recovery key on submit', async () => {
    renderWithRouter(
      <AppContext.Provider value={mockAppContext({ account })}>
        <PageRecoveryKeyAdd />
      </AppContext.Provider>
    );

    await act(async () => {
      const input = screen.getByTestId('input-field');
      await fireEvent.input(input, { target: { value: 'myFavPassword' } });
    });

    await act(async () => {
      await fireEvent.click(screen.getByTestId('continue-button'));
    });

    expect(screen.getByTestId('recover-key-confirm')).toBeVisible();
    expect(screen.getByTestId('datablock')).toHaveTextContent(
      '0000 0000 0000 0000 0000 0000 0000 0000'
    );
    expect(screen.getByTestId('databutton-copy')).toBeEnabled();
    expect(screen.getByTestId('close-button')).toBeEnabled();
  });
});
