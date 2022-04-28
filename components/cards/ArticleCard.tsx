import React from 'react';
import cx from 'classnames';
import { CardShadow } from './CardShadow';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

import { Title } from '../title/Title';
import { Link } from '../buttons/Link';

export type ResourceCardProps = {
  title?: string;
  href?: string;
  label?: string;
  image?: string;
};

export const ArticleCard = ({ title, href, image, label }: ResourceCardProps) => {
  return (
    <CardShadow>
      <Link href={href}>
        <li className={cx('flex flex-col')}>
          {image && (
            <div className="w-full h-24 md:h-40">
              <NextImage src={image} layout={'fill'} />
            </div>
          )}
          <div className="h-32 px-3 pt-2.5 pb-3.5 md:px-6 md:pb-6 md:pt-5 flex-grow flex flex-col gap-2 md:gap-4">
            {label && (
              <span className="-mb-2 block text-xs font-semibold text-indigo-200 break-words">
                {label}
              </span>
            )}
            {title && (
              <Title as="strong" size="xxs">
                <div className="text-line-clamp">{title}</div>
              </Title>
            )}
          </div>
        </li>
      </Link>
    </CardShadow>
  );
};
