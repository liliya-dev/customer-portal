import React, { useState } from 'react';
import { Layout } from '../../layout/Layout';
import { Title } from '../../components/title/Title';
import { Paper } from '../../components/paper/Paper';
import { Link } from '../../components/buttons/Link';
import { Icon } from '../../components/icons/Icon';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/input/Input';
import { Tabel } from '../../components/tabel/Tabel';

export default function Page() {
  const [isShowClearBtn, setIsShowClearBtn] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleClearInput = (e) => {
    setInputValue('');
  };
  return (
    <Layout>
      <Title size="lg" className="">
        Dashboard
      </Title>
      <div className="mt-8">
        <div className="mb-10">
          <Title size="xs" className="mb-5">
            Subscription
          </Title>
          <Paper>
            <div className="p-6 lg:p-8 flex gap-6 flex-col">
              <div>
                <p className="text-indigo-300 font-medium">
                  Used Licenses - harmon.ie Accord
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Title size="md">6/10</Title>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 text-blue-500 lg:text-center">
                  <Link href="/portal/billing">
                    <div className="flex gap-2 cursor-pointer">
                      <Icon name="CashIcon" className="w-6 h-6" />
                      <p>Billing</p>
                    </div>
                  </Link>
                  <Link href="/portal/subscription">
                    <div className="flex gap-2 cursor-pointer">
                      <Icon name="CogIcon" className="w-6 h-6" />
                      <p>Manage Subscription</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Paper>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <Title size="xs" className=" mb-5">
            Users
          </Title>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative">
              <Icon
                name="SearchIcon"
                className="w-5 h-5 absolute text-indigo-300 top-3 left-3"
              />
              {isShowClearBtn && (
                <div onClick={handleClearInput}>
                  <Icon
                    name="X"
                    className="absolute top-3 right-3 cursor-pointer w-5 h-5 text-indigo-300"
                  />
                </div>
              )}
              <Input
                name="search"
                placeholder={'Search...'}
                type="search"
                id={'search'}
                value={inputValue}
                setValue={setInputValue}
                className="text-indigo-300 py-2 pl-10 pr-7 font-normal w-80"
              />
            </div>
            <Button
              as="button"
              label="Add User"
              onClick={() => console.log('Add User')}
              size="md"
            />
          </div>
        </div>
        <Tabel />
      </div>
    </Layout>
  );
}
