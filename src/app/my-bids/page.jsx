
"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { mockBids, mockAuctions } from '@/lib/data'; // Using mock data
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, Clock, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MyBidsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [userBids, setUserBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/my-bids');
    }
  }, [user, authLoading, router]);
  
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      // Simulate fetching bids for the current user
      const fetchedBids = mockBids.filter(bid => bid.userId === user.id);
      const populatedBids = fetchedBids.map(bid => {
        const auction = mockAuctions.find(a => a.id === bid.auctionId);
        if (!auction) return null;

        const isAuctionEnded = new Date(auction.endTime) < new Date();
        const isWinningBid = auction.currentBid === bid.amount && auction.highestBidderId === user.id; // Assuming highestBidderId is set

        let status = 'Active';
        if (isAuctionEnded) {
          status = isWinningBid ? 'Won' : 'Lost';
        } else {
          status = isWinningBid ? 'Winning' : 'Outbid'; // Simplified: assumes if not highest, then outbid
        }
        
        return {
          ...bid,
          auctionTitle: auction.title,
          auctionImageUrl: auction.imageUrl,
          auctionEndTime: auction.endTime,
          currentAuctionBid: auction.currentBid,
          isWinning: isWinningBid,
          status,
        };
      }).filter(Boolean);
      
      setUserBids(populatedBids);
      setIsLoading(false);
    }
  }, [user]);

  const getTimeLeft = (endTime) => {
    const difference = +new Date(endTime) - +new Date();
    if (difference <= 0) return 'Ended';
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Winning': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Outbid': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Won': return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'Lost': return <XCircle className="h-5 w-5 text-destructive" />;
      case 'Active': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return null;
    }
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
      <h1 className="text-3xl font-bold">My Bids</h1>
      {userBids.length === 0 ? (
        <div className="text-center py-10 bg-card rounded-lg shadow">
          <p className="text-muted-foreground text-lg mb-4">You haven&apos;t placed any bids yet.</p>
          <Button asChild>
            <Link href="/auctions">Explore Auctions</Link>
          </Button>
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Your Bid</TableHead>
                <TableHead>Current Bid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time Left</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>
                    <Link href={`/auctions/${bid.auctionId}`} className="flex items-center space-x-3 group">
                      <Image
                        src={bid.auctionImageUrl}
                        alt={bid.auctionTitle}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                        data-ai-hint="product photo"
                      />
                      <span className="font-medium group-hover:text-primary transition-colors">{bid.auctionTitle}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      {bid.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      {bid.currentAuctionBid.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(bid.status)}
                      <span>{bid.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {getTimeLeft(bid.auctionEndTime)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/auctions/${bid.auctionId}`}>View Auction</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
             <TableCaption>A list of your current and past bids.</TableCaption>
          </Table>
        </Card>
      )}
    </div>
  );
}
