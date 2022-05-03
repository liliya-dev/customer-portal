import cx from 'classnames';

import { Layout } from '../../layout/Layout';
import { Title } from '../../components/title/Title';
import { ArticleCard } from '../../components/cards/ArticleCard';
import { Accordion } from '../../components/accordion/Accordion';

const list = [
  {
    title: 'Introducing harmon.ie Accord',
    label: 'Video',
    image: '/images/content/Media.png',
    href: 'https://harmon.ie/videos/introducing-harmon.ie-365',
  },
  {
    title: 'Conquering Information Chaos with Microsoft 365 and harmon.ie',
    label: 'Webinar',
    image: '/images/content/Media-1.png',
    href: 'https://harmon.ie/webinars/conquering-information-chaos-with-microsoft-365-and-harmon-ie',
  },
  {
    title: 'AAFC Reaps the Benefits of SharePoint Using harmon.ie',
    label: 'Case Study',
    image: '/images/content/Media-2.png',
    href: 'https://harmon.ie/case-studies/aafc-case-study',
  },
];

const accordionItems = [
  {
    title: 'How to upload Documents and Emails to SharePoint Directly From Outlook?',
    content:
      'Drag and drop emails from harmon.ie into your email to send SharePoint links instead of attachments. Sharing documents from the Outlook window makes it easy to stay focused on what’s important. Plus, with document links, everyone works on the same version of the document.',
  },
  {
    title: 'Conquering Information Chaos with Microsoft 365 and harmon.ie',
    content:
      'Drag and drop emails from harmon.ie into your email to send SharePoint links instead of attachments. Sharing documents from the Outlook window makes it easy to stay focused on what’s important. Plus, with document links, everyone works on the same version of the document.',
  },
  {
    title: 'AAFC Reaps the Benefits of SharePoint Using harmon.ie',
    content:
      'Drag and drop emails from harmon.ie into your email to send SharePoint links instead of attachments. Sharing documents from the Outlook window makes it easy to stay focused on what’s important. Plus, with document links, everyone works on the same version of the document.',
  },
];

export default function Page() {
  return (
    <Layout>
      <Title size="lg" className="">
        Support
      </Title>
      <div className="mt-8">
        <div className="mb-8">
          <Title size="xs" className="mb-5">
            harmon.ie Accord intro title
          </Title>
          <p className="mb-4">
            Drag and drop important client request emails into a Teams conversation
            to create a shared task. Eliminate the inevitable chaos that ensues with
            emails sent to shared mailboxes, like ‘info@,’ ‘sales@,’ or ‘support@.’
          </p>
          <p>
            {' '}
            Once a task is created, team members can weigh in - ask questions, offer
            advice, and even transfer task ownership to another person on the team.
            When everyone participates in the discussion, clients get better answers,
            faster. All from the place where your team collaboration already
            happens... Microsoft Teams.
          </p>
        </div>
        <div className="mb-8">
          <Title size="xs" className="mb-5">
            Watch videos
          </Title>
          {Boolean(list?.length) && (
            <ul
              className={cx('grid gap-3.5 sm:gap-8', 'grid-cols-1 md:grid-cols-3')}
            >
              {list.map(({ title, label, image, href }, i) => (
                <ArticleCard
                  key={i}
                  label={label}
                  title={title}
                  image={image}
                  href={href}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="mb-8">
          <Title size="xs" className="mb-5">
            FAQ
          </Title>
          <Accordion items={accordionItems} />
        </div>
      </div>
    </Layout>
  );
}
