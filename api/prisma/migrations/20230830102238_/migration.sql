/*
  Warnings:

  - Added the required column `desc` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;
