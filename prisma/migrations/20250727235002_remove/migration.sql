/*
  Warnings:

  - You are about to drop the column `order` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `restaurant_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "menu_items" ALTER COLUMN "image" DROP NOT NULL;

-- DropTable
DROP TABLE "restaurant_info";
