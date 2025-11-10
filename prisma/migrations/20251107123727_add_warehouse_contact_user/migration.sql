/*
  Warnings:

  - A unique constraint covering the columns `[agentId]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "agentId" UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_agentId_key" ON "Warehouse"("agentId");

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AgentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
