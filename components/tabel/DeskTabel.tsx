import React, { useState, useEffect, useCallback } from 'react';
import { Paper } from '../paper/Paper';
import { Icon } from '../icons/Icon';
import { formatDate } from '../../helpers/utils/date';

type SortOrder = 'ascn' | 'desc';

export const DeskTabel = ({
  items,
  handleSelectAll,
  isCheckAll,
  setActiveUser,
  activeUser,
  handelCheckbox,
  isCheck,
  handelModal,
}) => {
  const [sortedFrom, setSortedFrom] = useState<SortOrder>('desc');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    switch (sortedFrom) {
      case 'desc':
        items.sort((a, b) => b.name - a.name);
        break;

      case 'ascn':
        items.sort((a, b) => a.name - b.name);
        break;

      default:
        items.sort((a, b) => b.name - a.name);
        break;
    }
  }, [sortedFrom, items]);

  const handelSortBtn = () =>
    sortedFrom === 'desc' ? setSortedFrom('ascn') : setSortedFrom('desc');

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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handelCheckbox}
                  checked={isCheck.includes(_id)}
                />
                <label className="sr-only">checkbox</label>
              </div>
            </td>
            <th>
              <Icon name="UserCircle" className="w-8 h-8" />
            </th>
            <th scope="row" className="px-2 py-4 whitespace-nowrap">
              <p>{name}</p>
              <p className="text-indigo-300 font-normal">{email}</p>
            </th>
            <td className="px-6 py-4 text-indigo-300">{department}</td>
            <td className="px-6 py-4 text-indigo-300">
              {formatDate(lastActiveDate)}
            </td>
            <td className="px-6 py-4 text-indigo-300 cursor-pointer">
              {showMenu && activeUser === _id ? (
                <div className="flex justify-around">
                  <div onClick={handelModal}>
                    <Icon name="PencilIcon" className="w-6 h-6 text-blue-500" />
                  </div>
                  <div onClick={handelModal}>
                    <Icon name="TrashIcon" className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              ) : (
                <p>{role}</p>
              )}
            </td>
          </tr>
        );
      }),
    [activeUser, isCheck, showMenu],
  );
  return (
    <Paper>
      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-left text-indigo-400">
          <thead className="text-xs font-normal text-indigo-400 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="py-2 px-5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    name="selectAll"
                    id="selectAll"
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                  <label className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col">
                <div className="flex items-center">
                  <p className="sr-only">user-icon</p>
                </div>
              </th>
              <th scope="col" className="px-2 py-3" onClick={handelSortBtn}>
                <div className="flex items-center gap-2">
                  <p>Name</p>

                  {sortedFrom === 'desc' ? (
                    <Icon name="ChevronDownIcon" className="w-6 h-6" />
                  ) : (
                    <Icon name="ChevronUpIcon" className="w-6 h-6" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                DEPARTMENT
              </th>
              <th scope="col" className="px-6 py-3">
                LAST ACTIVE
              </th>
              <th scope="col" className="px-6 py-3">
                ROLE
              </th>
            </tr>
          </thead>
          <tbody>{Boolean(items.length > 0) && trElement(items)}</tbody>
        </table>
      </div>
    </Paper>
  );
};
