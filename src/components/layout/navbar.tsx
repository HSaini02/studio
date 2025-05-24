
"use client";
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Hammer, UserCircle, LogOut, LogIn, UserPlus, HandCoins, ShieldCheck, Sparkles, ShoppingBag, CircleHelp, Search, HomeIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from '@/components/shared/theme-toggle'; // Assuming this exists or will be created

const navLinks = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/auctions', label: 'Auctions', icon: Search },
  { href: '/my-bids', label: 'My Bids', icon: HandCoins, authRequired: true },
  { href: '/my-auctions', label: 'My Auctions', icon: ShoppingBag, authRequired: true },
  { href: '/support', label: 'Support', icon: CircleHelp },
];

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  }

  const renderNavLinks = (isMobile: boolean) =>
    navLinks.filter(link => !link.authRequired || (link.authRequired && user)).map((link) => (
      isMobile ? (
        <SheetClose asChild key={link.href}>
          <Link href={link.href} className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground rounded-md text-sm font-medium">
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        </SheetClose>
      ) : (
        <Link key={link.href} href={link.href} className="px-3 py-2 text-muted-foreground hover:text-foreground rounded-md text-sm font-medium">
          {link.label}
        </Link>
      )
    ));

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <Hammer className="h-7 w-7" />
            <span>FairBid</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {renderNavLinks(false)}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {isLoading ? (
              <div className="w-20 h-8 bg-muted rounded-md animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                       <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] p-4">
                  <div className="flex flex-col space-y-4">
                    <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary mb-4">
                       <SheetClose asChild><Hammer className="h-6 w-6" /></SheetClose>
                       <SheetClose asChild><span>FairBid</span></SheetClose>
                    </Link>
                    {renderNavLinks(true)}
                    <div className="pt-4 border-t border-border">
                    {user ? (
                       <Button onClick={() => { logout(); }} className="w-full" variant="outline">
                         <LogOut className="mr-2 h-4 w-4" /> Logout
                       </Button>
                    ) : (
                      <div className="space-y-2">
                         <SheetClose asChild>
                          <Button asChild className="w-full">
                            <Link href="/login"><LogIn className="mr-2 h-4 w-4"/>Login</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/register"><UserPlus className="mr-2 h-4 w-4"/>Sign Up</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
