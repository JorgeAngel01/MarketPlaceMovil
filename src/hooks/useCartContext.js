import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCartContext = () => useContext(CartContext);