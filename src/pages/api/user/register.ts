import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type CreateUserProps = {
    name: string,
    email: string,
    imageURL: string,
}

export default async function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Somente métodos POST são permitidos' })
        return
    }

    const userData: CreateUserProps = req.body;

    try {
        const userFind = await prisma.user.findFirst({ where: { email: userData.email } })

        if (!userFind) {
            await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    imageURL: userData.imageURL
                },
            })
        }
        return res.status(201).json({ data: "Usuário registrado com sucesso!", error: "", type: 'success' });
    } catch (error) {
        return res.status(500).json({ data: "Erro ao registrar o usuário", error: String(error), type: "error" });
    }
}
