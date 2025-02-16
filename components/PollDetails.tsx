import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Option {
  _id: string;
  option_name: string;
  votes: {
    user_id: {
      _id: string;
      name: string;
    };
    created_at: Date;
  }[];
}

interface Poll {
  _id: string;
  question: string;
  user_id: {
    _id: string;
    name: string;
  };
  options: Option[];
}

interface Props {
  user: string;
}

const PollDetails: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const fetchPollDetails = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/${id}`);
    setPoll(response.data);

    response.data?.options.forEach((option: Option) => {
      if (option.votes.some(vote => vote?.user_id?._id === user)) {
        setSelectedOption(option._id);
      }
    });
  };

  useEffect(() => {
    if (id) {
      fetchPollDetails();
      const interval = setInterval(fetchPollDetails, 5000);
      return () => clearInterval(interval);
    }
  }, [id]);

  const handleVote = async (optionId: string) => {
    if (selectedOption) return; // Prevent voting again
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/${id}/options/${optionId}/vote`, { user_id: user });
    fetchPollDetails();
  };

  if (!poll) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">{poll.question}</h2>
      <ul className="space-y-4">
        {poll.options.map((option) => (
          <li key={option._id} className="flex items-center">
            <input
              type="radio"
              name="option"
              checked={selectedOption === option._id}
              onChange={() => handleVote(option._id)}
              disabled={!!selectedOption}
              className="mr-2"
            />
            <label>{option.option_name}</label>
            <span className="ml-auto">Votes: {option.votes.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollDetails;
