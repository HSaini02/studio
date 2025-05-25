
import { HomeIcon, Search, HandCoins, ShoppingBag, CircleHelp } from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/auctions', label: 'Auctions', icon: Search },
  { href: '/my-bids', label: 'My Bids', icon: HandCoins, authRequired: true },
  { href: '/my-auctions', label: 'My Auctions', icon: ShoppingBag, authRequired: true },
  { href: '/support', label: 'Support', icon: CircleHelp },
];
