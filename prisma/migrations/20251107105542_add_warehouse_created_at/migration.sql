/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Pickup` table. All the data in the column will be lost.
  - You are about to drop the column `brokerId` on the `Pickup` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Pickup` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Pickup` table. All the data in the column will be lost.
  - You are about to drop the column `guestId` on the `Pickup` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Pickup` table. All the data in the column will be lost.
  - The `status` column on the `Pickup` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[email]` on the table `GuestCheckout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalPrice` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `GuestCheckout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupContactId` to the `Pickup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledDate` to the `Pickup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImage` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'REQUIRES_ACTION');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER', 'CRYPTO', 'OTHER');

-- CreateEnum
CREATE TYPE "PickupType" AS ENUM ('WAREHOUSE_TRANSFER', 'OUTBOUND_SHIPMENT', 'INBOUND_RETURN', 'BUSINESS_PICKUP', 'RESIDENTIAL_PICKUP');

-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('TOTAL_WEIGHT_VALUE', 'DIMENSION_THRESHOLD', 'PACKAGE_WEIGHT');

-- DropForeignKey
ALTER TABLE "Pickup" DROP CONSTRAINT "Pickup_brokerId_fkey";

-- DropForeignKey
ALTER TABLE "Pickup" DROP CONSTRAINT "Pickup_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Pickup" DROP CONSTRAINT "Pickup_guestId_fkey";

-- DropForeignKey
ALTER TABLE "Pickup" DROP CONSTRAINT "Pickup_guestSessionId_fkey";

-- DropIndex
DROP INDEX "pickup_broker_idx";

-- DropIndex
DROP INDEX "pickup_customer_idx";

-- DropIndex
DROP INDEX "pickup_date_idx";

-- DropIndex
DROP INDEX "pickup_guest_idx";

-- DropIndex
DROP INDEX "pickup_guest_session_idx";

-- DropIndex
DROP INDEX "pickup_status_idx";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "discountPrice" DECIMAL(65,30),
ADD COLUMN     "originalPrice" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "GuestCheckout" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMethod" "PaymentMethod",
ADD COLUMN     "paymentStatus" "PaymentStatus" DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discountPrice" DECIMAL(65,30),
ADD COLUMN     "originalPrice" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Pickup" DROP COLUMN "address",
DROP COLUMN "brokerId",
DROP COLUMN "customerId",
DROP COLUMN "date",
DROP COLUMN "guestId",
DROP COLUMN "weight",
ADD COLUMN     "approvedAt" TIMESTAMPTZ(6),
ADD COLUMN     "approvedById" UUID,
ADD COLUMN     "calculatedCost" DOUBLE PRECISION,
ADD COLUMN     "commercialDocuments" JSONB,
ADD COLUMN     "costCurrency" TEXT DEFAULT 'USD',
ADD COLUMN     "customDeliveryAddressId" UUID,
ADD COLUMN     "customPickupAddressId" UUID,
ADD COLUMN     "deliveryContactId" UUID,
ADD COLUMN     "deliveryWarehouseId" UUID,
ADD COLUMN     "itemsDescription" TEXT,
ADD COLUMN     "packageCount" INTEGER,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "pickupContactId" UUID NOT NULL,
ADD COLUMN     "pickupWarehouseId" UUID,
ADD COLUMN     "scheduledDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "specialNotes" TEXT,
ADD COLUMN     "specialPricing" TEXT,
ADD COLUMN     "storageFeeAcknowledged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeWindow" TEXT,
ADD COLUMN     "totalWeight" DOUBLE PRECISION,
ADD COLUMN     "type" "PickupType" NOT NULL DEFAULT 'OUTBOUND_SHIPMENT',
ADD COLUMN     "userId" UUID,
ADD COLUMN     "weightUnit" TEXT DEFAULT 'kg',
DROP COLUMN "status",
ADD COLUMN     "status" "ShippingStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "discountPrice" DECIMAL(10,2),
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isOnSale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mainImage" VARCHAR(255) NOT NULL,
ADD COLUMN     "saleEndsAt" TIMESTAMP(3),
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "guestSessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "originalPrice" DECIMAL(65,30) NOT NULL,
    "discountPrice" DECIMAL(65,30),
    "wishlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "mainImage" VARCHAR(255),
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mainImage" VARCHAR(255),
    "images" TEXT[],

    CONSTRAINT "SpecialCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "guestCheckoutId" UUID,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "company" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupItem" (
    "id" UUID NOT NULL,
    "pickupId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "value" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "hsCode" TEXT,
    "weight" DOUBLE PRECISION,
    "dimensions" JSONB,

    CONSTRAINT "PickupItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupPackage" (
    "id" UUID NOT NULL,
    "pickupId" UUID NOT NULL,
    "packageType" TEXT NOT NULL DEFAULT 'parcel',
    "weight" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "specialNotes" TEXT,
    "itemIds" TEXT[],

    CONSTRAINT "PickupPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'US',
    "coordinates" JSONB,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "requiresDocs" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingPricing" (
    "id" UUID NOT NULL,
    "originCountryId" INTEGER NOT NULL,
    "destCountryId" INTEGER NOT NULL,
    "tier1Price" DOUBLE PRECISION NOT NULL,
    "tier2Price" DOUBLE PRECISION NOT NULL,
    "tier3Price" DOUBLE PRECISION NOT NULL,
    "tier4Price" DOUBLE PRECISION NOT NULL,
    "tier5Price" DOUBLE PRECISION NOT NULL,
    "originDocsRequired" BOOLEAN NOT NULL DEFAULT false,
    "destDocsRequired" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraChargeRule" (
    "id" UUID NOT NULL,
    "pricingId" UUID NOT NULL,
    "ruleType" "RuleType" NOT NULL,
    "conditionValue" DOUBLE PRECISION,
    "conditionValue2" DOUBLE PRECISION,
    "chargeAmount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtraChargeRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuestCheckoutToPickup" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GuestSessionToPickup" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_PickupToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BrokerProfileToPickup" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_guestSessionId_key" ON "Wishlist"("guestSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SpecialCard_slug_key" ON "SpecialCard"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_key" ON "StripeCustomer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_guestCheckoutId_key" ON "StripeCustomer"("guestCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_stripeCustomerId_key" ON "StripeCustomer"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "stripe_customer_user_idx" ON "StripeCustomer"("userId");

-- CreateIndex
CREATE INDEX "stripe_customer_guest_checkout_idx" ON "StripeCustomer"("guestCheckoutId");

-- CreateIndex
CREATE INDEX "stripe_customer_id_idx" ON "StripeCustomer"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_guestCheckoutId_key" ON "StripeCustomer"("userId", "guestCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "country_code_idx" ON "Country"("code");

-- CreateIndex
CREATE INDEX "pricing_origin_idx" ON "ShippingPricing"("originCountryId");

-- CreateIndex
CREATE INDEX "pricing_dest_idx" ON "ShippingPricing"("destCountryId");

-- CreateIndex
CREATE INDEX "pricing_active_idx" ON "ShippingPricing"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingPricing_originCountryId_destCountryId_key" ON "ShippingPricing"("originCountryId", "destCountryId");

-- CreateIndex
CREATE INDEX "rule_pricing_idx" ON "ExtraChargeRule"("pricingId");

-- CreateIndex
CREATE INDEX "rule_type_idx" ON "ExtraChargeRule"("ruleType");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraChargeRule_pricingId_ruleType_key" ON "ExtraChargeRule"("pricingId", "ruleType");

-- CreateIndex
CREATE UNIQUE INDEX "_GuestCheckoutToPickup_AB_unique" ON "_GuestCheckoutToPickup"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestCheckoutToPickup_B_index" ON "_GuestCheckoutToPickup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuestSessionToPickup_AB_unique" ON "_GuestSessionToPickup"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestSessionToPickup_B_index" ON "_GuestSessionToPickup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PickupToUser_AB_unique" ON "_PickupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PickupToUser_B_index" ON "_PickupToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BrokerProfileToPickup_AB_unique" ON "_BrokerProfileToPickup"("A", "B");

-- CreateIndex
CREATE INDEX "_BrokerProfileToPickup_B_index" ON "_BrokerProfileToPickup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "GuestCheckout_email_key" ON "GuestCheckout"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_guestCheckoutId_fkey" FOREIGN KEY ("guestCheckoutId") REFERENCES "GuestCheckout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_pickupWarehouseId_fkey" FOREIGN KEY ("pickupWarehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_customPickupAddressId_fkey" FOREIGN KEY ("customPickupAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_pickupContactId_fkey" FOREIGN KEY ("pickupContactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_deliveryWarehouseId_fkey" FOREIGN KEY ("deliveryWarehouseId") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_customDeliveryAddressId_fkey" FOREIGN KEY ("customDeliveryAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_deliveryContactId_fkey" FOREIGN KEY ("deliveryContactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupItem" ADD CONSTRAINT "PickupItem_pickupId_fkey" FOREIGN KEY ("pickupId") REFERENCES "Pickup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickupPackage" ADD CONSTRAINT "PickupPackage_pickupId_fkey" FOREIGN KEY ("pickupId") REFERENCES "Pickup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingPricing" ADD CONSTRAINT "ShippingPricing_originCountryId_fkey" FOREIGN KEY ("originCountryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingPricing" ADD CONSTRAINT "ShippingPricing_destCountryId_fkey" FOREIGN KEY ("destCountryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraChargeRule" ADD CONSTRAINT "ExtraChargeRule_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "ShippingPricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuestCheckoutToPickup" ADD CONSTRAINT "_GuestCheckoutToPickup_A_fkey" FOREIGN KEY ("A") REFERENCES "GuestCheckout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuestCheckoutToPickup" ADD CONSTRAINT "_GuestCheckoutToPickup_B_fkey" FOREIGN KEY ("B") REFERENCES "Pickup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuestSessionToPickup" ADD CONSTRAINT "_GuestSessionToPickup_A_fkey" FOREIGN KEY ("A") REFERENCES "GuestSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuestSessionToPickup" ADD CONSTRAINT "_GuestSessionToPickup_B_fkey" FOREIGN KEY ("B") REFERENCES "Pickup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PickupToUser" ADD CONSTRAINT "_PickupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Pickup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PickupToUser" ADD CONSTRAINT "_PickupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrokerProfileToPickup" ADD CONSTRAINT "_BrokerProfileToPickup_A_fkey" FOREIGN KEY ("A") REFERENCES "BrokerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrokerProfileToPickup" ADD CONSTRAINT "_BrokerProfileToPickup_B_fkey" FOREIGN KEY ("B") REFERENCES "Pickup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
