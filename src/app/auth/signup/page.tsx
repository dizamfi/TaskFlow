'use client';

import React from 'react';
import { SignUpForm } from '@/components/features/auth';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskFlow</h1>
          <p className="text-gray-600">Únete a TaskFlow</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}