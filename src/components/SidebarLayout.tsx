import type { ReactNode } from 'react';
import Header from './Header';
import UserMenu from './UserMenu';

type Props = {
  children: ReactNode;
};

export default function SidebarLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-full flex-col bg-indigo-50">
      <Header />
      <div className="flex min-h-0 flex-1">
        <UserMenu />
        <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
