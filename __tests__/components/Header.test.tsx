import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import '@testing-library/jest-dom';


describe('Header Component', () => {
  it('renders the header text', () => {
    render(<Header />);
    const headerElement = screen.getByText('My Blog');
    expect(headerElement).toBeInTheDocument();
  });
});
