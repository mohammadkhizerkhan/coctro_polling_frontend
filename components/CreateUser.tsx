import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateUser = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, { name });
    sessionStorage.setItem('user', response.data.data._id);
    router.push('/polls');
  };

  return (
    <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
