import React, { useRef, useState, useEffect } from 'react';
import NextLink from 'next/link';

import { BREAKPOINTS, useBreakpoint } from '../../hooks/useBreakpoint';

import LogoImageMobile from '../../public/logo-icon.svg';
import LogoImage from '../../public/logo.svg';

import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { Title } from '../../components/title/Title';

export type NavProps = {
  showUserMenu?: boolean;
};
export const Nav = ({ showUserMenu = true }) => {
  const { screenWidth, breakpoint } = useBreakpoint();
  const [openDesckMenu, setOpenDesckMenu] = useState(false);
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState<boolean>(false);
  const isMobile = screenWidth < BREAKPOINTS.lg;

  const onHamburgerClick = (value) => {
    setMobileNavIsOpen(value);
  };

  const toggleDeskMenu = () => {
    setOpenDesckMenu(!openDesckMenu);
  };

  return (
    <div className="fixed top-0 w-full px-2 md:px-4">
      <nav
        className={
          'flex gap-3 items-center py-4 xl:py-5 px-1 border-b-2 border-indigo-50'
        }
      >
        <NextLink href="/">
          <a>
            {isMobile ? <LogoImageMobile className={'w-7 h-7'} /> : <LogoImage />}
          </a>
        </NextLink>
        <Title className="text-indigo-200" size="xs">
          Customer Portal
        </Title>
        {isMobile ? (
          <MobileNav
            open={mobileNavIsOpen}
            onHamburgerClick={onHamburgerClick}
            showUserMenu={showUserMenu}
          />
        ) : (
          <TopNav
            showUserMenu={showUserMenu}
            open={openDesckMenu}
            onClickMenu={toggleDeskMenu}
          />
        )}
      </nav>
    </div>
  );
};
