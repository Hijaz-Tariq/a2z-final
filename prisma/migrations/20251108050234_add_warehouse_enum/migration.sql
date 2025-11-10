-- CreateEnum
CREATE TYPE "WarehouseStatus" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "status" "WarehouseStatus" NOT NULL DEFAULT 'ENABLED';
