import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonFacebook from '../ButtonFacebook';

test('should render the Facebook button', () => {
  render(
    <MemoryRouter>
      <ButtonFacebook />
    </MemoryRouter>,
  );
  const button = screen.getByTestId('facebook-button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Facebook');
  expect(button).toContainHTML('svg');
});
