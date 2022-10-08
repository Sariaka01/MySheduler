/*
  Warnings:

  - You are about to drop the column `beforeStart` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_participants_relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_participants_relation" DROP CONSTRAINT "_participants_relation_A_fkey";

-- DropForeignKey
ALTER TABLE "_participants_relation" DROP CONSTRAINT "_participants_relation_B_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "beforeStart",
DROP COLUMN "description",
DROP COLUMN "end",
DROP COLUMN "priority",
DROP COLUMN "start";

-- DropTable
DROP TABLE "_participants_relation";
