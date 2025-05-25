
import AuctionCard from '@/components/auction/auction-card';
import PersonalizedSuggestions from '@/components/auction/personalized-suggestions';
import { mockAuctions } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, ListFilter } from 'lucide-react';
// This page should be a client component if it handles filtering/searching state
// For now, keeping it simple server component and adding PersonalizedSuggestions which is client-side.

export default function AuctionsPage() {
  // In a real app, auctions would be fetched from a database
  const auctions = mockAuctions;
  const categories = Array.from(new Set(auctions.map(a => a.category)));

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-primary/5 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">Explore Active Auctions</h1>
        <p className="text-muted-foreground mt-2">Find unique items and place your bids today!</p>
      </header>

      {/* Filters - Placeholder for interactivity */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow">
          <Input type="search" placeholder="Search auctions..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="w-full md:w-auto">Apply Filters</Button>
      </div>
      
      <PersonalizedSuggestions currentAuctions={auctions} />

      {auctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">No auctions available at the moment. Check back soon!</p>
      )}
    </div>
  );
}
