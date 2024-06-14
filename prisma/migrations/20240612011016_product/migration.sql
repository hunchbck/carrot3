/*
  Warnings:

  - You are about to drop the `C3ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `C3Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_C3ChatRoomToC3User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "C3ChatRoom";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "C3Message";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_C3ChatRoomToC3User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "C3Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "C3Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C3User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
