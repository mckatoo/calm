/*
  Warnings:

  - A unique constraint covering the columns `[originalId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Orders_originalId_key` ON `Orders`(`originalId`);
