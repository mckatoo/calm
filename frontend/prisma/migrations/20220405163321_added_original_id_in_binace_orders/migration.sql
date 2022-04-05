/*
  Warnings:

  - Added the required column `originalId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `originalId` VARCHAR(191) NOT NULL;
