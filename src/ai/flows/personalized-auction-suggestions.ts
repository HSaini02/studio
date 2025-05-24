// src/ai/flows/personalized-auction-suggestions.ts
'use server';
/**
 * @fileOverview An AI agent for providing personalized auction suggestions based on user bidding history.
 *
 * - personalizedAuctionSuggestions - A function that generates personalized auction suggestions.
 * - PersonalizedAuctionSuggestionsInput - The input type for the personalizedAuctionSuggestions function.
 * - PersonalizedAuctionSuggestionsOutput - The return type for the personalizedAuctionSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAuctionSuggestionsInputSchema = z.object({
  userBiddingHistory: z
    .string()
    .describe("A detailed history of the user's past bidding behavior, including auction categories, bid amounts, and items bid on."),
  currentAuctions: z.string().describe('A list of current active auctions with details about each item.'),
});
export type PersonalizedAuctionSuggestionsInput = z.infer<typeof PersonalizedAuctionSuggestionsInputSchema>;

const PersonalizedAuctionSuggestionsOutputSchema = z.object({
  suggestedAuctions: z
    .array(z.string())
    .describe('A list of auction titles that are suggested for the user based on their bidding history.'),
  reasoning: z
    .string()
    .describe('A brief explanation of why these auctions were suggested for the user.'),
});
export type PersonalizedAuctionSuggestionsOutput = z.infer<typeof PersonalizedAuctionSuggestionsOutputSchema>;

export async function personalizedAuctionSuggestions(
  input: PersonalizedAuctionSuggestionsInput
): Promise<PersonalizedAuctionSuggestionsOutput> {
  return personalizedAuctionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAuctionSuggestionsPrompt',
  input: {schema: PersonalizedAuctionSuggestionsInputSchema},
  output: {schema: PersonalizedAuctionSuggestionsOutputSchema},
  prompt: `You are an AI assistant specializing in providing personalized auction suggestions to users based on their past bidding behavior and current active auctions.

Given the following user bidding history:
{{{userBiddingHistory}}}

And the following current active auctions:
{{{currentAuctions}}}

Analyze the user's bidding history and suggest auctions from the current active auctions that the user might be interested in. Explain your reasoning for the suggestions.

Output the suggested auctions and the reasoning in the following JSON format:
{
  "suggestedAuctions": ["Auction Title 1", "Auction Title 2", ...],
  "reasoning": "Explanation of why these auctions were suggested."
}
`,
});

const personalizedAuctionSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedAuctionSuggestionsFlow',
    inputSchema: PersonalizedAuctionSuggestionsInputSchema,
    outputSchema: PersonalizedAuctionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
