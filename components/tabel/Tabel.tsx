import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect, useCallback } from 'react';

import { useDebounce } from '../../hooks/useDebounce';
import { DeskTabelMemo as DeskTabel } from './DeskTabel';
import { MobileTabelMemo as MobileTabel } from './MobileTabel';
import { Button } from '../../components/buttons/Button';
import { Title } from '../title/Title';
import { Search } from '../search/Search';
import {
  AddUserForm,
  EditUserForm,
  DeleteUserForm,
  DeleteUsersForm,
} from '../form/Form';
import { BREAKPOINTS, useBreakpoint } from '../../hooks/useBreakpoint';
import { Dialog } from '../../components/dialog/Dialog';
import { Spinner } from '../loaders/Spinner';
import { SortOrder, UserFields, StaticState } from '../../types';

import DataAPI from '../../api/data';

const dataAPI = new DataAPI();

export const Tabel = () => {
  const { accounts } = useMsal();
  const { screenWidth } = useBreakpoint();

  const [state, setState] = useState<StaticState>('idle');
  const [usersList, setUsersList] = useState<UserFields[]>([]);
  const [activeUser, setActiveUser] = useState<string>('');
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);
  const [checkedUsersList, setCheckedUsersList] = useState<string[]>([]);
  const [modalNameOpen, setModalNameOpen] = useState<
    'edit' | 'add' | 'delete' | 'deleteAll'
  >('add');
  const [inputValue, setInputValue] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pagesInfo, setPagesInfo] = useState([]);
  const [sortedFrom, setSortedFrom] = useState<SortOrder>('asc');

  const debouncedWindowWidth = useDebounce(inputValue, 500);
  const isMobile = screenWidth < BREAKPOINTS.md;
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  const getUsersData = useCallback(async () => {
    const response = await dataAPI.getUsers({
      tid: accounts[0]?.tenantId,
      token,
      query: debouncedWindowWidth,
      page: pageNumber,
      perPage: 10,
      orderedby: 'name',
      direction: sortedFrom,
    });

    setPagesInfo([
      {
        maxPage: Math.round(response.total / response.perPage),
        total: response.total,
        perPage: Number(response.perPage),
      },
    ]);

    setUsersList(response.users);
    setState('success');
  }, [accounts, debouncedWindowWidth, pageNumber, sortedFrom, token]);

  useEffect(() => {
    try {
      setState('loading');
      getUsersData();
    } catch (error) {
      setState('error');
    }
  }, [
    accounts,
    debouncedWindowWidth,
    getUsersData,
    isMobile,
    pageNumber,
    sortedFrom,
    token,
  ]);

  useEffect(() => {
    if (!checkedUsersList.length) return setIsCheckAll(false);
    console.log(usersList, checkedUsersList);
    console.log(usersList.every(({ _id }) => checkedUsersList.includes(_id)));
    setIsCheckAll(usersList.every(({ _id }) => checkedUsersList.includes(_id)));
  }, [checkedUsersList, checkedUsersList.length, usersList]);

  const addUser = useCallback(
    async ({ name, email, role, department }) => {
      const response = await dataAPI.addUser({
        tid: accounts[0]?.tenantId,
        token,
        body: {
          department,
          license: 'FREE',
          role,
          email,
          name,
        },
      });
      if (response.status === 200) {
        setIsModuleOpen(false);
      }
      console.log(response, role, name, email);
    },
    [accounts, token],
  );

  const editUser = useCallback(
    async ({ name, email, role, id, department }) => {
      const response = await dataAPI.editUser({
        tid: accounts[0]?.tenantId,
        token,
        userId: id,
        body: {
          name,
          email,
          role,
          department,
        },
      });
      if (response.status === 200) {
        setIsModuleOpen(false);
      }
      console.log(response.status, name, email, role);
    },
    [accounts, token],
  );

  const deleteUser = useCallback(
    async ({ id }) => {
      console.log(id);
      const response = await dataAPI.deleteUser({
        tid: accounts[0]?.tenantId,
        token,
        userId: id,
      });
      if (response.status === 200) {
        setIsModuleOpen(false);
      }
      console.log(response, id);
    },
    [accounts, token],
  );

  const incrementPage = () =>
    pagesInfo[0].maxPage !== pageNumber ? setPageNumber(pageNumber + 1) : null;

  const decrementPage = () =>
    pageNumber !== 0 ? setPageNumber(pageNumber - 1) : null;

  const openFormNamed = useCallback(() => {
    switch (modalNameOpen) {
      case 'add':
        return <AddUserForm onSubmit={addUser} />;
      case 'edit':
        return (
          <EditUserForm
            setIsModuleOpen={setIsModuleOpen}
            user={usersList.filter((item) => item._id === activeUser)}
            onSubmit={editUser}
          />
        );
      case 'delete':
        return (
          <DeleteUserForm
            setIsModuleOpen={setIsModuleOpen}
            onSubmit={deleteUser}
            activeUser={activeUser}
          />
        );
      case 'deleteAll':
        return (
          <DeleteUsersForm
            isCheck={checkedUsersList}
            setIsModuleOpen={setIsModuleOpen}
            onSubmit={deleteUser}
            isCheckAll={isCheckAll}
          />
        );
      default:
        break;
    }
  }, [
    activeUser,
    addUser,
    deleteUser,
    editUser,
    checkedUsersList,
    isCheckAll,
    modalNameOpen,
    usersList,
  ]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setCheckedUsersList([...checkedUsersList, ...usersList.map((item) => item._id)]);
    if (isCheckAll) {
      setCheckedUsersList([]);
    }
  };

  const handelCheckbox = (e) => {
    const { id, checked } = e.target;
    setIsCheckAll(false);
    setCheckedUsersList([...checkedUsersList, id]);
    if (!checked) {
      setCheckedUsersList(checkedUsersList.filter((item) => item !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">
        <Title size="xs" className="mb-5">
          Users
        </Title>
        <div className="flex flex-rows gap-3 lg:gap-6 justify-end">
          <Search
            inputValue={inputValue}
            setInputValue={setInputValue}
            isMobile={isMobile}
          />
          <Button
            as="button"
            label="Add User"
            onClick={() => {
              setModalNameOpen('add');
              setIsModuleOpen(!isModuleOpen);
            }}
            size="md"
            key={'add'}
          />
        </div>
      </div>
      {isMobile ? (
        <MobileTabel
          items={usersList}
          setActiveUser={setActiveUser}
          setModalNameOpen={setModalNameOpen}
          setIsModuleOpen={setIsModuleOpen}
          handleSelectAll={handleSelectAll}
          handelCheckbox={handelCheckbox}
          isCheck={checkedUsersList}
          isCheckAll={isCheckAll}
          pageNumber={pageNumber}
          decrementPage={decrementPage}
          incrementPage={incrementPage}
          pagesInfo={pagesInfo}
        />
      ) : (
        <DeskTabel
          activeUser={activeUser}
          handelCheckbox={handelCheckbox}
          setIsModuleOpen={setIsModuleOpen}
          handleSelectAll={handleSelectAll}
          isCheck={checkedUsersList}
          isCheckAll={isCheckAll}
          items={usersList}
          setActiveUser={setActiveUser}
          setModalNameOpen={setModalNameOpen}
          setSortedFrom={setSortedFrom}
          sortedFrom={sortedFrom}
          pageNumber={pageNumber}
          decrementPage={decrementPage}
          incrementPage={incrementPage}
          pagesInfo={pagesInfo}
        />
      )}

      <Dialog mode="form" onOpenChange={setIsModuleOpen} open={isModuleOpen}>
        {openFormNamed()}
      </Dialog>
    </div>
  );
};

export const TabelMemo = React.memo(Tabel);
