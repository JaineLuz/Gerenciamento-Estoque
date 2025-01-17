const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

main(
  async function main() {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
  }
)
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })