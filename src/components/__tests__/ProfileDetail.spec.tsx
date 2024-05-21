import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ProfileDetail from '../ProfileDetail';

describe('ProfileDetail', () => {
  it('deve renderizar o componente com os valores fornecidos', () => {
    const label = 'Nome';
    const value = 'João Silva';

    const { getByText } = render(<ProfileDetail label={label} value={value} />);

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(value)).toBeInTheDocument();
  });
});
