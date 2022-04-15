import { UserType } from '../types';
import API from './_api';

export type BasicReqType = {
  tid: string;
  userId?: string;
  token: string;
};

export type SortFilterType = {
  query?: string;
  orderedby?: 'lastActive' | 'name' | 'email';
  direction?: 'asc' | 'desc';
};

export type BodyUserType = {
  body: Partial<UserType>;
};

class Data extends API {
  // user actions
  deleteUser({ tid, userId, token }: BasicReqType) {
    return this.request(`/user?tid=${tid}&userId=${userId}`, {
      method: 'DELETE',
      token,
    });
  }

  editUser({ tid, userId, body, token }: BasicReqType & BodyUserType) {
    return this.request(`/user?tid=${tid}&userId=${userId}`, {
      method: 'PATCH',
      body,
      token,
    });
  }

  addUser({ tid, body, token }: BasicReqType & BodyUserType) {
    return this.request(`/user?tid=${tid}`, {
      method: 'POST',
      body,
      token,
    });
  }

  // licenses

  getLicenses({ tid, token }: BasicReqType) {
    return this.request(`/organization?tid=${tid}`, { token });
  }

  // users list, sort, filter

  getUsers({
    tid,
    orderedby = 'lastActive',
    direction = 'asc',
    query = '',
    token,
  }: BasicReqType & SortFilterType) {
    return this.request(
      `/organization?tid=${tid}&orderedby=${orderedby}&query=${query}&direction=${direction}`,
      { token },
    );
  }
}

export default Data;
