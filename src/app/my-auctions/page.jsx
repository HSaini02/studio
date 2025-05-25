
"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { mockAuctions } from '@/lib/data'; // Using mock data
import AuctionCard from '@/components/auction/auction-card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAuctionForm from '@/components/auction/create-auction-form';
import { useRouter } from 'next/navigation';

export default function MyAuctionsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [myAuctions, setMyAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/my-auctions');
    }
  }, [user, authLoading, router]);
  
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      // Simulate fetching auctions for the current user
      // In a real app, filter by sellerId === user.id
      const userCreatedAuctions = mockAuctions.filter(auction => auction.sellerId === user.id);
      setMyAuctions(userCreatedAuctions);
      setIsLoading(false);
    }
  }, [user]);

  const handleAuctionCreated = (newAuctionData) => {
    // This is a mock update. In a real app, you'd likely refetch or update state from a server response.
    const newAuction = {
      id: Math.random().toString(36).substring(2, 15), // Generate random ID
      title: newAuctionData.title,
      description: newAuctionData.description,
      currentBid: newAuctionData.startingPrice,
      endTime: newAuctionData.endTime.toISOString(),
      imageUrl: newAuctionData.imageUrl,
      category: newAuctionData.category,
      sellerId: user.id, // Assign current user as seller
      startingPrice: newAuctionData.startingPrice,
    };
    setMyAuctions(prevAuctions => [newAuction, ...prevAuctions]);
    setIsCreateDialogOpen(false); // Close dialog after creation
  };
  
  if (authLoading || (isLoading && user)) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
     return null; // Redirecting...
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Auctions</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Auction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create a New Auction</DialogTitle>
              <DialogDescription>
                Fill in the details below to list your item for auction.
              </DialogDescription>
            </DialogHeader>
            <CreateAuctionForm onAuctionCreated={handleAuctionCreated} closeDialog={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {myAuctions.length === 0 ? (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <p className="text-muted-foreground text-lg mb-4">You haven&apos;t created any auctions yet.</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Auction
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      )}
    </div>
  );
}
