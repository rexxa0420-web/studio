"use client";

import { useState } from 'react';
import { products, categories } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          Find the perfect accessories for your mobile devices.
        </p>
      </div>

      <div className="my-8 flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          className={cn(selectedCategory === null && "bg-primary text-primary-foreground")}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(selectedCategory === category.id && "bg-primary text-primary-foreground")}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
