import { useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { menuItems } from './LayoutOptions';
import { useIsAuthenticated } from '@azure/msal-react';
import { Button } from '../components/buttons/Button';
import { Spinner } from '../components/loaders/Spinner';

export type CardProps = {
  children: React.ReactElement | React.ReactNode;
};

export const Layout = ({ children }) => {
  const router = useRouter();
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

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
    <div className="flex w-full p-16">
      <div className="w-64">
        {menuItems.map(({ title, id, icon }) => (
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
      <div className="p-16">
        {children}
        <Button label="signout" onClick={() => instance.logout()} as="button" />
      </div>
    </div>
  );
};
