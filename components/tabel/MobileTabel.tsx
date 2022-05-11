import React, { useState } from 'react';

import { Paper } from '../paper/Paper';
import { Icon } from '../icons/Icon';
import { formatDate } from '../../helpers/utils/date';
import { truncate } from '../../helpers/utils/string';
import { UserType } from '../../types';
import { Button } from '../buttons/Button';

export type MobileTabelProps = {
  items: UserType[];
  handleSelectAll: (e: any) => void;
  isCheckAll: boolean;
  setActiveUser: React.Dispatch<React.SetStateAction<string>>;
  handelCheckbox: (e: any) => void;
  isCheck: string[];
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalNameOpen: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  decrementPage: () => void;
  incrementPage: () => void;
  pagesInfo: { total: number; maxPage: number; perPage: number }[];
  getLastShowedResultNumber: () => number;
};

export const MobileTabel = ({
  items,
  setActiveUser,
  setIsModuleOpen,
  setModalNameOpen,
  handleSelectAll,
  isCheckAll,
  handelCheckbox,
  isCheck,
  pageNumber,
  decrementPage,
  incrementPage,
  pagesInfo,
  getLastShowedResultNumber
}) => {
  const [isOpen, setIsOpen] = useState([]);

  const handelOpenItem = (e) => {
    const { id } = e.currentTarget;
    const { type } = e.target;

    if (type === 'checkbox') return;

    if (isOpen.includes(id)) {
      setIsOpen(isOpen.filter((item) => item !== id));
      return;
    }
    setIsOpen([...isOpen, id]);
  };

  const trElement = (items) =>
    items.map(({ department, email, role, name, lastActiveDate, _id }, i) => {
      return (
        <div key={i} className="border-b">
          <div
            id={_id}
            className="w-full bg-white flex gap-2.5 content-center items-center px-2"
            onClick={(e) => {
              setActiveUser(_id);
              handelOpenItem(e);
            }}
          >
            <div>
              <input
                type="checkbox"
                id={_id}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handelCheckbox}
                checked={isCheck.includes(_id)}
              />
            </div>
            <div className="py-2 whitespace-nowrap flex flex-col items-center gap-4">
              <div className="flex flex-rows items-center gap-4">
                <Icon name="UserCircleBlue" className="w-8 h-8" />
                <div className="flex flex-col">
                  <p className="text-indigo-500 font-medium">{name}</p>
                  <p className="text-indigo-300 font-normal">{email}</p>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              {isOpen.includes(_id) ? (
                <Icon name="ChevronUpIcon" className="w-6 h-6" />
              ) : (
                <Icon name="ChevronDownIcon" className="w-6 h-6" />
              )}
            </div>
          </div>
          {isOpen.includes(_id) && (
            <div className="px-12 flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Department:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {department}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Last Active:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {formatDate(lastActiveDate)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-indigo-300 font-normal">Role:</p>
                <p className="text-indigo-500 font-medium text-right">
                  {truncate(role, 20)}
                </p>
              </div>
              <div className="flex justify-end gap-2.5 p-1.5 border-t">
                <div
                  onClick={() => {
                    setIsModuleOpen(true);
                    setModalNameOpen('edit');
                  }}
                >
                  <Icon name="PencilIcon" className="w-6 h-6 text-indigo-100" />
                </div>
                <div
                  onClick={() => {
                    setIsModuleOpen(true);
                    setModalNameOpen('delete');
                  }}
                >
                  <Icon name="TrashIcon" className="w-6 h-6 text-indigo-100" />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  
  return (
    items.length > 0 && (
      <div>
        <Paper>
          <div className="shadow-md">
            <div className="w-full text-left text-indigo-400">
              <div className="text-xs font-normal text-indigo-400 uppercase bg-gray-200">
                <div className="flex gap-4 items-center p-2">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                  {isCheck.length > 0 && (
                    <div
                      className="p-1 cursor-pointer focus:text-blue-500"
                      onClick={() => {
                        setModalNameOpen('deleteAll');
                        setIsModuleOpen(true);
                      }}
                    >
                      <p className="text-indigo-500 font-medium">Delete Users</p>
                    </div>
                  )}
                </div>
              </div>
              <div>{trElement(items)}</div>
              {items.length > 0 && pagesInfo[0].maxPage > 0 && (
                <div className="px-2 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-indigo-500 font-medium">
                      Showing {pageNumber * pagesInfo[0].perPage + 1} to {getLastShowedResultNumber()} of{' '}
                      {pagesInfo[0].total} results
                    </p>
                    <div className="flex gap-3">
                      <Button
                        icon='ChevronLeftIcon'
                        theme='white'
                        onClick={decrementPage}
                        as="button"
                        disabled={pageNumber < 1}
                      />
                      <Button
                        icon='ChevronRightIcon'
                        theme='white'
                        onClick={incrementPage}
                        as="button"
                        disabled={pageNumber > pagesInfo[0].maxPage - 1}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Paper>
      </div>
    )
  );
};

export const MobileTabelMemo = React.memo(MobileTabel);
