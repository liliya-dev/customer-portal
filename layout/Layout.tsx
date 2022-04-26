import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { menuItems } from './LayoutOptions';
import { useIsAuthenticated } from '@azure/msal-react';
import { Button } from '../components/buttons/Button';
import { Spinner } from '../components/loaders/Spinner';
import { Nav } from './Nav/Nav';
import { BREAKPOINTS, useBreakpoint } from '../hooks/useBreakpoint';

export type CardProps = {
  children: React.ReactElement | React.ReactNode;
};

export const Layout = ({ children }) => {
  const router = useRouter();
  const { instance, inProgress } = useMsal();
  const { screenWidth, breakpoint } = useBreakpoint();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = screenWidth < BREAKPOINTS.lg;
  useEffect(() => {
    if (!isAuthenticated && inProgress === 'none') {
      router.push('/');
    }
  });

  if (inProgress !== 'none') {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen overflow-hidden">
      <Nav />
      <div className="flex w-full h-full px-4  pt-20 lg:pt-20">
        <div className="lg:w-64">
          {!isMobile &&
            menuItems.map(({ title, id, icon }) => (
              <Button
                as="a"
                href={`/portal/${id}`}
                label={title}
                theme="lightblue"
                stretch
                key={id}
              />
            ))}
        </div>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};
