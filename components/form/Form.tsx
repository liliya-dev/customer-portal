import React, { useState } from 'react';

import { Title } from '../title/Title';
import { Button } from '../buttons/Button';
import {
  checkValidateName,
  checkValidateSurname,
  checkValidateEmail,
} from '../../helpers/utils/validatiors';

const roleList = ['Member', 'Owner'];

const departmentList = [
  'Research and Development',
  'Marketing',
  'Accounting and Finance',
  'Production',
];

export const AddUserForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState([]);
  console.log(!!errors.length);
  const handelChange = ({ target }) => {
    const { value, name } = target;
    switch (name) {
      case 'FirstName':
        setErrors(checkValidateName(value, name));
        break;
      case 'LastName':
        setErrors(checkValidateSurname(value, name));
        break;
      case 'Email':
        setErrors(checkValidateEmail(value));
        break;
      default:
        break;
    }
  };

  return (
    <form
      className="inline-block w-550 max-w-full"
      onSubmit={(e) => {
        e.preventDefault();

        const form: HTMLFormElement = e.currentTarget;

        if (!form.Role.value || form.Role.value === 'Role') {
          return setErrors([
            { inputName: 'role', message: 'Select from Role list' },
          ]);
        }
        if (form.Department.value === 'Department' || form.Department.value === '') {
          return setErrors([
            { inputName: 'department', message: 'Select from Department list' },
          ]);
        }

        if (
          !form.FirstName.value.trim().length ||
          !form.LastName.value.trim().length
        ) {
          return setErrors([
            {
              inputName: 'department',
              message: 'Check if the fields are filled in correctly',
            },
          ]);
        }

        const newName = `${form.FirstName.value.trim()} ${form.LastName.value.trim()}`;
        onSubmit({
          name: newName,
          email: form.Email.value,
          role: form.Role.value,
          department: form.Department.value,
        });
      }}
      onChange={handelChange}
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center  px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Add User</Title>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4  my-8 lg:my-16">
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
              name="Role"
              id="role"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              onChange={() => setErrors([])}
            >
              <option value="">Role</option>
              {roleList.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2 ">
            <select
              name="Department"
              id="department"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              onChange={() => setErrors([])}
            >
              <option>Department</option>
              {departmentList.map((dept, i) => (
                <option key={i}>{dept}</option>
              ))}
            </select>
          </div>
          {!!errors.length && (
            <div className="absolute -bottom-6 md:-bottom-8 inset-x-0">
              <p className="text-red-400 text-md text-center lg:col-span-2">
                {errors[0].message}
              </p>
            </div>
          )}
        </div>
        <Button
          label="Add"
          theme="lightindigo"
          iconPosition="before"
          as="submit"
          size="sm"
          stretch
        />
      </div>
    </form>
  );
};

export const EditUserForm = ({ setIsModuleOpen, user, onSubmit }) => {
  const { name, email, _id, department } = user[0];
  const newName = name.split(' ');
  // console.log(name);
  // console.log(checkValidateName(name));
  const [firstName, setFirstName] = useState(name ? newName[0] : '');
  const [lastName, setLastName] = useState(name ? newName[1] : '');
  const [emailUser, setEmailUser] = useState(email ? email : '');
  const [roleUser, setRoleUser] = useState('Member');
  const [departUser, setDepartUser] = useState(
    department ? department : 'Department',
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;

        console.log(form.role.value);
        // onSubmit({
        //   name: `${form.FirstName.value} ${form.LastName.value}`,
        //   email: emailUser,
        //   role: roleUser,
        //   id: _id,
        //   department: departUser,
        // });
      }}
      className="inline-block w-550 max-w-full"
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Edit User</Title>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8 lg:my-16">
          <div>
            <input
              required
              type="text"
              name="FirstName"
              placeholder="First name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
          </div>
          <div>
            <input
              required
              type="text"
              name="LastName"
              placeholder="Last name *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
          </div>
          <div>
            <input
              required
              type="email"
              name="Email"
              placeholder="E-mail *"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={emailUser}
              onChange={({ target }) => setEmailUser(target.value)}
            />
          </div>
          <div>
            <select
              name="role"
              id="role"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              value={roleUser}
              onChange={({ target }) => setRoleUser(target.value)}
            >
              <option value="">Role</option>
              {roleList.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2 ">
            <select
              name="Department"
              id="department"
              className="border bg-white border-indigo-50 placeholder-indigo-300 md:text-base w-full"
              onChange={({ target }) => setDepartUser(target.value)}
            >
              <option value="">{departUser}</option>
              {departmentList.map((dept, i) => (
                <option key={i}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-rows gap-6 content-center">
          <Button
            label="Discard"
            onClick={() => setIsModuleOpen(false)}
            theme="lightindigo"
            as="button"
            size="sm"
            stretch
          />
          <Button label="Save" theme="lightindigo" as="submit" size="sm" stretch />
        </div>
      </div>
    </form>
  );
};

export const DeleteUserForm = ({ setIsModuleOpen, activeUser, onSubmit }) => {
  console.log(activeUser);
  return (
    <form
      className="inline-block lg:w-[45vw]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ id: activeUser });
      }}
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Delete User</Title>
        <p className="my-10 text-left font-normal leading-8">
          Permanenly delete this user? This can’t undo this.
        </p>
        <div className="flex flex-rows gap-6 content-center">
          <Button
            label="Cancel"
            onClick={() => setIsModuleOpen(false)}
            theme="lightindigo"
            as="button"
            size="sm"
            stretch
          />
          <Button label="Delete" theme="lightindigo" as="submit" size="sm" stretch />
        </div>
      </div>
    </form>
  );
};

export const DeleteUsersForm = ({
  setIsModuleOpen,
  isCheck,
  isCheckAll,
  onSubmit,
}) => {
  return (
    <form
      className="inline-block lg:w-[45vw]"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(isCheck);
        isCheck.map((id) => onSubmit({ id }));
      }}
    >
      <div className="shadow-xl bg-white border border-black border-opacity-5 text-center px-8 py-4 lg:px-16 lg:py-10">
        <Title size="lg">Delete Users</Title>
        {isCheckAll ? (
          <p className="my-10 text-left font-normal leading-8">
            Permanenly delete all this users? This can’t undo this.
          </p>
        ) : (
          <p className="my-10 text-left font-normal leading-8">
            Permanenly delete {isCheck.length} users? This can’t undo this.
          </p>
        )}

        <div className="flex flex-rows gap-6 content-center">
          <Button
            label="Cancel"
            onClick={() => setIsModuleOpen(false)}
            theme="lightindigo"
            as="button"
            size="sm"
            stretch
          />
          <Button label="Delete" theme="lightindigo" as="submit" size="sm" stretch />
        </div>
      </div>
    </form>
  );
};
