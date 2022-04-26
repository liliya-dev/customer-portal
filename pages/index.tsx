import { useMsal } from '@azure/msal-react';
import { useIsAuthenticated } from '@azure/msal-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '../components/buttons/Button';
import { Title } from '../components/title/Title';
import { Spinner } from '../components/loaders/Spinner';
import { Wrapper } from '../components/wrapper/Wrapper';
import { Icon } from '../components/icons/Icon';
import { Nav } from '../layout/Nav/Nav';
export default function Page() {
  const { instance, inProgress } = useMsal();
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && inProgress === 'none') {
      router.push('/portal/users-licenses');
    }
  });

  if (inProgress !== 'none') {
    return (
      <div className="w-24 h-24 m-auto mt-24">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div>
      <Head>
        <title>harmon.ie Login</title>
      </Head>
      <Nav showUserMenu={false} />
      <div className="w-full h-full fixed top-o left-0 justify-center text-center overflow-auto flex">
        <div className="flex flex-col gap-6 items-center px-2 justify-center text-center w-11/12 md:w-3/6 xl:w-4/12 md:max-w-md">
          <div>
            <Icon name="HarmonieIcon" className="w-12 h-12" />
          </div>
          <Title size="lg" className="text-indigo-500 font-extrabold">
            Sign in to the harmon.ie Customer Portal{' '}
          </Title>
          <Button
            label="Sign in with Microsoft"
            onClick={() => instance.loginRedirect()}
            theme="white"
            icon="MicrosoftIcon"
            iconPosition="before"
            as="button"
            stretch
          />
        </div>
      </div>
      <div className="fixed bottom-0 h-24 w-full flex items-center justify-center bg-gray-50">
        <p className="text-indigo-200">© harmon.ie 2022</p>
      </div>
    </div>
  );
}
