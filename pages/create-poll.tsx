import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CreatePoll from '../components/CreatePoll';

const CreatePollPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push('/');
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <CreatePoll user={user} />
    </div>
  );
};

export default CreatePollPage;
