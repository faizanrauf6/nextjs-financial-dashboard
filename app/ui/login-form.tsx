'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { lusitana } from '@/app/ui/fonts';
import { Button } from './button';
import { authenticate } from '@/app/lib/actions';
import type { LoginState } from '@/app/lib/actions';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const initialState: LoginState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(authenticate, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>

        <div className="w-full">
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
                placeholder="Enter your email address"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                disabled={isPending}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label htmlFor="password" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="password-error"
                disabled={isPending}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button className="mt-8 w-full" aria-disabled={isPending} disabled={isPending}>
        {isPending ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Log in...</span>
          </span>
        ) : (
          <>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </>
        )}
      </Button>

        {/* Generic Error Message */}
        <div className="mt-5 flex items-center space-x-1">
          {state.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
