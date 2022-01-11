import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query);

    const users = [
        { id: 1, name: 'Megui' },
        { id: 2, name: 'Alfredo' },
    ]

    return response.json(users);
}