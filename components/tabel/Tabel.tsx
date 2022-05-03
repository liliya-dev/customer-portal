import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect } from 'react';

import { DeskTabel } from './DeskTabel';
import { MobileTabel } from './MobileTabel';
import { Icon } from '../icons/Icon';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/input/Input';
import { Title } from '../title/Title';
import { AddUserForm, EditUserForm, DeleteUserForm } from '../form/Form';
import { BREAKPOINTS, useBreakpoint } from '../../hooks/useBreakpoint';
import { Dialog } from '../../components/dialog/Dialog';

import DataAPI from '../../api/data';

const dataAPI = new DataAPI();

export const Tabel = () => {
  const { accounts } = useMsal();
  const [usersList, setUsersList] = useState([]);
  const [activeUser, setActiveUser] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [isShowClearBtn, setIsShowClearBtn] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const { screenWidth, breakpoint } = useBreakpoint();
  const isMobile = screenWidth < BREAKPOINTS.md;
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  useEffect(() => {
    const getUsersData = async () => {
      const response = await dataAPI.getUsers({
        tid: accounts[0]?.tenantId,
        token,
        query: 'new',
        page: 0,
        perPage: 10,
        orderedby: 'name',
        direction: 'asc',
      });
      console.log(response);
      setUsersList(response.users);
    };
    getUsersData();
  }, [accounts, token]);

  const addUser = async () => {
    const response = await dataAPI.addUser({
      tid: accounts[0]?.tenantId,
      token,
      body: {
        department: 'Accounting and Finance',
        license: 'FREE',
        role: 'ORGANIZATION_EXTERNAL_USER',
        email: 'ivan@harmon.ie',
        name: 'Ivan Ivan',
      },
    });
    console.log(response);
  };

  const handelModal = (e) => {
    console.dir(e.currentTarget);
    setIsModuleOpen(!isModuleOpen);
  };

  const handleClearInput = (e) => {
    setInputValue('');
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(usersList.map((item) => item._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handelCheckbox = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
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
            onClick={handelModal}
            size="md"
            key={'add'}
          />
        </div>
      </div>
      {isMobile ? (
        <MobileTabel items={usersList} />
      ) : (
        <DeskTabel
          activeUser={activeUser}
          handelCheckbox={handelCheckbox}
          handelModal={handelModal}
          handleSelectAll={handleSelectAll}
          isCheck={isCheck}
          isCheckAll={isCheckAll}
          items={usersList}
          setActiveUser={setActiveUser}
        />
      )}
      <Dialog mode="form" onOpenChange={setIsModuleOpen} open={isModuleOpen}>
        <AddUserForm />
      </Dialog>
    </div>
  );
};
