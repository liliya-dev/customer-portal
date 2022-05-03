import React from 'react';

import { Title } from '../title/Title';
import { Button } from '../buttons/Button';

export type AddUserFormValue = {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Role?: string;
};
const roleList = ['Member', 'Owner'];
export type AddUsersFromProps = {};

export const AddUserForm = () => {
  return (
    <form className="inline-block w-550 max-w-full">
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center  px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Add User</Title>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  my-8 lg:my-16">
          <div>
            <input
              required
              type="text"
              name="FirstName"
              placeholder="First name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="LastName"
              placeholder="Last name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <input
              required
              type="email"
              name="Email"
              placeholder="E-mail *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <select
              name="role"
              id="role"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            >
              <option value="">Role</option>
              {roleList.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          label="Add"
          onClick={() => console.log('add SUer')}
          theme="lightindigo"
          iconPosition="before"
          as="button"
          size="sm"
          stretch
        />
      </div>
    </form>
  );
};

export const EditUserForm = () => {
  return (
    <form className="inline-block w-550 max-w-full">
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-16 py-10">
        <Title size="lg">Add User</Title>
        <div className="grid grid-cols-2 gap-4 my-16">
          <div>
            <input
              required
              type="text"
              name="FirstName"
              placeholder="First name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="LastName"
              placeholder="Last name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <input
              required
              type="email"
              name="Email"
              placeholder="E-mail *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            />
          </div>
          <div>
            <select
              name="role"
              id="role"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
            >
              <option value="">Role</option>
              {roleList.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          label="Add"
          onClick={() => console.log('add SUer')}
          theme="lightindigo"
          iconPosition="before"
          as="button"
          size="sm"
          stretch
        />
      </div>
    </form>
  );
};

export const DeleteUserForm = () => {
  return (
    <form className="inline-block w-550 max-w-full">
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-16 py-10">
        <Title size="lg">Delete User</Title>
        <p>Permanenly delete this user? This can’t undo this.</p>
        <div className="flex gap-2">
          <Button label="Cancel" />
          <Button label="Delete" />
        </div>
      </div>
    </form>
  );
};

export const DeleteUsersForm = () => {};
