import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreatePoll = ({ user }: { user: string }) => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const router = useRouter();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPoll = { question, user_id: user, options };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions`, newPoll);
    router.push(`/polls/${response.data._id}`);
  };

  const isFormValid = question.trim() !== '' && options.slice(0, 2).every(opt => opt.trim() !== '');

  return (
    <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded mb-2"
              required={index < 2}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addOption}
          className="w-full px-4 py-2 bg-green-500 text-white rounded mb-4"
        >
          Add Option
        </button>
        <button
          type="submit"
          className={`w-full px-4 py-2 ${isFormValid ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
          disabled={!isFormValid}
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
