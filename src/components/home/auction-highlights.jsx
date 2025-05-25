
import AuctionCard from '@/components/auction/auction-card';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function AuctionHighlights({ auctions }) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Auctions</h2>
          <Button variant="outline" asChild>
            <Link href="/auctions">View All</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.slice(0, 3).map((auction) => ( // Show first 3 auctions
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </section>
  );
}
