import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@a2z.com'
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return existing

  const user = await prisma.user.create({
    data: {
      email,
      name: 'Admin User',
      password: await hash('password123', 12),
      role: 'ADMIN', // adjust if your enum differs
    },
  })
  console.log('✅ Created user:', user.email)
  return user
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())