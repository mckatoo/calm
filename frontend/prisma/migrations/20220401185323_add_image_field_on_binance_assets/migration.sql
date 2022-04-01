/*
  Warnings:

  - Added the required column `image` to the `BinanceAssets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BinanceAssets` ADD COLUMN `image` VARCHAR(191) NOT NULL;
