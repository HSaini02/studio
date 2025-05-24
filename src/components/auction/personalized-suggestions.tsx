
"use client";

import { useState, useEffect } from 'react';
import { personalizedAuctionSuggestions, PersonalizedAuctionSuggestionsInput } from '@/ai/flows/personalized-auction-suggestions';
import type { Auction } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2 } from 'lucide-react';
import AuctionCard from './auction-card'; 

interface PersonalizedSuggestionsProps {
  currentAuctions: Auction[];
}

export default function PersonalizedSuggestions({ currentAuctions }: PersonalizedSuggestionsProps) {
  const { user } = useAuth();
  const [suggestedAuctions, setSuggestedAuctions] = useState<Auction[]>([]);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock bidding history for demonstration
  const mockUserBiddingHistory = `
    User has previously bid on:
    - "Vintage Leather Jacket", category: Clothing, bid amount: $75
    - "Antique Pocket Watch", category: Collectibles, bid amount: $150
    - "Modern Art Print", category: Art, bid amount: $50
    User tends to prefer items with a classic or artistic appeal.
  `;

  const fetchSuggestions = async () => {
    if (!user) {
      setError("Please log in to get personalized suggestions.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedAuctions([]);
    setReasoning(null);

    try {
      const input: PersonalizedAuctionSuggestionsInput = {
        userBiddingHistory: mockUserBiddingHistory, // In a real app, fetch actual history
        currentAuctions: JSON.stringify(currentAuctions.map(a => ({ title: a.title, category: a.category, description: a.description }))),
      };
      const result = await personalizedAuctionSuggestions(input);
      
      const filteredSuggestions = currentAuctions.filter(auction => 
        result.suggestedAuctions.includes(auction.title)
      );
      setSuggestedAuctions(filteredSuggestions);
      setReasoning(result.reasoning);

    } catch (e) {
      console.error("Error fetching suggestions:", e);
      setError("Could not fetch personalized suggestions at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="my-8">
        <CardHeader>
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-5 w-5" /> Personalized Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Log in to see auction suggestions tailored just for you!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center"><Wand2 className="mr-2 h-5 w-5 text-primary" /> Personalized Auction Suggestions</CardTitle>
        <CardDescription>Discover auctions tailored to your interests based on your activity.</CardDescription>
      </CardHeader>
      <CardContent>
        {!isLoading && suggestedAuctions.length === 0 && !reasoning && (
           <Button onClick={fetchSuggestions} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Get My Suggestions
          </Button>
        )}

        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Generating your personalized suggestions...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {reasoning && (
          <Alert className="mb-6 bg-primary/5 border-primary/20">
            <Wand2 className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">AI Powered Insight</AlertTitle>
            <AlertDescription>{reasoning}</AlertDescription>
          </Alert>
        )}

        {suggestedAuctions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedAuctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        )}
         {!isLoading && (suggestedAuctions.length > 0 || reasoning) && (
           <Button onClick={fetchSuggestions} disabled={isLoading} variant="outline" className="mt-6">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Refresh Suggestions
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

