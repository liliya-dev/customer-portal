import React from 'react';

import { Paper } from '../paper/Paper';

export const Dropdown = ({ listSelectedCheckBoxes, handelCheckType }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-3">
        <Paper>
          <div className="flex flex-col items-start px-3 w-max">
            {listSelectedCheckBoxes.map(({ slug, title }, idx) => (
              <button
                key={idx}
                type="button"
                id={slug}
                onClick={handelCheckType}
                className="border-b py-2.5 text-base"
              >
                {title}
              </button>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export const DropdownMemo = React.memo(Dropdown);
