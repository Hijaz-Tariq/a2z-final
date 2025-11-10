import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // First, ensure at least one AgentProfile exists
  const agent = await prisma.agentProfile.findFirst()
  if (!agent) {
    console.error('❌ No AgentProfile found! Please seed agents first.')
    process.exit(1)
  }

  const warehouseData = [
    {
      name: 'NYC Downtown Warehouse',
      address: {
        line1: '123 Main Street',
        line2: 'Building A',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        coordinates: { lat: 40.7128, lng: -74.006 },
        country: 'US',
      },
    },
    {
      name: 'Chicago Distribution Center',
      address: {
        line1: '456 Oak Avenue',
        line2: 'Suite 300',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        coordinates: { lat: 41.8781, lng: -87.6298 },
        country: 'US',
      },
    },
    {
      name: 'LA West Coast Hub',
      address: {
        line1: '789 Pine Road',
        line2: null,
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90001',
        coordinates: { lat: 34.0522, lng: -118.2437 },
        country: 'US',
      },
    },
    {
      name: 'Houston Southern Logistics',
      address: {
        line1: '321 Elm Street',
        line2: 'Warehouse District',
        city: 'Houston',
        state: 'TX',
        postalCode: '77001',
        coordinates: { lat: 29.7604, lng: -95.3698 },
        country: 'US',
      },
    },
    {
      name: 'Miami International Depot',
      address: {
        line1: '654 Maple Drive',
        line2: 'Industrial Park',
        city: 'Miami',
        state: 'FL',
        postalCode: '33101',
        coordinates: { lat: 25.7617, lng: -80.1918 },
        country: 'US',
      },
    },
  ]

  for (const wh of warehouseData) {
    await prisma.warehouse.create({
      data: {
        name: wh.name,
        agent: { connect: { id: agent.id } }, // 👈 assign agent
        address: { create: wh.address },
      },
    })
  }

  console.log('✅ Seeded 5 warehouses with addresses and agents!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })