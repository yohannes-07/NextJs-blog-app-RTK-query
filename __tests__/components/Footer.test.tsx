import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import '@testing-library/jest-dom';


describe('Footer Component', () => {
  it('renders the Footer text', () => {
    render(<Footer />);
    const footerElement = screen.getByText('© 2023 My Blog. All rights reserved.');
    expect(footerElement).toBeInTheDocument();
  });
});
