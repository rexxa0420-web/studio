"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, CheckCircle } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const imageUrl = PlaceHolderImages.find(p => p.id === product.images[0])?.imageUrl ?? 'https://picsum.photos/seed/placeholder/600/600';

  const relatedProducts = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    }, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added.`,
      action: <CheckCircle className="text-green-500" />,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden rounded-lg shadow-lg">
           <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="product image"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold font-headline md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-3xl font-semibold text-primary">₹{product.price.toFixed(2)}</p>
          <Separator className="my-6" />
          <p className="text-muted-foreground">{product.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q+1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-headline">Related Products</h2>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
