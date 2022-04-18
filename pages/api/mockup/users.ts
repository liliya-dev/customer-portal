import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');
const usersData = require('../../../mock-data/users.json');

function saveData(users) {
  fs.writeFileSync('mock-data/users.json', JSON.stringify(users, null, 2));
}

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (!req.headers.authorization) res.status(403).send(JSON.stringify({ status: 403, message: 'Not Allowed' }));
  const { tid } = req.query;
  if (!tid) res.status(404).send(JSON.stringify({ status: 404, message: 'Not Found' }));

  if (req.method === 'GET') {
    const { orderedby, query, direction, page = 0, perPage = 10 } = req.query;
    const pageNumber = +page || 0;
    const perPageNumber = +perPage || 10;
    const orderedKey = Array.isArray(orderedby) ? orderedby[0] : orderedby;
    const users = [...usersData]
      .filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
      .sort((a, b) => {
        const aValue = orderedKey === 'lastActiveDate' ? Date.parse(a[orderedKey]) : a[orderedKey];
        const bValue = orderedKey === 'lastActiveDate' ? Date.parse(b[orderedKey]) : b[orderedKey];
        if (direction === 'asc') return orderedKey === 'lastActiveDate' ? aValue - bValue : aValue.localeCompare(bValue);
        return orderedKey === 'lastActiveDate' ? bValue - aValue : bValue.localeCompare(aValue)
      })
    const paginatedUsers = users.slice(pageNumber * perPageNumber, (pageNumber + 1) * perPageNumber);

    res
      .status(200)
      .send(JSON.stringify({ users: paginatedUsers, total: users.length, page, perPage }));
  }
  else if (req.method === 'DELETE') { 
    const { userId } = req.query;
    if (!userId) res.status(404).send(JSON.stringify({ status: 404, message: 'User id is required' }));
    const users = usersData.filter(user => user.id !== userId);
    saveData(users);
    res.status(200).send(JSON.stringify({ status: 200 }))
  } else if (req.method === 'PATCH') {
    const payload = req.body;
    const { userId } = req.query;
    if (!userId) res.status(404).send(JSON.stringify({ status: 404, message: 'User id is required' }));
    const users = usersData.map(user => {
      return user.id === userId ? { ...user, ...payload } : user
    })
    saveData(users);
    res.status(200).send(JSON.stringify({ status: 200 }))
  } else if (req.method === 'POST') {
    console.log('here')
    const payload = req.body;

    const uniqueId = () => {
      const dateString = Date.now().toString(36);
      const randomness = Math.random().toString(36).substr(2);
      return dateString + randomness;
    };

    const user = {
      ...payload,
      id: uniqueId(),
      lastActiveDate: new Date().toISOString()
    };

    const users = [...usersData, user];
    saveData(users);
    res.status(200).send(JSON.stringify({ status: 200 }))
  }
}

export default handler;