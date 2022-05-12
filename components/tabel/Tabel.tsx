import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { DeskTabelMemo as DeskTabel } from './DeskTabel';
import { MobileTabelMemo as MobileTabel } from './MobileTabel';
import { Button } from '../../components/buttons/Button';
import { Icon } from '../icons/Icon';
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
import { UserFields, StaticState } from '../../types';

import DataAPI from '../../api/data';
import { useRouter } from 'next/router';
import { Paper } from '../paper/Paper';

export type ParamsListType = {
  key: string;
  value: string | number;
};

export function firstOf(val: string[] | string) {
  const firstValue = Array.isArray(val) ? val[0] : val;
  return firstValue || null;
}

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
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>(
    firstOf(router.query?.search) || '',
  );
  const [pageNumber, setPageNumber] = useState<number>(+router.query?.page - 1 || 0);
  const [pagesInfo, setPagesInfo] = useState([]);
  const [sortBy, setSortBy] = useState<string>(
    firstOf(router.query?.sortBy) || 'name',
  );
  const [sortedFrom, setSortedFrom] = useState<string>(
    firstOf(router.query?.direction) || 'asc',
  );

  const debouncedInputValue = useDebounce(inputValue, 500);
  const isMobile = screenWidth < BREAKPOINTS.md;
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;

  const getLastShowedResultNumber = () => {
    let lastNumber = pagesInfo[0].perPage * (pageNumber + 1);
    return lastNumber <= pagesInfo[0].total ? lastNumber : pagesInfo[0].total;
  };

  const getUsersData = async () => {
    setState('loading');
    const response = await dataAPI.getUsers({
      tid: accounts[0]?.tenantId,
      token,
      query: debouncedInputValue,
      page: pageNumber,
      perPage: 10,
      orderedby: sortBy,
      direction: sortedFrom,
    });

    if (Math.ceil(response.total / +response.perPage) < +router.query?.page) {
      addParams([
        { key: 'page', value: Math.ceil(response.total / response.perPage) },
      ]);
      return;
    }
    setPagesInfo([
      {
        maxPage: Math.ceil(response.total / response.perPage),
        total: response.total,
        perPage: Number(response.perPage),
      },
    ]);

    setUsersList(response.users);
    setState('success');
  };

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    setPageNumber(+router.query?.page - 1 || 0);
    const sortDirection = firstOf(router.query?.direction) || 'asc';
    setSortedFrom(sortDirection);
    setInputValue(firstOf(router.query?.search) || '');
    setSortBy(firstOf(router.query?.sortBy) || 'name');
  }, [router.query]);

  useEffect(() => {
    if (typeof window === undefined || !router.query) return;
    getUsersData();
  }, [pageNumber, sortedFrom, debouncedInputValue, sortBy]);

  const addParams = (list: ParamsListType[] = []) => {
    let newPairs = {};
    list.forEach(({ key, value }) => {
      newPairs[key] = value;
    });
    let newQuery = { ...router.query, ...newPairs };
    newQuery = Object.entries(newQuery).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a), // remove falsy values
      {},
    );

    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (!checkedUsersList.length) return setIsCheckAll(false);
    setIsCheckAll(usersList.every(({ _id }) => checkedUsersList.includes(_id)));
  }, [checkedUsersList, checkedUsersList.length, usersList]);

  const addUser = async ({ name, email, role, department }) => {
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
      setUsersList([]);
      setIsModuleOpen(false);
      getUsersData();
    }
  };

  const editUser = async ({ name, email, role, id, department }) => {
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
      getUsersData();
    }
  };

  const deleteUser = async ({ id }) => {
    const response = await dataAPI.deleteUser({
      tid: accounts[0]?.tenantId,
      token,
      userId: id,
    });
    if (response.status === 200) {
      setCheckedUsersList([]);
      setIsModuleOpen(false);
      getUsersData();
    }
  };

  const incrementPage = () => {
    const page =
      pagesInfo[0].maxPage !== pageNumber ? pageNumber + 1 : pagesInfo[0].maxPage;
    addParams([{ key: 'page', value: page + 1 }]);
  };

  const decrementPage = () => {
    const page = pageNumber !== 0 ? pageNumber - 1 : 0;
    addParams([{ key: 'page', value: page + 1 }]);
  };

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
            checkedList={checkedUsersList}
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
    <div className="pb-20">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5">
        <Title size="xs" className="mb-5">
          Users
        </Title>
        <div className="flex flex-rows gap-3 lg:gap-6 justify-end">
          <Search
            inputValue={inputValue}
            setInputValue={(value) => {
              addParams([{ key: 'search', value }]);
            }}
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
      <Paper>
        {state === 'success' && (
          <>
            {isMobile ? (
              <MobileTabel
                items={usersList}
                setActiveUser={setActiveUser}
                setModalNameOpen={setModalNameOpen}
                setIsModuleOpen={setIsModuleOpen}
                handleSelectAll={handleSelectAll}
                handelCheckbox={handelCheckbox}
                getLastShowedResultNumber={getLastShowedResultNumber}
                isCheck={checkedUsersList}
                isCheckAll={isCheckAll}
                pageNumber={pageNumber}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
                pagesInfo={pagesInfo}
                setSort={(value) => addParams([{ key: 'sortBy', value }])}
              />
            ) : (
              <DeskTabel
                setSort={(value) => addParams(value)}
                activeUser={activeUser}
                handelCheckbox={handelCheckbox}
                setIsModuleOpen={setIsModuleOpen}
                getLastShowedResultNumber={getLastShowedResultNumber}
                handleSelectAll={handleSelectAll}
                checkedList={checkedUsersList}
                isCheckAll={isCheckAll}
                items={usersList}
                setActiveUser={setActiveUser}
                setModalNameOpen={setModalNameOpen}
                setSortedFrom={(value) => addParams([{ key: 'direction', value }])}
                sortBy={sortBy}
                sortedFrom={sortedFrom}
                pageNumber={pageNumber}
                decrementPage={decrementPage}
                incrementPage={incrementPage}
                pagesInfo={pagesInfo}
              />
            )}
          </>
        )}

        {state === 'loading' && (
          <div className="w-full py-12 flex justify-center">
            <div className="w-20 h-20">
              <Spinner />
            </div>
          </div>
        )}

        {usersList.length === 0 && inputValue !== '' && state !== 'loading' && (
          <div className="flex gap-4 flex-col min-h-max py-10 items-center justify-center text-indigo-500">
            <Icon name="CommonFileSearch" className="w-10 h-10" />
            <p className="font-bold">No results matching your criteria.</p>
          </div>
        )}
        {usersList.length === 0 && inputValue === '' && state !== 'loading' && (
          <div className="flex gap-4 flex-col min-h-max py-10 items-center justify-center text-indigo-500">
            <Icon name="UserPlus" className="w-10 h-10" />
            <p className="font-bold">Need to add first user.</p>
          </div>
        )}
      </Paper>
      <Dialog mode="form" onOpenChange={setIsModuleOpen} open={isModuleOpen}>
        {openFormNamed()}
      </Dialog>
    </div>
  );
};

export const TabelMemo = React.memo(Tabel);
