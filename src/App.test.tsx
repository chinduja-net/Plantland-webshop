import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductProvider from '../src/context/productProvider'
import App from './App';

test('testing app component', () => {
  render(
  <ProductProvider>
 <App />

  </ProductProvider>
 );
  
});
