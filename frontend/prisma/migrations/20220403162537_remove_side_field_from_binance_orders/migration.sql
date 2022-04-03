/*
  Warnings:

  - You are about to drop the column `image` on the `BinanceAssets` table. All the data in the column will be lost.
  - You are about to drop the column `side` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BinanceAssets` DROP COLUMN `image`;

-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `side`;
