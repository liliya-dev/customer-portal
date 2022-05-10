import { useMsal } from '@azure/msal-react';
import { Button } from '../components/buttons/Button';
import { Title } from '../components/title/Title';
import DataAPI from '../api/data';

const dataAPI = new DataAPI();

const UserLicensesScene = () => {
  const { accounts } = useMsal();
  const storadgeKey = `${accounts[0].homeAccountId}-${accounts[0].environment}-idtoken-${accounts[0].idTokenClaims['aud']}-${accounts[0].tenantId}---`;
  const token = JSON.parse(sessionStorage.getItem(storadgeKey)).secret;
  const getOrganizationData = async () => {
    const response = await dataAPI.getLicenses({
      tid: accounts[0]?.tenantId,
      token,
    });
    console.log(response);
  };

  const getUsersData = async () => {
    const response = await dataAPI.getUsers({
      tid: accounts[0]?.tenantId,
      token,
      query: 'new',
      page: 0,
      perPage: 10,
      orderedby: 'name',
      direction: 'asc',
    });
    console.log(response);
  };

  const deleteUser = async () => {
    const response = await dataAPI.deleteUser({
      tid: accounts[0]?.tenantId,
      token,
      userId: '625e7b02e1eb285760f170f8',
    });
    console.log(response);
  };

  const editUser = async () => {
    const response = await dataAPI.editUser({
      tid: accounts[0]?.tenantId,
      token,
      userId: '625e7b02e1eb285760f170ee',
      body: {
        department: 'Marketing',
      },
    });
    console.log(response);
  };

  const addUser = async () => {
    const response = await dataAPI.addUser({
      tid: accounts[0]?.tenantId,
      token,
      body: {
        department: 'Accounting and Finance',
        license: 'FREE',
        role: 'ORGANIZATION_EXTERNAL_USER',
        email: 'ivan@harmon.ie',
        name: 'Ivan Ivan',
      },
    });
    console.log(response);
  };

  return (
    <div>
      <Title size="md">
        <p className="mb-8">Users and licenses</p>
      </Title>
      <div className="flex gap-4 pb-4">
        <Button as="button" onClick={() => addUser()} label="ADD" />
        <Button as="button" onClick={() => editUser()} label="Edit" />
        <Button as="button" onClick={() => deleteUser()} label="Delete" />
        <Button
          as="button"
          onClick={() => getOrganizationData()}
          label="Get org info"
        />
        <Button as="button" onClick={() => getUsersData()} label="Get users" />
      </div>
    </div>
  );
};

export default UserLicensesScene;
