
// src/app/auctions/[id]/page.tsx
"use client"; // For useEffect, useState, client-side data fetching for this dynamic page
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import type { Auction, Bid } from '@/lib/types';
import { mockAuctions, mockBids, mockUsers } from '@/lib/data'; // Using mock data
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Clock, DollarSign, Tag, UserCircle, ShieldCheck, ArrowLeft, Loader2, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Link from 'next/link';

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { user } = useAuth();
  const { toast } = useToast();

  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [bidAmount, setBidAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate fetching auction details
      const foundAuction = mockAuctions.find(a => a.id === id);
      if (foundAuction) {
        setAuction(foundAuction);
        setBidAmount(foundAuction.currentBid + 10); // Suggest next bid
        // Simulate fetching bids for this auction
        const auctionBids = mockBids.filter(b => b.auctionId === id).sort((a,b) => +new Date(b.timestamp) - +new Date(a.timestamp));
        setBids(auctionBids);
      } else {
        // Handle auction not found, e.g., redirect or show error
        toast({ title: 'Auction not found', variant: 'destructive' });
        router.push('/auctions');
      }
      setIsLoading(false);
    }
  }, [id, router, toast]);

  useEffect(() => {
    if (!auction) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(auction.endTime) - +new Date();
      if (difference > 0) {
        setTimeLeft(formatDistanceToNow(parseISO(auction.endTime), { addSuffix: true }));
      } else {
        setTimeLeft('Auction ended');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second for more dynamic feel
    return () => clearInterval(timer);
  }, [auction]);

  const handlePlaceBid = () => {
    if (!user) {
      toast({ title: 'Login Required', description: 'Please log in to place a bid.', variant: 'destructive' });
      return;
    }
    if (!auction || typeof bidAmount !== 'number' || bidAmount <= auction.currentBid) {
      toast({ title: 'Invalid Bid', description: `Your bid must be higher than the current bid of $${auction?.currentBid}.`, variant: 'destructive' });
      return;
    }
    if (new Date(auction.endTime) < new Date()) {
      toast({ title: 'Auction Ended', description: 'This auction has already ended.', variant: 'destructive' });
      return;
    }

    // Simulate placing a bid
    const newBid: Bid = {
      id: Math.random().toString(),
      auctionId: auction.id,
      userId: user.id,
      amount: bidAmount,
      timestamp: new Date().toISOString(),
    };
    // Update mock data (in real app, this would be a backend call)
    auction.currentBid = bidAmount;
    auction.highestBidderId = user.id; // Assuming this field exists
    mockBids.unshift(newBid); // Add to top of bids list
    
    setBids([newBid, ...bids]);
    setAuction({ ...auction }); // Trigger re-render
    
    toast({ title: 'Bid Placed!', description: `Your bid of $${bidAmount} has been placed successfully.` });
    setBidAmount(auction.currentBid + 10); // Suggest next bid
  };

  const getUserName = (userId: string) => mockUsers.find(u => u.id === userId)?.name || 'Anonymous';

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (!auction) {
    return <div className="text-center py-10">Auction not found.</div>;
  }

  return (
    <div className="space-y-8">
       <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Auctions
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="shadow-xl overflow-hidden">
            <div className="relative w-full h-96">
              <Image src={auction.imageUrl} alt={auction.title} layout="fill" objectFit="cover" data-ai-hint={auction.dataAiHint || 'auction item large'} />
            </div>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{auction.title}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-1">{auction.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-lg">
                <Tag className="h-5 w-5 mr-2 text-primary" />
                Category: <span className="font-semibold ml-1">{auction.category}</span>
              </div>
               <div className="flex items-center text-lg">
                <UserCircle className="h-5 w-5 mr-2 text-primary" />
                Seller: <span className="font-semibold ml-1">{getUserName(auction.sellerId)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Bidding Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground text-sm">Current Bid:</span>
                <div className="text-3xl font-bold text-primary flex items-center">
                  <DollarSign className="h-7 w-7 mr-1" />{auction.currentBid.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Time Left:</span>
                <div className={`text-lg font-semibold flex items-center ${timeLeft === 'Auction ended' ? 'text-destructive' : 'text-green-600'}`}>
                  <Clock className="h-5 w-5 mr-1" />{timeLeft}
                </div>
              </div>
               <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Highest Bidder:</span>
                <div className="text-md font-medium flex items-center">
                 {auction.highestBidderId ? (
                    <> <UserCircle className="h-4 w-4 mr-1"/> {getUserName(auction.highestBidderId)} </> 
                 ) : (
                    "No bids yet"
                 )}
                </div>
              </div>

              {timeLeft !== 'Auction ended' && (
                <div className="space-y-3 pt-4 border-t">
                  <Label htmlFor="bidAmount" className="text-base">Your Bid Amount:</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="bidAmount"
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(parseFloat(e.target.value) || '')}
                      min={auction.currentBid + 1} // Example increment
                      className="flex-grow text-lg"
                      placeholder={`Enter > $${auction.currentBid}`}
                    />
                  </div>
                  <Button onClick={handlePlaceBid} className="w-full text-lg py-3" size="lg">
                    <ShieldCheck className="mr-2 h-5 w-5" /> Place Bid
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Minimum next bid: ${auction.currentBid + 1}</p>
                </div>
              )}
              {timeLeft === 'Auction ended' && (
                <p className="text-center font-semibold text-destructive pt-4 border-t">This auction has ended.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><Users className="mr-2 h-5 w-5"/>Bid History</CardTitle>
            </CardHeader>
            <CardContent>
              {bids.length > 0 ? (
                <ul className="space-y-3 max-h-60 overflow-y-auto">
                  {bids.map(bid => (
                    <li key={bid.id} className="flex justify-between items-center text-sm pb-2 border-b last:border-b-0">
                      <div>
                        <span className="font-semibold">{getUserName(bid.userId)}</span>
                        <span className="text-xs text-muted-foreground ml-2">({formatDistanceToNow(parseISO(bid.timestamp), { addSuffix: true })})</span>
                      </div>
                      <span className="font-bold text-primary">${bid.amount.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-center py-4">No bids yet. Be the first!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

