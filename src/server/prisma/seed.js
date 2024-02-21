import { PrismaClient } from "@prisma/client"
import addBetTypes from "./seeds/addBetTypes.js"

const prisma = new PrismaClient()

async function main() {
  await addBetTypes(prisma)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
