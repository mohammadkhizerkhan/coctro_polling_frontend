import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreateUser from '../components/CreateUser';
import PollList from '../components/PollList';

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      router.push('/polls');
    }
  }, [router]);

  if (user) {
    return <PollList user={user} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <CreateUser />
    </div>
  );
}
