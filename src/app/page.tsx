'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter(); // Initialize useRouter

  // Function to handle search
  const handleSearch = () => {
    if (search.trim()) {
      // Check if search is not empty
      router.push(`/results?query=${encodeURIComponent(search)}`); // Navigate to results page with query
    }
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service worker registration successful', registration);
        })
        .catch((error) => {
          console.log('Service worker registration failed', error);
        });
    }
  });

  return (
    <main className="h-[100vh] relative flex justify-center items-center font-roboto">
      <Image
        src={'/hero-img.jpg'}
        fill
        alt="Hero image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/70" />
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search..."
          className="relative w-[200px] text-white text-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // Check for Enter key
              handleSearch(); // Call handleSearch when Enter is pressed
            }
          }}
        />
        <Button variant="default" className="relative" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </main>
  );
}
