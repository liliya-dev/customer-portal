import { useMsal } from '@azure/msal-react';
import { useIsAuthenticated } from '@azure/msal-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '../components/buttons/Button';
import { Spinner } from '../components/loaders/Spinner';

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
    <div className={'flex w-full justify-center flex-col items-center pt-24'}>
      <Head>
        <title>harmon.ie Login</title>
      </Head>
      <Button
        label="Sign in with Microsoft"
        onClick={() => instance.loginRedirect()}
        theme="white"
        icon="FacebookIcon"
        iconPosition="before"
        as="button"
      />
    </div>
  );
}
