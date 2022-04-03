/*
  Warnings:

  - You are about to drop the column `price` on the `BinanceAssets` table. All the data in the column will be lost.
  - You are about to drop the column `roi` on the `BinanceAssets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BinanceAssets` DROP COLUMN `price`,
    DROP COLUMN `roi`;
