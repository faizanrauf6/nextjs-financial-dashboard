'use client';

import { useActionState, useEffect } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/app/ui/fonts';
import { Button } from './button';
import { signUp } from '@/app/lib/actions'; // You'll need to implement this
import type { SignupState } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const initialState: SignupState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    async (_prevState: SignupState, formData: FormData) => {
      return await signUp(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state.redirectTo, router]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create an account
        </h1>
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
              disabled={isPending}
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
            ))}
          </div>
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="email-error"
              disabled={isPending}
            />
            <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email?.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label htmlFor="password" className="mb-3 block text-xs font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="password-error"
              disabled={isPending}
            />
            <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password?.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
            ))}
          </div>
        </div>

        <Button className="mt-8 w-full" aria-disabled={isPending} disabled={isPending}>
        {isPending ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Signing up...</span>
          </span>
        ) : (
          <>
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </>
        )}
      </Button>

        {/* Generic Error */}
        {state.message && (
          <div className="mt-5 flex items-center space-x-1">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
