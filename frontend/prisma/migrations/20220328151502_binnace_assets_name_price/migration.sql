/*
  Warnings:

  - You are about to drop the column `coin` on the `BinanceAssets` table. All the data in the column will be lost.
  - You are about to drop the column `currentValue` on the `BinanceAssets` table. All the data in the column will be lost.
  - Added the required column `name` to the `BinanceAssets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `BinanceAssets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BinanceAssets` DROP COLUMN `coin`,
    DROP COLUMN `currentValue`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;
