import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomButton from '../ButtonCustom';

describe('CustomButton', () => {
  it('deve renderizar com a label fornecida', () => {
    render(<CustomButton label="Click Me" />);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<CustomButton label="Click Me" onClick={handleClick} />);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
