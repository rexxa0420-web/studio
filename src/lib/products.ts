import type { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'cases', name: 'Cases' },
  { id: 'screen-protectors', name: 'Screen Protectors' },
  { id: 'chargers-cables', name: 'Chargers & Cables' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Rugged Armor Case',
    description: 'A durable and stylish case that offers maximum protection against drops and scratches. Perfect for the adventurous soul.',
    price: 29.99,
    images: ['product-case-1'],
    categoryId: 'cases',
    featured: true,
  },
  {
    id: '2',
    name: 'Slim Fit Clear Case',
    description: 'Show off your phone\'s original design with this ultra-thin, crystal clear case. Provides scratch protection without the bulk.',
    price: 19.99,
    images: ['product-case-2'],
    categoryId: 'cases',
  },
  {
    id: '3',
    name: 'Tempered Glass Protector',
    description: '9H hardness tempered glass that protects your screen from shattering. Features an oleophobic coating to reduce fingerprints.',
    price: 15.99,
    images: ['product-screen-protector-1'],
    categoryId: 'screen-protectors',
    featured: true,
  },
  {
    id: '4',
    name: 'Fast-Charging Wall Adapter',
    description: 'A 45W USB-C fast charging adapter to power up your devices in no time. Compact and travel-friendly design.',
    price: 34.99,
    images: ['product-charger-1'],
    categoryId: 'chargers-cables',
    featured: true,
  },
  {
    id: '5',
    name: 'Leather Wallet Case',
    description: 'A premium vegan leather case with card slots. Combines elegance and functionality for your daily needs.',
    price: 39.99,
    images: ['product-case-3'],
    categoryId: 'cases',
  },
  {
    id: '6',
    name: 'Matte Anti-Glare Protector',
    description: 'Reduce screen glare and fingerprints with this matte-finish screen protector. Provides a smooth, paper-like feel.',
    price: 17.99,
    images: ['product-screen-protector-2'],
    categoryId: 'screen-protectors',
  },
  {
    id: '7',
    name: 'Braided USB-C Cable (2m)',
    description: 'A long and durable braided nylon USB-C to USB-C cable, designed to resist tangling and withstand daily wear and tear.',
    price: 12.99,
    images: ['product-charger-2'],
    categoryId: 'chargers-cables',
  },
  {
    id: '8',
    name: 'Qi Wireless Charging Pad',
    description: 'Sleek and minimalist wireless charging pad. Just place your phone on the pad for convenient, cable-free charging.',
    price: 45.99,
    images: ['product-charger-3'],
    categoryId: 'chargers-cables',
  },
];
