
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-16 bg-primary/10 rounded-lg">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Bidding?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Join FairBid today and experience a secure and transparent online auction system. Your next treasure awaits!
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/register">Register Now</Link>
        </Button>
      </div>
    </section>
  );
}
