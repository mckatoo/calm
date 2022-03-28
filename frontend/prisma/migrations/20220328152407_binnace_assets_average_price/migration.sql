/*
  Warnings:

  - You are about to drop the column `averageValue` on the `BinanceAssets` table. All the data in the column will be lost.
  - Added the required column `averagePrice` to the `BinanceAssets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BinanceAssets` DROP COLUMN `averageValue`,
    ADD COLUMN `averagePrice` DOUBLE NOT NULL;
