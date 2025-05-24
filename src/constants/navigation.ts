
import type { LucideIcon } from 'lucide-react';
import { HomeIcon, Search, HandCoins, ShoppingBag, CircleHelp } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  authRequired?: boolean;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/auctions', label: 'Auctions', icon: Search },
  { href: '/my-bids', label: 'My Bids', icon: HandCoins, authRequired: true },
  { href: '/my-auctions', label: 'My Auctions', icon: ShoppingBag, authRequired: true },
  { href: '/support', label: 'Support', icon: CircleHelp },
];
