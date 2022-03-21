/*
  Warnings:

  - You are about to drop the column `Passphrase` on the `Exchanges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Exchanges` DROP COLUMN `Passphrase`,
    ADD COLUMN `passphrase` VARCHAR(191) NULL;
