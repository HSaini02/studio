
// src/ai/flows/personalized-auction-suggestions.js
'use server';
/**
 * @fileOverview An AI agent for providing personalized auction suggestions based on user bidding history.
 * This file defines a Genkit flow that takes user bidding history and current auctions
 * as input and returns personalized auction suggestions along with the reasoning.
 *
 * - personalizedAuctionSuggestions - An async function that invokes the Genkit flow.
 * - PersonalizedAuctionSuggestionsInputSchema - The Zod schema defining the structure for the input data.
 * - PersonalizedAuctionSuggestionsOutputSchema - The Zod schema defining the structure for the output data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit'; // Zod for schema validation

/**
 * Zod schema for the input of the personalizedAuctionSuggestionsFlow.
 * It expects a user's bidding history and a list of current auctions.
 */
const PersonalizedAuctionSuggestionsInputSchema = z.object({
  userBiddingHistory: z
    .string()
    .describe("A detailed history of the user's past bidding behavior, including auction categories, bid amounts, and items bid on."),
  currentAuctions: z.string().describe('A list of current active auctions with details about each item (e.g., title, category, description). Should be a JSON stringified array of objects.'),
});


/**
 * Zod schema for the output of the personalizedAuctionSuggestionsFlow.
 * It returns an array of suggested auction titles and a string explaining the reasoning.
 */
const PersonalizedAuctionSuggestionsOutputSchema = z.object({
  suggestedAuctions: z
    .array(z.string())
    .describe('A list of auction titles that are suggested for the user based on their bidding history and current auctions.'),
  reasoning: z
    .string()
    .describe('A brief explanation of why these auctions were suggested for the user.'),
});


/**
 * Asynchronous wrapper function to execute the personalizedAuctionSuggestionsFlow.
 * This function is typically called from the application's frontend or other server-side logic.
 *
 * @param {object} input - The input object conforming to PersonalizedAuctionSuggestionsInputSchema.
 * @property {string} input.userBiddingHistory - User's past bidding data.
 * @property {string} input.currentAuctions - JSON string of current auctions.
 * @returns {Promise<object>} A promise that resolves to an object conforming to PersonalizedAuctionSuggestionsOutputSchema.
 */
export async function personalizedAuctionSuggestions(input) {
  return personalizedAuctionSuggestionsFlow(input);
}

/**
 * Genkit prompt definition for generating personalized auction suggestions.
 * This prompt instructs the AI model on how to analyze the input data and format the output.
 */
const prompt = ai.definePrompt({
  name: 'personalizedAuctionSuggestionsPrompt', // Unique name for the prompt
  input: {schema: PersonalizedAuctionSuggestionsInputSchema}, // Define input schema for type safety and validation
  output: {schema: PersonalizedAuctionSuggestionsOutputSchema}, // Define output schema for structured response
  prompt: `You are an AI assistant specializing in providing personalized auction suggestions to users based on their past bidding behavior and current active auctions.

Given the following user bidding history:
{{{userBiddingHistory}}}

And the following current active auctions (provided as a JSON string, parse it to understand the items):
{{{currentAuctions}}}

Analyze the user's bidding history and identify patterns or preferences. Then, compare these preferences against the details of the current active auctions.
Suggest auctions from the current active auctions that the user might be interested in.
Provide a brief reasoning for your suggestions, explaining how they align with the user's past behavior or inferred interests.

Output the suggested auctions and the reasoning in the following JSON format:
{
  "suggestedAuctions": ["Auction Title 1", "Auction Title 2", ...],
  "reasoning": "Explanation of why these auctions were suggested."
}
`,
});

/**
 * Genkit flow definition for personalized auction suggestions.
 * This flow takes the user's bidding history and current auctions,
 * processes them through the defined prompt, and returns the AI-generated suggestions.
 */
const personalizedAuctionSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedAuctionSuggestionsFlow', // Unique name for the flow
    inputSchema: PersonalizedAuctionSuggestionsInputSchema, // Define input schema
    outputSchema: PersonalizedAuctionSuggestionsOutputSchema, // Define output schema
  },
  async input => {
    // Execute the prompt with the provided input
    const {output} = await prompt(input);
    // Return the output from the prompt; the '!' asserts that output will not be null.
    return output; 
  }
);
