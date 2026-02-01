import Image from 'next/image';
import { Award, Wrench, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const skills = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: 'Certified Technicians',
      description: 'Our team is composed of certified professionals with years of experience in mobile device repair.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Genuine Parts',
      description: 'We use only the highest quality, genuine parts for all repairs to ensure durability and performance.',
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: 'Advanced Diagnostics',
      description: 'We utilize state-of-the-art diagnostic tools to accurately identify and fix any issue with your device.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Fast Turnaround',
      description: 'We pride ourselves on our efficient repair process, getting your device back to you as quickly as possible.',
    },
  ];
  
  const accessoriesImageUrl = "https://images.unsplash.com/photo-1598331666179-1b7724125207?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const accessoriesImageAlt = "A collection of mobile phone accessories on display.";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">About Phone O Shop</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your trusted partner in mobile device care and accessories.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
           <Image
              src={accessoriesImageUrl}
              alt={accessoriesImageAlt}
              fill
              className="object-cover"
              data-ai-hint="mobile accessories"
            />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">Our Commitment to Excellence</h2>
          <p className="text-muted-foreground">
            Founded with a passion for technology and customer service, Phone O Shop has grown to become a leading name in mobile repair and accessories. We understand how important your device is to your daily life, which is why we're dedicated to providing reliable, fast, and affordable services.
          </p>
          <p className="text-muted-foreground">
            Our mission is simple: to deliver top-notch repairs and high-quality products while building lasting relationships with our customers. We believe in transparency, honesty, and treating every device as if it were our own.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-3xl font-bold font-headline">Our Expertise</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {skill.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
