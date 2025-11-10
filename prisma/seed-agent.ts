import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst({ where: { email: 'admin@a2z.com' } })
  if (!user) {
    console.error('❌ No user found! Run seed-user.ts first.')
    process.exit(1)
  }

  const agent = await prisma.agentProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      isVerified: true,
      rating: 5.0,
      contactPhone: '+11234567890',
    },
  })
  console.log('✅ Created agent for:', user.email)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())