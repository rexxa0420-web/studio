"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Smartphone, Wrench, Info, Mail, Phone, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { CartSheet } from '@/components/cart-sheet';

const navLinks = [
  { href: '/shop', label: 'Shop', icon: Smartphone },
  { href: '/repair', label: 'Repair', icon: Wrench },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string; }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {label}
    </Link>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartSheet />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col">
                <div className="mb-6">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                     <SheetTrigger asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md p-2 text-base font-medium transition-colors hover:bg-secondary",
                          pathname === link.href ? "bg-secondary text-primary" : "text-muted-foreground"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </SheetTrigger>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4 border-t pt-4">
                    <Button variant="outline" asChild><a href="tel:+1234567890"><Phone className="mr-2 h-4 w-4"/> Call Us</a></Button>
                    <Button className="bg-green-500 hover:bg-green-600 text-white" asChild><a href="https://wa.me/1234567890" target="_blank"><MessageCircle className="mr-2 h-4 w-4"/> WhatsApp</a></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
