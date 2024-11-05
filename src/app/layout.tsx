'use client';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Fetch the token from localStorage (or cookies)
    const token = localStorage.getItem('token');

    if (token) {
      // Make a request to the API route to verify the token
      fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            // Handle expired or invalid token
            setIsAuthenticated(false);
            console.log('Token is invalid or expired');
          }
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Update the isAuthenticated state
    setIsAuthenticated(false);
  };

  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <header className="sticky top-0 z-50 font-roboto bg-fill">
          <div className="flex items-center justify-between p-2 xl:px-16 lg:px-12 px-4">
            <h1>Recipe PWA</h1>
            <ul className="flex gap-8">
              {isAuthenticated ? (
                <>
                  <Link href="/saved">
                    <li className="hover:underline underline-offset-4 decoration-[#FFB347] decoration-2 font-bold cursor-pointer">
                      Recipes
                    </li>
                  </Link>
                  <li
                    className="hover:underline underline-offset-4 decoration-[#FFB347] decoration-2 font-bold cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out
                  </li>
                </>
              ) : (
                <>
                  <Link href="/account/login">
                    <Button
                      variant="outline"
                      className="decoration-brand decoration-2 font-bold"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/account/register">
                    <Button
                      variant="default"
                      className="bg-brand hover:bg-brand hover:opacity-80 active:opacity-100"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
