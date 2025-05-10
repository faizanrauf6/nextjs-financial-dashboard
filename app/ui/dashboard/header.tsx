'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { lusitana } from '../fonts';
import type { Session } from 'next-auth';

function getPageTitle(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'dashboard';

  const titleMap: Record<string, string> = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    invoices: 'Invoices',
  };

  return titleMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

export default function Header( { session } : { session: Session | null }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 pb-4">
      <h1 className={`${lusitana.className} text-xl font-semibold`}>{title}</h1>
      {session?.user?.name && (
        <div className="text-gray-700 font-medium">Welcome, {session.user.name}</div>
      )}
    </header>
  );
}
