
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, Bell, BookMarked } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mock user data - in a real app, this would come from auth
  const user = {
    isLoggedIn: false,
    name: 'John Doe',
    image: '',
    initials: 'JD',
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Membership', href: '/membership' },
    { name: 'Write', href: '/editor/new' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookMarked className="h-6 w-6" />
            <span className="text-xl font-bold hidden sm:inline-block">AuraScribe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Desktop Search */}
          <div className="hidden md:flex relative">
            {searchOpen ? (
              <div className="animate-fade-in flex items-center bg-background rounded-md border">
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="w-64 mr-1"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9"
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            )}
          </div>

          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden h-9 w-9"
          >
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>

          {/* Notification Bell */}
          {user.isLoggedIn && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          )}

          {/* User Menu for logged in users */}
          {user.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookmarks">Bookmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* Login/Signup buttons for non-logged in */}
              <div className="hidden sm:flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar when open */}
      {searchOpen && isMobile && (
        <div className="container py-2 px-4 md:hidden animate-fade-in">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-8"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 bg-background animate-in slide-in-from-top-1 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md shadow-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {!user.isLoggedIn && (
                <div className="flex justify-center space-x-2 py-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              )}
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "group flex items-center py-3 px-3 rounded-md text-base font-medium",
                    location.pathname === link.href
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {user.isLoggedIn && (
                <>
                  <Link
                    to="/profile"
                    className="group flex items-center py-3 px-3 rounded-md text-base font-medium hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="group flex items-center py-3 px-3 rounded-md text-base font-medium hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/bookmarks"
                    className="group flex items-center py-3 px-3 rounded-md text-base font-medium hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bookmarks
                  </Link>
                  <Link
                    to="/settings"
                    className="group flex items-center py-3 px-3 rounded-md text-base font-medium hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <div
                    className="group flex items-center py-3 px-3 rounded-md text-base font-medium hover:bg-muted text-destructive cursor-pointer"
                    onClick={() => {
                      // Handle sign out
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
