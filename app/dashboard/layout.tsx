import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '../ui/dashboard/header';
export const experimental_ppr = true;
import { auth } from '@/auth';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Header session={session} />
        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}