/*
  Warnings:

  - You are about to drop the `Assets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Assets` DROP FOREIGN KEY `Assets_userId_fkey`;

-- DropTable
DROP TABLE `Assets`;

-- CreateTable
CREATE TABLE `BinanceAssets` (
    `id` VARCHAR(191) NOT NULL,
    `coin` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `averageValue` DOUBLE NOT NULL,
    `currentValue` DOUBLE NOT NULL,
    `roi` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BinanceAssets` ADD CONSTRAINT `BinanceAssets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
