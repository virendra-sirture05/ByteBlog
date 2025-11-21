"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import SearchInput from "./search-input";
import ToggleMode from "./toggle-mode";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs";
import { searchAction } from "@/actions/search";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-between ">
          {/* left section  */}
          <div className="flex items-center gap-8">
            <Link href={"/"} className="flex items-center space-x-2 ">
              <span className="font-bold text-2xl">
                <span className="bg-gradient-to-r from-purple-600 to bg-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent ">
                  Byte
                </span>
                <span className="text-foreground">Blog</span>
              </span>
            </Link>
          </div>

          {/* desktop menu  */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={"/articles"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              article
            </Link>
            <Link
              href={"/tutorial"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              tutorial
            </Link>
            <Link
              href={"/about"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              about
            </Link>
            <Link
              href={"/dashboard"}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground"
            >
              dashboard
            </Link>
          </div>
          {/* Right section  */}
          <div className="flex items-center gap-2">
            <SearchInput />
            <ToggleMode />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden animate-in slide-in-from-top duration-200">
              {/* Backdrop blur effect */}
              <div className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-lg border-t shadow-lg">
                <div className="container mx-auto py-6 space-y-6">
                  {/* Search Bar (Mobile) */}
                  <form action={searchAction} className="px-4">
                    <div className="relative group">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        type="search"
                        name="search"
                        placeholder="Search articles..."
                        className="pl-10 w-full h-11 bg-muted/50 border-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-primary transition-all"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation Links */}
                  <nav className="px-4">
                    <div className="space-y-1">
                      <Link
                        href="/articles"
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground rounded-lg transition-all hover:bg-muted hover:translate-x-1 active:scale-95"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">📰</span>
                        Articles
                      </Link>
                      <Link
                        href="/tutorials"
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground rounded-lg transition-all hover:bg-muted hover:translate-x-1 active:scale-95"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">🎓</span>
                        Tutorials
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground rounded-lg transition-all hover:bg-muted hover:translate-x-1 active:scale-95"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">ℹ️</span>
                        About
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground rounded-lg transition-all hover:bg-muted hover:translate-x-1 active:scale-95"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">📊</span>
                        Dashboard
                      </Link>
                    </div>
                  </nav>

                  {/* Divider */}
                  <div className="px-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
                  </div>

                  {/* Mobile Auth Buttons */}
                  {/* <SignedOut> */}
                  <div className="px-4 space-y-3">
                    {/* <SignInButton> */}
                    <Button
                      variant="outline"
                      className="w-full h-11 font-semibold border-2 hover:bg-muted hover:border-primary transition-all active:scale-95"
                    >
                      Login
                    </Button>
                    {/* </SignInButton> */}
                    {/* <SignUpButton> */}
                    <Button className="w-full h-11 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all active:scale-95">
                      Sign up
                    </Button>
                    {/* </SignUpButton> */}
                  </div>
                  {/* </SignedOut> */}

                  {/* Extra spacing for better UX */}
                  <div className="h-2" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
