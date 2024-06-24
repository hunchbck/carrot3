-- CreateTable
CREATE TABLE "C3User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "emailCertified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "mobile" TEXT,
    "mobileCertified" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "socialOnly" BOOLEAN NOT NULL DEFAULT false,
    "socialInfo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "C3SMSToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "C3SMSToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C3User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "C3Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "photo" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "C3Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C3User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "C3User_username_key" ON "C3User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_email_key" ON "C3User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_mobile_key" ON "C3User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "C3SMSToken_token_key" ON "C3SMSToken"("token");
