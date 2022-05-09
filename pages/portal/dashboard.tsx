import React from 'react';

import { LayoutMemo as Layout } from '../../layout/Layout';
import { Title } from '../../components/title/Title';
import { Paper } from '../../components/paper/Paper';
import { Link } from '../../components/buttons/Link';
import { Icon } from '../../components/icons/Icon';
import { TabelMemo as Tabel } from '../../components/tabel/Tabel';

export default function Page() {
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
        <Tabel />
      </div>
    </Layout>
  );
}
