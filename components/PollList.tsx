import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Poll {
  _id: string;
  question: string;
}

interface Props {
  user: string;
}

const PollList: React.FC<Props> = ({ user }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`);
      setPolls(response.data);
    };
    fetchPolls();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-center">Available Polls</h2>
      <div className="flex justify-between mb-4 px-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push('/create-poll')}
        >
          Create Poll
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {polls.map((poll) => (
          <div key={poll._id} className="p-4 border border-gray-300 rounded-lg shadow-md">
            <Link href={`/polls/${poll._id}`} legacyBehavior>
              <a className="text-blue-500 underline block text-center">
                {poll.question}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollList;
