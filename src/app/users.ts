import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db('mi-db');

  if (req.method === 'POST') {
    const { name, email } = req.body;

    const result = await db.collection('users').insertOne({ name, email });
    res.status(201).json({ success: true, id: result.insertedId });
  } else if (req.method === 'GET') {
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } else {
    res.status(405).json({ success: false, error: 'Método no permitido' });
  }
}