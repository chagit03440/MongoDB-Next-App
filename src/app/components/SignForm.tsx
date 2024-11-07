import React, { useState } from 'react';

interface SignFormProps {
  mode: 'signIn' | 'signUp';
  onSubmit: (data: { username: string; email: string; password: string }) => void;
}

const SignForm: React.FC<SignFormProps> = ({ mode, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-96 mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">
        {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded px-4 py-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-4 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-4 py-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignForm;
