import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './jwt';

interface IjwtMiddleware {
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}

export async function jwtMiddleware({ handler }: IjwtMiddleware) {

    return async (req: NextApiRequest, res: NextApiResponse) => {

        const token = req.headers.authorization?.replace('Bearer ', '');

        console.log(req.headers.authorization)

        if (!token) {
            return res.status(401).json({ error: "Token de autorização não fornecido." });
        }

        const data = verifyToken(token);

        if (!data) {
            return res.status(401).json({ error: "Token de autorização inválido ou expirado." });
        }

        return await handler(req, res);

    };

}
