'use client';
import React from 'react';
import SignForm from '@/app/components/SignForm';
import { createUser } from '@/app/services/userServices';

const SignUpPage = () => {
  const handleSignUp = async (data: { username: string; email: string; password: string }) => {
    try {
      await createUser(data); 
      console.log('User signed up successfully');
      alert("User signed up successfully");
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <SignForm mode="signUp" onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUpPage;
