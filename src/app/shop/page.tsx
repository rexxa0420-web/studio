"use client";

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Product, Category } from '@/lib/types';
import { categories as productCategories } from '@/lib/product-data';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const baseQuery = collection(firestore, 'products');
    if (selectedCategory) {
        return query(baseQuery, where('categoryId', '==', selectedCategory));
    }
    return baseQuery;
  }, [firestore, selectedCategory]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);


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
        {productCategories.map((category) => (
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
      
      {isLoading && <p className="text-center">Loading products...</p>}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products?.length === 0 && !isLoading && (
        <div className="mt-16 text-center text-muted-foreground">
          <p>No products found. Please manage your inventory in the admin panel.</p>
        </div>
      )}
    </div>
  );
}
