import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res: NextApiResponse) => {
  const users = [
    {id: 1, name: 'salfkdj'},
    {id: 2, name: 'wkelrj'},
    {id: 3, name: 'io23u'},
    {id: 4, name: 'oirueq'},
    {id: 5, name: 'dfgjesro9'},
  ]

  return res.json(users)
}