-- CreateTable
CREATE TABLE "_participants_relation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_participants_relation_AB_unique" ON "_participants_relation"("A", "B");

-- CreateIndex
CREATE INDEX "_participants_relation_B_index" ON "_participants_relation"("B");

-- AddForeignKey
ALTER TABLE "_participants_relation" ADD CONSTRAINT "_participants_relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participants_relation" ADD CONSTRAINT "_participants_relation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
