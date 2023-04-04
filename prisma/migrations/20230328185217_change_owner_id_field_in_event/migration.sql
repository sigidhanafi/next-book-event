/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `ownerId`,
    ADD COLUMN `owner_id` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
