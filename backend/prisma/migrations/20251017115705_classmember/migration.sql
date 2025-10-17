-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "classesId" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassMembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClassMembers_B_index" ON "_ClassMembers"("B");

-- AddForeignKey
ALTER TABLE "_ClassMembers" ADD CONSTRAINT "_ClassMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassMembers" ADD CONSTRAINT "_ClassMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
