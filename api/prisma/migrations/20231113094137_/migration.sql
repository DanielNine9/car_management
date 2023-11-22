/*
  Warnings:

  - The values [PHONE,LAPTOP,PC,ACCESSORY] on the enum `typeProduct` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "typeProduct_new" AS ENUM ('two', 'four');
ALTER TABLE "products" ALTER COLUMN "type" TYPE "typeProduct_new" USING ("type"::text::"typeProduct_new");
ALTER TYPE "typeProduct" RENAME TO "typeProduct_old";
ALTER TYPE "typeProduct_new" RENAME TO "typeProduct";
DROP TYPE "typeProduct_old";
COMMIT;
