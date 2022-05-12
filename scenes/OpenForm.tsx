import React from 'react';

import { AddUserFormMemo as AddUserForm } from '../components/form/AddUserForm';
import { EditUserFormMemo as EditUserForm } from '../components/form/EditUserForm';
import { DeleteUserFormMemo as DeleteUserForm } from '../components/form/DeleteUserForm';
import { DeleteUsersForm as DeleteUsersForm } from '../components/form/DeleteUsersForm';

export type OpenFormProps = {
  modalNameOpen: string;
  addUser: any;
  setIsModuleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: any[];
  editUser: any;
  deleteUser: any;
  activeUser: string;
  checkedUsersList: string[];
  isCheckAll: boolean;
};
export const OpenForm = ({
  modalNameOpen,
  addUser,
  setIsModuleOpen,
  items,
  editUser,
  deleteUser,
  activeUser,
  checkedUsersList,
  isCheckAll,
}: OpenFormProps) => {
  console.log(items);
  const openFormNamed = () => {
    switch (modalNameOpen) {
      case 'add':
        return <AddUserForm onSubmit={addUser} />;
      case 'edit':
        return (
          <EditUserForm
            setIsModuleOpen={setIsModuleOpen}
            user={items.filter((item) => item._id === activeUser)}
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
  };
  return openFormNamed();
};

export const OpenFormMemo = React.memo(OpenForm);
