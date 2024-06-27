import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('Renders the footer', () => {
    render(<Footer />);
  });
});
