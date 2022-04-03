/*
  Warnings:

  - Added the required column `commission` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalBuyed` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `commission` DOUBLE NOT NULL,
    ADD COLUMN `totalBuyed` DOUBLE NOT NULL;
