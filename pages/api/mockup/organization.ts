import type { NextApiRequest, NextApiResponse } from 'next';
const organizationData = require('../../../mock-data/organization.json'); 

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (!req.headers.authorization) res.status(403).send(JSON.stringify({ status: 403, message: 'Not Allowed' }));
  const { tid } = req.query;
  if (!tid) res.status(404).send(JSON.stringify({ status: 404, message: 'Not Found' }));

  res
  .status(200)
  .send(JSON.stringify({ ...organizationData }));
}

export default handler;