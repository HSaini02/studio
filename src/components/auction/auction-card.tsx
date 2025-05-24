
"use client";
import Image from 'next/image';
import Link from 'next/link';
import type { Auction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tag, ShieldCheck, Clock, UserCircle, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(auction.endTime) - +new Date();
      let newTimeLeft = '';

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        newTimeLeft = `${days}d ${hours}h ${minutes}m left`;
      } else {
        newTimeLeft = 'Auction ended';
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [auction.endTime]);

  const handlePlaceBid = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to place a bid.',
        variant: 'destructive',
      });
      return;
    }
    // Placeholder for bid logic
    toast({
      title: 'Bid Placed (Simulated)',
      description: `Your bid on ${auction.title} was successfully placed.`,
    });
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <Link href={`/auctions/${auction.id}`} passHref>
          <div className="relative w-full h-56">
            <Image
              src={auction.imageUrl}
              alt={auction.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={auction.dataAiHint || 'auction item'}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/auctions/${auction.id}`} passHref>
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
            {auction.title}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">{auction.description}</CardDescription>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            Current Bid: <span className="font-semibold text-foreground ml-1">${auction.currentBid.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            {timeLeft}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Tag className="h-4 w-4 mr-2 text-primary" />
            Category: <span className="font-semibold text-foreground ml-1">{auction.category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handlePlaceBid} className="w-full" disabled={timeLeft === 'Auction ended'}>
          <ShieldCheck className="mr-2 h-4 w-4" /> Place Bid
        </Button>
      </CardFooter>
    </Card>
  );
}
