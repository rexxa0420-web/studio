import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop shop for mobile accessories and expert repairs.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#" aria-label="GitHub">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary">Shop</Link></li>
              <li><Link href="/repair" className="text-sm text-muted-foreground hover:text-primary">Book a Repair</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>123 Tech Street, Silicon Valley, CA 94000</li>
              <li>Email: <a href="mailto:support@fixmymobile.com" className="hover:text-primary">support@fixmymobile.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FixMyMobile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
