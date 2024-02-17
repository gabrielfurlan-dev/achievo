import { PrismaClient } from "@prisma/client";

export async function tags(prisma: PrismaClient) {
    await prisma.tag.upsert({
        where: { id: 1 },
        update: {},
        create: {
            colorHexCode: "F4D271",
            userId: "0",
            title: "Study",
            icon: "BookBookmark",
        }
    })
    await prisma.tag.upsert({
        where: { id: 2 },
        update: {},
        create: {
            colorHexCode: "AD7AF1",
            userId: "0",
            title: "Workout",
            icon: "Barbell"
        }
    })
}

