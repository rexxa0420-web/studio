import Image from 'next/image';
import Link from 'next/link';
import { Wrench, Package, ShieldCheck, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-primary/20">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl font-headline">
            Expert Repairs, Premium Gear
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            From cracked screens to the latest accessories, we've got you covered.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/repair">Book a Repair</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/shop">Shop Accessories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold font-headline">Featured Products</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Check out our handpicked selection of top-quality accessories.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-secondary py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold font-headline">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Wrench className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Expert Repairs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our certified technicians use state-of-the-art tools to bring your device back to life.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Package className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Quality Accessories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We stock a wide range of high-quality accessories to protect and enhance your device.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">Genuine Parts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We only use genuine and high-quality replacement parts to ensure longevity and performance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20">
         <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold font-headline">Have a Question?</h2>
            <p className="mt-2 text-muted-foreground">
              Our team is ready to help. Reach out via WhatsApp for a quick response or visit our contact page.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-green-500 hover:bg-green-600 text-white">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
