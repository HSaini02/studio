
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  highestBidderId?: string;
  endTime: string; // ISO string
  imageUrl: string;
  category: string;
  sellerId: string;
  startingPrice: number;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  amount: number;
  timestamp: string; // ISO string
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
