import { PrismaClient } from '@prisma/client'
import { colors } from './seeds/colors';
const prisma = new PrismaClient()

async function main() {
    await colors(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
