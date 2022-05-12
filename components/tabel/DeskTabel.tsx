import React, { useState, useCallback } from 'react';
import cx from 'classnames';

import { Paper } from '../paper/Paper';
import { Icon } from '../icons/Icon';
import { formatDate } from '../../helpers/utils/date';
import { UserType } from '../../types';
import { truncate } from '../../helpers/utils/string';
import { Button } from '../buttons/Button';
import { ParamsListType } from './Tabel';


export type DeskTabelProps = {
  sortBy: string;
  setSort: (value: ParamsListType[]) => void;
  items: UserType[];
  handleSelectAll: (e: any) => void;
  isCheckAll: boolean;
  setActiveUser: React.Dispatch<React.SetStateAction<string>>;
  activeUser: string;
  handelCheckbox: (e: any) => void;
  isCheck: string[];
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNameOpen: React.Dispatch<React.SetStateAction<string>>;
  sortedFrom: string;
  setSortedFrom: (value: string) => void;
  pageNumber: number;
  decrementPage: () => void;
  incrementPage: () => void;
  pagesInfo: { total: number; maxPage: number; perPage: number }[];
  getLastShowedResultNumber: () => number;
};

export const DeskTabel = ({
  setSort,
  items,
  handleSelectAll,
  isCheckAll,
  setActiveUser,
  activeUser,
  handelCheckbox,
  isCheck,
  setIsModuleOpen,
  setModalNameOpen,
  sortedFrom,
  setSortedFrom,
  pageNumber,
  decrementPage,
  incrementPage,
  pagesInfo,
  getLastShowedResultNumber,
  sortBy,
}: DeskTabelProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handelSortBtn = (id) => {
    console.log(id)
    if (id === sortBy) {
      sortedFrom === 'desc' ? setSortedFrom('asc') : setSortedFrom('desc');
    } else {
      setSort([{ key: 'direction', value: 'asc' }, { key: 'sortBy', value: id },]);
    }
  };

  const trElement = useCallback(
    (items) =>
      items.map(({ department, email, role, name, lastActiveDate, _id }, i) => {
        return (
          <tr
            key={i}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600"
            onMouseOver={() => {
              setActiveUser(_id);
              setShowMenu(true);
            }}
            onMouseOut={() => {
              setShowMenu(false);
            }}
          >
            <td className="w-4 p-5">
              <div className="flex items-center">
                <input
                  id={_id}
                  type="checkbox"
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handelCheckbox}
                  checked={isCheck.includes(_id)}
                />
                <label className="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" className="whitespace-nowrap">
              <div className="flex items-center gap-4">
                <Icon name="UserCircleBlue" className="w-10 h-10" />
                <div>
                  <p>{name}</p>
                  <p className="text-indigo-300 font-normal">{email}</p>
                </div>
              </div>
            </th>
            <td className="text-indigo-300">{department}</td>
            <td className="text-indigo-300">{formatDate(lastActiveDate)}</td>
            <td className="text-indigo-300 cursor-pointer md:w-24 lg:w-28">
              {showMenu && activeUser === _id ? (
                <div className="flex justify-around ">
                  <div
                    onClick={() => {
                      setIsModuleOpen(true);
                      setModalNameOpen('edit');
                    }}
                  >
                    <Icon name="PencilIcon" className="w-6 h-6 text-blue-500" />
                  </div>
                  <div
                    onClick={() => {
                      setIsModuleOpen(true);
                      setModalNameOpen('delete');
                    }}
                  >
                    <Icon name="TrashIcon" className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              ) : (
                <p className="pr-4">{truncate(role, 15)}</p>
              )}
            </td>
          </tr>
        );
      }),
    [
      activeUser,
      handelCheckbox,
      isCheck,
      setActiveUser,
      setIsModuleOpen,
      setModalNameOpen,
      showMenu,
    ],
  );

  if (!items) return;

  const tableHeaders = [
    { name: 'Name', id: 'name' },
    { name: 'Department', id: 'department' },
    { name: 'Last Active', id: 'lastActiveDate' },
    { name: 'Role', id: 'role' },
  ];

  return (
    <div className="flex gap-5 flex-col mb-4">
      <Paper>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-5">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      name="selectAll"
                      id="selectAll"
                      onChange={handleSelectAll}
                      checked={isCheckAll}
                    />
                  </div>
                </th>
                {tableHeaders.map(({ id, name }) => (
                  <th
                    key={id}
                    scope="col"
                    className={cx("py-3 cursor-pointer", {
                      ['pr-8']: id !== sortBy,
                      ['pl-3']: id === 'name'
                    })}
                    onClick={() => handelSortBtn(id)}
                  >
                    <div className="flex items-center gap-2">
                      <p>{name.toUpperCase()}</p>
                      {id === sortBy && (
                        <Icon
                          name={
                            sortedFrom === 'desc'
                              ? 'ChevronUpIcon'
                              : 'ChevronDownIcon'
                          }
                          className="w-6 h-6"
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{trElement(items)}</tbody>
          </table>
          {items.length > 0 && pagesInfo[0].maxPage > 0 && (
            <div className="py-3 px-6 bg-white shadow-md border-b">
              <div className="flex justify-between items-center">
                <p>
                  Showing {pageNumber * pagesInfo[0].perPage + 1} to{' '}
                  {getLastShowedResultNumber()} of {pagesInfo[0].total} results
                </p>
                <div className="flex gap-3">
                  {isCheck.length > 0 && (
                    <Button
                      theme="white"
                      as="button"
                      onClick={() => {
                        setModalNameOpen('deleteAll');
                        setIsModuleOpen(true);
                      }}
                      label="Delete Users"
                    />
                  )}
                  <Button
                    theme="white"
                    onClick={decrementPage}
                    as="button"
                    label="Previous"
                    disabled={pageNumber < 1}
                  />
                  <Button
                    label="Next"
                    theme="white"
                    onClick={incrementPage}
                    as="button"
                    disabled={pageNumber > pagesInfo[0].maxPage - 2}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export const DeskTabelMemo = React.memo(DeskTabel);
