-- DropForeignKey
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_agentId_fkey";

-- AlterTable
ALTER TABLE "Warehouse" ALTER COLUMN "agentId" DROP NOT NULL,
ALTER COLUMN "agentId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AgentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
