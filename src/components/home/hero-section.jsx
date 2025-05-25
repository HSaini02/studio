
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          <span className="block">Secure & Transparent</span>
          <span className="block text-primary">Online Auction System</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          Join FairBid for a seamless and trustworthy bidding experience. Discover unique items and bid with confidence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Button size="lg" asChild>
            <Link href="/auctions">Explore Auctions</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
