/*
  Warnings:

  - Added the required column `beforeStart` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "beforeStart" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "priority" "Priority" NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
