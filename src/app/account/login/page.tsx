'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Data = {
  message: string;
};

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Data>({ message: '' });

  //router
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event?.preventDefault();
    const response = await fetch('/api/account/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();
    setData(json);

    if (response.ok) {
      setEmail('');
      setPassword('');
      localStorage.setItem('token', json.token);
      router.push('/');
    } else {
      console.log(json.message);
    }
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center gap-4 items-center border border-slate-200 rounded-lg p-8"
      >
        <h1 className="text-xl font-roboto font-bold">Login</h1>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit">Register</Button>

        {data.message && <p>{data.message}</p>}
      </form>
    </div>
  );
}
