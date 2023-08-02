import { IResponseData } from '@/Interfaces/IResponseData'
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
            const user = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    imageURL: userData.imageURL
                },
            })
            return res.status(201).json({
                success: true,
                data: user,
                message: "Usuário registrado com sucesso!",
            } as IResponseData);
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Erro ao registrar o usuário",
            error: String(error)
        } as IResponseData);
    }
}
