import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('should render the input correctly', () => {
    const placeholder = 'Username';
    const value = 'john.doe';

    const { getByPlaceholderText } = render(
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={() => {}}
      />
    );

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeTruthy();
    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('value', value);
  });

  it('should call the onChange function when the input value is changed', async () => {
    let inputValue = '';
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      inputValue = e.target.value;
    };

    const { getByPlaceholderText } = render(
      <Input
        type="text"
        placeholder="Username"
        value={inputValue}
        onChange={onChange}
      />
    );

    const inputElement = getByPlaceholderText('Username');
    await fireEvent.change(inputElement, { target: { value: 'john.doe' } });

    expect(inputValue).toBe('john.doe');
  });
});
