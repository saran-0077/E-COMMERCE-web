import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import '@testing-library/jest-dom';

test('renders Layout with Navbar and Children', () => {
  render(
    <BrowserRouter>
      <Layout cartCount={5}>
        <div>Test Content</div>
      </Layout>
    </BrowserRouter>
  );

  // Check if Navbar brand is there
  const brandElement = screen.getByText(/MyStore/i);
  expect(brandElement).toBeInTheDocument();

  // Check if children content is rendered
  expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
});