'use client'; // Required for error handling in Next.js 13+

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <Button variant="destructive" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
