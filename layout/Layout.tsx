import cx from 'classnames';
import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { menuItems } from './LayoutOptions';
import { useIsAuthenticated } from '@azure/msal-react';
import { Icon } from '../components/icons/Icon';
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

  const renderMenuList = (items) =>
    items.map(({ title, icon, id }, i) => (
      <button
        key={i}
        onClick={() => router.push(`/portal/${id}`)}
        className={cx('py-4 px-12 text-indigo-500 w-full font-semibold', {
          ['bg-indigo-50']: `/portal/${id}` === router.pathname,
        })}
      >
        <div className="flex gap-4">
          {icon && <Icon name={icon} className="w-6 h-6 " />}
          {title}
        </div>
      </button>
    ));

  return (
    <div className="h-screen overflow-hidden grid grid-rows-[62px_1fr] lg:grid-rows-[92px_1fr]">
      <Nav />
      <div className="w-full h-full">
        <div className="bg-gray-50 fixed h-screen lg:w-80 lg:pt-4">
          {!isMobile && renderMenuList(menuItems)}
        </div>
        <div className="lg:ml-80">{children}</div>
      </div>
    </div>
  );
};
