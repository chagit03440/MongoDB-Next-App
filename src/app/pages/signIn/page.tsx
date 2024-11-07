'use client';
import React from 'react';
import { signInUser } from '@/app/services/userServices';
import SignForm from '@/app/components/SignForm';

const SignInPage = () => {
  const handleSignIn = async (data: { username: string; email: string; password: string }) => {
    try {
      await signInUser(data);
      console.log('User signed in successfully');
      alert("User signed in successfully");
    } catch (error) {
      console.error('Error signing in:', error);
      alert("User dont found please sign up");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <SignForm mode="signIn" onSubmit={handleSignIn} />
    </div>
  );
};
export default SignInPage;