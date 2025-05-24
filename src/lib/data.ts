
import type { Auction, Testimonial, FAQ, Bid } from './types';

export const mockUsers = [
  { id: 'user1', name: 'Alice Wonderland', email: 'alice@example.com' },
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com' },
];

export const mockAuctions: Auction[] = [
  {
    id: '1',
    title: 'Vintage Voyager Watch',
    description: 'A stunning vintage watch from the 1960s, fully restored.',
    currentBid: 250,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'vintage watch',
    category: 'Collectibles',
    sellerId: 'user2',
    startingPrice: 100,
  },
  {
    id: '2',
    title: 'Abstract Canvas Art',
    description: 'A vibrant abstract painting by a renowned local artist.',
    currentBid: 750,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract art',
    category: 'Art',
    sellerId: 'user1',
    startingPrice: 300,
  },
  {
    id: '3',
    title: 'Antique Oak Armchair',
    description: 'A beautifully crafted antique armchair, perfect for any living room.',
    currentBid: 400,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'antique furniture',
    category: 'Furniture',
    sellerId: 'user2',
    startingPrice: 150,
  },
  {
    id: '4',
    title: 'Signed First Edition Book',
    description: 'A rare, signed first edition of a classic novel.',
    currentBid: 120,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'rare book',
    category: 'Books',
    sellerId: 'user1',
    startingPrice: 50,
  },
];

export const mockBids: Bid[] = [
  { id: 'bid1', auctionId: '1', userId: 'user1', amount: 250, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
  { id: 'bid2', auctionId: '2', userId: 'user2', amount: 750, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    text: 'BidVerse has made online bidding safe and transparent. I highly recommend it!',
    author: 'John D.',
  },
  {
    id: '2',
    text: 'The real-time updates and secure bidding process gave me confidence in every transaction.',
    author: 'Jane S.',
  },
  {
    id: '3',
    text: 'Found some amazing items and the platform is so easy to use. A+!',
    author: 'Mike R.',
  },
];

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How secure is the bidding system?',
    answer: 'Our system uses state-of-the-art security measures, including end-to-end encryption for data transmission and secure payment gateways. While we don\'t currently use blockchain, we prioritize robust security practices to protect all transactions and user data.',
  },
  {
    id: '2',
    question: 'What happens if I win an auction?',
    answer: 'You\'ll receive an immediate notification and detailed instructions via email for completing the purchase securely, including payment and shipping arrangements with the seller.',
  },
  {
    id: '3',
    question: 'Can I cancel a bid?',
    answer: 'Generally, bids are binding. Please review the auction terms carefully before placing a bid. In exceptional circumstances, you may contact support for assistance.',
  },
  {
    id: '4',
    question: 'How do I create my own auction?',
    answer: 'Once logged in, navigate to "My Auctions" and click on "Create New Auction". You\'ll be guided through the process of listing your item, setting a starting price, and defining the auction duration.',
  },
];
