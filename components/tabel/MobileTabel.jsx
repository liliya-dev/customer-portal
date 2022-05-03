import React, { useCallback, useEffect, useState } from 'react';

import { Paper } from '../paper/Paper';
import { Icon } from '../icons/Icon';
import { formatDate } from '../../helpers/utils/date';

export const MobileTabel = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handelMoreBtn = () => setIsOpen(!isOpen);

  console.log(isOpen);
  const trElement = useCallback(
    (items) =>
      items.map(({ department, email, role, name, lastActiveDate, _id }, i) => {
        return (
          <tr key={i}>
            <td className="text-center">
              <div>
                <input
                  type="checkbox"
                  id={_id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <label className="sr-only">checkbox</label>
            </td>
            <th className="w-10">
              <Icon name="UserCircle" className="w-8 h-8" />
            </th>
            <th
              scope="row"
              className="py-2 whitespace-nowrap flex flex-col items-center justify-between"
              onClick={handelMoreBtn}
            >
              <div className="">
                <p>{name}</p>
                <p className="text-indigo-300 font-normal">{email}</p>
                <div>
                  {isOpen ? (
                    <Icon name="ChevronUpIcon" className="w-6 h-6" />
                  ) : (
                    <Icon name="ChevronDownIcon" className="w-6 h-6" />
                  )}
                </div>
              </div>
              <div>
                {isOpen && (
                  <div>
                    <div className="flex">
                      <p>DEPARTMENT</p>
                      <p>{department}</p>
                    </div>
                    <div className="flex">
                      <p>LAST ACTIVE</p>
                      <p>{formatDate(lastActiveDate)}</p>
                    </div>
                    <div className="flex">
                      <p>ROLE</p>
                      <p>{role}</p>
                    </div>
                  </div>
                )}
              </div>
            </th>
          </tr>
        );
      }),
    [handelMoreBtn, isOpen],
  );
  return (
    <div>
      <Paper>
        <div className="shadow-md">
          <table className="w-full text-left text-indigo-400">
            <thead className="text-xs font-normal text-indigo-400 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="w-10 h-10 text-center">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </th>
                <th scope="col">
                  <div className="sr-only">
                    <p>Icon</p>
                  </div>
                </th>
                <th scope="col">
                  <div className="sr-only">
                    <p>Name</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>{trElement(items)}</tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};
